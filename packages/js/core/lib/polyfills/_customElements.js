/* Inspired by (c) Andrea Giammarchi @webreflection ISC https://github.com/WebReflection/custom-elements-builtin */

/* 
  check the fix I did on line 283 changing HTMLBuiltin 
  with HTMLElement for debugging purposes
*/
(() => {
  var attributesObserver = (whenDefined, MutationObserver) => {
    const attributeChanged = (records) => {
      for (const record of records) {
        dispatch(record);
      }
    };

    const dispatch = ({ target, attributeName, oldValue }) => {
      target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
    };

    return (target, is) => {
      const { observedAttributes: attributeFilter } = target.constructor;

      if (attributeFilter) {
        whenDefined(is).then(() => {
          new MutationObserver(attributeChanged).observe(target, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter,
          });

          for (const attributeFilterItem of attributeFilter) {
            target.hasAttribute(attributeFilterItem) &&
              dispatch({ target, attributeName: attributeFilterItem, oldValue: null });
          }
        });
      }

      return target;
    };
  };

  const { keys } = Object;

  const expando = (element) => {
    const key = keys(element);
    const value = [];
    const ignore = new Set();
    const { length } = key;

    for (let i = 0; i < length; i++) {
      value[i] = element[key[i]];

      try {
        delete element[key[i]];
      } catch {
        // Safari TP
        ignore.add(i);
      }
    }

    return () => {
      for (let i = 0; i < length; i++) ignore.has(i) || (element[key[i]] = value[i]);
    };
  };

  /*! (c) Andrea Giammarchi - ISC */

  /**
   * @callback TLifecycleCallback
   * @param {Element} node
   * @param {boolean} connected
   * @returns {void}
   */

  /**
  /**
   * Start observing a generic document or root element.
   * @param {TLifecycleCallback} callback triggered per each dis/connected element
   * @param {Document|Element} [root=document] by default, the global document to observe
   * @param {Function} [MO=MutationObserver] by default, the global MutationObserver
   * @param {string[]} [query=['*']] the selectors to use within nodes
   * @returns {MutationObserver}
   */
  const notify = (callback, root = document, MO = MutationObserver, query = ['*']) => {
    const loop = (nodes, selectors, added, removed, connected, pass) => {
      for (const node of nodes) {
        if (pass || 'querySelectorAll' in node) {
          if (connected) {
            if (!added.has(node)) {
              added.add(node);
              removed.delete(node);
              callback(node, connected);
            }
          } else if (!removed.has(node)) {
            removed.add(node);
            added.delete(node);
            callback(node, connected);
          }

          if (!pass) loop(node.querySelectorAll(selectors), selectors, added, removed, connected, true);
        }
      }
    };

    const mo = new MO((records) => {
      if (query.length) {
        const selectors = query.join(',');
        const added = new Set();
        const removed = new Set();

        for (const { addedNodes, removedNodes } of records) {
          loop(removedNodes, selectors, added, removed, false, false);
          loop(addedNodes, selectors, added, removed, true, false);
        }
      }
    });

    const { observe } = mo;
    (mo.observe = (node) => observe.call(mo, node, { subtree: true, childList: true }))(root);

    return mo;
  };

  const QSA = 'querySelectorAll';

  const elements = (element) => QSA in element;
  const { filter } = [];

  var qsaObserver = (options) => {
    const live = new WeakMap();

    const drop = (elements) => {
      for (const element of elements) live.delete(element);
    };

    const flush = () => {
      const records = observer.takeRecords();

      for (const record of records) {
        parse(filter.call(record.removedNodes, elements), false);
        parse(filter.call(record.addedNodes, elements), true);
      }
    };
    const matches = (element) => element.matches || element.webkitMatchesSelector || element.msMatchesSelector;

    const notifier = (element, connected) => {
      let selectors;

      if (connected) {
        for (let q, m = matches(element), i = 0, { length } = query; i < length; i++) {
          if (m.call(element, (q = query[i]))) {
            !live.has(element) && live.set(element, new Set());

            selectors = live.get(element);

            if (!selectors.has(q)) {
              selectors.add(q);
              options.handle(element, connected, q);
            }
          }
        }
      } else if (live.has(element)) {
        selectors = live.get(element);
        live.delete(element);

        for (const selector of selectors) {
          options.handle(element, connected, selector);
        }
      }
    };

    const parse = (elements, connected = true) => {
      for (const element of elements) notifier(element, connected);
    };

    const { query } = options;
    const root = options.root || document;
    const observer = notify(notifier, root, MutationObserver, query);
    const { attachShadow } = Element.prototype;

    if (attachShadow)
      Element.prototype.attachShadow = function (init) {
        const shadowRoot = attachShadow.call(this, init);
        observer.observe(shadowRoot);

        return shadowRoot;
      };

    query.length && parse(root[QSA](query));

    return { drop, flush, observer, parse };
  };

  const { createElement } = document;
  const { define, get, upgrade } = customElements;

  const { construct } = Reflect || {
    construct(HTMLElement) {
      return HTMLElement.call(this);
    },
  };

  const { defineProperty, getOwnPropertyNames, setPrototypeOf } = Object;

  const shadowRoots = new WeakMap();
  const shadows = new Set();

  const classes = new Map();
  const defined = new Map();
  const prototypes = new Map();
  const registry = new Map();

  const shadowed = [];
  const query = [];

  const getCE = (is) => registry.get(is) || get.call(customElements, is);

  const handle = (element, connected, selector) => {
    const proto = prototypes.get(selector);

    // biome-ignore lint/suspicious/noPrototypeBuiltins: <this is needed to make the polyfill work>
    if (connected && !proto.isPrototypeOf(element)) {
      const redefine = expando(element);
      override = setPrototypeOf(element, proto);
      try {
        new proto.constructor();
      } finally {
        override = null;
        redefine();
      }
    }

    const method = `${connected ? '' : 'dis'}connectedCallback`;

    if (method in proto) element[method]();
  };

  const { parse } = qsaObserver({ query, handle });

  const { parse: parseShadowed } = qsaObserver({
    query: shadowed,
    handle(element, connected) {
      if (shadowRoots.has(element)) {
        connected ? shadows.add(element) : shadows.delete(element);

        query.length && parseShadow.call(query, element);
      }
    },
  });

  // qsaObserver also patches attachShadow
  // be sure this runs *after* that
  const { attachShadow } = Element.prototype;

  if (attachShadow)
    Element.prototype.attachShadow = function (init) {
      const root = attachShadow.call(this, init);
      shadowRoots.set(this, root);

      return root;
    };

  const whenDefined = (name) => {
    if (!defined.has(name)) {
      let _;
      const $ = new Promise(($) => {
        _ = $;
      });

      defined.set(name, { $, _ });
    }

    return defined.get(name).$;
  };

  const augment = attributesObserver(whenDefined, MutationObserver);

  let override = null;

  getOwnPropertyNames(self)
    .filter((k) => /^HTML.*Element$/.test(k))
    .forEach((k) => {
      const HTMLElement = self[k];

      function HTMLBuiltIn() {
        // biome-ignore lint/suspicious/noShadowRestrictedNames: <this is needed to make the polyfill work>
        const { constructor } = this;

        if (!classes.has(constructor)) throw new TypeError('Illegal constructor');

        const { is, tag } = classes.get(constructor);

        if (is) {
          if (override) return augment(override, is);

          const element = createElement.call(document, tag);
          element.setAttribute('is', is);

          return augment(setPrototypeOf(element, constructor.prototype), is);
        }

        return construct.call(this, HTMLElement, [], constructor);
      }

      setPrototypeOf(HTMLBuiltIn, HTMLElement);

      defineProperty((HTMLBuiltIn.prototype = HTMLElement.prototype), 'constructor', {
        value: HTMLElement,
      });

      defineProperty(self, k, { value: HTMLBuiltIn });
    });

  document.createElement = (name, options) => {
    const is = options?.is;

    if (is) {
      const Class = registry.get(is);

      if (Class && classes.get(Class).tag === name) return new Class();
    }

    const element = createElement.call(document, name);

    is && element.setAttribute('is', is);

    return element;
  };

  customElements.get = getCE;
  customElements.whenDefined = whenDefined;

  customElements.upgrade = (element) => {
    const is = element.getAttribute('is');

    if (is) {
      // biome-ignore lint/suspicious/noShadowRestrictedNames: <this is needed to make the polyfill work>
      const constructor = registry.get(is);

      if (constructor) {
        augment(setPrototypeOf(element, constructor.prototype), is);
        // apparently unnecessary because this is handled by qsa observer
        // if (element.isConnected && element.connectedCallback)
        //   element.connectedCallback();
        return;
      }
    }

    upgrade.call(customElements, element);
  };

  customElements.define = (is, Class, options) => {
    if (getCE(is)) throw new Error(`'${is}' has already been defined as a custom element`);

    let selector;
    const tag = options?.extends;

    classes.set(Class, tag ? { is, tag } : { is: '', tag: is });

    if (tag) {
      selector = `${tag}[is="${is}"]`;
      prototypes.set(selector, Class.prototype);
      registry.set(is, Class);
      query.push(selector);
    } else {
      // biome-ignore lint/complexity/noArguments: <this is needed to make the polyfill work>
      define.apply(customElements, arguments);
      shadowed.push((selector = is));
    }

    whenDefined(is).then(() => {
      if (tag) {
        parse(document.querySelectorAll(selector));
        shadows.forEach(parseShadow, [selector]);
      } else {
        parseShadowed(document.querySelectorAll(selector));
      }
    });

    defined.get(is)._(Class);
  };

  function parseShadow(element) {
    const root = shadowRoots.get(element);
    parse(root.querySelectorAll(this), element.isConnected);
  }
})();
