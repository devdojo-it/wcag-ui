export default {
  click(event) {
    const button = event.target.closest('button[segment], button');

    if (!button || !this.contains(button)) {
      return;
    }

    this.selectValue(button.getAttribute('value') || button.textContent.trim());
  },
  keydown(event) {
    const buttons = [...this.querySelectorAll(':scope > button[segment]')];
    const currentIndex = buttons.findIndex((button) => button === event.target);

    if (currentIndex === -1) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % buttons.length;
      const nextButton = buttons[nextIndex];
      this.selectValue(nextButton.getAttribute('value') || nextButton.textContent.trim());
      this.focusOption(nextIndex);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      const nextButton = buttons[nextIndex];
      this.selectValue(nextButton.getAttribute('value') || nextButton.textContent.trim());
      this.focusOption(nextIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const nextButton = buttons[0];
      this.selectValue(nextButton.getAttribute('value') || nextButton.textContent.trim());
      this.focusOption(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const nextButton = buttons.at(-1);
      this.selectValue(nextButton.getAttribute('value') || nextButton.textContent.trim());
      this.focusOption(buttons.length - 1);
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.selectValue(event.target.getAttribute('value') || event.target.textContent.trim());
    }
  },
};
