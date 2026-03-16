import { componentDecorator, events as coreEvents, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './date-picker.attributes';
import events from './date-picker.events';

/**
 * wcagUI DatePicker class
 *
 * @export
 * @class DatePicker
 * @extends {HTMLElement}
 */
export class DatePicker extends HTMLElement {
  static extendsElement = 'div';
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator(this);
  }

  #guid;
  #viewDate;
  #open = false;

  get locale() {
    return this.getAttribute('locale') || navigator.language || 'en';
  }

  get #input() {
    return this.querySelector(':scope > input');
  }

  get #dropdown() {
    return this.querySelector(':scope > .wcag-date-picker__dropdown');
  }

  get value() {
    return this.#input?.value || '';
  }

  set value(val) {
    const input = this.#input;
    if (input) input.value = val;
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

    const input = this.#input;
    if (input) {
      input.setAttribute('autocomplete', 'off');
      !input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby') && input.setAttribute('aria-label', 'Date');
    }

    // Add toggle button
    const toggleId = `${this.#guid}-toggle`;
    const dropdownId = `${this.#guid}-dropdown`;
    const btn = DOM.createElement('button', {
      type: 'button',
      class: 'wcag-date-picker__toggle',
      id: toggleId,
      'aria-label': 'Open calendar',
      'aria-expanded': 'false',
      'aria-controls': dropdownId,
    });
    btn.textContent = '\uD83D\uDCC5'; // calendar emoji
    DOM.insertElement(this, btn);

    // Add dropdown container
    const dropdown = DOM.createElement('div', {
      class: 'wcag-date-picker__dropdown',
      id: dropdownId,
      role: 'dialog',
      'aria-modal': 'false',
      'aria-label': 'Choose date',
      hidden: '',
    });
    DOM.insertElement(this, dropdown);

    const now = new Date();
    this.#viewDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  toggle() {
    this.#open ? this.close() : this.open();
  }

  open() {
    this.#open = true;
    const dd = this.#dropdown;
    if (!dd) return;

    // Parse current input value to set view
    const val = this.value;
    if (val) {
      const d = new Date(val);
      if (!Number.isNaN(d.getTime())) {
        this.#viewDate = new Date(d.getFullYear(), d.getMonth(), 1);
      }
    }

    dd.removeAttribute('hidden');
    this.querySelector('.wcag-date-picker__toggle')?.setAttribute('aria-expanded', 'true');
    this.#renderCalendar();

    // Focus first selectable day
    requestAnimationFrame(() => {
      const selected = dd.querySelector('button[aria-selected="true"]') || dd.querySelector('button[data-date]');
      selected?.focus();
    });
  }

  close() {
    this.#open = false;
    const dd = this.#dropdown;
    if (dd) dd.setAttribute('hidden', '');
    this.querySelector('.wcag-date-picker__toggle')?.setAttribute('aria-expanded', 'false');
    this.#input?.focus();
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

  #selectDate(date) {
    if (this.#isDisabled(date)) return;
    this.value = this.#formatISO(date);
    this.close();
    coreEvents.dispatchComponentEvent.call(this, 'date-select', { date: this.#formatISO(date) });
  }

  prevMonth() {
    this.#viewDate.setMonth(this.#viewDate.getMonth() - 1);
    this.#renderCalendar();
  }

  nextMonth() {
    this.#viewDate.setMonth(this.#viewDate.getMonth() + 1);
    this.#renderCalendar();
  }

  #renderCalendar() {
    const dd = this.#dropdown;
    if (!dd) return;

    const year = this.#viewDate.getFullYear();
    const month = this.#viewDate.getMonth();
    const locale = this.locale;
    const today = new Date();
    const selectedDate = this.value ? new Date(this.value) : null;

    const monthName = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this.#viewDate);
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2024, 0, i + 1)));
    }

    const labelId = `${this.#guid}-cal-label`;
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
    html += `<table role="grid" aria-labelledby="${labelId}"><thead><tr>`;
    for (const wd of weekdays) html += `<th scope="col" abbr="${wd}">${wd}</th>`;
    html += '</tr></thead><tbody><tr>';

    for (let i = 0; i < startDay; i++) html += '<td></td>';

    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      const iso = this.#formatISO(cellDate);
      const isToday = this.#isSameDay(cellDate, today);
      const isSelected = selectedDate && this.#isSameDay(cellDate, selectedDate);
      const disabled = this.#isDisabled(cellDate);

      let attrs = `aria-label="${dateFormatter.format(cellDate)}" data-date="${iso}"`;
      if (isSelected) attrs += ' aria-selected="true"';
      if (disabled) attrs += ' aria-disabled="true" disabled';
      if (isToday) attrs += ' data-today';
      const tabIdx = isSelected || (!selectedDate && d === 1) ? '0' : '-1';

      html += `<td role="gridcell"><button type="button" tabindex="${tabIdx}" ${attrs}>${d}</button></td>`;
      if ((startDay + d - 1) % 7 === 6 && d < daysInMonth) html += '</tr><tr>';
    }

    const lastCol = (startDay + daysInMonth - 1) % 7;
    for (let i = lastCol + 1; i <= 6; i++) html += '<td></td>';
    html += '</tr></tbody></table>';

    DOM.insertHTML(dd, html, 'replace');
  }

  _handleCalendarClick(e) {
    const btn = e.target.closest('button[data-date]');
    if (btn && !btn.disabled) {
      this.#selectDate(new Date(btn.dataset.date));
      return;
    }
    if (e.target.closest('.wcag-calendar__prev')) { this.prevMonth(); return; }
    if (e.target.closest('.wcag-calendar__next')) { this.nextMonth(); }
  }

  _handleCalendarKeydown(e) {
    const btn = e.target.closest('button[data-date]');
    if (!btn) return;

    if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }

    const current = new Date(btn.dataset.date);
    let next = null;

    switch (e.key) {
      case 'ArrowRight': next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1); break;
      case 'ArrowLeft': next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1); break;
      case 'ArrowDown': next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7); break;
      case 'ArrowUp': next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7); break;
      case 'Enter': case ' ': e.preventDefault(); this.#selectDate(current); return;
      default: return;
    }

    e.preventDefault();
    const iso = this.#formatISO(next);
    if (next.getMonth() !== current.getMonth() || next.getFullYear() !== current.getFullYear()) {
      this.#viewDate = new Date(next.getFullYear(), next.getMonth(), 1);
      this.#renderCalendar();
    }
    this.#dropdown?.querySelector(`button[data-date="${iso}"]`)?.focus();
  }
}
