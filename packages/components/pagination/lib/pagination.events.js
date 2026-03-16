import { events } from '@wcag-ui/core';

export default {
  click: function (e) {
    const btn = e.target.closest('button, a');
    if (!btn) return;

    const page = btn.dataset.page;
    if (page) {
      events.dispatchComponentEvent.call(this, 'page-change', { page: Number(page) }, e);
    }
  },
};
