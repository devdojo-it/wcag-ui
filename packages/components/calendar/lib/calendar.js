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
      const d = new Date(val);
      if (!Number.isNaN(d.getTime())) {
        this.#selectedDate = d;
        this.#viewDate = new Date(d.getFullYear(), d.getMonth(), 1);
      }
    }
    this.render();
  }

  get #minDate() {
    const v = this.getAttribute('min');
    return v ? new Date(v) : null;
  }

  get #maxDate() {
    const v = this.getAttribute('max');
    return v ? new Date(v) : null;
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.setAttribute('role', 'group');
    !this.hasAttribute('aria-label') && this.setAttribute('aria-label', 'Calendar');

    const valAttr = this.getAttribute('value');
    this.#selectedDate = valAttr ? new Date(valAttr) : null;

    const now = this.#selectedDate ?? new Date();
    this.#viewDate = new Date(now.getFullYear(), now.getMonth(), 1);

    this.render();
  }

  #formatISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  #isSameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  #isDisabled(d) {
    const min = this.#minDate;
    const max = this.#maxDate;
    if (min && d < min) return true;
    if (max && d > max) return true;
    return false;
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

  render() {
    const year = this.#viewDate.getFullYear();
    const month = this.#viewDate.getMonth();
    const locale = this.locale;
    const today = new Date();

    const monthName = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this.#viewDate);
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2024, 0, i + 1); // Mon-Sun starting Monday
      weekdays.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d));
    }

    const labelId = `${this.#guid}-label`;
    const firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let html = `<div class="wcag-calendar__header">`;
    html += `<button type="button" class="wcag-calendar__prev" aria-label="Previous month">&#8249;</button>`;
    html += `<span id="${labelId}" aria-live="polite">${monthName}</span>`;
    html += `<button type="button" class="wcag-calendar__next" aria-label="Next month">&#8250;</button>`;
    html += `</div>`;

    html += `<table role="grid" aria-labelledby="${labelId}">`;
    html += '<thead><tr>';
    for (const wd of weekdays) {
      html += `<th scope="col" abbr="${wd}">${wd}</th>`;
    }
    html += '</tr></thead><tbody>';

    let dayNum = 1;
    let row = '<tr>';
    for (let i = 0; i < startDay; i++) row += '<td></td>';

    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      const iso = this.#formatISO(cellDate);
      const isToday = this.#isSameDay(cellDate, today);
      const isSelected = this.#isSameDay(cellDate, this.#selectedDate);
      const disabled = this.#isDisabled(cellDate);
      const fullLabel = dateFormatter.format(cellDate);

      let attrs = `aria-label="${fullLabel}" data-date="${iso}"`;
      if (isSelected) attrs += ' aria-selected="true"';
      if (disabled) attrs += ' aria-disabled="true" disabled';
      if (isToday) attrs += ' data-today';

      const tabIdx = isSelected || (!this.#selectedDate && d === 1) ? '0' : '-1';
      row += `<td role="gridcell"><button type="button" tabindex="${tabIdx}" ${attrs}>${d}</button></td>`;

      const col = (startDay + d - 1) % 7;
      if (col === 6 && d < daysInMonth) {
        row += '</tr><tr>';
      }
    }

    // Fill remaining cells
    const lastCol = (startDay + daysInMonth - 1) % 7;
    for (let i = lastCol + 1; i <= 6; i++) row += '<td></td>';
    row += '</tr>';

    html += row;
    html += '</tbody></table>';

    DOM.insertHTML(this, html, 'replace');
  }
}
