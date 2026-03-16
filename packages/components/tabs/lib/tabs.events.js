import { events } from '@wcag-ui/core';

export default {
  click(e) {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;

    const tabs = [...(this.querySelector(':scope > [role="tablist"]')?.querySelectorAll('[role="tab"]') ?? [])];
    const index = tabs.indexOf(tab);
    if (index !== -1) this.activeTab = index;
    tab.focus();
  },

  keydown(e) {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;

    const tabs = [...(this.querySelector(':scope > [role="tablist"]')?.querySelectorAll('[role="tab"]') ?? [])];
    const current = tabs.indexOf(tab);
    let next = -1;

    switch (e.key) {
      case 'ArrowRight':
        next = (current + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        next = (current - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    this.activeTab = next;
    tabs[next].focus();
  },
};
