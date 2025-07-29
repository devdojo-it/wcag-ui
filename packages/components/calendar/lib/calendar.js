import { componentDecorator } from "@wcag-ui/core";

import attributes from "./calendar.attributes";
import events from "./calendar.events";

/** @typedef {Intl.Locale & { getWeekInfo(): { firstDay: number, weekend: number[] } }} Locale */

/** @type {(calendar: Calendar) => void} */
export let setLocale;
const repeat = (length, tag) =>
  Array.from({ length }, () => `<${tag}>`).join("");
// Formally incorrect but it works
const ROW_HTML = `tr>${repeat(7, "td><button type=button").slice(0, -1)}`;
// TODO: select and input should have a name and be in a form
const CONTAINER_HTML = `<header><button type=button is=wcag-button secondary sm><svg viewBox="0 0 20 20"><path d="M15.404 3.142 13.93 1.667 5.596 10l8.333 8.333 1.475-1.475L8.546 10l6.858-6.858Z"/></svg></button><form action="javascript:;"><select name=month is=wcag-select sm>${Array.from(
  { length: 12 },
  (_, index) => `<option value=${index}>`
).join(
  ""
)}<input name=year inputmode=numeric is=wcag-input sm></form><button type=button is=wcag-button secondary sm><svg viewBox="0 0 20 20"><path d="m5.596 16.858 1.475 1.475L15.404 10 7.071 1.667 5.596 3.142 12.454 10l-6.858 6.858Z"/></svg></header><table><colgroup>${repeat(
  7,
  "col"
)}<thead><tr>${repeat(7, "th")}<tbody>${repeat(6, ROW_HTML)}`;

/** @param {Document} doc */
const buildContainer = (doc) => {
  const container = doc.createElement("div");
  container.innerHTML = CONTAINER_HTML;
  return {
    root: container,
    header: /** @type {HTMLElement} */ (container.querySelector("header")),
    monthSelector: /** @type {HTMLSelectElement} */ (
      container.querySelector("select")
    ),
    yearSelector: /** @type {HTMLInputElement} */ (
      container.querySelector("input")
    ),
    previousButton: /** @type {HTMLButtonElement} */ (
      container.querySelector("button")
    ),
    nextButton: /** @type {HTMLButtonElement} */ (
      container.querySelector("button:last-of-type")
    ),
    headings: container.querySelectorAll("th"),
    days: /** @type {NodeListOf<HTMLButtonElement>} */ (
      container.querySelectorAll("td > button")
    ),
  };
};

/** @typedef {ReturnType<typeof buildContainer>} ContainerRefs */

// const timezoneOffset = new Date().getTimezoneOffset();
// const timezoneString = `${Math.sign(timezoneOffset) > 0 ? "-" : "+"}${String(
//   Math.floor(Math.abs(timezoneOffset) / 60)
// ).padStart(2, "0")}:${String(Math.abs(timezoneOffset) % 60).padStart(2, "0")}`;
const DATES = Array.from(
  "645327611111",
  (day, index) => new Date(`2025-${String(index + 1).padStart(2, "0")}-0${day}`)
);

/** @param {string} lang */
const getCalendarNames = (lang) => {
  const formatter = new Intl.DateTimeFormat(lang, {
    weekday: "narrow",
    month: "long",
  });
  const formattedDates = DATES.map((date) => formatter.formatToParts(date));
  return {
    months: formattedDates.map(
      (parts) => parts.find((part) => part.type === "month")?.value ?? ""
    ),
    weekdays: formattedDates
      .slice(0, 7)
      .map(
        (parts) => parts.find((part) => part.type === "weekday")?.value ?? ""
      ),
  };
};

/**
 * @param {Date} refDate
 * @param {number} weekFirstDay
 */
const getFirstDay = (refDate, weekFirstDay) => {
  const firstDay = new Date(refDate);
  firstDay.setDate(1);
  firstDay.setHours(0, 0, 0, 0);
  // Sunday (0) should be treated as 7 per ISO 8601
  const weekDay = firstDay.getDay() || 7;
  const diff = (weekDay + 7 - weekFirstDay) % 7;
  firstDay.setDate(1 - diff);
  return firstDay;
};

/**
 * @param {Date} date
 * @param {Date} ref
 */
const isSameDay = (date, ref) =>
  date.getFullYear() === ref.getFullYear() &&
date.getMonth() === ref.getMonth() &&
date.getDate() === ref.getDate();

/** @param {Date} date */
const formatDate = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/**
 * wcagUI Calendar class
 *
 * @export
 * @class Calendar
 * @extends {HTMLDivElement}
 */
