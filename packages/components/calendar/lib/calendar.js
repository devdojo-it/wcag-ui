import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './calendar.attributes';
import events from './calendar.events';

/**
 * wcagUI Calendar class
 *
 * @export
 * @class Calendar
 * @extends {HTMLElement}
 */
export class Calendar extends HTMLElement {
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;
  #viewDate;
  #selectedDate;

  get locale() {
    return this.getAttribute('locale') || navigator.language || 'en';
  }

  get value() {
    return this.#selectedDate ? this.#formatISO(this.#selectedDate) : '';
  }

  set value(val) {
    if (!val) {
      this.#selectedDate = null;
    } else {
      const date = new Date(val);
      if (!Number.isNaN(date.getTime())) {
        this.#selectedDate = date;
        this.#viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      }
    }

    this.render();
  }

  get #minDate() {
    const value = this.getAttribute('min');
    return value ? new Date(value) : null;
  }

  get #maxDate() {
    const value = this.getAttribute('max');
    return value ? new Date(value) : null;
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.setAttribute('role', 'group');
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Calendar');

    const initialValue = this.getAttribute('value');
    this.#selectedDate = initialValue ? new Date(initialValue) : null;

    const now = this.#selectedDate ?? new Date();
    this.#viewDate = new Date(now.getFullYear(), now.getMonth(), 1);

    this.render();
  }

  #formatISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  #isSameDay(a, b) {
    return (
      a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
    );
  }

  #isDisabled(date) {
    const min = this.#minDate;
    const max = this.#maxDate;
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }

  #weekdayIndex(date) {
    const weekday = date.getDay();
    return weekday === 0 ? 6 : weekday - 1;
  }

  #buildCalendarSkeleton(labelId, monthName) {
    DOM.insertHTML(
      `
        <header calendar-header>
          <button type="button" previous-month aria-label="Previous month">&#8249;</button>
          <span id="${labelId}" aria-live="polite">${monthName}</span>
          <button type="button" next-month aria-label="Next month">&#8250;</button>
        </header>
        <table role="grid" aria-labelledby="${labelId}">
          <thead>
            <tr></tr>
          </thead>
          <tbody></tbody>
        </table>
      `,
      this,
      'append',
      true,
    );
  }

  prevMonth() {
    this.#viewDate.setMonth(this.#viewDate.getMonth() - 1);
    this.render();
  }

  nextMonth() {
    this.#viewDate.setMonth(this.#viewDate.getMonth() + 1);
    this.render();
  }

  selectDate(date) {
    if (this.#isDisabled(date)) return;

    this.#selectedDate = date;
    this.render();
    coreEvents.dispatchComponentEvent.call(this, 'date-select', { date: this.#formatISO(date) });
  }

  focusDate(date) {
    const iso = this.#formatISO(date);

    if (date.getMonth() !== this.#viewDate.getMonth() || date.getFullYear() !== this.#viewDate.getFullYear()) {
      this.#viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.render();
    }

    this.querySelector(`button[data-date="${iso}"]`)?.focus();
  }

  render() {
    const year = this.#viewDate.getFullYear();
    const month = this.#viewDate.getMonth();
    const locale = this.locale;
    const today = new Date();

    const monthName = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this.#viewDate);
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, i + 1);
      weekdays.push({
        full: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date),
        short: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
      });
    }

    const labelId = `${this.#guid}-label`;
    const firstDay = new Date(year, month, 1);
    const startDay = this.#weekdayIndex(firstDay);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.#buildCalendarSkeleton(labelId, monthName);

    const headerRow = this.querySelector(':scope > table > thead > tr');
    const body = this.querySelector(':scope > table > tbody');
    if (!headerRow || !body) return;

    for (const weekday of weekdays) {
      DOM.insertHTML(`<th scope="col" abbr="${weekday.full}">${weekday.short}</th>`, headerRow, 'append');
    }

    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;
    let currentRow = null;

    for (let index = 0; index < totalCells; index++) {
      if (index % 7 === 0) {
        DOM.insertHTML('<tr></tr>', body, 'append');
        currentRow = body.lastElementChild;
      }

      if (!currentRow) continue;

      if (index < startDay || index >= startDay + daysInMonth) {
        DOM.insertHTML('<td></td>', currentRow, 'append');
        continue;
      }

      const day = index - startDay + 1;
      const cellDate = new Date(year, month, day);
      const iso = this.#formatISO(cellDate);
      const isToday = this.#isSameDay(cellDate, today);
      const isSelected = this.#isSameDay(cellDate, this.#selectedDate);
      const disabled = this.#isDisabled(cellDate);
      const tabIndex = isSelected || (!this.#selectedDate && day === 1) ? '0' : '-1';
      const attributes = [
        `aria-label="${dateFormatter.format(cellDate)}"`,
        `data-date="${iso}"`,
        `tabindex="${tabIndex}"`,
      ];

      if (isSelected) attributes.push('aria-selected="true"');
      if (disabled) attributes.push('aria-disabled="true"', 'disabled');
      if (isToday) attributes.push('data-today');

      DOM.insertHTML(
        `<td role="gridcell"><button type="button" ${attributes.join(' ')}>${day}</button></td>`,
        currentRow,
        'append',
      );
    }
  }
}
