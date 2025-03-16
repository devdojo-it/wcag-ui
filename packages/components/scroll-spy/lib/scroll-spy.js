'use strict';

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

  constructor() {
    super();
  }
}

// <!DOCTYPE html>
// <html lang="it">
// <head>
//   <meta charset="UTF-8">
//   <title>ScrollSpy Custom Element</title>
//   <style>
//     body {
//       display: flex;
//       margin: 0;
//       font-family: sans-serif;
//     }
//     main {
//       flex: 1;
//       padding: 20px;
//     }
//     /* Lo scrollspy viene visualizzato come aside sulla destra */
//     scroll-spy {
//       display: block;
//       width: 250px;
//       position: sticky;
//       top: 20px;
//       margin-left: 20px;
//       align-self: flex-start;
//     }
//     scroll-spy nav ul {
//       list-style: none;
//       padding: 0;
//     }
//     scroll-spy nav ul li {
//       margin-bottom: 10px;
//     }
//     scroll-spy nav ul li a {
//       text-decoration: none;
//       color: #333;
//     }
//     scroll-spy nav ul li.active a {
//       font-weight: bold;
//       color: #007bff;
//     }
//     section {
//       margin-bottom: 50px;
//     }
//   </style>
// </head>
// <body>
//   <!-- Contenuto esterno con le sezioni -->
//   <main id="main">
//     <section>
//       <h2>Titolo Sezione 1</h2>
//       <p>Contenuto della sezione 1 ...</p>
//     </section>
//     <section>
//       <h2>Titolo Sezione 2</h2>
//       <p>Contenuto della sezione 2 ...</p>
//     </section>
//     <section>
//       <h3>Titolo Sezione 3</h3>
//       <p>Contenuto della sezione 3 ...</p>
//     </section>
//   </main>

//   <!-- Custom element ScrollSpy che si riferisce al contenuto di #main -->
//   <scroll-spy target="#main"></scroll-spy>

//   <script>
//     class ScrollSpy extends HTMLElement {
//       constructor() {
//         super();
//         this._observer = null;
//         this.sections = [];
//       }

//       connectedCallback() {
//         // Legge l'attributo target per individuare il contenuto esterno
//         const targetSelector = this.getAttribute('target');
//         const container = document.querySelector(targetSelector);
//         if (!container) {
//           console.error('Target container non trovato per ScrollSpy:', targetSelector);
//           return;
//         }
//         // Seleziona tutte le sezioni che contengono un h2 o h3
//         this.sections = Array.from(container.querySelectorAll('section')).filter(section => 
//           section.querySelector('h2, h3')
//         );

//         // Costruisce la navigazione
//         this.buildNav();

//         // Imposta l'observer per gestire lo scroll e l'evidenziazione
//         this.setupObserver();
//       }

//       buildNav() {
//         // Crea un elemento nav e una lista non ordinata
//         const nav = document.createElement('nav');
//         const ul = document.createElement('ul');

//         this.sections.forEach(section => {
//           // Se la sezione non ha un id, lo genera a partire dal testo del titolo
//           if (!section.id) {
//             section.id = section.querySelector('h2, h3').textContent.trim().toLowerCase().replace(/\s+/g, '-');
//           }
//           const li = document.createElement('li');
//           const a = document.createElement('a');
//           a.href = '#' + section.id;
//           a.textContent = section.querySelector('h2, h3').textContent;
//           li.appendChild(a);
//           ul.appendChild(li);
//         });
//         nav.appendChild(ul);
//         this.appendChild(nav);
//       }

//       setupObserver() {
//         const options = {
//           root: null, // viewport
//           rootMargin: '0px',
//           threshold: 0.5 // Modifica il valore in base alle esigenze
//         };
//         this._observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             const id = entry.target.id;
//             const navLink = this.querySelector(`a[href="#${id}"]`);
//             if (entry.isIntersecting) {
//               this.clearActive();
//               if (navLink && navLink.parentElement) {
//                 navLink.parentElement.classList.add('active');
//               }
//             }
//           });
//         }, options);

//         // Osserva ogni sezione individuata
//         this.sections.forEach(section => this._observer.observe(section));
//       }

//       clearActive() {
//         const activeItems = this.querySelectorAll('li.active');
//         activeItems.forEach(item => item.classList.remove('active'));
//       }

//       disconnectedCallback() {
//         if (this._observer) {
//           this._observer.disconnect();
//         }
//       }
//     }

//     // Registra il custom element
//     customElements.define('scroll-spy', ScrollSpy);
//   </script>
// </body>
// </html>