export class Calendar extends HTMLDivElement {
  static componentName = "wcag-calendar";
  static extendsElement = "div";
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof Calendar
   */
  static {
    componentDecorator("Calendar", Calendar);
    setLocale = (calendar) => {
      const lang =
        calendar.lang || document.documentElement.lang || navigator.language;
      calendar.#locale = /** @type {Locale} */ (new Intl.Locale(lang));
      const { months, weekdays } = getCalendarNames(lang);
      calendar.#months = months;
      calendar.#weekdays = weekdays;
      calendar.#formatter = new Intl.DateTimeFormat(lang, {
        weekday: "long",
        month: "long",
        year: "numeric",
        day: "numeric",
      });
      calendar.#updateParts(calendar.#startContainer);
      calendar.#updateParts(calendar.#endContainer);
    };
  }

  #value = new Date().toISOString();

  get value() {
    return Number.isNaN(this.valueAsDate.getTime()) ? "" : this.#value;
  }
  set value(value) {
    this.#value = value;
    if (!Number.isNaN(this.valueAsDate.getTime())) {
      this.setAttribute("value", value);
    }
  }

  get valueAsDate() {
    const [start] = this.#value.split("/");
    return new Date(start);
  }
  set valueAsDate(value) {
    this.value = value.toISOString();
  }

  #startView = new Date().toISOString();

  get startView() {
    return Number.isNaN(this.startViewAsDate.getTime()) ? "" : this.#value;
  }
  set startView(value) {
    this.#startView = value;
    if (!Number.isNaN(this.startViewAsDate.getTime())) {
      this.setAttribute("start-view", value);
      this.#updateDays(this.#startContainer);
    }
  }

  get startViewAsDate() {
    return new Date(this.#startView);
  }
  set startViewAsDate(value) {
    this.startView = value.toISOString();
  }

  #endView = new Date().toISOString();
  /** @type {Locale} */
  #locale;
  /** @type {string[]} */
  #months;
  /** @type {string[]} */
  #weekdays;

  /** @type {Intl.DateTimeFormat} */
  #formatter;

  constructor() {
    super();

    setLocale(this);
    this.#initialize();
  }

  #initialize() {
    this.#buildCalendar();
  }

  /** @type {ContainerRefs} */
  #startContainer;
  /** @type {ContainerRefs} */
  #endContainer;

  #buildCalendar() {
    if (!this.#startContainer) {
      const container = buildContainer(this.ownerDocument);
      container.root.dataset.calendar = "start";
      this.#updateParts(container);
      this.#startContainer = container;
    }
    if (this.#startContainer.root.parentElement !== this) {
      this.prepend(this.#startContainer.root);
    }
  }

  /** @param {ContainerRefs} [container] */
  #updateParts(container) {
    if (!container) return;
    this.#months.forEach(
      (month, index) => (container.monthSelector.options[index].text = month)
    );
    const weekInfo = this.#locale.getWeekInfo?.() ?? {
      weekend: [6, 7],
      firstDay: 1,
    };
    container.headings.forEach(
      (th, index) =>
        // TODO: add aria-label too
        (th.innerHTML = this.#weekdays[(index + 6 + weekInfo.firstDay) % 7])
    );
    this.#updateDays(container);
  }

  /** @param {ContainerRefs} [container] */
  #updateDays(container) {
    if (!container) return;
    const { days, monthSelector, yearSelector, previousButton, nextButton } =
      container;
    const month = new Date(this.#startView);
    const day = getFirstDay(month, this.#locale.getWeekInfo().firstDay);
    const ref = this.valueAsDate;
    monthSelector.value = String(month.getMonth());
    yearSelector.value = String(month.getFullYear());

    const previousMonth = new Date(month);
    previousMonth.setDate(0);
    previousMonth.setDate(1);
    previousButton.dataset.view = formatDate(previousMonth);
    previousButton.ariaLabel = `${
      this.#months[previousMonth.getMonth()]
    } ${previousMonth.getFullYear()}`;

    const nextMonth = new Date(month);
    nextMonth.setDate(32);
    nextMonth.setDate(1);
    nextButton.dataset.view = formatDate(nextMonth);
    nextButton.ariaLabel = `${
      this.#months[nextMonth.getMonth()]
    } ${nextMonth.getFullYear()}`;

    for (const btn of days) {
      btn.textContent = String(day.getDate());
      // TODO: handle case when value isn't in the view, and when switching from a month to another
      btn.tabIndex = isSameDay(day, ref) ? 0 : -1;
      btn.ariaLabel = this.#formatter.format(day);
      btn.dataset.date = formatDate(day);
      day.setHours(24, 0, 0, 0);
    }
  }
}
