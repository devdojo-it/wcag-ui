import { events } from '@wcag-ui/core';

export default {
  click(e) {
    const btn = e.target.closest('.wcag-editor__action[data-command]');
    if (btn) {
      e.preventDefault();
      this.exec(btn.dataset.command);
    }
  },

  keydown(e) {
    // Toolbar keyboard navigation (arrow keys)
    const action = e.target.closest('.wcag-editor__action');
    if (!action) return;

    const toolbar = action.closest('.wcag-editor__toolbar');
    if (!toolbar) return;

    const buttons = [...toolbar.querySelectorAll('.wcag-editor__action')];
    const idx = buttons.indexOf(action);
    let next = -1;

    if (e.key === 'ArrowRight') next = (idx + 1) % buttons.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + buttons.length) % buttons.length;
    else return;

    e.preventDefault();

    for (const b of buttons) b.setAttribute('tabindex', '-1');
    buttons[next].setAttribute('tabindex', '0');
    buttons[next].focus();
  },

  input(e) {
    if (e.target.closest('.wcag-editor__content')) {
      events.dispatchComponentEvent.call(this, 'change', { html: this.value });
    }
  },
};
