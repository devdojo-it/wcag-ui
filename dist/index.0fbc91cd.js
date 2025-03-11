// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cKNkg":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "6e8a5cd20fbc91cd";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"fFaKF":[function(require,module,exports,__globalThis) {
var _button = require("@wcag-ui/button");
console.log('Hello, world!');

},{"@wcag-ui/button":"gD8OK"}],"gD8OK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Button", ()=>Button);
var _core = require("@wcag-ui/core");
var _buttonCss = require("./styles/button.css");
var _buttonAttributes = require("./button.attributes");
var _buttonAttributesDefault = parcelHelpers.interopDefault(_buttonAttributes);
var _buttonEvents = require("./button.events");
var _buttonEventsDefault = parcelHelpers.interopDefault(_buttonEvents);
class Button extends HTMLButtonElement {
    static name = "wcag-button";
    static extends = "button";
    static attributes = (0, _buttonAttributesDefault.default);
    static events = (0, _buttonEventsDefault.default);
    static{
        (0, _core.componentDecorator)("Button", Button);
    }
    constructor(){
        super();
        this.initialize();
    }
    initialize() {
        !this.hasAttribute("type") && this.setAttribute("type", "button");
        !this.hasAttribute("role") && this.setAttribute("role", "button");
    }
}

},{"@wcag-ui/core":"15LSd","./button.attributes":"4k1xP","./button.events":"swMO0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./styles/button.css":"fgr5A"}],"15LSd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-js/core");
var _string = require("@wcag-js/string");
var _polyfills = require("./polyfills");
var _decorator = require("./decorator");
parcelHelpers.exportAll(_decorator, exports);
"use strict";
console.log("encodeBase64", (0, _core.encodeBase64)("Hello, world!"), (0, _core.encodeBase64)("Hello, world!") === "SGVsbG8lMkMlMjB3b3JsZCE=");
console.log("decodeBase64", (0, _core.decodeBase64)("SGVsbG8lMkMlMjB3b3JsZCE="), (0, _core.decodeBase64)("SGVsbG8lMkMlMjB3b3JsZCE=") === "Hello, world!");
console.log("jsonToBase64", (0, _core.jsonToBase64)({
    hello: "world"
}), (0, _core.jsonToBase64)({
    hello: "world"
}) === "JTdCJTIyaGVsbG8lMjIlM0ElMjJ3b3JsZCUyMiU3RA==");

},{"@wcag-js/core":"brvBL","@wcag-js/string":"iTy4d","./polyfills":"d4bp0","./decorator":"bqixL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"brvBL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("./helpers");
parcelHelpers.exportAll(_helpers, exports);
"use strict";

},{"./helpers":"k0rHY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k0rHY":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _trueTypeOf = require("./_trueTypeOf");
parcelHelpers.exportAll(_trueTypeOf, exports);
var _asserts = require("./_asserts");
parcelHelpers.exportAll(_asserts, exports);
var _debounce = require("./_debounce");
parcelHelpers.exportAll(_debounce, exports);
var _throttle = require("./_throttle");
parcelHelpers.exportAll(_throttle, exports);
var _file = require("./_file");
parcelHelpers.exportAll(_file, exports);
var _md5 = require("./_md5");
parcelHelpers.exportAll(_md5, exports);
var _base64 = require("./_base64");
parcelHelpers.exportAll(_base64, exports);
var _jwt = require("./_jwt");
parcelHelpers.exportAll(_jwt, exports);
var _cookieStorage = require("./_cookieStorage");
parcelHelpers.exportAll(_cookieStorage, exports);

},{"./_trueTypeOf":"65CNv","./_asserts":"9q0WX","./_debounce":"eWgEn","./_throttle":"gKjxB","./_file":"c3cvo","./_md5":"dYwY3","./_base64":"h8jUk","./_jwt":"27mJC","./_cookieStorage":"3gbP2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"65CNv":[function(require,module,exports,__globalThis) {
/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String} The object type
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "trueTypeOf", ()=>trueTypeOf);
parcelHelpers.export(exports, "isNull", ()=>isNull);
parcelHelpers.export(exports, "isUndefined", ()=>isUndefined);
parcelHelpers.export(exports, "isNullOrUndefined", ()=>isNullOrUndefined);
parcelHelpers.export(exports, "isObject", ()=>isObject);
parcelHelpers.export(exports, "isSymbol", ()=>isSymbol);
parcelHelpers.export(exports, "isFunction", ()=>isFunction);
parcelHelpers.export(exports, "isBoolean", ()=>isBoolean);
parcelHelpers.export(exports, "isNumber", ()=>isNumber);
parcelHelpers.export(exports, "isDate", ()=>isDate);
parcelHelpers.export(exports, "isString", ()=>isString);
parcelHelpers.export(exports, "isRegExp", ()=>isRegExp);
parcelHelpers.export(exports, "isArray", ()=>isArray);
const trueTypeOf = (obj)=>Object.prototype.toString.call(obj).slice(8, -1);
const isNull = (any)=>{
    return trueTypeOf(any) === "Null";
};
const isUndefined = (any)=>{
    return trueTypeOf(any) === "Undefined";
};
const isNullOrUndefined = (any)=>{
    return isNull(any) || isUndefined(any);
};
const isObject = (any)=>{
    return trueTypeOf(any) === "Object";
};
const isSymbol = (any)=>{
    return trueTypeOf(any) === "Symbol";
};
const isFunction = (any)=>{
    return trueTypeOf(any) === "Function";
};
const isBoolean = (any)=>{
    return trueTypeOf(any) === "Boolean";
};
const isNumber = (any)=>{
    return trueTypeOf(any) === "Number";
};
const isDate = (any)=>{
    return trueTypeOf(any) === "Date";
};
const isString = (any)=>{
    return trueTypeOf(any) === "String";
};
const isRegExp = (any)=>{
    return trueTypeOf(any) === "RegExp";
};
const isArray = (any)=>{
    return trueTypeOf(any) === "Array";
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"9q0WX":[function(require,module,exports,__globalThis) {
/**
 *
 *
 * @export
 * @class Asserts
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Asserts", ()=>Asserts);
class Asserts {
    static _checkAssert(assert, safe = false) {
        if (!!assert) {
            if (assert instanceof Function) {
                // if safe a try catch will be executed
                if (!!safe) try {
                    return assert();
                } catch (e) {
                    return false;
                }
                return assert();
            }
            return assert;
        }
        return false;
    }
    /**
   * Check for every assert to be true
   *
   * @static
   * @param {any} [asserts=[]] - array of asserts (can be boolean, strings, functions, whatever you want ;-)
   * @param {boolean} [safe=false] - executes asserts in a safe mode (try/catch)
   * @returns boolean
   *
   * @memberOf Asserts
   */ static all(asserts = [], safe = false) {
        return asserts.every((assert)=>{
            return Asserts._checkAssert(assert, safe);
        });
    }
    /**
   * Check for at least one assert to be true
   *
   * @static
   * @param {any} [asserts=[]] - array of asserts (can be boolean, strings, functions, whatever you want ;-)
   * @param {boolean} [safe=false] - executes asserts in a safe mode (try/catch)
   * @returns boolean
   *
   * @memberOf Asserts
   */ static one(asserts = [], safe = false) {
        return asserts.some((assert)=>{
            return Asserts._checkAssert(assert, safe);
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eWgEn":[function(require,module,exports,__globalThis) {
/**
 * decodes a base64 string into a Json parsed object
 *
 * @param {string} s - the given string
 * @return {object}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debounce", ()=>debounce);
function debounce(callback, threshold = 300) {
    let debounce1;
    return (...args)=>{
        clearTimeout(debounce1);
        debounce1 = setTimeout(()=>{
            callback.apply(this, args);
        }, threshold);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gKjxB":[function(require,module,exports,__globalThis) {
/**
 * Handles callback function throttling
 *
 * @param {Function} callback
 * @param {number} [threshold=300]
 * @return {Function} the throttled function
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "throttle", ()=>throttle);
function throttle(callback, threshold = 300) {
    let throttlePause;
    return (...args)=>{
        if (throttlePause) return;
        throttlePause = true;
        setTimeout(()=>{
            callback.apply(this, args);
            throttlePause = false;
        }, threshold);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c3cvo":[function(require,module,exports,__globalThis) {
// fileArrayOrList: File[] | FileList
// returns a FileList instance
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildFileList", ()=>buildFileList);
parcelHelpers.export(exports, "buildFileArray", ()=>buildFileArray);
const buildFileList = (fileArrayOrList)=>{
    if (fileArrayOrList instanceof FileList) return fileArrayOrList;
    const dataTransfer = new DataTransfer();
    for (const file of fileArrayOrList)dataTransfer.items.add(file);
    return dataTransfer.files;
};
const buildFileArray = (fileArrayOrList)=>{
    if (fileArrayOrList instanceof Array) return fileArrayOrList;
    return Array.from(fileArrayOrList);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dYwY3":[function(require,module,exports,__globalThis) {
// https://www.exeideas.com/2021/12/javascript-md5-function.html
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "md5", ()=>md5);
const md5 = function(string) {
    function RotateLeft(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
    }
    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 0x80000000;
        lY8 = lY & 0x80000000;
        lX4 = lX & 0x40000000;
        lY4 = lY & 0x40000000;
        lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
        if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
            else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
        } else return lResult ^ lX8 ^ lY8;
    }
    function F(x, y, z) {
        return x & y | ~x & z;
    }
    function G(x, y, z) {
        return x & z | y & ~z;
    }
    function H(x, y, z) {
        return x ^ y ^ z;
    }
    function I(x, y, z) {
        return y ^ (x | ~z);
    }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while(lByteCount < lMessageLength){
            lWordCount = (lByteCount - lByteCount % 4) / 4;
            lBytePosition = lByteCount % 4 * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
            lByteCount++;
        }
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    function WordToHex(lValue) {
        var WordToHexValue = '', WordToHexValue_temp = '', lByte, lCount;
        for(lCount = 0; lCount <= 3; lCount++){
            lByte = lValue >>> lCount * 8 & 255;
            WordToHexValue_temp = '0' + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for(var n = 0; n < string.length; n++){
            var c = string.charCodeAt(n);
            if (c < 128) utftext += String.fromCharCode(c);
            else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }
        return utftext;
    }
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;
    for(k = 0; k < x.length; k += 16){
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
        b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
        a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
        c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
        c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
        a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
        a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
        a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
        a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
        c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
        c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
        b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
        c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
        d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
        c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
        a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
        d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
        b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h8jUk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "encodeBase64", ()=>encodeBase64);
parcelHelpers.export(exports, "decodeBase64", ()=>decodeBase64);
parcelHelpers.export(exports, "jsonToBase64", ()=>jsonToBase64);
parcelHelpers.export(exports, "base64ToJson", ()=>base64ToJson);
var _trueTypeOf = require("./_trueTypeOf");
const encodeBase64 = (s)=>{
    if (!(0, _trueTypeOf.isString)(s)) throw new Error("@wcag-js/core error, encodeBase64: the provided parameter is not a valid string");
    return btoa(encodeURIComponent(s));
};
const decodeBase64 = (s)=>{
    if (!(0, _trueTypeOf.isString)(s)) throw new Error("@wcag-js/core error, decodeBase64: the provided parameter is not a valid string");
    return decodeURIComponent(atob(s));
};
const jsonToBase64 = (o)=>{
    if (!(0, _trueTypeOf.isObject)(o)) throw new Error("@wcag-js/core error, jsonToBase64: the provided parameter is not a valid object");
    return encodeBase64(JSON.stringify(o));
};
const base64ToJson = (s)=>{
    if (!(0, _trueTypeOf.isString)(s)) throw new Error("@wcag-js/core error, base64ToJson: the provided parameter is not a valid string");
    return JSON.parse(decodeBase64(s));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./_trueTypeOf":"65CNv"}],"27mJC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseJWT", ()=>parseJWT);
const parseJWT = (token)=>{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3gbP2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CookieStorage", ()=>CookieStorage);
class CookieStorage {
    // Imposta un cookie
    static setItem(key, value, days = 7) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }
    // Ottiene il valore di un cookie
    static getItem(key) {
        return document.cookie.split('; ').find((row)=>row.startsWith(`${encodeURIComponent(key)}=`))?.split('=')[1] || null;
    }
    // Rimuove un cookie
    static removeItem(key) {
        document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    // Pulisce tutti i cookie
    static clear() {
        document.cookie.split(';').forEach((cookie)=>{
            document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
    }
}
Object.defineProperty(self, 'cookieStorage', {
    value: CookieStorage,
    configurable: false,
    enumerable: false,
    writable: false
}); // // Uso della classe CookieStorage
 // const storage = new CookieStorage();
 // // Imposta un cookie
 // storage.setItem('user', 'John Doe');
 // // Ottiene un cookie
 // console.log(storage.getItem('user')); // Output: John Doe
 // // Rimuove un cookie
 // storage.removeItem('user');
 // // Pulisce tutti i cookie
 // storage.clear();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iTy4d":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _static = require("./_static");
var _staticDefault = parcelHelpers.interopDefault(_static);
var _prototype = require("./_prototype");
var _prototypeDefault = parcelHelpers.interopDefault(_prototype);
Object.defineProperties(String, (0, _staticDefault.default));
Object.defineProperties(String.prototype, (0, _prototypeDefault.default));

},{"./_static":"dm644","./_prototype":"3GZlE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dm644":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-js/core");
exports.default = {
    /**
   * checks if "something" is a string
   *
   * @example <caption>eg. usage</caption>
   * const x = 'hi';
   * const y = new Date();
   *
   * console.log(String.isString(x)); // true
   * console.log(String.isString(y)); // false
   * @memberOf string
   * @method isString()
   * @param {any} s - the provided "something"
   * @return {boolean}
   */ isString: {
        value (s) {
            return (0, _core.isString)(s);
        },
        writable: false,
        configurable: true,
        enumerable: false
    },
    guid: {
        value () {
            return `${Math.random().toString(16).slice(2, 10)}-${Math.random().toString(16).slice(2, 6)}-4${Math.random().toString(16).slice(2, 5)}-${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 14)}`;
        },
        writable: false,
        configurable: true,
        enumerable: false
    },
    capitalize: {
        configurable: true,
        enumerable: false,
        writable: true,
        value (s) {
            return String.isString(s) && String.prototype.capitalize.call(s);
        }
    },
    camelize: {
        configurable: true,
        enumerable: false,
        writable: true,
        value (s) {
            return String.isString(s) && String.prototype.camelize.call(s);
        }
    },
    toBoolean: {
        configurable: true,
        enumerable: false,
        writable: true,
        value (s) {
            return String.isString(s) && String.prototype.toBoolean.call(s);
        }
    }
};

},{"@wcag-js/core":"brvBL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3GZlE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    /**
   * Capitalizes a string
   *
   * @example <caption>eg. usage</caption>
   * const x = 'hi';
   *
   * console.log(x); // hi
   * console.log(x.capitalize()); // Hi
   * @memberOf string
   * @method capitalize()
   * @return {string}
   */ capitalize: {
        value () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        writable: false,
        configurable: true,
        enumerable: false
    },
    camelize: {
        value () {
            return this.toLowerCase() // Convertiamo tutto in minuscolo
            .replace(/[-_\s]+(.)?/g, (match, chr)=>chr ? chr.toUpperCase() : "") // Rimuoviamo delimitatori e capitalizziamo la lettera successiva
            .replace(/^(.)/, (match, chr)=>chr.toLowerCase()); // Assicuriamo che la prima lettera sia minuscola
        },
        writable: false,
        configurable: true,
        enumerable: false
    },
    toBoolean: {
        value () {
            // TODO: handle returning undefined when this is not a boolean string ('true','false','0','1'...)
            return /^\s*(true|1|on|yes)\s*$/i.test(this);
        },
        writable: false,
        configurable: true,
        enumerable: false
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d4bp0":[function(require,module,exports,__globalThis) {
var _customElements = require("./_customElements");

},{"./_customElements":"apIms"}],"apIms":[function(require,module,exports,__globalThis) {
"use strict";
/* Inspired by (c) Andrea Giammarchi @webreflection ISC https://github.com/WebReflection/custom-elements-builtin */ /* 
  check the fix I did on line 283 changing HTMLBuiltin 
  with HTMLElement for debugging purposes
*/ (function() {
    var attributesObserver = (whenDefined, MutationObserver1)=>{
        const attributeChanged = (records)=>{
            for (const record of records)dispatch(record);
        };
        const dispatch = ({ target, attributeName, oldValue })=>{
            target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
        };
        return (target, is)=>{
            const { observedAttributes: attributeFilter } = target.constructor;
            if (attributeFilter) whenDefined(is).then(()=>{
                new MutationObserver1(attributeChanged).observe(target, {
                    attributes: true,
                    attributeOldValue: true,
                    attributeFilter
                });
                for (const attributeFilterItem of attributeFilter)target.hasAttribute(attributeFilterItem) && dispatch({
                    target,
                    attributeName: attributeFilterItem,
                    oldValue: null
                });
            });
            return target;
        };
    };
    const { keys } = Object;
    const expando = (element)=>{
        const key = keys(element);
        const value = [];
        const ignore = new Set();
        const { length } = key;
        for(let i = 0; i < length; i++){
            value[i] = element[key[i]];
            try {
                delete element[key[i]];
            } catch (SafariTP) {
                ignore.add(i);
            }
        }
        return ()=>{
            for(let i = 0; i < length; i++)ignore.has(i) || (element[key[i]] = value[i]);
        };
    };
    /*! (c) Andrea Giammarchi - ISC */ const QSA$1 = "querySelectorAll";
    /**
   * Start observing a generic document or root element.
   * @param {(node:Element, connected:boolean) => void} callback triggered per each dis/connected element
   * @param {Document|Element} [root=document] by default, the global document to observe
   * @param {Function} [MO=MutationObserver] by default, the global MutationObserver
   * @param {string[]} [query=['*']] the selectors to use within nodes
   * @returns {MutationObserver}
   */ const notify = (callback, root = document, MO = MutationObserver, query = [
        "*"
    ])=>{
        const loop = (nodes, selectors, added, removed, connected, pass)=>{
            for (const node of nodes)if (pass || QSA$1 in node) {
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
                if (!pass) loop(node[QSA$1](selectors), selectors, added, removed, connected, true);
            }
        };
        const mo = new MO((records)=>{
            if (query.length) {
                const selectors = query.join(",");
                const added = new Set();
                const removed = new Set();
                for (const { addedNodes, removedNodes } of records){
                    loop(removedNodes, selectors, added, removed, false, false);
                    loop(addedNodes, selectors, added, removed, true, false);
                }
            }
        });
        const { observe } = mo;
        (mo.observe = (node)=>observe.call(mo, node, {
                subtree: true,
                childList: true
            }))(root);
        return mo;
    };
    const QSA = "querySelectorAll";
    const { document: document$2, Element: Element$1, MutationObserver: MutationObserver$2, Set: Set$2, WeakMap: WeakMap$1 } = self;
    const elements = (element)=>QSA in element;
    const { filter } = [];
    var qsaObserver = (options)=>{
        const live = new WeakMap$1();
        const drop = (elements)=>{
            for (const element of elements)live.delete(element);
        };
        const flush = ()=>{
            const records = observer.takeRecords();
            for (const record of records){
                parse(filter.call(record.removedNodes, elements), false);
                parse(filter.call(record.addedNodes, elements), true);
            }
        };
        const matches = (element)=>element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
        const notifier = (element, connected)=>{
            let selectors;
            if (connected) {
                for(let q, m = matches(element), i = 0, { length } = query; i < length; i++)if (m.call(element, q = query[i])) {
                    !live.has(element) && live.set(element, new Set$2());
                    selectors = live.get(element);
                    if (!selectors.has(q)) {
                        selectors.add(q);
                        options.handle(element, connected, q);
                    }
                }
            } else if (live.has(element)) {
                selectors = live.get(element);
                live.delete(element);
                for (const selector of selectors)options.handle(element, connected, selector);
            }
        };
        const parse = (elements, connected = true)=>{
            for (const element of elements)notifier(element, connected);
        };
        const { query } = options;
        const root = options.root || document$2;
        const observer = notify(notifier, root, MutationObserver$2, query);
        const { attachShadow } = Element$1.prototype;
        if (attachShadow) Element$1.prototype.attachShadow = function(init) {
            const shadowRoot = attachShadow.call(this, init);
            observer.observe(shadowRoot);
            return shadowRoot;
        };
        query.length && parse(root[QSA](query));
        return {
            drop,
            flush,
            observer,
            parse
        };
    };
    const { customElements, document: document$1, Element, MutationObserver: MutationObserver$1, Object: Object$1, Promise: Promise$1, Map, Set: Set$1, WeakMap, Reflect } = self;
    const { createElement } = document$1;
    const { define, get, upgrade } = customElements;
    const { construct } = Reflect || {
        construct (HTMLElement) {
            return HTMLElement.call(this);
        }
    };
    const { defineProperty, getOwnPropertyNames, setPrototypeOf } = Object$1;
    const shadowRoots = new WeakMap();
    const shadows = new Set$1();
    const classes = new Map();
    const defined = new Map();
    const prototypes = new Map();
    const registry = new Map();
    const shadowed = [];
    const query = [];
    const getCE = (is)=>registry.get(is) || get.call(customElements, is);
    const handle = (element, connected, selector)=>{
        const proto = prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
            const redefine = expando(element);
            override = setPrototypeOf(element, proto);
            try {
                new proto.constructor();
            } finally{
                override = null;
                redefine();
            }
        }
        const method = `${connected ? "" : "dis"}connectedCallback`;
        if (method in proto) element[method]();
    };
    const { parse } = qsaObserver({
        query,
        handle
    });
    const { parse: parseShadowed } = qsaObserver({
        query: shadowed,
        handle (element, connected) {
            if (shadowRoots.has(element)) {
                connected ? shadows.add(element) : shadows.delete(element);
                query.length && parseShadow.call(query, element);
            }
        }
    });
    // qsaObserver also patches attachShadow
    // be sure this runs *after* that
    const { attachShadow } = Element.prototype;
    if (attachShadow) Element.prototype.attachShadow = function(init) {
        const root = attachShadow.call(this, init);
        shadowRoots.set(this, root);
        return root;
    };
    const whenDefined = (name)=>{
        if (!defined.has(name)) {
            let _;
            let $ = new Promise$1(($)=>{
                _ = $;
            });
            defined.set(name, {
                $,
                _
            });
        }
        return defined.get(name).$;
    };
    const augment = attributesObserver(whenDefined, MutationObserver$1);
    let override = null;
    getOwnPropertyNames(self).filter((k)=>/^HTML.*Element$/.test(k)).forEach((k)=>{
        const HTMLElement = self[k];
        function HTMLBuiltIn() {
            const { constructor } = this;
            if (!classes.has(constructor)) throw new TypeError("Illegal constructor");
            const { is, tag } = classes.get(constructor);
            if (is) {
                if (override) return augment(override, is);
                const element = createElement.call(document$1, tag);
                element.setAttribute("is", is);
                return augment(setPrototypeOf(element, constructor.prototype), is);
            }
            return construct.call(this, HTMLElement, [], constructor);
        }
        setPrototypeOf(HTMLBuiltIn, HTMLElement);
        defineProperty(HTMLBuiltIn.prototype = HTMLElement.prototype, "constructor", {
            value: HTMLElement
        });
        defineProperty(self, k, {
            value: HTMLBuiltIn
        });
    });
    document$1.createElement = function(name, options) {
        const is = options && options.is;
        if (is) {
            const Class = registry.get(is);
            if (Class && classes.get(Class).tag === name) return new Class();
        }
        const element = createElement.call(document$1, name);
        is && element.setAttribute("is", is);
        return element;
    };
    customElements.get = getCE;
    customElements.whenDefined = whenDefined;
    customElements.upgrade = function(element) {
        const is = element.getAttribute("is");
        if (is) {
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
    customElements.define = function(is, Class, options) {
        if (getCE(is)) throw new Error(`'${is}' has already been defined as a custom element`);
        let selector;
        const tag = options && options.extends;
        classes.set(Class, tag ? {
            is,
            tag
        } : {
            is: "",
            tag: is
        });
        if (tag) {
            selector = `${tag}[is="${is}"]`;
            prototypes.set(selector, Class.prototype);
            registry.set(is, Class);
            query.push(selector);
        } else {
            define.apply(customElements, arguments);
            shadowed.push(selector = is);
        }
        whenDefined(is).then(()=>{
            if (tag) {
                parse(document$1.querySelectorAll(selector));
                shadows.forEach(parseShadow, [
                    selector
                ]);
            } else parseShadowed(document$1.querySelectorAll(selector));
        });
        defined.get(is)._(Class);
    };
    function parseShadow(element) {
        const root = shadowRoots.get(element);
        parse(root.querySelectorAll(this), element.isConnected);
    }
})();

},{}],"bqixL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "componentDecorator", ()=>componentDecorator);
var _applyComponentMixins = require("./_applyComponentMixins");
var _assertMetaKey = require("./_assertMetaKey");
var _defineCustomElement = require("./_defineCustomElement");
var _exposeComponent = require("./_exposeComponent");
function componentDecorator(componentName, component) {
    (0, _assertMetaKey.assertMetaKey)(component, "name");
    (0, _defineCustomElement.defineCustomElement)(component);
    (0, _applyComponentMixins.applyMixinsToComponent)(component);
    (0, _exposeComponent.exposeComponent)(componentName, component);
}

},{"./_applyComponentMixins":"8rHtq","./_assertMetaKey":"kBJer","./_defineCustomElement":"7wGux","./_exposeComponent":"avP6q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8rHtq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyMixinsToComponent", ()=>applyMixinsToComponent);
var _buildHandlers = require("./_buildHandlers");
var _buildLifecycleMethods = require("./_buildLifecycleMethods");
function applyMixinsToComponent(component) {
    Object.assign(component.prototype, component.attributes && {
        ...(0, _buildHandlers.buildAttributeHandlers)(component.attributes)
    }, component.events && {
        ...(0, _buildHandlers.buildEventHandlers)(component.events)
    }, (0, _buildLifecycleMethods.buildLifecycleMethods)(component));
    component.attributes && Object.defineProperty(component, "observedAttributes", {
        get: ()=>Object.keys(component.attributes)
    });
}

},{"./_buildHandlers":"35mh3","./_buildLifecycleMethods":"1Iw3W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"35mh3":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildHandlers", ()=>buildHandlers);
parcelHelpers.export(exports, "buildEventHandlers", ()=>buildEventHandlers);
parcelHelpers.export(exports, "buildAttributeHandlers", ()=>buildAttributeHandlers);
function buildHandlers(attributesOrEvents, methodSuffix = "") {
    return Object.entries(attributesOrEvents).reduce((acc, item)=>{
        acc[`on${item[0].capitalize()}${methodSuffix}`] = item[1];
        return acc;
    }, {});
}
function buildEventHandlers(componentEvents) {
    return buildHandlers(componentEvents);
}
function buildAttributeHandlers(componentAttributes) {
    return buildHandlers(componentAttributes, "Change");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Iw3W":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildLifecycleMethods", ()=>buildLifecycleMethods);
function buildLifecycleMethods(component) {
    return {
        handleEvent (e) {
            this[`on${e.type.capitalize()}`](e);
        },
        attributeChangedCallback (name, oldValue, newValue) {
            this[`on${name.capitalize()}Change`]?.(oldValue, newValue);
        },
        connectedCallback () {
            for (const event of Object.keys(component.events))this.addEventListener(event, this);
        },
        disconnectedCallback () {
            for (const event of Object.keys(component.events))this.removeEventListener(event, this);
        }
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kBJer":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "assertMetaKey", ()=>assertMetaKey);
function assertMetaKey(component, key) {
    if (!component[key]) throw new Error(`The meta ${key} is required for the wcagUI component: ${component}`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7wGux":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defineCustomElement", ()=>defineCustomElement);
var _buildExtendOptions = require("./_buildExtendOptions");
function defineCustomElement(component) {
    !!customElements && !customElements.get(component.name) && customElements.define(component.name, component, (0, _buildExtendOptions.buildExtendOptions)(component));
}

},{"./_buildExtendOptions":"izmJR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"izmJR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildExtendOptions", ()=>buildExtendOptions);
function buildExtendOptions(mixins) {
    return mixins.extends ? {
        extends: mixins.extends
    } : undefined;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"avP6q":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "exposeComponent", ()=>exposeComponent);
function exposeComponent(componentName, component) {
    // TODO: check if possibile to extract componentName from component
    Object.assign(self, {
        wcagUI: {
            ...self.wcagUI,
            [componentName]: component
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4k1xP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    disabled: function(oldValue, newValue) {
        console.log("disabled changed", oldValue, newValue, this.textContent);
    },
    christian: function(oldValue, newValue) {
        console.log("christian changed", oldValue, newValue, this.textContent);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"swMO0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    click: function(e) {
        console.log("button clicked", this.textContent);
    },
    focus: function(e) {
        console.log("button focused", this.textContent);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fgr5A":[function() {},{}]},["cKNkg","fFaKF"], "fFaKF", "parcelRequire94c2")

//# sourceMappingURL=index.0fbc91cd.js.map
