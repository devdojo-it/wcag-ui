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
  static extendsElement = 'section';
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

  get #hint() {
    return this.querySelector(':scope > span[date-picker-hint]');
  }

  get #toggleButton() {
    return this.querySelector(':scope > button[toggle]');
  }

  get #dropdown() {
    return this.querySelector(':scope > section[dropdown]');
  }

  get value() {
    return this.#input?.value || '';
  }

  set value(val) {
    const input = this.#input;
    if (input) input.value = val ?? '';
  }

  get #minDate() {
    const value = this.getAttribute('min');
    return value ? new Date(value) : null;
  }

  get #maxDate() {
    const value = this.getAttribute('max');
    return value ? new Date(value) : null;
  }

  get isOpen() {
    return this.#open;
  }

  constructor() {
    super();
    this.#init();
  }

  #init() {
    this.#guid = helpers.strings.guid();
    this.setAttribute('role', 'group');

    this.#ensureToggleButton();
    this.#ensureHint();
    this.#ensureDropdown();

    const now = new Date();
    this.#viewDate = new Date(now.getFullYear(), now.getMonth(), 1);

    this.update();
  }

  update() {
    const input = this.#input;
    const hint = this.#hint;
    const dropdown = this.#dropdown;
    const toggleButton = this.#toggleButton;
    const dropdownId = `${this.#guid}-dropdown`;
    const hintId = `${this.#guid}-hint`;

    if (hint) {
      hint.id = hint.id || hintId;
      hint.setAttribute('date-picker-hint', '');
      hint.setAttribute('sr-only', '');
      if (!hint.textContent?.trim()) {
        hint.textContent = 'Date format: YYYY-MM-DD.';
      }
    }

    if (input) {
      const describedBy = new Set((input.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));

      if (hint?.id) {
        describedBy.add(hint.id);
      }

      !input.hasAttribute('type') && input.setAttribute('type', 'text');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-haspopup', 'dialog');
      input.setAttribute('aria-autocomplete', 'none');
      input.setAttribute('aria-controls', dropdownId);
      input.setAttribute('aria-expanded', String(this.#open));

      !input.hasAttribute('aria-label') &&
        !input.hasAttribute('aria-labelledby') &&
        input.setAttribute('aria-label', this.getAttribute('aria-label') || 'Date');

      if (describedBy.size > 0) {
        input.setAttribute('aria-describedby', [...describedBy].join(' '));
      }
    }

    if (toggleButton) {
      toggleButton.id = toggleButton.id || `${this.#guid}-toggle`;
      toggleButton.setAttribute('toggle', '');
      toggleButton.setAttribute('tabindex', '-1');
      toggleButton.setAttribute('aria-label', 'Choose date');
      toggleButton.setAttribute('aria-controls', dropdownId);
      toggleButton.setAttribute('aria-expanded', String(this.#open));
      toggleButton.setAttribute('aria-haspopup', 'dialog');
    }

    if (dropdown) {
      dropdown.id = dropdownId;
      dropdown.setAttribute('dropdown', '');
      dropdown.setAttribute('role', 'dialog');
      dropdown.hidden = !this.#open;

      if (!dropdown.hasAttribute('aria-label') && !dropdown.hasAttribute('aria-labelledby')) {
        dropdown.setAttribute('aria-label', 'Choose date');
      }
    }

    if (this.#open) {
      this.#renderCalendar();
    }
  }

  toggle() {
    this.#open ? this.close() : this.open();
  }

  open() {
    this.#open = true;
    const dropdown = this.#dropdown;
    if (!dropdown) return;

    const value = this.value;
    if (value) {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) {
        this.#viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      }
    }

    dropdown.hidden = false;
    this.update();

    requestAnimationFrame(() => {
      const selected =
        dropdown.querySelector('button[aria-selected="true"]') || dropdown.querySelector('button[data-date]');
      selected?.focus();
    });
  }

  close(returnFocus = true) {
    this.#open = false;

    if (this.#dropdown) {
      this.#dropdown.hidden = true;
    }

    this.update();
    returnFocus && this.#input?.focus();
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

  #ensureToggleButton() {
    if (this.#toggleButton) return;

    const toggleButton = DOM.createElement({
      tag: 'button',
      attributes: {
        type: 'button',
        toggle: '',
        'aria-label': 'Choose date',
        'aria-expanded': 'false',
        tabindex: '-1',
      },
      content: '\u{1F4C5}',
    });

    if (this.#input) {
      DOM.insertElement(toggleButton, this.#input, 'after');
      return;
    }

    DOM.insertElement(toggleButton, this, 'append');
  }

  #ensureHint() {
    if (this.#hint) return;

    const hint = DOM.createElement({
      tag: 'span',
      attributes: {
        'date-picker-hint': '',
        'sr-only': '',
        id: `${this.#guid}-hint`,
      },
      content: 'Date format: YYYY-MM-DD.',
    });

    DOM.insertElement(hint, this, 'append');
  }

  #ensureDropdown() {
    if (this.#dropdown) return;

    const dropdown = DOM.createElement({
      tag: 'section',
      attributes: {
        dropdown: '',
        id: `${this.#guid}-dropdown`,
        role: 'dialog',
        'aria-label': 'Choose date',
        hidden: '',
      },
    });

    DOM.insertElement(dropdown, this, 'append');
  }

  #buildCalendarSkeleton(target, labelId, monthName) {
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
      target,
      'append',
      true,
    );
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
    const dropdown = this.#dropdown;
    if (!dropdown) return;

    const year = this.#viewDate.getFullYear();
    const month = this.#viewDate.getMonth();
    const locale = this.locale;
    const today = new Date();
    const selectedDate = this.value ? new Date(this.value) : null;

    const monthName = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this.#viewDate);
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, i + 1);
      weekdays.push({
        full: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date),
        short: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
      });
    }

    const labelId = `${this.#guid}-cal-label`;
    const firstDay = new Date(year, month, 1);
    const startDay = this.#weekdayIndex(firstDay);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.#buildCalendarSkeleton(dropdown, labelId, monthName);
    dropdown.setAttribute('aria-labelledby', labelId);
    dropdown.removeAttribute('aria-label');

    const headerRow = dropdown.querySelector(':scope > table > thead > tr');
    const body = dropdown.querySelector(':scope > table > tbody');
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
      const isSelected = selectedDate && this.#isSameDay(cellDate, selectedDate);
      const disabled = this.#isDisabled(cellDate);
      const tabIndex = isSelected || (!selectedDate && day === 1) ? '0' : '-1';
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

  _handleCalendarClick(e) {
    const button = e.target.closest('button[data-date]');
    if (button && !button.disabled) {
      this.#selectDate(new Date(button.dataset.date));
      return;
    }

    if (e.target.closest('button[previous-month]')) {
      this.prevMonth();
      return;
    }

    if (e.target.closest('button[next-month]')) {
      this.nextMonth();
    }
  }

  _handleCalendarKeydown(e) {
    const button = e.target.closest('button[data-date]');
    if (!button) return;

    const current = new Date(button.dataset.date);
    const weekdayIndex = this.#weekdayIndex(current);
    let next = null;

    switch (e.key) {
      case 'ArrowRight':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
        break;
      case 'ArrowLeft':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
        break;
      case 'ArrowDown':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
        break;
      case 'ArrowUp':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7);
        break;
      case 'Home':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - weekdayIndex);
        break;
      case 'End':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + (6 - weekdayIndex));
        break;
      case 'PageDown':
        next = new Date(current.getFullYear(), current.getMonth() + (e.shiftKey ? 12 : 1), current.getDate());
        break;
      case 'PageUp':
        next = new Date(current.getFullYear(), current.getMonth() - (e.shiftKey ? 12 : 1), current.getDate());
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.#selectDate(current);
        return;
      default:
        return;
    }

    e.preventDefault();

    if (next.getMonth() !== current.getMonth() || next.getFullYear() !== current.getFullYear()) {
      this.#viewDate = new Date(next.getFullYear(), next.getMonth(), 1);
      this.#renderCalendar();
    }

    const iso = this.#formatISO(next);
    this.#dropdown?.querySelector(`button[data-date="${iso}"]`)?.focus();
  }
}
