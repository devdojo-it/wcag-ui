import "./styles/scroll-spy.css";

import { componentDecorator } from "@wcag-ui/core";
import { DOM } from "@wcag-ui/dom";

import attributes from "./scroll-spy.attributes";
import events from "./scroll-spy.events";

export class ScrollSpy extends HTMLElement {
  static name = "wcag-scroll-spy";
  static extends = "aside";
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof ScrollSpy
   */
  static {
    componentDecorator("ScrollSpy", ScrollSpy);
  }

  _observer = null;
  sections = [];

  constructor() {
    super();
  }

  onConnected() {
    // Legge l'attributo target per individuare il contenuto esterno
    const targetSelector = this.getAttribute("target");
    const container = document.querySelector(targetSelector);

    if (!container) {
      console.error("Target container non trovato per ScrollSpy:", targetSelector);
      return;
    }

    // Seleziona tutte le sezioni che contengono un h2 o h3
    this.sections = [...container.querySelectorAll("section:has(> :where(h2, h3))")];

    // Costruisce la navigazione
    this.buildNav();

    // Imposta l'observer per gestire lo scroll e l'evidenziazione
    this.setupObserver();
  }

  onDisconnected() {
    this._observer && this._observer.disconnect();
  }

  buildNav() {
    // <a href="#install-manually" id="install-manually" class="secondary" tabindex="-1">#</a>

    // Crea un elemento nav e una lista non ordinata
    let template = `
      <nav>
        <ul>
          ${this.sections
            .map((section) => {
              // Se la sezione non ha un id, lo genera a partire dal testo del titolo
              !section.id &&
                (section.id = section.querySelector("h2, h3").textContent.trim().toLowerCase().replace(/\s+/g, "-"));

              return `<li><a href="#${section.id}">${section.querySelector("h2, h3").textContent}</a></li>`;
            })
            .join("")}
        </ul>
      </nav>
    `;

    DOM.insertHTML(template, this);
  }

  setupObserver() {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // Modifica il valore in base alle esigenze
    };

    this._observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        const navLink = this.querySelector(`a[href="#${id}"]`);

        if (entry.isIntersecting) {
          this.clearActive();

          navLink && navLink.parentElement && navLink.parentElement.classList.add("active");
        }
      }
    }, options);

    // Osserva ogni sezione individuata
    for (const section of this.sections) {
      this._observer.observe(section);
    }
  }

  clearActive() {
    const activeItems = this.querySelectorAll("li.active");

    for (const activeItem of activeItems) {
      activeItem.classList.remove("active");
    }
  }
}
