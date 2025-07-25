import { componentDecorator, helpers } from '@wcag-ui/core';
import { DOM } from '@wcag-ui/dom';

import attributes from './scroll-spy.attributes';
import events from './scroll-spy.events';

const { stripEmojis } = helpers.strings;

export class ScrollSpy extends HTMLElement {
  static componentName = 'wcag-scroll-spy';
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof ScrollSpy
   */
  static {
    componentDecorator('ScrollSpy', ScrollSpy);
  }

  #observer;

  #title;
  #headings = [];

  // constructor() {
  //   super();
  // }

  onConnected() {
    // Legge l'attributo target per individuare il contenuto esterno
    const targetSelector = this.getAttribute('target');
    const container = document.querySelector(targetSelector);

    if (!container) {
      console.error('Target container non trovato per ScrollSpy:', targetSelector);
      return;
    }

    // Seleziona tutte i gli headings h1 h2
    this.#title = container.querySelector('h1');
    this.#headings = [...container.querySelectorAll('h2')];

    // Costruisce la navigazione
    this.buildNav();

    // Imposta l'observer per gestire lo scroll e l'evidenziazione
    this.setupObserver();
  }

  onDisconnected() {
    this.#observer?.disconnect();
  }

  buildNav() {
    // <a href="#install-manually" id="install-manually" class="secondary" tabindex="-1">#</a>

    // Crea un elemento nav e una lista non ordinata
    const template = `
      <span>${stripEmojis(this.#title.textContent)}</span>
      <nav>
        <ul>
          ${this.#headings
            .map((heading) => {
              // Se la sezione non ha un id, lo genera a partire dal testo del titolo
              !heading.id && (heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-'));

              return `<li><a href="#${heading.id}">${stripEmojis(heading.textContent)}</a></li>`;
            })
            .join('')}
        </ul>
      </nav>
    `;

    DOM.insertHTML(template, this);
  }

  setupObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5, // Modifica il valore in base alle esigenze
    };

    this.#observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        const navLink = this.querySelector(`a[href="#${id}"]`);

        if (entry.isIntersecting) {
          this.clearActive();

          navLink?.parentElement?.classList.add('active');
        }
      }
    }, options);

    // Osserva ogni sezione individuata
    for (const heading of this.#headings) {
      this.#observer.observe(heading);
    }
  }

  clearActive() {
    const activeItems = this.querySelectorAll('li.active');

    for (const activeItem of activeItems) {
      activeItem.classList.remove('active');
    }
  }
}
