// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
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

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
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
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

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
    }
  }
})({"2aZ6o":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "17677af8c6396971";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
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
declare var HMR_SERVER_PORT: string;
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
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
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
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
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
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
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
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
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
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
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
    if (cssTimeout || typeof document === 'undefined') return;
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
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
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
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
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

},{}],"8JWvp":[function(require,module,exports,__globalThis) {
var _accordion = require("@wcag-ui/accordion");
var _button = require("@wcag-ui/button");
var _checkbox = require("@wcag-ui/checkbox");
var _details = require("@wcag-ui/details");
var _input = require("@wcag-ui/input");
var _radio = require("@wcag-ui/radio");
var _scrollSpy = require("@wcag-ui/scroll-spy");
var _switch = require("@wcag-ui/switch");
var _highlightJs = require("./_highlight.js");
function fixExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    for (const externalLink of externalLinks){
        externalLink.setAttribute('target', '_blank');
        externalLink.setAttribute('rel', 'noopener noreferrer');
    }
}
function handleMainMenu() {
    const mainMenu = document.querySelector('body > header nav');
    const path = location.pathname;
    mainMenu?.querySelector(`[href*="${path}"]`)?.setAttribute('active', '');
}
function handleAsideMenu() {
    const asideMenu = document.querySelector('body > aside[nav]');
    const path = location.pathname.replace('/', '');
    asideMenu?.querySelector(`[href*="${path}"]`)?.setAttribute('active', '');
    asideMenu?.querySelector(`[href*="${path}"]`)?.parentElement?.setAttribute('open', '');
}
function initColorSchemeSwitcher() {
    const sessionStorageColorScheme = sessionStorage.getItem('selected-color-scheme');
    const colorSchemeMetaElement = document.querySelector('meta[name="color-scheme"]');
    const currentColorScheme = sessionStorageColorScheme ?? colorSchemeMetaElement?.getAttribute('content') ?? 'light dark';
    colorSchemeMetaElement?.setAttribute('content', currentColorScheme);
    document.querySelector(`input[name="color-scheme"][value="${currentColorScheme}"]`).click();
    document.querySelector('body > header menu').addEventListener('change', (e)=>{
        if (e.target.getAttribute('name') === 'color-scheme') {
            colorSchemeMetaElement?.setAttribute('content', e.target.value);
            sessionStorage.setItem('selected-color-scheme', e.target.value);
        }
    });
}
addEventListener('DOMContentLoaded', ()=>{
    fixExternalLinks();
    handleMainMenu();
    handleAsideMenu();
    initColorSchemeSwitcher();
});

},{"@wcag-ui/accordion":"69RHM","@wcag-ui/button":"cqD0H","@wcag-ui/checkbox":"27xqY","@wcag-ui/details":"5ykFQ","@wcag-ui/input":"ibO7g","@wcag-ui/radio":"1zlPi","@wcag-ui/scroll-spy":"g2UEa","@wcag-ui/switch":"9fSHc","./_highlight.js":"eeY3P"}],"69RHM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * wcagUI Accordion class
 *
 * @export
 * @class Accordion
 * @extends {HTMLAccordionElement}
 */ parcelHelpers.export(exports, "Accordion", ()=>Accordion);
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _accordionCss = require("./styles/accordion.css");
var _accordionAttributes = require("./accordion.attributes");
var _accordionAttributesDefault = parcelHelpers.interopDefault(_accordionAttributes);
var _accordionEvents = require("./accordion.events");
var _accordionEventsDefault = parcelHelpers.interopDefault(_accordionEvents);
class Accordion extends HTMLElement {
    static name = "wcag-accordion";
    static extends = "section";
    static attributes = (0, _accordionAttributesDefault.default);
    static events = (0, _accordionEventsDefault.default);
    /**
   * static initialization
   *
   * @static
   * @memberof Accordion
   */ static{
        (0, _core.componentDecorator)("Accordion", Accordion);
    }
    #guid = String.guid();
    #items;
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        this.#items = this.querySelectorAll(":scope > details");
        for (const item of this.#items)item.setAttribute("name", `${this.#guid}-accordion`);
    }
}

},{"@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./styles/accordion.css":"4BAs8","./accordion.attributes":"ihwFB","./accordion.events":"4ntNW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cGTNs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "componentDecorator", ()=>(0, _decorator.componentDecorator));
parcelHelpers.export(exports, "events", ()=>(0, _events.events));
parcelHelpers.export(exports, "encoding", ()=>(0, _encoding.encoding));
parcelHelpers.export(exports, "extender", ()=>(0, _extender.extender));
parcelHelpers.export(exports, "helpers", ()=>(0, _helpers.helpers));
var _stylesCss = require("./styles/styles.css");
var _extensions = require("./extensions");
var _polyfills = require("./polyfills");
var _decorator = require("./decorator");
var _events = require("./events");
var _encoding = require("./encoding");
var _helpers = require("./helpers");
var _error = require("./_error");
var _extender = require("./_extender");
"use strict";

},{"./styles/styles.css":"5qQ72","./extensions":"5bg3g","./polyfills":"esMgz","./decorator":"b1p95","./events":"jULtC","./encoding":"ju3ra","./helpers":"fzDy5","./_error":"acf3M","./_extender":"7Sy1N","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5qQ72":[function() {},{}],"5bg3g":[function(require,module,exports,__globalThis) {
var _string = require("./string/string");

},{"./string/string":"1VJyD"}],"1VJyD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _static = require("./_static");
var _staticDefault = parcelHelpers.interopDefault(_static);
var _prototype = require("./_prototype");
var _prototypeDefault = parcelHelpers.interopDefault(_prototype);
// TODO: check already existing extension methods, and warn in the console in that case
Object.defineProperties(String, (0, _staticDefault.default));
Object.defineProperties(String.prototype, (0, _prototypeDefault.default));

},{"./_static":"3Dvvf","./_prototype":"fgg0s","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3Dvvf":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _types = require("../../helpers/_types");
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
            return (0, _types.isString)(s);
        }
    },
    guid: {
        value () {
            // TODO: check if necessary
            return `${Math.random().toString(16).slice(2, 10)}-${Math.random().toString(16).slice(2, 6)}-4${Math.random().toString(16).slice(2, 5)}-${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 14)}`;
        }
    },
    capitalize: {
        value (s) {
            return String.isString(s) && String.prototype.capitalize.call(s);
        }
    },
    camelize: {
        value (s) {
            return String.isString(s) && String.prototype.camelize.call(s);
        }
    },
    pascalize: {
        value (s) {
            return String.isString(s) && String.prototype.pascalize.call(s);
        }
    },
    stripEmojis: {
        value (s) {
            return String.isString(s) && String.prototype.stripEmojis.call(s);
        }
    },
    toBoolean: {
        value (s) {
            return String.isString(s) && String.prototype.toBoolean.call(s);
        }
    }
};

},{"../../helpers/_types":"8yMxW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8yMxW":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
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

},{}],"fgg0s":[function(require,module,exports,__globalThis) {
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
        }
    },
    camelize: {
        value () {
            return this.toLowerCase() // Convertiamo tutto in minuscolo
            .replace(/[-_\s]+(.)?/g, (match, chr)=>chr ? chr.toUpperCase() : '') // Rimuoviamo delimitatori e capitalizziamo la lettera successiva
            .replace(/^(.)/, (match, chr)=>chr.toLowerCase()); // Assicuriamo che la prima lettera sia minuscola
        }
    },
    pascalize: {
        value () {
            return this.replace(/(^|-)([a-z])/g, (match, separator, letter)=>letter.toUpperCase());
        }
    },
    stripEmojis: {
        value () {
            return this.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').replace(/\s+/g, ' ').trim();
        }
    },
    toBoolean: {
        value () {
            // TODO: handle returning undefined when this is not a boolean string ('true','false','0','1'...)
            return /^\s*(true|1|on|yes)\s*$/i.test(this);
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"esMgz":[function(require,module,exports,__globalThis) {
var _customElements = require("./_customElements");

},{"./_customElements":"6MoHo"}],"6MoHo":[function(require,module,exports,__globalThis) {
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
    /*! (c) Andrea Giammarchi - ISC */ /**
   * @callback TLifecycleCallback
   * @param {Element} node
   * @param {boolean} connected
   * @returns {void}
   */ /**
  /**
   * Start observing a generic document or root element.
   * @param {TLifecycleCallback} callback triggered per each dis/connected element
   * @param {Document|Element} [root=document] by default, the global document to observe
   * @param {Function} [MO=MutationObserver] by default, the global MutationObserver
   * @param {string[]} [query=['*']] the selectors to use within nodes
   * @returns {MutationObserver}
   */ const notify = (callback, root = document, MO = MutationObserver, query = [
        "*"
    ])=>{
        const loop = (nodes, selectors, added, removed, connected, pass)=>{
            for (const node of nodes)if (pass || 'querySelectorAll' in node) {
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
    const elements = (element)=>QSA in element;
    const { filter } = [];
    var qsaObserver = (options)=>{
        const live = new WeakMap();
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
                    !live.has(element) && live.set(element, new Set());
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
        const root = options.root || document;
        const observer = notify(notifier, root, MutationObserver, query);
        const { attachShadow } = Element.prototype;
        if (attachShadow) Element.prototype.attachShadow = function(init) {
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
    const { createElement } = document;
    const { define, get, upgrade } = customElements;
    const { construct } = Reflect || {
        construct (HTMLElement) {
            return HTMLElement.call(this);
        }
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
            let $ = new Promise(($)=>{
                _ = $;
            });
            defined.set(name, {
                $,
                _
            });
        }
        return defined.get(name).$;
    };
    const augment = attributesObserver(whenDefined, MutationObserver);
    let override = null;
    getOwnPropertyNames(self).filter((k)=>/^HTML.*Element$/.test(k)).forEach((k)=>{
        const HTMLElement = self[k];
        function HTMLBuiltIn() {
            const { constructor } = this;
            if (!classes.has(constructor)) throw new TypeError("Illegal constructor");
            const { is, tag } = classes.get(constructor);
            if (is) {
                if (override) return augment(override, is);
                const element = createElement.call(document, tag);
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
    document.createElement = function(name, options) {
        const is = options && options.is;
        if (is) {
            const Class = registry.get(is);
            if (Class && classes.get(Class).tag === name) return new Class();
        }
        const element = createElement.call(document, name);
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
                parse(document.querySelectorAll(selector));
                shadows.forEach(parseShadow, [
                    selector
                ]);
            } else parseShadowed(document.querySelectorAll(selector));
        });
        defined.get(is)._(Class);
    };
    function parseShadow(element) {
        const root = shadowRoots.get(element);
        parse(root.querySelectorAll(this), element.isConnected);
    }
})();

},{}],"b1p95":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "componentDecorator", ()=>componentDecorator);
var _applyMixins = require("./_applyMixins");
var _assertMetaKey = require("./_assertMetaKey");
var _defineCustomElement = require("./_defineCustomElement");
var _exposeComponent = require("./_exposeComponent");
function componentDecorator(componentName, component) {
    (0, _assertMetaKey.assertMetaKey)(component, "name");
    (0, _defineCustomElement.defineCustomElement)(component);
    (0, _applyMixins.applyMixins)(component);
    (0, _exposeComponent.exposeComponent)(componentName, component);
}

},{"./_applyMixins":"a7N4u","./_assertMetaKey":"aLWBU","./_defineCustomElement":"lE3ZW","./_exposeComponent":"2KM2E","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"a7N4u":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyMixins", ()=>applyMixins);
var _buildHandlers = require("./_buildHandlers");
var _buildLifecycleMethods = require("./_buildLifecycleMethods");
function applyMixins(component) {
    Object.assign(component.prototype, {
        componentName: component.name
    }, component.attributes && {
        ...(0, _buildHandlers.buildAttributeHandlers)(component.attributes)
    }, component.events && {
        ...(0, _buildHandlers.buildEventHandlers)(component.events)
    }, (0, _buildLifecycleMethods.buildLifecycleMethods)(component));
    component.attributes && Object.defineProperty(component, "observedAttributes", {
        get: ()=>Object.keys(component.attributes)
    });
}

},{"./_buildHandlers":"llPWy","./_buildLifecycleMethods":"h6Qbm","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"llPWy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildHandlers", ()=>buildHandlers);
parcelHelpers.export(exports, "buildEventHandlers", ()=>buildEventHandlers);
parcelHelpers.export(exports, "buildAttributeHandlers", ()=>buildAttributeHandlers);
function buildHandlers(attributesOrEvents, methodSuffix = "") {
    return Object.entries(attributesOrEvents).reduce((acc, item)=>{
        acc[`handle${item[0].pascalize()}${methodSuffix}`] = item[1];
        return acc;
    }, {});
}
function buildEventHandlers(componentEvents) {
    return buildHandlers(componentEvents);
}
function buildAttributeHandlers(componentAttributes) {
    return buildHandlers(componentAttributes, "Change");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"h6Qbm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildLifecycleMethods", ()=>buildLifecycleMethods);
function buildLifecycleMethods(component) {
    return {
        handleEvent (e) {
            this[`handle${e.type.capitalize()}`]?.(e);
        },
        attributeChangedCallback (name, oldValue, newValue) {
            this[`handle${name.pascalize()}Change`]?.(oldValue, newValue);
            this.onAttributeChanged instanceof Function && this.onAttributeChanged(name, oldValue, newValue);
        },
        connectedCallback () {
            for (const event of Object.keys(component.events))this.addEventListener(event, this);
            this.onConnected instanceof Function && this.onConnected();
        },
        disconnectedCallback () {
            for (const event of Object.keys(component.events))this.removeEventListener(event, this);
            this.onDisconnected instanceof Function && this.onDisconnected();
        }
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aLWBU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "assertMetaKey", ()=>assertMetaKey);
function assertMetaKey(component, key) {
    if (!component[key]) throw new Error(`The meta ${key} is required for the wcagUI component: ${component}`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lE3ZW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defineCustomElement", ()=>defineCustomElement);
var _buildExtendOptions = require("./_buildExtendOptions");
function defineCustomElement(component) {
    !!customElements && !customElements.get(component.name) && customElements.define(component.name, component, (0, _buildExtendOptions.buildExtendOptions)(component));
}

},{"./_buildExtendOptions":"doaaM","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"doaaM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildExtendOptions", ()=>buildExtendOptions);
function buildExtendOptions(mixins) {
    return mixins.extends ? {
        extends: mixins.extends
    } : undefined;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2KM2E":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jULtC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "events", ()=>events);
var _cancelEvent = require("./_cancelEvent");
var _dispatchCustomEvent = require("./_dispatchCustomEvent");
var _dispatchComponentEvent = require("./_dispatchComponentEvent");
const events = {
    cancelEvent: (0, _cancelEvent.cancelEvent),
    dispatchCustomEvent: (0, _dispatchCustomEvent.dispatchCustomEvent),
    dispatchComponentEvent: (0, _dispatchComponentEvent.dispatchComponentEvent)
};

},{"./_cancelEvent":"70f16","./_dispatchCustomEvent":"jHiHh","./_dispatchComponentEvent":"heiP7","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"70f16":[function(require,module,exports,__globalThis) {
/**
 * returns true if the provided string contains HTML tags
 *
 * @param {Event} e - the event
 * @param {boolean} [preventDefault=true] - enable/disable preventDefault
 * @param {boolean} [stopPropagation=true] - enable/disable stopPropagation
 * @param {boolean} [stopImmediatePropagation=true] - enable/disable stopImmediatePropagation
 * @return {boolean|undefined}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cancelEvent", ()=>cancelEvent);
const cancelEvent = (e, preventDefault = true, stopPropagation = true, stopImmediatePropagation = true)=>{
    if (!e) return;
    !!preventDefault && e.preventDefault();
    !!stopPropagation && e.stopPropagation();
    !!stopImmediatePropagation && e.stopImmediatePropagation();
    return false;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jHiHh":[function(require,module,exports,__globalThis) {
/**
 * dispatches a CustomEvent according to the params
 *
 * @param {string} eventNamespace - the namespace of the event
 * @param {string} eventName - the event name
 * @param {object} [detail={}] - the data to be passed as CustomEvent detail
 * @param {Event} [originalEvent=undefined] - the original DOM event to be added to the CustomEvent detail
 * @param {EventTarget} [dispatcher=undefined] - pass an EventTarget (Node, Elements, ...) in order to override the dispatcher
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dispatchCustomEvent", ()=>dispatchCustomEvent);
const dispatchCustomEvent = function(eventNamespace, eventName, detail = {}, originalEvent, dispatcher) {
    dispatcher = dispatcher ?? this ?? self;
    const event = new CustomEvent(`${eventNamespace}.${eventName}`, {
        bubbles: true,
        cancelable: true,
        detail: {
            ...detail,
            ...originalEvent && {
                originalEvent
            }
        }
    });
    console.log(`CustomEvent emitted: ${eventNamespace}.${eventName}`);
    dispatcher.dispatchEvent(event);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"heiP7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dispatchComponentEvent", ()=>dispatchComponentEvent);
var _dispatchCustomEvent = require("./_dispatchCustomEvent");
const dispatchComponentEvent = function(eventName, details, originalEvent) {
    const componentName = this.componentName;
    (0, _dispatchCustomEvent.dispatchCustomEvent).call(this, componentName, eventName, details, originalEvent ?? new Event(`${componentName}.${eventName}`));
};

},{"./_dispatchCustomEvent":"jHiHh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ju3ra":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "encoding", ()=>encoding);
var _base64 = require("./_base64");
var _jwt = require("./_jwt");
var _md5 = require("./_md5");
const encoding = {
    base64: (0, _base64.base64),
    jwt: (0, _jwt.jwt),
    md5: (0, _md5.md5)
};

},{"./_base64":"79ffg","./_jwt":"73kKp","./_md5":"hJIlJ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"79ffg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "base64", ()=>base64) // console.log(
 //   "encodeBase64",
 //   encodeBase64("Hello, world!"),
 //   encodeBase64("Hello, world!") === "SGVsbG8lMkMlMjB3b3JsZCE="
 // );
 // console.log(
 //   "decodeBase64",
 //   decodeBase64("SGVsbG8lMkMlMjB3b3JsZCE="),
 //   decodeBase64("SGVsbG8lMkMlMjB3b3JsZCE=") === "Hello, world!"
 // );
 // console.log(
 //   "jsonToBase64",
 //   jsonToBase64({ hello: "world" }),
 //   jsonToBase64({ hello: "world" }) === "JTdCJTIyaGVsbG8lMjIlM0ElMjJ3b3JsZCUyMiU3RA=="
 // );
;
var _types = require("../helpers/_types");
const base64 = {
    /**
   * encodes a string in base64
   *
   * @param {string} s - the given string
   * @return {string}
   */ encode: (s)=>{
        if (!(0, _types.isString)(s)) throw new Error("@wcag-js/core error, encodeBase64: the provided parameter is not a valid string");
        return btoa(encodeURIComponent(s));
    },
    /**
   * decodes a string in base64
   *
   * @param {string} s - the given string
   * @return {string}
   */ decode: (s)=>{
        if (!(0, _types.isString)(s)) throw new Error("@wcag-js/core error, decodeBase64: the provided parameter is not a valid string");
        return decodeURIComponent(atob(s));
    },
    /**
   * stringifies an Object in JSON and encodes it in base64
   *
   * @param {object} o - the given object
   * @return {string}
   */ fromJSON: (o)=>{
        if (!(0, _types.isObject)(o)) throw new Error("@wcag-js/core error, base64.fromJSON: the provided parameter is not a valid object");
        return encodeBase64(JSON.stringify(o));
    },
    /**
   * decodes a base64 string into a Json parsed object
   *
   * @param {string} s - the given string
   * @return {object}
   */ toJSON: (s)=>{
        if (!(0, _types.isString)(s)) throw new Error("@wcag-js/core error, base64ToJson: the provided parameter is not a valid string");
        return JSON.parse(decodeBase64(s));
    }
};

},{"../helpers/_types":"8yMxW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"73kKp":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "jwt", ()=>jwt);
const jwt = {
    parse: (token)=>{
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        return JSON.parse(jsonPayload);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hJIlJ":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fzDy5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "helpers", ()=>helpers);
var _debounce = require("./_debounce");
var _throttle = require("./_throttle");
var _files = require("./_files");
var _types = require("./_types");
const helpers = {
    debounce: (0, _debounce.debounce),
    throttle: (0, _throttle.throttle),
    files: _files,
    types: _types
};

},{"./_debounce":"fptTY","./_throttle":"lErHQ","./_files":"fVWjm","./_types":"8yMxW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fptTY":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lErHQ":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fVWjm":[function(require,module,exports,__globalThis) {
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
    if (Array.isArray(fileArrayOrList)) return fileArrayOrList;
    return Array.from(fileArrayOrList);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"acf3M":[function(require,module,exports,__globalThis) {
/**
 * Throws a wcagUI error
 *
 * @param {string} componentName
 * @param {string} errorMessage
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "error", ()=>error);
const error = function(componentName, errorMessage) {
    throw new Error(`wcag-ui.${componentName} error: ${errorMessage}})`);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7Sy1N":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "extender", ()=>extender);
const extender = (mixins)=>{
    const self = self || window;
    Object.assign(self, {
        wcagUI: {
            ...self.wcagUI,
            ...mixins
        }
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5XTOL":[function(require,module,exports,__globalThis) {
/**
 * @typedef {Object.<string, string>} TElementAttributes
 */ /**
 * @typedef TElementOptions
 * @type {object}
 * @property {string} tag - element's tag name.
 * @property {string[]} [classes] - element's classes.
 * @property {TElementAttributes} [attributes] - element's attributes in the form of { [key: string]: string }.
 * @property {string} [content] - the content to be added as textContent in the element.
 */ // export * from './_detector';
// *** DOM Traversing Helpers ***
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DOM", ()=>DOM);
var _ancestors = require("./_ancestors");
var _containsHTML = require("./_containsHTML");
var _findNodes = require("./_findNodes");
var _siblings = require("./_siblings");
var _outerHTML = require("./_outerHTML");
var _sanitizeHTML = require("./_sanitizeHTML");
// *** DOM Manipulation Helpers ***
var _createFragment = require("./_createFragment");
var _createElement = require("./_createElement");
var _ensureElement = require("./_ensureElement");
var _insertElement = require("./_insertElement");
var _insertHTML = require("./_insertHTML");
var _wrapElement = require("./_wrapElement");
const DOM = {
    ancestor: // *** DOM Traversing Helpers ***
    (0, _ancestors.ancestor),
    ancestors: (0, _ancestors.ancestors),
    containsHTML: (0, _containsHTML.containsHTML),
    findNodes: (0, _findNodes.findNodes),
    getAllSiblings: (0, _siblings.getAllSiblings),
    getPrevSiblings: (0, _siblings.getPrevSiblings),
    getNextSiblings: (0, _siblings.getNextSiblings),
    outerHTML: (0, _outerHTML.outerHTML),
    sanitizeHTML: (0, _sanitizeHTML.sanitizeHTML),
    insertHTML: // *** DOM Manipulation Helpers ***
    (0, _insertHTML.insertHTML),
    createFragment: (0, _createFragment.createFragment),
    createElement: (0, _createElement.createElement),
    ensureElement: (0, _ensureElement.ensureElement),
    insertElement: (0, _insertElement.insertElement),
    wrapElement: (0, _wrapElement.wrapElement)
};

},{"./_ancestors":"hs1Du","./_containsHTML":"lY9JG","./_findNodes":"aAKgv","./_siblings":"ar16P","./_outerHTML":"36zCL","./_sanitizeHTML":"2pJYK","./_createFragment":"fNNV6","./_createElement":"f6NDN","./_ensureElement":"bPT2j","./_insertElement":"buVj4","./_insertHTML":"ceRPD","./_wrapElement":"DWxrK","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hs1Du":[function(require,module,exports,__globalThis) {
/**
 * @callback TAncestorsComparer
 * @param {Node} el
 * @returns {boolean}
 */ /**
 * The ancestors method is designed to traverse the DOM
 * and retrieve ancestor nodes of a given element
 *
 * @param {Node} el - given element
 * @param {string|TAncestorsComparer} [selectorOrComparer=''] A CSS selector string to match ancestor elements or
 * a function that receives a Node and returns true if the node matches the condition.
 * @param {boolean} [one=false] - return only the first matching ancestor or more than one
 * @param {boolean} [includeThis=false] - include the given element in the list of the ancestors
 * @return {Element[]}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ancestors", ()=>ancestors);
parcelHelpers.export(exports, "ancestor", ()=>ancestor);
const ancestors = (el, selector1, one = false, includeThis = false)=>{
    const ancestorsList = [];
    while((one ? ancestorsList.length === 0 : true) && el !== document){
        // (!selector || (el.matches && el.matches(selector))) && ancestorsList.unshift(el);
        if (!selector1) ancestorsList.unshift(el);
        else {
            if (selector1 instanceof Function) selector1(el) && ancestorsList.unshift(el);
            else if (el instanceof Element && el.matches && el.matches(selector1)) ancestorsList.unshift(el);
        }
        el.parentNode && (el = el.parentNode);
    }
    !includeThis && !!ancestorsList.indexOf(el) && ancestorsList.splice(ancestorsList.indexOf(el), 1);
    return ancestorsList;
};
const ancestor = (el, selectorOrComparer = "", includeThis = false)=>{
    const ancestorsResult = ancestors(el, selector, true, includeThis);
    return ancestorsResult.length > 0 ? ancestorsResult[0] : undefined;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lY9JG":[function(require,module,exports,__globalThis) {
/**
 * returns true if the provided string contains HTML tags
 *
 * @param {string} str
 * @return {boolean}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "containsHTML", ()=>containsHTML);
const containsHTML = (str)=>/<[a-z][\s\S]*>/i.test(str);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aAKgv":[function(require,module,exports,__globalThis) {
/**
 * finds nodes in a given node by using the query parameter for querying the textContent
 *
 * @param {string} query - the namespace of the event
 * @param {Node} node - the given node
 * @return {Node[]}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "findNodes", ()=>findNodes);
const findNodes = (query, node)=>{
    if (!node.textContent?.toLowerCase().includes(query.toLowerCase())) return [];
    if (![
        ...node.childNodes
    ].length) return [
        node
    ];
    const foundNodes = [];
    for (const child of [
        ...node.childNodes
    ])foundNodes.push(...findNodes(query, child));
    return foundNodes;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ar16P":[function(require,module,exports,__globalThis) {
/**
 * Allowed Node Types Enumeration
 * @enum {number}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getAllSiblings", ()=>getAllSiblings);
parcelHelpers.export(exports, "getNextSiblings", ()=>getNextSiblings);
parcelHelpers.export(exports, "getPrevSiblings", ()=>getPrevSiblings);
const EAllowedNodeTypes = Object.freeze({
    HTMLElement: 1,
    ChildNode: 3,
    Comment: 8
});
/**
 * Checks if the specified property of a ChildNode is empty
 * @param {ChildNode} sibling
 * @param {string} [property='']
 * @return {boolean}
 */ const isEmptyProperty = (sibling, property = "")=>{
    return property && sibling[property]?.trim().length > 0;
};
/**
 * Checks if a sibling can be added to the siblings list
 * @param {ChildNode} sibling
 * @param {string[]} [excludeTags=[]]
 * @param {ChildNode[]} [excludeElements=[]]
 * @return {boolean}
 */ const canAddSibling = (sibling, excludeTags = [], excludeElements = [], includeComments = true)=>{
    // Text nodes and textContent not empty check
    const isSiblingTextNotEmpty = sibling.nodeType === EAllowedNodeTypes.ChildNode && isEmptyProperty(sibling, "textContent");
    // Element and outerHTML not empty check
    const isSiblingElementNotEmpty = !excludeTags.includes(sibling.tag?.toLowerCase()) && isEmptyProperty(sibling, "outerHTML");
    // Sibling not in excludeElements list
    const isSiblingElementNotInExcludeElements = !excludeElements.includes(sibling);
    return !!includeComments && sibling.nodeType === EAllowedNodeTypes.Comment || (isSiblingTextNotEmpty || isSiblingElementNotEmpty) && isSiblingElementNotInExcludeElements;
};
/**
 * Gets an array of ChildNodes siblings of a specified ChildNode,
 * the resulting array will include the specified ChildNode itself
 * @param {ChildNode} child
 * @param {string[]} [notAllowedTags=[]]
 * @param {ChildNode[]} [notAllowedElements=[]]
 * @return {ChildNode[]}
 */ const getSiblings = (child, notAllowedTags = [], notAllowedElements = [], siblingMethod = "nextSibling")=>{
    const siblings = [];
    let sibling = child;
    while(sibling && Object.values(EAllowedNodeTypes).includes(sibling.nodeType)){
        canAddSibling(sibling, notAllowedTags, notAllowedElements) && siblings.push(sibling);
        sibling = sibling[siblingMethod];
    }
    return siblings;
};
const getAllSiblings = (elem, notAllowedTags = [])=>{
    return getSiblings(elem.parentNode?.firstChild, notAllowedTags, [
        elem
    ]);
};
const getNextSiblings = (elem, notAllowedTags = [])=>{
    return getSiblings(elem.nextSibling, notAllowedTags);
};
const getPrevSiblings = (elem, notAllowedTags = [])=>{
    return getSiblings(elem.previousSibling, notAllowedTags, [], "previousSibling");
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"36zCL":[function(require,module,exports,__globalThis) {
/**
 * Returns the outer HTML of an element, with an option to exclude the element's content.
 *
 * @param {HTMLElement} element The target element from which to get the outer HTML.
 * @param {boolean} [excludeContent=false] A boolean flag indicating whether to exclude the content between the opening and closing tags.
 * If set to true, the content will be removed from the resulting HTML.
 * @return {string} The outer HTML of the element, optionally without its content.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "outerHTML", ()=>outerHTML);
const outerHTML = (element, excludeContent = false)=>{
    if (!excludeContent) return element.outerHTML;
    return element.outerHTML.replaceAll("\n", "").replace(/(?<=<.*?>).*(?=<\/.*>)/gm, "");
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2pJYK":[function(require,module,exports,__globalThis) {
/**
 * Convert the string to an HTML document
 * @return {Node} An HTML document
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sanitizeHTML", ()=>sanitizeHTML);
const stringToDOM = (html)=>{
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");
    return dom.body || document.createElement("body");
};
/**
 * Check if the attribute is potentially dangerous
 * @param  {String} name - The attribute name
 * @param  {String} value - The attribute value
 * @return {Boolean} true, if the attribute is potentially dangerous
 */ const isPotentiallyDangerous = (name, value)=>{
    const val = value.replace(/\s+/g, "").toLowerCase();
    const isPotentiallyScriptInjection = name.startsWith("on");
    const isPotentiallyXSS = [
        "src",
        "href",
        "xlink:href"
    ].includes(name) && (val.includes("javascript:") || val.includes("data:text/html"));
    return isPotentiallyScriptInjection || isPotentiallyXSS;
};
/**
 * Remove potentially dangerous attributes from an element
 * @param  {Node} elem The element
 */ const removeAttributes = (elem)=>{
    // If the node is not an element, bail
    if (elem.nodeType !== 1) return;
    // Otherwise, loop through each attribute
    // If it's dangerous, remove it
    for (const { name, value } of elem.attributes)isPotentiallyDangerous(name, value) && elem.removeAttribute(name);
};
/**
 * Remove dangerous stuff from the HTML document's nodes
 * @param  {Node} node The HTML document
 */ const cleanDOM = (node)=>{
    for (const nodeItem of node.childNodes){
        removeAttributes(nodeItem);
        cleanDOM(nodeItem);
    }
};
/**
 * Remove <script> elements
 * @param  {Node} node The HTML
 */ const removeScripts = (node)=>{
    for (const script of node?.querySelectorAll("script") ?? [])script.remove();
};
const sanitizeHTML = (html, returnAsElements = false)=>{
    // Convert the string to HTML
    let dom = stringToDOM(html);
    // Sanitize it
    cleanDOM(dom);
    removeScripts(dom);
    // If the user wants HTML nodes back, return them
    // Otherwise, pass a sanitized string back
    return returnAsElements ? dom.childNodes : dom.innerHTML;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fNNV6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createFragment", ()=>createFragment);
var _sanitizeHTML = require("./_sanitizeHTML");
const createFragment = (...children)=>{
    const fragment = document.createDocumentFragment();
    fragment.append(...children);
    return fragment;
};

},{"./_sanitizeHTML":"2pJYK","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"f6NDN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createElement", ()=>createElement);
var _sanitizeHTML = require("./_sanitizeHTML");
const createElement = (options)=>{
    if (!options.tag) throw new Error(`wcag-ui.core.createElement error: no tag provided`);
    const element = document.createElement(options.tag);
    options.classes && element.classList.add(...options.classes);
    for (const [key, value] of Object.entries(options.attributes ?? {}))element.setAttribute(key, value);
    const fragment = document.createDocumentFragment();
    fragment.append(...(0, _sanitizeHTML.sanitizeHTML)(options.content, true));
    options.content && element.append(fragment);
    return element;
};

},{"./_sanitizeHTML":"2pJYK","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bPT2j":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ensureElement", ()=>ensureElement);
var _createElement = require("./_createElement");
/**
 * create an element and return it
 *
 * @param {Element|TElementOptions} elementOrOptions - instance of an element or options
 * @return {boolean} true, if the parameter is an Element
 */ function isElement(elementOrOptions) {
    return elementOrOptions instanceof HTMLElement || elementOrOptions instanceof DocumentFragment;
}
const ensureElement = (elementOrOptions)=>{
    return isElement(elementOrOptions) ? elementOrOptions : (0, _createElement.createElement)(elementOrOptions);
};

},{"./_createElement":"f6NDN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"buVj4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "insertElement", ()=>insertElement);
var _ensureElement = require("./_ensureElement");
/**
 * @typedef TInsertPositions
 * @type {'before'|'prepend'|'append'|'after'}
 */ const EInsertPositions = Object.freeze({
    before: "beforebegin",
    prepend: "afterbegin",
    append: "beforeend",
    after: "afterend"
});
const insertElement = (elementOrOptions, target, position)=>{
    const element = (0, _ensureElement.ensureElement)(elementOrOptions);
    target.insertAdjacentElement(EInsertPositions[position], element);
    return element;
};

},{"./_ensureElement":"bPT2j","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ceRPD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "insertHTML", ()=>insertHTML);
var _sanitizeHTML = require("./_sanitizeHTML");
const insertHTML = (html, targetElement, position, emptyTarget = false)=>{
    emptyTarget && (targetElement.innerHTML = "");
    const sanitizedDOM = (0, _sanitizeHTML.sanitizeHTML)(html, true);
    const fragment = document.createDocumentFragment();
    fragment.append(...sanitizedDOM);
    // position === 'beforebegin' && target.before(fragment);
    // position === 'afterbegin' && target.prepend(fragment);
    // position === 'beforeend' && target.append(fragment);
    // position === 'afterend' && target.after(fragment);
    targetElement[position ?? "append"](fragment);
    return sanitizedDOM;
};

},{"./_sanitizeHTML":"2pJYK","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"DWxrK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "wrapElement", ()=>wrapElement);
var _ensureElement = require("./_ensureElement");
var _insertElement = require("./_insertElement");
const wrapElement = (elementOrOptions, wrapperElementOrOptions)=>{
    const element = (0, _ensureElement.ensureElement)(elementOrOptions);
    const wrapperElement = (0, _ensureElement.ensureElement)(wrapperElementOrOptions);
    // checks if the wrapperElement isConnected or not to the DOM,
    // if not the wrapperElement will be put before begin the element
    !wrapperElement.isConnected && (0, _insertElement.insertElement)(wrapperElement, element, "before");
    (0, _insertElement.insertElement)(element, wrapperElement, "append");
    return wrapperElement;
};

},{"./_ensureElement":"bPT2j","./_insertElement":"buVj4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4BAs8":[function() {},{}],"ihwFB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4ntNW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cqD0H":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * wcagUI Button class
 *
 * @export
 * @class Button
 * @extends {HTMLButtonElement}
 */ parcelHelpers.export(exports, "Button", ()=>Button) // import '@wcag-ui/button';
 // <button is="wcag-button">Ciao<button>
 // <wcag-button>Ciao<wcag-button>
 // import '@wcag-ui/input';
 // <input is="wcag-input" type="text" aria-label="Username" />
 // <label>
 //   Username
 //   <input is="wcag-input" type="text" aria-label="Username" />
 // </label>
;
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
    /**
   * static initialization
   *
   * @static
   * @memberof Button
   */ static{
        (0, _core.componentDecorator)("Button", Button);
    }
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        !this.hasAttribute("type") && this.setAttribute("type", "button");
    // !this.hasAttribute("role") && this.setAttribute("role", "button");
    }
}

},{"@wcag-ui/core":"cGTNs","./styles/button.css":"7ljW3","./button.attributes":"4ZLGl","./button.events":"ftJwm","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7ljW3":[function() {},{}],"4ZLGl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    disabled: function(oldValue, newValue) {
        console.log("disabled changed", oldValue, newValue, this.textContent);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ftJwm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    click: function(e) {
        console.log("button clicked", this.textContent);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"27xqY":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Checkbox", ()=>Checkbox);
var _checkboxCss = require("./styles/checkbox.css");
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _checkboxAttributes = require("./checkbox.attributes");
var _checkboxAttributesDefault = parcelHelpers.interopDefault(_checkboxAttributes);
var _checkboxEvents = require("./checkbox.events");
var _checkboxEventsDefault = parcelHelpers.interopDefault(_checkboxEvents);
class Checkbox extends HTMLInputElement {
    static name = 'wcag-checkbox';
    static extends = 'input';
    static attributes = (0, _checkboxAttributesDefault.default);
    static events = (0, _checkboxEventsDefault.default);
    static{
        (0, _core.componentDecorator)('Checkbox', Checkbox);
    }
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        // sets type="checkbox" if not present
        this.setAttribute('type', 'checkbox');
        // wrapping the Checkbox with a <span></span>
        // in order to use the wrapper for additional actions and icons
        const fieldWrapper = (0, _dom.DOM).wrapElement(this, {
            tag: 'span'
        });
        // wrapping the fieldWrapper with a label for having this final DOM result
        // <label>
        //   {{ariaLabel value}}
        //   <span>
        //     <input type="checkbox" />
        //   </span>
        // </label>
        const label = (0, _dom.DOM).wrapElement(fieldWrapper, {
            tag: 'label'
        });
        (0, _dom.DOM).insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');
        // hiding the real input checkbox for showing the custom one
        this.setAttribute('sr-only', '');
        // removing aria-label attribute from Checkbox because of label text
        this.removeAttribute('aria-label');
    }
}

},{"./styles/checkbox.css":"cwqUT","@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./checkbox.attributes":"asil7","./checkbox.events":"6qF9H","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cwqUT":[function() {},{}],"asil7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    "aria-label": function(oldValue, newValue) {
        if (this.label) {
            let textContent = this.label.textContent;
            if (textContent !== newValue) {
                this.label.childNodes[0].textContent = newValue;
                (0, _core.events).dispatchComponentEvent.call(this, "aria-label.change", {
                    label: newValue
                });
            }
        }
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6qF9H":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    checkbox: function(e) {
        console.log('checkbox emitted input', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'checkbox', {
            value: this.value
        }, e);
    },
    change: function(e) {
        console.log('checkbox emitted change', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'change', {
            value: this.value
        }, e);
    },
    focus: function(e) {
        console.log('checkbox emitted focus', this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, 'focus', {
            value: this.value
        }, e);
    },
    blur: function(e) {
        console.log('checkbox emitted blur', this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, 'blur', {
            value: this.value
        }, e);
    },
    invalid: function(e) {
        console.log('checkbox emitted invalid', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'invalid', {
            value: this.value
        }, e);
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5ykFQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * wcagUI Details class
 *
 * @export
 * @class Details
 * @extends {HTMLDetailsElement}
 */ parcelHelpers.export(exports, "Details", ()=>Details);
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _detailsCss = require("./styles/details.css");
var _detailsAttributes = require("./details.attributes");
var _detailsAttributesDefault = parcelHelpers.interopDefault(_detailsAttributes);
var _detailsEvents = require("./details.events");
var _detailsEventsDefault = parcelHelpers.interopDefault(_detailsEvents);
class Details extends HTMLDetailsElement {
    static name = 'wcag-details';
    static extends = 'details';
    static attributes = (0, _detailsAttributesDefault.default);
    static events = (0, _detailsEventsDefault.default);
    /**
   * static initialization
   *
   * @static
   * @memberof Details
   */ static{
        (0, _core.componentDecorator)('Details', Details);
    }
    #guid = String.guid();
    #summary;
    #content;
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        this.setAttribute('aria-expanded', `${this.open.toString()}`);
        this.#summary = this.querySelector('summary');
        !this.#summary.hasAttribute('id') && this.#summary.setAttribute('id', this.#guid);
        !this.#summary.hasAttribute('aria-controls') && this.#summary.setAttribute('aria-controls', `${this.#guid}-content`);
        (0, _dom.DOM).insertElement({
            tag: 'i',
            classes: [
                'wcag-icon-chevron-down'
            ]
        }, this.#summary, 'append');
        // DOM.wrapElement(
        //   Icon.build({
        //     ...(!!this.iconFont && !!this.iconClass
        //       ? { customFont: this.iconFont, customClass: this.iconClass }
        //       : { name: this.iconName }),
        //     dimension: EMonkUIDimensions[this.dimension!]
        //   }),
        //   this.#summary
        // );
        const contentElementsFragment = (0, _dom.DOM).createFragment(...(0, _dom.DOM).getNextSiblings(this.#summary));
        this.#content = this.querySelector(':scope > section:only-of-type') ?? (0, _dom.DOM).createElement({
            tag: 'section'
        });
        !this.#content.hasAttribute('content') && this.#content.setAttribute('content', '');
        !this.#content.hasAttribute('id') && this.#content.setAttribute('id', `${this.#guid}-content`);
        // !this.#content.hasAttribute("aria-labelledby") && this.#content.setAttribute("aria-labelledby", this.#guid);
        // !this.#content.hasAttribute("role") && this.#content.setAttribute("role", "region");
        (0, _dom.DOM).insertElement(this.#content, this.#summary, 'after');
        this.#content.append(contentElementsFragment);
    // DOM.insertElement(contentElementsFragment, this.#content, "append"); // TODO: fix support for DocumentFragment in insertAdjacentElement
    }
    expand() {
        this.open = true;
    }
    collapse() {
        this.open = false;
    }
}

},{"@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./styles/details.css":"lIWBj","./details.attributes":"hng8k","./details.events":"b352t","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lIWBj":[function() {},{}],"hng8k":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    open: function(oldValue, newValue) {
        const state = newValue === null ? 'close' : 'open';
        this.setAttribute('aria-expanded', (state === 'open').toString());
        (0, _core.events).dispatchComponentEvent.call(this, 'toggle', {
            state
        });
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"b352t":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ibO7g":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Input", ()=>Input);
var _inputCss = require("./styles/input.css");
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _inputAttributes = require("./input.attributes");
var _inputAttributesDefault = parcelHelpers.interopDefault(_inputAttributes);
var _inputEvents = require("./input.events");
var _inputEventsDefault = parcelHelpers.interopDefault(_inputEvents);
class Input extends HTMLInputElement {
    static name = 'wcag-input';
    static extends = 'input';
    static attributes = (0, _inputAttributesDefault.default);
    static events = (0, _inputEventsDefault.default);
    static{
        (0, _core.componentDecorator)('Input', Input);
    }
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        // settings default type attribute to text, if missing
        !this.hasAttribute('type') && this.setAttribute('type', 'text');
        // wrapping the input with a <span field-wrapper></span>
        // in order to use the wrapper for additional actions and icons
        const fieldWrapper = (0, _dom.DOM).wrapElement(this, {
            tag: 'span'
        });
        // wrapping the fieldWrapper with a label for having this final DOM result
        // <label>
        //   {{ariaLabel value}}
        //   <span>
        //     <input type="TYPE" />
        //   </span>
        // </label>
        const label = (0, _dom.DOM).wrapElement(fieldWrapper, {
            tag: 'label'
        });
        (0, _dom.DOM).insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');
        // removing aria-label attribute from input because of label text
        this.removeAttribute('aria-label');
    }
}

},{"./styles/input.css":"hqM2B","@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./input.attributes":"iQv3K","./input.events":"1yb4n","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hqM2B":[function() {},{}],"iQv3K":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    "aria-label": function(oldValue, newValue) {
        if (this.label) {
            let textContent = this.label.textContent;
            if (textContent !== newValue) {
                this.label.childNodes[0].textContent = newValue;
                (0, _core.events).dispatchComponentEvent.call(this, "aria-label.change", {
                    label: newValue
                });
            }
        }
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1yb4n":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    input: function(e) {
        console.log("input emitted input", this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, "input", {
            value: this.value
        }, e);
    },
    change: function(e) {
        console.log("input emitted change", this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, "change", {
            value: this.value
        }, e);
    },
    focus: function(e) {
        console.log("input emitted focus", this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, "focus", {
            value: this.value
        }, e);
    },
    blur: function(e) {
        console.log("input emitted blur", this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, "blur", {
            value: this.value
        }, e);
    },
    invalid: function(e) {
        console.log("input emitted invalid", this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, "invalid", {
            value: this.value
        }, e);
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1zlPi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Radio", ()=>Radio);
var _radioCss = require("./styles/radio.css");
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _radioAttributes = require("./radio.attributes");
var _radioAttributesDefault = parcelHelpers.interopDefault(_radioAttributes);
var _radioEvents = require("./radio.events");
var _radioEventsDefault = parcelHelpers.interopDefault(_radioEvents);
class Radio extends HTMLInputElement {
    static name = 'wcag-radio';
    static extends = 'input';
    static attributes = (0, _radioAttributesDefault.default);
    static events = (0, _radioEventsDefault.default);
    static{
        (0, _core.componentDecorator)('Radio', Radio);
    }
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        // sets type="radio" if not present
        this.setAttribute('type', 'radio');
        // wrapping the Radio with a <span></span>
        // in order to use the wrapper for additional actions and icons
        const fieldWrapper = (0, _dom.DOM).wrapElement(this, {
            tag: 'span'
        });
        // wrapping the fieldWrapper with a label for having this final DOM result
        // <label>
        //   {{ariaLabel value}}
        //   <span>
        //     <input type="radio" />
        //   </span>
        // </label>
        const label = (0, _dom.DOM).wrapElement(fieldWrapper, {
            tag: 'label'
        });
        (0, _dom.DOM).insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');
        // hiding the real input radio for showing the custom one
        this.setAttribute('sr-only', '');
        // removing aria-label attribute from Radio because of label text
        this.removeAttribute('aria-label');
    }
}

},{"./styles/radio.css":"fBPaP","@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./radio.attributes":"lucmV","./radio.events":"dP0n7","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fBPaP":[function() {},{}],"lucmV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    "aria-label": function(oldValue, newValue) {
        if (this.label) {
            let textContent = this.label.textContent;
            if (textContent !== newValue) {
                this.label.childNodes[0].textContent = newValue;
                (0, _core.events).dispatchComponentEvent.call(this, "aria-label.change", {
                    label: newValue
                });
            }
        }
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dP0n7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    radio: function(e) {
        console.log('radio emitted input', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'radio', {
            value: this.value
        }, e);
    },
    change: function(e) {
        console.log('radio emitted change', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'change', {
            value: this.value
        }, e);
    },
    focus: function(e) {
        console.log('radio emitted focus', this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, 'focus', {
            value: this.value
        }, e);
    },
    blur: function(e) {
        console.log('radio emitted blur', this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, 'blur', {
            value: this.value
        }, e);
    },
    invalid: function(e) {
        console.log('radio emitted invalid', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'invalid', {
            value: this.value
        }, e);
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"g2UEa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ScrollSpy", ()=>ScrollSpy);
var _scrollSpyCss = require("./styles/scroll-spy.css");
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _scrollSpyAttributes = require("./scroll-spy.attributes");
var _scrollSpyAttributesDefault = parcelHelpers.interopDefault(_scrollSpyAttributes);
var _scrollSpyEvents = require("./scroll-spy.events");
var _scrollSpyEventsDefault = parcelHelpers.interopDefault(_scrollSpyEvents);
class ScrollSpy extends HTMLElement {
    static name = 'wcag-scroll-spy';
    static extends = 'section';
    static attributes = (0, _scrollSpyAttributesDefault.default);
    static events = (0, _scrollSpyEventsDefault.default);
    /**
   * static initialization
   *
   * @static
   * @memberof ScrollSpy
   */ static{
        (0, _core.componentDecorator)('ScrollSpy', ScrollSpy);
    }
    #observer;
    #title;
    #headings = [];
    constructor(){
        super();
    }
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
        this.#headings = [
            ...container.querySelectorAll('h2')
        ];
        // Costruisce la navigazione
        this.buildNav();
        // Imposta l'observer per gestire lo scroll e l'evidenziazione
        this.setupObserver();
    }
    onDisconnected() {
        this.#observer && this.#observer.disconnect();
    }
    buildNav() {
        // <a href="#install-manually" id="install-manually" class="secondary" tabindex="-1">#</a>
        // Crea un elemento nav e una lista non ordinata
        let template = `
      <span>${this.#title.textContent.stripEmojis()}</span>
      <nav>
        <ul>
          ${this.#headings.map((heading)=>{
            // Se la sezione non ha un id, lo genera a partire dal testo del titolo
            !heading.id && (heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-'));
            return `<li><a href="#${heading.id}">${heading.textContent.stripEmojis()}</a></li>`;
        }).join('')}
        </ul>
      </nav>
    `;
        (0, _dom.DOM).insertHTML(template, this);
    }
    setupObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        this.#observer = new IntersectionObserver((entries)=>{
            for (const entry of entries){
                const id = entry.target.id;
                const navLink = this.querySelector(`a[href="#${id}"]`);
                if (entry.isIntersecting) {
                    this.clearActive();
                    navLink && navLink.parentElement && navLink.parentElement.classList.add('active');
                }
            }
        }, options);
        // Osserva ogni sezione individuata
        for (const heading of this.#headings)this.#observer.observe(heading);
    }
    clearActive() {
        const activeItems = this.querySelectorAll('li.active');
        for (const activeItem of activeItems)activeItem.classList.remove('active');
    }
}

},{"./styles/scroll-spy.css":"aEDKY","@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./scroll-spy.attributes":"9GVcn","./scroll-spy.events":"7srM3","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aEDKY":[function() {},{}],"9GVcn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    target: function(oldValue, newValue) {
    // console.log("disabled changed", oldValue, newValue, this.textContent);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7srM3":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9fSHc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Switch", ()=>Switch);
var _switchCss = require("./styles/switch.css");
var _core = require("@wcag-ui/core");
var _dom = require("@wcag-ui/dom");
var _switchAttributes = require("./switch.attributes");
var _switchAttributesDefault = parcelHelpers.interopDefault(_switchAttributes);
var _switchEvents = require("./switch.events");
var _switchEventsDefault = parcelHelpers.interopDefault(_switchEvents);
class Switch extends HTMLInputElement {
    static name = 'wcag-switch';
    static extends = 'input';
    static attributes = (0, _switchAttributesDefault.default);
    static events = (0, _switchEventsDefault.default);
    static{
        (0, _core.componentDecorator)('Switch', Switch);
    }
    constructor(){
        super();
        this.#initialize();
    }
    #initialize() {
        // sets type="checkbox" and switch attributes if not present
        this.setAttribute('type', 'checkbox');
        this.setAttribute('switch', '');
        // wrapping the Switch with a <span></span>
        // in order to use the wrapper for additional actions and icons
        const fieldWrapper = (0, _dom.DOM).wrapElement(this, {
            tag: 'span'
        });
        // wrapping the fieldWrapper with a label for having this final DOM result
        // <label>
        //   {{ariaLabel value}}
        //   <span>
        //     <input type="checkbox" switch />
        //   </span>
        // </label>
        const label = (0, _dom.DOM).wrapElement(fieldWrapper, {
            tag: 'label'
        });
        (0, _dom.DOM).insertHTML(this.ariaLabel ?? 'aria-label N/A', label, 'prepend');
        // hiding the real input switch for showing the custom one
        this.setAttribute('sr-only', '');
        // removing aria-label attribute from Switch because of label text
        this.removeAttribute('aria-label');
    }
}

},{"./styles/switch.css":"dYvvK","@wcag-ui/core":"cGTNs","@wcag-ui/dom":"5XTOL","./switch.attributes":"kZDVt","./switch.events":"4E0eO","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dYvvK":[function() {},{}],"kZDVt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    "aria-label": function(oldValue, newValue) {
        if (this.label) {
            let textContent = this.label.textContent;
            if (textContent !== newValue) {
                this.label.childNodes[0].textContent = newValue;
                (0, _core.events).dispatchComponentEvent.call(this, "aria-label.change", {
                    label: newValue
                });
            }
        }
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4E0eO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("@wcag-ui/core");
exports.default = {
    switch: function(e) {
        console.log('switch emitted input', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'switch', {
            value: this.value
        }, e);
    },
    change: function(e) {
        console.log('switch emitted change', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'change', {
            value: this.value
        }, e);
    },
    focus: function(e) {
        console.log('switch emitted focus', this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, 'focus', {
            value: this.value
        }, e);
    },
    blur: function(e) {
        console.log('switch emitted blur', this.ariaLabel);
        (0, _core.events).dispatchComponentEvent.call(this, 'blur', {
            value: this.value
        }, e);
    },
    invalid: function(e) {
        console.log('switch emitted invalid', this.ariaLabel);
        // style :user-invalid or :user-valid
        (0, _core.events).dispatchComponentEvent.call(this, 'invalid', {
            value: this.value
        }, e);
    }
};

},{"@wcag-ui/core":"cGTNs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"eeY3P":[function(require,module,exports,__globalThis) {
// Using ES6 import syntax
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _core = require("highlight.js/lib/core");
var _coreDefault = parcelHelpers.interopDefault(_core);
var _xml = require("highlight.js/lib/languages/xml");
var _xmlDefault = parcelHelpers.interopDefault(_xml);
var _css = require("highlight.js/lib/languages/css");
var _cssDefault = parcelHelpers.interopDefault(_css);
var _javascript = require("highlight.js/lib/languages/javascript");
var _javascriptDefault = parcelHelpers.interopDefault(_javascript);
var _typescript = require("highlight.js/lib/languages/typescript");
var _typescriptDefault = parcelHelpers.interopDefault(_typescript);
// Then register the languages you need
(0, _coreDefault.default).registerLanguage("xml", (0, _xmlDefault.default));
(0, _coreDefault.default).registerLanguage("css", (0, _cssDefault.default));
(0, _coreDefault.default).registerLanguage("javascript", (0, _javascriptDefault.default));
(0, _coreDefault.default).registerLanguage("typescript", (0, _typescriptDefault.default));
addEventListener("DOMContentLoaded", ()=>{
    (0, _coreDefault.default).addPlugin({
        "after:highlightElement": ({ el, text })=>{
            /**
       * el is the <code> element that was highlighted
       * el.parentElement is the <pre> element
       */ const wrapper = el.parentElement;
            if (wrapper == null) return;
            /**
       * Make the parent relative so we can absolutely
       * position the copy button
       */ wrapper.classList.add("relative");
            const copyButton = document.createElement("button");
            copyButton.classList.add("absolute", "top-2", "right-2", "p-2", "text-gray-500", "hover:text-gray-700");
            // Lucide copy icon
            copyButton.innerHTML = `<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
            copyButton.onclick = ()=>{
                navigator.clipboard.writeText(text);
                // Notify user that the content has been copied
                toast.success("Copied to clipboard", {
                    description: "The code block content has been copied to the clipboard."
                });
            };
            // Append the copy button to the wrapper
            wrapper.appendChild(copyButton);
        }
    });
    (0, _coreDefault.default).highlightAll();
});

},{"highlight.js/lib/core":"fW7rE","highlight.js/lib/languages/xml":"hQIFY","highlight.js/lib/languages/css":"kFaPc","highlight.js/lib/languages/javascript":"6ezKO","highlight.js/lib/languages/typescript":"j7EKL","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fW7rE":[function(require,module,exports,__globalThis) {
/* eslint-disable no-multi-assign */ function deepFreeze(obj) {
    if (obj instanceof Map) obj.clear = obj.delete = obj.set = function() {
        throw new Error('map is read-only');
    };
    else if (obj instanceof Set) obj.add = obj.clear = obj.delete = function() {
        throw new Error('set is read-only');
    };
    // Freeze self
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((name)=>{
        const prop = obj[name];
        const type = typeof prop;
        // Freeze prop if it is an object or function and also not already frozen
        if ((type === 'object' || type === 'function') && !Object.isFrozen(prop)) deepFreeze(prop);
    });
    return obj;
}
/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */ /** @typedef {import('highlight.js').CompiledMode} CompiledMode */ /** @implements CallbackResponse */ class Response {
    /**
   * @param {CompiledMode} mode
   */ constructor(mode){
        // eslint-disable-next-line no-undefined
        if (mode.data === undefined) mode.data = {};
        this.data = mode.data;
        this.isMatchIgnored = false;
    }
    ignoreMatch() {
        this.isMatchIgnored = true;
    }
}
/**
 * @param {string} value
 * @returns {string}
 */ function escapeHTML(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */ function inherit$1(original, ...objects) {
    /** @type Record<string,any> */ const result = Object.create(null);
    for(const key in original)result[key] = original[key];
    objects.forEach(function(obj) {
        for(const key in obj)result[key] = obj[key];
    });
    return /** @type {T} */ result;
}
/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */ /** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */ /** @typedef {{walk: (r: Renderer) => void}} Tree */ /** */ const SPAN_CLOSE = '</span>';
/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */ const emitsWrappingTags = (node)=>{
    // rarely we can have a sublanguage where language is undefined
    // TODO: track down why
    return !!node.scope;
};
/**
 *
 * @param {string} name
 * @param {{prefix:string}} options
 */ const scopeToCSSClass = (name, { prefix })=>{
    // sub-language
    if (name.startsWith("language:")) return name.replace("language:", "language-");
    // tiered scope: comment.line
    if (name.includes(".")) {
        const pieces = name.split(".");
        return [
            `${prefix}${pieces.shift()}`,
            ...pieces.map((x, i)=>`${x}${"_".repeat(i + 1)}`)
        ].join(" ");
    }
    // simple scope
    return `${prefix}${name}`;
};
/** @type {Renderer} */ class HTMLRenderer {
    /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */ constructor(parseTree, options){
        this.buffer = "";
        this.classPrefix = options.classPrefix;
        parseTree.walk(this);
    }
    /**
   * Adds texts to the output stream
   *
   * @param {string} text */ addText(text) {
        this.buffer += escapeHTML(text);
    }
    /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */ openNode(node) {
        if (!emitsWrappingTags(node)) return;
        const className = scopeToCSSClass(node.scope, {
            prefix: this.classPrefix
        });
        this.span(className);
    }
    /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */ closeNode(node) {
        if (!emitsWrappingTags(node)) return;
        this.buffer += SPAN_CLOSE;
    }
    /**
   * returns the accumulated buffer
  */ value() {
        return this.buffer;
    }
    // helpers
    /**
   * Builds a span element
   *
   * @param {string} className */ span(className) {
        this.buffer += `<span class="${className}">`;
    }
}
/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */ /** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */ /** @typedef {import('highlight.js').Emitter} Emitter */ /**  */ /** @returns {DataNode} */ const newNode = (opts = {})=>{
    /** @type DataNode */ const result = {
        children: []
    };
    Object.assign(result, opts);
    return result;
};
class TokenTree {
    constructor(){
        /** @type DataNode */ this.rootNode = newNode();
        this.stack = [
            this.rootNode
        ];
    }
    get top() {
        return this.stack[this.stack.length - 1];
    }
    get root() {
        return this.rootNode;
    }
    /** @param {Node} node */ add(node) {
        this.top.children.push(node);
    }
    /** @param {string} scope */ openNode(scope) {
        /** @type Node */ const node = newNode({
            scope
        });
        this.add(node);
        this.stack.push(node);
    }
    closeNode() {
        if (this.stack.length > 1) return this.stack.pop();
        // eslint-disable-next-line no-undefined
        return undefined;
    }
    closeAllNodes() {
        while(this.closeNode());
    }
    toJSON() {
        return JSON.stringify(this.rootNode, null, 4);
    }
    /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */ walk(builder) {
        // this does not
        return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
    }
    /**
   * @param {Renderer} builder
   * @param {Node} node
   */ static _walk(builder, node) {
        if (typeof node === "string") builder.addText(node);
        else if (node.children) {
            builder.openNode(node);
            node.children.forEach((child)=>this._walk(builder, child));
            builder.closeNode(node);
        }
        return builder;
    }
    /**
   * @param {Node} node
   */ static _collapse(node) {
        if (typeof node === "string") return;
        if (!node.children) return;
        if (node.children.every((el)=>typeof el === "string")) // node.text = node.children.join("");
        // delete node.children;
        node.children = [
            node.children.join("")
        ];
        else node.children.forEach((child)=>{
            TokenTree._collapse(child);
        });
    }
}
/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addText(text)
  - __addSublanguage(emitter, subLanguageName)
  - startScope(scope)
  - endScope()
  - finalize()
  - toHTML()

*/ /**
 * @implements {Emitter}
 */ class TokenTreeEmitter extends TokenTree {
    /**
   * @param {*} options
   */ constructor(options){
        super();
        this.options = options;
    }
    /**
   * @param {string} text
   */ addText(text) {
        if (text === "") return;
        this.add(text);
    }
    /** @param {string} scope */ startScope(scope) {
        this.openNode(scope);
    }
    endScope() {
        this.closeNode();
    }
    /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */ __addSublanguage(emitter, name) {
        /** @type DataNode */ const node = emitter.root;
        if (name) node.scope = `language:${name}`;
        this.add(node);
    }
    toHTML() {
        const renderer = new HTMLRenderer(this, this.options);
        return renderer.value();
    }
    finalize() {
        this.closeAllNodes();
        return true;
    }
}
/**
 * @param {string} value
 * @returns {RegExp}
 * */ /**
 * @param {RegExp | string } re
 * @returns {string}
 */ function source(re) {
    if (!re) return null;
    if (typeof re === "string") return re;
    return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */ function lookahead(re) {
    return concat('(?=', re, ')');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */ function anyNumberOfTimes(re) {
    return concat('(?:', re, ')*');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */ function optional(re) {
    return concat('(?:', re, ')?');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */ function concat(...args) {
    const joined = args.map((x)=>source(x)).join("");
    return joined;
}
/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */ function stripOptionsFromArgs(args) {
    const opts = args[args.length - 1];
    if (typeof opts === 'object' && opts.constructor === Object) {
        args.splice(args.length - 1, 1);
        return opts;
    } else return {};
}
/** @typedef { {capture?: boolean} } RegexEitherOptions */ /**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */ function either(...args) {
    /** @type { object & {capture?: boolean} }  */ const opts = stripOptionsFromArgs(args);
    const joined = '(' + (opts.capture ? "" : "?:") + args.map((x)=>source(x)).join("|") + ")";
    return joined;
}
/**
 * @param {RegExp | string} re
 * @returns {number}
 */ function countMatchGroups(re) {
    return new RegExp(re.toString() + '|').exec('').length - 1;
}
/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */ function startsWith(re, lexeme) {
    const match = re && re.exec(lexeme);
    return match && match.index === 0;
}
// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */ function _rewriteBackreferences(regexps, { joinWith }) {
    let numCaptures = 0;
    return regexps.map((regex)=>{
        numCaptures += 1;
        const offset = numCaptures;
        let re = source(regex);
        let out = '';
        while(re.length > 0){
            const match = BACKREF_RE.exec(re);
            if (!match) {
                out += re;
                break;
            }
            out += re.substring(0, match.index);
            re = re.substring(match.index + match[0].length);
            if (match[0][0] === '\\' && match[1]) // Adjust the backreference.
            out += '\\' + String(Number(match[1]) + offset);
            else {
                out += match[0];
                if (match[0] === '(') numCaptures++;
            }
        }
        return out;
    }).map((re)=>`(${re})`).join(joinWith);
}
/** @typedef {import('highlight.js').Mode} Mode */ /** @typedef {import('highlight.js').ModeCallback} ModeCallback */ // Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/ const SHEBANG = (opts = {})=>{
    const beginShebang = /^#![ ]*\//;
    if (opts.binary) opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
    return inherit$1({
        scope: 'meta',
        begin: beginShebang,
        end: /$/,
        relevance: 0,
        /** @type {ModeCallback} */ "on:begin": (m, resp)=>{
            if (m.index !== 0) resp.ignoreMatch();
        }
    }, opts);
};
// Common modes
const BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]',
    relevance: 0
};
const APOS_STRING_MODE = {
    scope: 'string',
    begin: '\'',
    end: '\'',
    illegal: '\\n',
    contains: [
        BACKSLASH_ESCAPE
    ]
};
const QUOTE_STRING_MODE = {
    scope: 'string',
    begin: '"',
    end: '"',
    illegal: '\\n',
    contains: [
        BACKSLASH_ESCAPE
    ]
};
const PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */ const COMMENT = function(begin, end, modeOptions = {}) {
    const mode = inherit$1({
        scope: 'comment',
        begin,
        end,
        contains: []
    }, modeOptions);
    mode.contains.push({
        scope: 'doctag',
        // hack to avoid the space from being included. the space is necessary to
        // match here to prevent the plain text rule below from gobbling up doctags
        begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
        end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
        excludeBegin: true,
        relevance: 0
    });
    const ENGLISH_WORD = either(// list of common 1 and 2 letter words in English
    "I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
    );
    // looking like plain text, more likely to be a comment
    mode.contains.push({
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: concat(/[ ]+/, '(', ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, '){3}') // look for 3 words in a row
    });
    return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
    scope: 'number',
    begin: NUMBER_RE,
    relevance: 0
};
const C_NUMBER_MODE = {
    scope: 'number',
    begin: C_NUMBER_RE,
    relevance: 0
};
const BINARY_NUMBER_MODE = {
    scope: 'number',
    begin: BINARY_NUMBER_RE,
    relevance: 0
};
const REGEXP_MODE = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
        BACKSLASH_ESCAPE,
        {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [
                BACKSLASH_ESCAPE
            ]
        }
    ]
};
const TITLE_MODE = {
    scope: 'title',
    begin: IDENT_RE,
    relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
    scope: 'title',
    begin: UNDERSCORE_IDENT_RE,
    relevance: 0
};
const METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
    relevance: 0
};
/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */ const END_SAME_AS_BEGIN = function(mode) {
    return Object.assign(mode, {
        /** @type {ModeCallback} */ 'on:begin': (m, resp)=>{
            resp.data._beginMatch = m[1];
        },
        /** @type {ModeCallback} */ 'on:end': (m, resp)=>{
            if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
        }
    });
};
var MODES = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: APOS_STRING_MODE,
    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
    COMMENT: COMMENT,
    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
    C_NUMBER_MODE: C_NUMBER_MODE,
    C_NUMBER_RE: C_NUMBER_RE,
    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN,
    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
    IDENT_RE: IDENT_RE,
    MATCH_NOTHING_RE: MATCH_NOTHING_RE,
    METHOD_GUARD: METHOD_GUARD,
    NUMBER_MODE: NUMBER_MODE,
    NUMBER_RE: NUMBER_RE,
    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
    REGEXP_MODE: REGEXP_MODE,
    RE_STARTERS_RE: RE_STARTERS_RE,
    SHEBANG: SHEBANG,
    TITLE_MODE: TITLE_MODE,
    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE
});
/**
@typedef {import('highlight.js').CallbackResponse} CallbackResponse
@typedef {import('highlight.js').CompilerExt} CompilerExt
*/ // Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833
// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.
// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.
// ------
// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */ function skipIfHasPrecedingDot(match, response) {
    const before = match.input[match.index - 1];
    if (before === ".") response.ignoreMatch();
}
/**
 *
 * @type {CompilerExt}
 */ function scopeClassName(mode, _parent) {
    // eslint-disable-next-line no-undefined
    if (mode.className !== undefined) {
        mode.scope = mode.className;
        delete mode.className;
    }
}
/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */ function beginKeywords(mode, parent) {
    if (!parent) return;
    if (!mode.beginKeywords) return;
    // for languages with keywords that include non-word characters checking for
    // a word boundary is not sufficient, so instead we check for a word boundary
    // or whitespace - this does no harm in any case since our keyword engine
    // doesn't allow spaces in keywords anyways and we still check for the boundary
    // first
    mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
    mode.__beforeBegin = skipIfHasPrecedingDot;
    mode.keywords = mode.keywords || mode.beginKeywords;
    delete mode.beginKeywords;
    // prevents double relevance, the keywords themselves provide
    // relevance, the mode doesn't need to double it
    // eslint-disable-next-line no-undefined
    if (mode.relevance === undefined) mode.relevance = 0;
}
/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */ function compileIllegal(mode, _parent) {
    if (!Array.isArray(mode.illegal)) return;
    mode.illegal = either(...mode.illegal);
}
/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */ function compileMatch(mode, _parent) {
    if (!mode.match) return;
    if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
    mode.begin = mode.match;
    delete mode.match;
}
/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */ function compileRelevance(mode, _parent) {
    // eslint-disable-next-line no-undefined
    if (mode.relevance === undefined) mode.relevance = 1;
}
// allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]
const beforeMatchExt = (mode, parent)=>{
    if (!mode.beforeMatch) return;
    // starts conflicts with endsParent which we need to make sure the child
    // rule is not matched multiple times
    if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
    const originalMode = Object.assign({}, mode);
    Object.keys(mode).forEach((key)=>{
        delete mode[key];
    });
    mode.keywords = originalMode.keywords;
    mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
    mode.starts = {
        relevance: 0,
        contains: [
            Object.assign(originalMode, {
                endsParent: true
            })
        ]
    };
    mode.relevance = 0;
    delete originalMode.beforeMatch;
};
// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
    'of',
    'and',
    'for',
    'in',
    'not',
    'or',
    'if',
    'then',
    'parent',
    'list',
    'value' // common variable name
];
const DEFAULT_KEYWORD_SCOPE = "keyword";
/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */ function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
    /** @type {import("highlight.js/private").KeywordDict} */ const compiledKeywords = Object.create(null);
    // input can be a string of keywords, an array of keywords, or a object with
    // named keys representing scopeName (which can then point to a string or array)
    if (typeof rawKeywords === 'string') compileList(scopeName, rawKeywords.split(" "));
    else if (Array.isArray(rawKeywords)) compileList(scopeName, rawKeywords);
    else Object.keys(rawKeywords).forEach(function(scopeName) {
        // collapse all our objects back into the parent object
        Object.assign(compiledKeywords, compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName));
    });
    return compiledKeywords;
    // ---
    /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} scopeName
   * @param {Array<string>} keywordList
   */ function compileList(scopeName, keywordList) {
        if (caseInsensitive) keywordList = keywordList.map((x)=>x.toLowerCase());
        keywordList.forEach(function(keyword) {
            const pair = keyword.split('|');
            compiledKeywords[pair[0]] = [
                scopeName,
                scoreForKeyword(pair[0], pair[1])
            ];
        });
    }
}
/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */ function scoreForKeyword(keyword, providedScore) {
    // manual scores always win over common keywords
    // so you can force a score of 1 if you really insist
    if (providedScore) return Number(providedScore);
    return commonKeyword(keyword) ? 0 : 1;
}
/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */ function commonKeyword(keyword) {
    return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/ /**
 * @type {Record<string, boolean>}
 */ const seenDeprecations = {};
/**
 * @param {string} message
 */ const error = (message)=>{
    console.error(message);
};
/**
 * @param {string} message
 * @param {any} args
 */ const warn = (message, ...args)=>{
    console.log(`WARN: ${message}`, ...args);
};
/**
 * @param {string} version
 * @param {string} message
 */ const deprecated = (version, message)=>{
    if (seenDeprecations[`${version}/${message}`]) return;
    console.log(`Deprecated as of ${version}. ${message}`);
    seenDeprecations[`${version}/${message}`] = true;
};
/* eslint-disable no-throw-literal */ /**
@typedef {import('highlight.js').CompiledMode} CompiledMode
*/ const MultiClassError = new Error();
/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp | string>} regexes
 * @param {{key: "beginScope"|"endScope"}} opts
 */ function remapScopeNames(mode, regexes, { key }) {
    let offset = 0;
    const scopeNames = mode[key];
    /** @type Record<number,boolean> */ const emit = {};
    /** @type Record<number,string> */ const positions = {};
    for(let i = 1; i <= regexes.length; i++){
        positions[i + offset] = scopeNames[i];
        emit[i + offset] = true;
        offset += countMatchGroups(regexes[i - 1]);
    }
    // we use _emit to keep track of which match groups are "top-level" to avoid double
    // output from inside match groups
    mode[key] = positions;
    mode[key]._emit = emit;
    mode[key]._multi = true;
}
/**
 * @param {CompiledMode} mode
 */ function beginMultiClass(mode) {
    if (!Array.isArray(mode.begin)) return;
    if (mode.skip || mode.excludeBegin || mode.returnBegin) {
        error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
        throw MultiClassError;
    }
    if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
        error("beginScope must be object");
        throw MultiClassError;
    }
    remapScopeNames(mode, mode.begin, {
        key: "beginScope"
    });
    mode.begin = _rewriteBackreferences(mode.begin, {
        joinWith: ""
    });
}
/**
 * @param {CompiledMode} mode
 */ function endMultiClass(mode) {
    if (!Array.isArray(mode.end)) return;
    if (mode.skip || mode.excludeEnd || mode.returnEnd) {
        error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
        throw MultiClassError;
    }
    if (typeof mode.endScope !== "object" || mode.endScope === null) {
        error("endScope must be object");
        throw MultiClassError;
    }
    remapScopeNames(mode, mode.end, {
        key: "endScope"
    });
    mode.end = _rewriteBackreferences(mode.end, {
        joinWith: ""
    });
}
/**
 * this exists only to allow `scope: {}` to be used beside `match:`
 * Otherwise `beginScope` would necessary and that would look weird

  {
    match: [ /def/, /\w+/ ]
    scope: { 1: "keyword" , 2: "title" }
  }

 * @param {CompiledMode} mode
 */ function scopeSugar(mode) {
    if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
        mode.beginScope = mode.scope;
        delete mode.scope;
    }
}
/**
 * @param {CompiledMode} mode
 */ function MultiClass(mode) {
    scopeSugar(mode);
    if (typeof mode.beginScope === "string") mode.beginScope = {
        _wrap: mode.beginScope
    };
    if (typeof mode.endScope === "string") mode.endScope = {
        _wrap: mode.endScope
    };
    beginMultiClass(mode);
    endMultiClass(mode);
}
/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
*/ // compilation
/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */ function compileLanguage(language) {
    /**
   * Builds a regex with the case sensitivity of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */ function langRe(value, global) {
        return new RegExp(source(value), 'm' + (language.case_insensitive ? 'i' : '') + (language.unicodeRegex ? 'u' : '') + (global ? 'g' : ''));
    }
    /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */ class MultiRegex {
        constructor(){
            this.matchIndexes = {};
            // @ts-ignore
            this.regexes = [];
            this.matchAt = 1;
            this.position = 0;
        }
        // @ts-ignore
        addRule(re, opts) {
            opts.position = this.position++;
            // @ts-ignore
            this.matchIndexes[this.matchAt] = opts;
            this.regexes.push([
                opts,
                re
            ]);
            this.matchAt += countMatchGroups(re) + 1;
        }
        compile() {
            if (this.regexes.length === 0) // avoids the need to check length every time exec is called
            // @ts-ignore
            this.exec = ()=>null;
            const terminators = this.regexes.map((el)=>el[1]);
            this.matcherRe = langRe(_rewriteBackreferences(terminators, {
                joinWith: '|'
            }), true);
            this.lastIndex = 0;
        }
        /** @param {string} s */ exec(s) {
            this.matcherRe.lastIndex = this.lastIndex;
            const match = this.matcherRe.exec(s);
            if (!match) return null;
            // eslint-disable-next-line no-undefined
            const i = match.findIndex((el, i)=>i > 0 && el !== undefined);
            // @ts-ignore
            const matchData = this.matchIndexes[i];
            // trim off any earlier non-relevant match groups (ie, the other regex
            // match groups that make up the multi-matcher)
            match.splice(0, i);
            return Object.assign(match, matchData);
        }
    }
    /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */ class ResumableMultiRegex {
        constructor(){
            // @ts-ignore
            this.rules = [];
            // @ts-ignore
            this.multiRegexes = [];
            this.count = 0;
            this.lastIndex = 0;
            this.regexIndex = 0;
        }
        // @ts-ignore
        getMatcher(index) {
            if (this.multiRegexes[index]) return this.multiRegexes[index];
            const matcher = new MultiRegex();
            this.rules.slice(index).forEach(([re, opts])=>matcher.addRule(re, opts));
            matcher.compile();
            this.multiRegexes[index] = matcher;
            return matcher;
        }
        resumingScanAtSamePosition() {
            return this.regexIndex !== 0;
        }
        considerAll() {
            this.regexIndex = 0;
        }
        // @ts-ignore
        addRule(re, opts) {
            this.rules.push([
                re,
                opts
            ]);
            if (opts.type === "begin") this.count++;
        }
        /** @param {string} s */ exec(s) {
            const m = this.getMatcher(this.regexIndex);
            m.lastIndex = this.lastIndex;
            let result = m.exec(s);
            // The following is because we have no easy way to say "resume scanning at the
            // existing position but also skip the current rule ONLY". What happens is
            // all prior rules are also skipped which can result in matching the wrong
            // thing. Example of matching "booger":
            // our matcher is [string, "booger", number]
            //
            // ....booger....
            // if "booger" is ignored then we'd really need a regex to scan from the
            // SAME position for only: [string, number] but ignoring "booger" (if it
            // was the first match), a simple resume would scan ahead who knows how
            // far looking only for "number", ignoring potential string matches (or
            // future "booger" matches that might be valid.)
            // So what we do: We execute two matchers, one resuming at the same
            // position, but the second full matcher starting at the position after:
            //     /--- resume first regex match here (for [number])
            //     |/---- full match here for [string, "booger", number]
            //     vv
            // ....booger....
            // Which ever results in a match first is then used. So this 3-4 step
            // process essentially allows us to say "match at this position, excluding
            // a prior rule that was ignored".
            //
            // 1. Match "booger" first, ignore. Also proves that [string] does non match.
            // 2. Resume matching for [number]
            // 3. Match at index + 1 for [string, "booger", number]
            // 4. If #2 and #3 result in matches, which came first?
            if (this.resumingScanAtSamePosition()) {
                if (result && result.index === this.lastIndex) ;
                else {
                    const m2 = this.getMatcher(0);
                    m2.lastIndex = this.lastIndex + 1;
                    result = m2.exec(s);
                }
            }
            if (result) {
                this.regexIndex += result.position + 1;
                if (this.regexIndex === this.count) // wrap-around to considering all matches again
                this.considerAll();
            }
            return result;
        }
    }
    /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */ function buildModeRegex(mode) {
        const mm = new ResumableMultiRegex();
        mode.contains.forEach((term)=>mm.addRule(term.begin, {
                rule: term,
                type: "begin"
            }));
        if (mode.terminatorEnd) mm.addRule(mode.terminatorEnd, {
            type: "end"
        });
        if (mode.illegal) mm.addRule(mode.illegal, {
            type: "illegal"
        });
        return mm;
    }
    /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */ /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */ function compileMode(mode, parent) {
        const cmode = /** @type CompiledMode */ mode;
        if (mode.isCompiled) return cmode;
        [
            scopeClassName,
            // do this early so compiler extensions generally don't have to worry about
            // the distinction between match/begin
            compileMatch,
            MultiClass,
            beforeMatchExt
        ].forEach((ext)=>ext(mode, parent));
        language.compilerExtensions.forEach((ext)=>ext(mode, parent));
        // __beforeBegin is considered private API, internal use only
        mode.__beforeBegin = null;
        [
            beginKeywords,
            // do this later so compiler extensions that come earlier have access to the
            // raw array if they wanted to perhaps manipulate it, etc.
            compileIllegal,
            // default to 1 relevance if not specified
            compileRelevance
        ].forEach((ext)=>ext(mode, parent));
        mode.isCompiled = true;
        let keywordPattern = null;
        if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
            // we need a copy because keywords might be compiled multiple times
            // so we can't go deleting $pattern from the original on the first
            // pass
            mode.keywords = Object.assign({}, mode.keywords);
            keywordPattern = mode.keywords.$pattern;
            delete mode.keywords.$pattern;
        }
        keywordPattern = keywordPattern || /\w+/;
        if (mode.keywords) mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
        cmode.keywordPatternRe = langRe(keywordPattern, true);
        if (parent) {
            if (!mode.begin) mode.begin = /\B|\b/;
            cmode.beginRe = langRe(cmode.begin);
            if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
            if (mode.end) cmode.endRe = langRe(cmode.end);
            cmode.terminatorEnd = source(cmode.end) || '';
            if (mode.endsWithParent && parent.terminatorEnd) cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
        }
        if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ mode.illegal);
        if (!mode.contains) mode.contains = [];
        mode.contains = [].concat(...mode.contains.map(function(c) {
            return expandOrCloneMode(c === 'self' ? mode : c);
        }));
        mode.contains.forEach(function(c) {
            compileMode(/** @type Mode */ c, cmode);
        });
        if (mode.starts) compileMode(mode.starts, parent);
        cmode.matcher = buildModeRegex(cmode);
        return cmode;
    }
    if (!language.compilerExtensions) language.compilerExtensions = [];
    // self is not valid at the top-level
    if (language.contains && language.contains.includes('self')) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    // we need a null object, which inherit will guarantee
    language.classNameAliases = inherit$1(language.classNameAliases || {});
    return compileMode(/** @type Mode */ language);
}
/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */ function dependencyOnParent(mode) {
    if (!mode) return false;
    return mode.endsWithParent || dependencyOnParent(mode.starts);
}
/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */ function expandOrCloneMode(mode) {
    if (mode.variants && !mode.cachedVariants) mode.cachedVariants = mode.variants.map(function(variant) {
        return inherit$1(mode, {
            variants: null
        }, variant);
    });
    // EXPAND
    // if we have variants then essentially "replace" the mode with the variants
    // this happens in compileMode, where this function is called from
    if (mode.cachedVariants) return mode.cachedVariants;
    // CLONE
    // if we have dependencies on parents then we need a unique
    // instance of ourselves, so we can be reused with many
    // different parents without issue
    if (dependencyOnParent(mode)) return inherit$1(mode, {
        starts: mode.starts ? inherit$1(mode.starts) : null
    });
    if (Object.isFrozen(mode)) return inherit$1(mode);
    // no special dependency issues, just return ourselves
    return mode;
}
var version = "11.11.1";
class HTMLInjectionError extends Error {
    constructor(reason, html){
        super(reason);
        this.name = "HTMLInjectionError";
        this.html = html;
    }
}
/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/ /**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').CompiledScope} CompiledScope
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSApi} HLJSApi
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').PluginEvent} PluginEvent
@typedef {import('highlight.js').HLJSOptions} HLJSOptions
@typedef {import('highlight.js').LanguageFn} LanguageFn
@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
@typedef {import('highlight.js/private').MatchType} MatchType
@typedef {import('highlight.js/private').KeywordData} KeywordData
@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
@typedef {import('highlight.js').HighlightOptions} HighlightOptions
@typedef {import('highlight.js').HighlightResult} HighlightResult
*/ const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;
/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */ const HLJS = function(hljs) {
    // Global internal variables used within the highlight.js library.
    /** @type {Record<string, Language>} */ const languages = Object.create(null);
    /** @type {Record<string, string>} */ const aliases = Object.create(null);
    /** @type {HLJSPlugin[]} */ const plugins = [];
    // safe/production mode - swallows more errors, tries to keep running
    // even if a single syntax or parse hits a fatal error
    let SAFE_MODE = true;
    const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
    /** @type {Language} */ const PLAINTEXT_LANGUAGE = {
        disableAutodetect: true,
        name: 'Plain text',
        contains: []
    };
    // Global options used when within external APIs. This is modified when
    // calling the `hljs.configure` function.
    /** @type HLJSOptions */ let options = {
        ignoreUnescapedHTML: false,
        throwUnescapedHTML: false,
        noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
        classPrefix: 'hljs-',
        cssSelector: 'pre code',
        languages: null,
        // beta configuration options, subject to change, welcome to discuss
        // https://github.com/highlightjs/highlight.js/issues/1086
        __emitter: TokenTreeEmitter
    };
    /* Utility functions */ /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */ function shouldNotHighlight(languageName) {
        return options.noHighlightRe.test(languageName);
    }
    /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */ function blockLanguage(block) {
        let classes = block.className + ' ';
        classes += block.parentNode ? block.parentNode.className : '';
        // language-* takes precedence over non-prefixed class names.
        const match = options.languageDetectRe.exec(classes);
        if (match) {
            const language = getLanguage(match[1]);
            if (!language) {
                warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
                warn("Falling back to no-highlight mode for this block.", block);
            }
            return language ? match[1] : 'no-highlight';
        }
        return classes.split(/\s+/).find((_class)=>shouldNotHighlight(_class) || getLanguage(_class));
    }
    /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrLanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */ function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
        let code = "";
        let languageName = "";
        if (typeof optionsOrCode === "object") {
            code = codeOrLanguageName;
            ignoreIllegals = optionsOrCode.ignoreIllegals;
            languageName = optionsOrCode.language;
        } else {
            // old API
            deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
            deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
            languageName = codeOrLanguageName;
            code = optionsOrCode;
        }
        // https://github.com/highlightjs/highlight.js/issues/3149
        // eslint-disable-next-line no-undefined
        if (ignoreIllegals === undefined) ignoreIllegals = true;
        /** @type {BeforeHighlightContext} */ const context = {
            code,
            language: languageName
        };
        // the plugin can change the desired language or the code to be highlighted
        // just be changing the object it was passed
        fire("before:highlight", context);
        // a before plugin can usurp the result completely by providing it's own
        // in which case we don't even need to call highlight
        const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
        result.code = context.code;
        // the plugin can change anything in result to suite it
        fire("after:highlight", result);
        return result;
    }
    /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */ function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
        const keywordHits = Object.create(null);
        /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {string} matchText - the textual match
     * @returns {KeywordData | false}
     */ function keywordData(mode, matchText) {
            return mode.keywords[matchText];
        }
        function processKeywords() {
            if (!top.keywords) {
                emitter.addText(modeBuffer);
                return;
            }
            let lastIndex = 0;
            top.keywordPatternRe.lastIndex = 0;
            let match = top.keywordPatternRe.exec(modeBuffer);
            let buf = "";
            while(match){
                buf += modeBuffer.substring(lastIndex, match.index);
                const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
                const data = keywordData(top, word);
                if (data) {
                    const [kind, keywordRelevance] = data;
                    emitter.addText(buf);
                    buf = "";
                    keywordHits[word] = (keywordHits[word] || 0) + 1;
                    if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
                    if (kind.startsWith("_")) // _ implied for relevance only, do not highlight
                    // by applying a class name
                    buf += match[0];
                    else {
                        const cssClass = language.classNameAliases[kind] || kind;
                        emitKeyword(match[0], cssClass);
                    }
                } else buf += match[0];
                lastIndex = top.keywordPatternRe.lastIndex;
                match = top.keywordPatternRe.exec(modeBuffer);
            }
            buf += modeBuffer.substring(lastIndex);
            emitter.addText(buf);
        }
        function processSubLanguage() {
            if (modeBuffer === "") return;
            /** @type HighlightResult */ let result = null;
            if (typeof top.subLanguage === 'string') {
                if (!languages[top.subLanguage]) {
                    emitter.addText(modeBuffer);
                    return;
                }
                result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
                continuations[top.subLanguage] = /** @type {CompiledMode} */ result._top;
            } else result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
            // Counting embedded language score towards the host language may be disabled
            // with zeroing the containing mode relevance. Use case in point is Markdown that
            // allows XML everywhere and makes every XML snippet to have a much larger Markdown
            // score.
            if (top.relevance > 0) relevance += result.relevance;
            emitter.__addSublanguage(result._emitter, result.language);
        }
        function processBuffer() {
            if (top.subLanguage != null) processSubLanguage();
            else processKeywords();
            modeBuffer = '';
        }
        /**
     * @param {string} text
     * @param {string} scope
     */ function emitKeyword(keyword, scope) {
            if (keyword === "") return;
            emitter.startScope(scope);
            emitter.addText(keyword);
            emitter.endScope();
        }
        /**
     * @param {CompiledScope} scope
     * @param {RegExpMatchArray} match
     */ function emitMultiClass(scope, match) {
            let i = 1;
            const max = match.length - 1;
            while(i <= max){
                if (!scope._emit[i]) {
                    i++;
                    continue;
                }
                const klass = language.classNameAliases[scope[i]] || scope[i];
                const text = match[i];
                if (klass) emitKeyword(text, klass);
                else {
                    modeBuffer = text;
                    processKeywords();
                    modeBuffer = "";
                }
                i++;
            }
        }
        /**
     * @param {CompiledMode} mode - new mode to start
     * @param {RegExpMatchArray} match
     */ function startNewMode(mode, match) {
            if (mode.scope && typeof mode.scope === "string") emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
            if (mode.beginScope) {
                // beginScope just wraps the begin match itself in a scope
                if (mode.beginScope._wrap) {
                    emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
                    modeBuffer = "";
                } else if (mode.beginScope._multi) {
                    // at this point modeBuffer should just be the match
                    emitMultiClass(mode.beginScope, match);
                    modeBuffer = "";
                }
            }
            top = Object.create(mode, {
                parent: {
                    value: top
                }
            });
            return top;
        }
        /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */ function endOfMode(mode, match, matchPlusRemainder) {
            let matched = startsWith(mode.endRe, matchPlusRemainder);
            if (matched) {
                if (mode["on:end"]) {
                    const resp = new Response(mode);
                    mode["on:end"](match, resp);
                    if (resp.isMatchIgnored) matched = false;
                }
                if (matched) {
                    while(mode.endsParent && mode.parent)mode = mode.parent;
                    return mode;
                }
            }
            // even if on:end fires an `ignore` it's still possible
            // that we might trigger the end node because of a parent mode
            if (mode.endsWithParent) return endOfMode(mode.parent, match, matchPlusRemainder);
        }
        /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */ function doIgnore(lexeme) {
            if (top.matcher.regexIndex === 0) {
                // no more regexes to potentially match here, so we move the cursor forward one
                // space
                modeBuffer += lexeme[0];
                return 1;
            } else {
                // no need to move the cursor, we still have additional regexes to try and
                // match at this very spot
                resumeScanAtSamePosition = true;
                return 0;
            }
        }
        /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */ function doBeginMatch(match) {
            const lexeme = match[0];
            const newMode = match.rule;
            const resp = new Response(newMode);
            // first internal before callbacks, then the public ones
            const beforeCallbacks = [
                newMode.__beforeBegin,
                newMode["on:begin"]
            ];
            for (const cb of beforeCallbacks){
                if (!cb) continue;
                cb(match, resp);
                if (resp.isMatchIgnored) return doIgnore(lexeme);
            }
            if (newMode.skip) modeBuffer += lexeme;
            else {
                if (newMode.excludeBegin) modeBuffer += lexeme;
                processBuffer();
                if (!newMode.returnBegin && !newMode.excludeBegin) modeBuffer = lexeme;
            }
            startNewMode(newMode, match);
            return newMode.returnBegin ? 0 : lexeme.length;
        }
        /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */ function doEndMatch(match) {
            const lexeme = match[0];
            const matchPlusRemainder = codeToHighlight.substring(match.index);
            const endMode = endOfMode(top, match, matchPlusRemainder);
            if (!endMode) return NO_MATCH;
            const origin = top;
            if (top.endScope && top.endScope._wrap) {
                processBuffer();
                emitKeyword(lexeme, top.endScope._wrap);
            } else if (top.endScope && top.endScope._multi) {
                processBuffer();
                emitMultiClass(top.endScope, match);
            } else if (origin.skip) modeBuffer += lexeme;
            else {
                if (!(origin.returnEnd || origin.excludeEnd)) modeBuffer += lexeme;
                processBuffer();
                if (origin.excludeEnd) modeBuffer = lexeme;
            }
            do {
                if (top.scope) emitter.closeNode();
                if (!top.skip && !top.subLanguage) relevance += top.relevance;
                top = top.parent;
            }while (top !== endMode.parent);
            if (endMode.starts) startNewMode(endMode.starts, match);
            return origin.returnEnd ? 0 : lexeme.length;
        }
        function processContinuations() {
            const list = [];
            for(let current = top; current !== language; current = current.parent)if (current.scope) list.unshift(current.scope);
            list.forEach((item)=>emitter.openNode(item));
        }
        /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */ let lastMatch = {};
        /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */ function processLexeme(textBeforeMatch, match) {
            const lexeme = match && match[0];
            // add non-matched text to the current mode buffer
            modeBuffer += textBeforeMatch;
            if (lexeme == null) {
                processBuffer();
                return 0;
            }
            // we've found a 0 width match and we're stuck, so we need to advance
            // this happens when we have badly behaved rules that have optional matchers to the degree that
            // sometimes they can end up matching nothing at all
            // Ref: https://github.com/highlightjs/highlight.js/issues/2140
            if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
                // spit the "skipped" character that our regex choked on back into the output sequence
                modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
                if (!SAFE_MODE) {
                    /** @type {AnnotatedError} */ const err = new Error(`0 width match regex (${languageName})`);
                    err.languageName = languageName;
                    err.badRule = lastMatch.rule;
                    throw err;
                }
                return 1;
            }
            lastMatch = match;
            if (match.type === "begin") return doBeginMatch(match);
            else if (match.type === "illegal" && !ignoreIllegals) {
                // illegal match, we do not continue processing
                /** @type {AnnotatedError} */ const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
                err.mode = top;
                throw err;
            } else if (match.type === "end") {
                const processed = doEndMatch(match);
                if (processed !== NO_MATCH) return processed;
            }
            // edge case for when illegal matches $ (end of line) which is technically
            // a 0 width match but not a begin/end match so it's not caught by the
            // first handler (when ignoreIllegals is true)
            if (match.type === "illegal" && lexeme === "") {
                // advance so we aren't stuck in an infinite loop
                modeBuffer += "\n";
                return 1;
            }
            // infinite loops are BAD, this is a last ditch catch all. if we have a
            // decent number of iterations yet our index (cursor position in our
            // parsing) still 3x behind our index then something is very wrong
            // so we bail
            if (iterations > 100000 && iterations > match.index * 3) {
                const err = new Error('potential infinite loop, way more iterations than matches');
                throw err;
            }
            /*
      Why might be find ourselves here?  An potential end match that was
      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
      (this could be because a callback requests the match be ignored, etc)

      This causes no real harm other than stopping a few times too many.
      */ modeBuffer += lexeme;
            return lexeme.length;
        }
        const language = getLanguage(languageName);
        if (!language) {
            error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
            throw new Error('Unknown language: "' + languageName + '"');
        }
        const md = compileLanguage(language);
        let result = '';
        /** @type {CompiledMode} */ let top = continuation || md;
        /** @type Record<string,CompiledMode> */ const continuations = {}; // keep continuations for sub-languages
        const emitter = new options.__emitter(options);
        processContinuations();
        let modeBuffer = '';
        let relevance = 0;
        let index = 0;
        let iterations = 0;
        let resumeScanAtSamePosition = false;
        try {
            if (!language.__emitTokens) {
                top.matcher.considerAll();
                for(;;){
                    iterations++;
                    if (resumeScanAtSamePosition) // only regexes not matched previously will now be
                    // considered for a potential match
                    resumeScanAtSamePosition = false;
                    else top.matcher.considerAll();
                    top.matcher.lastIndex = index;
                    const match = top.matcher.exec(codeToHighlight);
                    // console.log("match", match[0], match.rule && match.rule.begin)
                    if (!match) break;
                    const beforeMatch = codeToHighlight.substring(index, match.index);
                    const processedCount = processLexeme(beforeMatch, match);
                    index = match.index + processedCount;
                }
                processLexeme(codeToHighlight.substring(index));
            } else language.__emitTokens(codeToHighlight, emitter);
            emitter.finalize();
            result = emitter.toHTML();
            return {
                language: languageName,
                value: result,
                relevance,
                illegal: false,
                _emitter: emitter,
                _top: top
            };
        } catch (err) {
            if (err.message && err.message.includes('Illegal')) return {
                language: languageName,
                value: escape(codeToHighlight),
                illegal: true,
                relevance: 0,
                _illegalBy: {
                    message: err.message,
                    index,
                    context: codeToHighlight.slice(index - 100, index + 100),
                    mode: err.mode,
                    resultSoFar: result
                },
                _emitter: emitter
            };
            else if (SAFE_MODE) return {
                language: languageName,
                value: escape(codeToHighlight),
                illegal: false,
                relevance: 0,
                errorRaised: err,
                _emitter: emitter,
                _top: top
            };
            else throw err;
        }
    }
    /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */ function justTextHighlightResult(code) {
        const result = {
            value: escape(code),
            illegal: false,
            relevance: 0,
            _top: PLAINTEXT_LANGUAGE,
            _emitter: new options.__emitter(options)
        };
        result._emitter.addText(code);
        return result;
    }
    /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - secondBest (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */ function highlightAuto(code, languageSubset) {
        languageSubset = languageSubset || options.languages || Object.keys(languages);
        const plaintext = justTextHighlightResult(code);
        const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name)=>_highlight(name, code, false));
        results.unshift(plaintext); // plaintext is always an option
        const sorted = results.sort((a, b)=>{
            // sort base on relevance
            if (a.relevance !== b.relevance) return b.relevance - a.relevance;
            // always award the tie to the base language
            // ie if C++ and Arduino are tied, it's more likely to be C++
            if (a.language && b.language) {
                if (getLanguage(a.language).supersetOf === b.language) return 1;
                else if (getLanguage(b.language).supersetOf === a.language) return -1;
            }
            // otherwise say they are equal, which has the effect of sorting on
            // relevance while preserving the original ordering - which is how ties
            // have historically been settled, ie the language that comes first always
            // wins in the case of a tie
            return 0;
        });
        const [best, secondBest] = sorted;
        /** @type {AutoHighlightResult} */ const result = best;
        result.secondBest = secondBest;
        return result;
    }
    /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */ function updateClassName(element, currentLang, resultLang) {
        const language = currentLang && aliases[currentLang] || resultLang;
        element.classList.add("hljs");
        element.classList.add(`language-${language}`);
    }
    /**
   * Applies highlighting to a DOM node containing code.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */ function highlightElement(element) {
        /** @type HTMLElement */ let node = null;
        const language = blockLanguage(element);
        if (shouldNotHighlight(language)) return;
        fire("before:highlightElement", {
            el: element,
            language
        });
        if (element.dataset.highlighted) {
            console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
            return;
        }
        // we should be all text, no child nodes (unescaped HTML) - this is possibly
        // an HTML injection attack - it's likely too late if this is already in
        // production (the code has likely already done its damage by the time
        // we're seeing it)... but we yell loudly about this so that hopefully it's
        // more likely to be caught in development before making it to production
        if (element.children.length > 0) {
            if (!options.ignoreUnescapedHTML) {
                console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
                console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
                console.warn("The element with unescaped HTML:");
                console.warn(element);
            }
            if (options.throwUnescapedHTML) {
                const err = new HTMLInjectionError("One of your code blocks includes unescaped HTML.", element.innerHTML);
                throw err;
            }
        }
        node = element;
        const text = node.textContent;
        const result = language ? highlight(text, {
            language,
            ignoreIllegals: true
        }) : highlightAuto(text);
        element.innerHTML = result.value;
        element.dataset.highlighted = "yes";
        updateClassName(element, language, result.language);
        element.result = {
            language: result.language,
            // TODO: remove with version 11.0
            re: result.relevance,
            relevance: result.relevance
        };
        if (result.secondBest) element.secondBest = {
            language: result.secondBest.language,
            relevance: result.secondBest.relevance
        };
        fire("after:highlightElement", {
            el: element,
            result,
            text
        });
    }
    /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */ function configure(userOptions) {
        options = inherit(options, userOptions);
    }
    // TODO: remove v12, deprecated
    const initHighlighting = ()=>{
        highlightAll();
        deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    // TODO: remove v12, deprecated
    function initHighlightingOnLoad() {
        highlightAll();
        deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let wantsHighlight = false;
    /**
   * auto-highlights all pre>code elements on the page
   */ function highlightAll() {
        function boot() {
            // if a highlight was requested before DOM was loaded, do now
            highlightAll();
        }
        // if we are called too early in the loading process
        if (document.readyState === "loading") {
            // make sure the event listener is only added once
            if (!wantsHighlight) window.addEventListener('DOMContentLoaded', boot, false);
            wantsHighlight = true;
            return;
        }
        const blocks = document.querySelectorAll(options.cssSelector);
        blocks.forEach(highlightElement);
    }
    /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */ function registerLanguage(languageName, languageDefinition) {
        let lang = null;
        try {
            lang = languageDefinition(hljs);
        } catch (error$1) {
            error("Language definition for '{}' could not be registered.".replace("{}", languageName));
            // hard or soft error
            if (!SAFE_MODE) throw error$1;
            else error(error$1);
            // languages that have serious errors are replaced with essentially a
            // "plaintext" stand-in so that the code blocks will still get normal
            // css classes applied to them - and one bad language won't break the
            // entire highlighter
            lang = PLAINTEXT_LANGUAGE;
        }
        // give it a temporary name if it doesn't have one in the meta-data
        if (!lang.name) lang.name = languageName;
        languages[languageName] = lang;
        lang.rawDefinition = languageDefinition.bind(null, hljs);
        if (lang.aliases) registerAliases(lang.aliases, {
            languageName
        });
    }
    /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */ function unregisterLanguage(languageName) {
        delete languages[languageName];
        for (const alias of Object.keys(aliases))if (aliases[alias] === languageName) delete aliases[alias];
    }
    /**
   * @returns {string[]} List of language internal names
   */ function listLanguages() {
        return Object.keys(languages);
    }
    /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */ function getLanguage(name) {
        name = (name || '').toLowerCase();
        return languages[name] || languages[aliases[name]];
    }
    /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */ function registerAliases(aliasList, { languageName }) {
        if (typeof aliasList === 'string') aliasList = [
            aliasList
        ];
        aliasList.forEach((alias)=>{
            aliases[alias.toLowerCase()] = languageName;
        });
    }
    /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */ function autoDetection(name) {
        const lang = getLanguage(name);
        return lang && !lang.disableAutodetect;
    }
    /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */ function upgradePluginAPI(plugin) {
        // TODO: remove with v12
        if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) plugin["before:highlightElement"] = (data)=>{
            plugin["before:highlightBlock"](Object.assign({
                block: data.el
            }, data));
        };
        if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) plugin["after:highlightElement"] = (data)=>{
            plugin["after:highlightBlock"](Object.assign({
                block: data.el
            }, data));
        };
    }
    /**
   * @param {HLJSPlugin} plugin
   */ function addPlugin(plugin) {
        upgradePluginAPI(plugin);
        plugins.push(plugin);
    }
    /**
   * @param {HLJSPlugin} plugin
   */ function removePlugin(plugin) {
        const index = plugins.indexOf(plugin);
        if (index !== -1) plugins.splice(index, 1);
    }
    /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */ function fire(event, args) {
        const cb = event;
        plugins.forEach(function(plugin) {
            if (plugin[cb]) plugin[cb](args);
        });
    }
    /**
   * DEPRECATED
   * @param {HighlightedHTMLElement} el
   */ function deprecateHighlightBlock(el) {
        deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
        deprecated("10.7.0", "Please use highlightElement now.");
        return highlightElement(el);
    }
    /* Interface definition */ Object.assign(hljs, {
        highlight,
        highlightAuto,
        highlightAll,
        highlightElement,
        // TODO: Remove with v12 API
        highlightBlock: deprecateHighlightBlock,
        configure,
        initHighlighting,
        initHighlightingOnLoad,
        registerLanguage,
        unregisterLanguage,
        listLanguages,
        getLanguage,
        registerAliases,
        autoDetection,
        inherit,
        addPlugin,
        removePlugin
    });
    hljs.debugMode = function() {
        SAFE_MODE = false;
    };
    hljs.safeMode = function() {
        SAFE_MODE = true;
    };
    hljs.versionString = version;
    hljs.regex = {
        concat: concat,
        lookahead: lookahead,
        either: either,
        optional: optional,
        anyNumberOfTimes: anyNumberOfTimes
    };
    for(const key in MODES)// @ts-ignore
    if (typeof MODES[key] === "object") // @ts-ignore
    deepFreeze(MODES[key]);
    // merge all the modes/regexes into our main object
    Object.assign(hljs, MODES);
    return hljs;
};
// Other names for the variable may break build script
const highlight = HLJS({});
// returns a new instance of the highlighter to be used for extensions
// check https://github.com/wooorm/lowlight/issues/47
highlight.newInstance = ()=>HLJS({});
module.exports = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;

},{}],"hQIFY":[function(require,module,exports,__globalThis) {
/*
Language: HTML, XML
Website: https://www.w3.org/XML/
Category: common, web
Audit: 2020
*/ /** @type LanguageFn */ function xml(hljs) {
    const regex = hljs.regex;
    // XML names can have the following additional letters: https://www.w3.org/TR/xml/#NT-NameChar
    // OTHER_NAME_CHARS = /[:\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]/;
    // Element names start with NAME_START_CHAR followed by optional other Unicode letters, ASCII digits, hyphens, underscores, and periods
    // const TAG_NAME_RE = regex.concat(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, regex.optional(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:/), /[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*/);;
    // const XML_IDENT_RE = /[A-Z_a-z:\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]+/;
    // const TAG_NAME_RE = regex.concat(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, regex.optional(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:/), /[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*/);
    // however, to cater for performance and more Unicode support rely simply on the Unicode letter class
    const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
    const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
    const XML_ENTITIES = {
        className: 'symbol',
        begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
    };
    const XML_META_KEYWORDS = {
        begin: /\s/,
        contains: [
            {
                className: 'keyword',
                begin: /#?[a-z_][a-z1-9_-]+/,
                illegal: /\n/
            }
        ]
    };
    const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
        begin: /\(/,
        end: /\)/
    });
    const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, {
        className: 'string'
    });
    const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
        className: 'string'
    });
    const TAG_INTERNALS = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [
            {
                className: 'attr',
                begin: XML_IDENT_RE,
                relevance: 0
            },
            {
                begin: /=\s*/,
                relevance: 0,
                contains: [
                    {
                        className: 'string',
                        endsParent: true,
                        variants: [
                            {
                                begin: /"/,
                                end: /"/,
                                contains: [
                                    XML_ENTITIES
                                ]
                            },
                            {
                                begin: /'/,
                                end: /'/,
                                contains: [
                                    XML_ENTITIES
                                ]
                            },
                            {
                                begin: /[^\s"'=<>`]+/
                            }
                        ]
                    }
                ]
            }
        ]
    };
    return {
        name: 'HTML, XML',
        aliases: [
            'html',
            'xhtml',
            'rss',
            'atom',
            'xjb',
            'xsd',
            'xsl',
            'plist',
            'wsf',
            'svg'
        ],
        case_insensitive: true,
        unicodeRegex: true,
        contains: [
            {
                className: 'meta',
                begin: /<![a-z]/,
                end: />/,
                relevance: 10,
                contains: [
                    XML_META_KEYWORDS,
                    QUOTE_META_STRING_MODE,
                    APOS_META_STRING_MODE,
                    XML_META_PAR_KEYWORDS,
                    {
                        begin: /\[/,
                        end: /\]/,
                        contains: [
                            {
                                className: 'meta',
                                begin: /<![a-z]/,
                                end: />/,
                                contains: [
                                    XML_META_KEYWORDS,
                                    XML_META_PAR_KEYWORDS,
                                    QUOTE_META_STRING_MODE,
                                    APOS_META_STRING_MODE
                                ]
                            }
                        ]
                    }
                ]
            },
            hljs.COMMENT(/<!--/, /-->/, {
                relevance: 10
            }),
            {
                begin: /<!\[CDATA\[/,
                end: /\]\]>/,
                relevance: 10
            },
            XML_ENTITIES,
            // xml processing instructions
            {
                className: 'meta',
                end: /\?>/,
                variants: [
                    {
                        begin: /<\?xml/,
                        relevance: 10,
                        contains: [
                            QUOTE_META_STRING_MODE
                        ]
                    },
                    {
                        begin: /<\?[a-z][a-z0-9]+/
                    }
                ]
            },
            {
                className: 'tag',
                /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */ begin: /<style(?=\s|>)/,
                end: />/,
                keywords: {
                    name: 'style'
                },
                contains: [
                    TAG_INTERNALS
                ],
                starts: {
                    end: /<\/style>/,
                    returnEnd: true,
                    subLanguage: [
                        'css',
                        'xml'
                    ]
                }
            },
            {
                className: 'tag',
                // See the comment in the <style tag about the lookahead pattern
                begin: /<script(?=\s|>)/,
                end: />/,
                keywords: {
                    name: 'script'
                },
                contains: [
                    TAG_INTERNALS
                ],
                starts: {
                    end: /<\/script>/,
                    returnEnd: true,
                    subLanguage: [
                        'javascript',
                        'handlebars',
                        'xml'
                    ]
                }
            },
            // we need this for now for jSX
            {
                className: 'tag',
                begin: /<>|<\/>/
            },
            // open tag
            {
                className: 'tag',
                begin: regex.concat(/</, regex.lookahead(regex.concat(TAG_NAME_RE, // <tag/>
                // <tag>
                // <tag ...
                regex.either(/\/>/, />/, /\s/)))),
                end: /\/?>/,
                contains: [
                    {
                        className: 'name',
                        begin: TAG_NAME_RE,
                        relevance: 0,
                        starts: TAG_INTERNALS
                    }
                ]
            },
            // close tag
            {
                className: 'tag',
                begin: regex.concat(/<\//, regex.lookahead(regex.concat(TAG_NAME_RE, />/))),
                contains: [
                    {
                        className: 'name',
                        begin: TAG_NAME_RE,
                        relevance: 0
                    },
                    {
                        begin: />/,
                        relevance: 0,
                        endsParent: true
                    }
                ]
            }
        ]
    };
}
module.exports = xml;

},{}],"kFaPc":[function(require,module,exports,__globalThis) {
const MODES = (hljs)=>{
    return {
        IMPORTANT: {
            scope: 'meta',
            begin: '!important'
        },
        BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
        HEXCOLOR: {
            scope: 'number',
            begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
        },
        FUNCTION_DISPATCH: {
            className: "built_in",
            begin: /[\w-]+(?=\()/
        },
        ATTRIBUTE_SELECTOR_MODE: {
            scope: 'selector-attr',
            begin: /\[/,
            end: /\]/,
            illegal: '$',
            contains: [
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE
            ]
        },
        CSS_NUMBER_MODE: {
            scope: 'number',
            begin: hljs.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
            relevance: 0
        },
        CSS_VARIABLE: {
            className: "attr",
            begin: /--[A-Za-z_][A-Za-z0-9_-]*/
        }
    };
};
const HTML_TAGS = [
    'a',
    'abbr',
    'address',
    'article',
    'aside',
    'audio',
    'b',
    'blockquote',
    'body',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'dd',
    'del',
    'details',
    'dfn',
    'div',
    'dl',
    'dt',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'mark',
    'menu',
    'nav',
    'object',
    'ol',
    'optgroup',
    'option',
    'p',
    'picture',
    'q',
    'quote',
    'samp',
    'section',
    'select',
    'source',
    'span',
    'strong',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'ul',
    'var',
    'video'
];
const SVG_TAGS = [
    'defs',
    'g',
    'marker',
    'mask',
    'pattern',
    'svg',
    'switch',
    'symbol',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feFlood',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMorphology',
    'feOffset',
    'feSpecularLighting',
    'feTile',
    'feTurbulence',
    'linearGradient',
    'radialGradient',
    'stop',
    'circle',
    'ellipse',
    'image',
    'line',
    'path',
    'polygon',
    'polyline',
    'rect',
    'text',
    'use',
    'textPath',
    'tspan',
    'foreignObject',
    'clipPath'
];
const TAGS = [
    ...HTML_TAGS,
    ...SVG_TAGS
];
// Sorting, then reversing makes sure longer attributes/elements like
// `font-weight` are matched fully instead of getting false positives on say `font`
const MEDIA_FEATURES = [
    'any-hover',
    'any-pointer',
    'aspect-ratio',
    'color',
    'color-gamut',
    'color-index',
    'device-aspect-ratio',
    'device-height',
    'device-width',
    'display-mode',
    'forced-colors',
    'grid',
    'height',
    'hover',
    'inverted-colors',
    'monochrome',
    'orientation',
    'overflow-block',
    'overflow-inline',
    'pointer',
    'prefers-color-scheme',
    'prefers-contrast',
    'prefers-reduced-motion',
    'prefers-reduced-transparency',
    'resolution',
    'scan',
    'scripting',
    'update',
    'width',
    // TODO: find a better solution?
    'min-width',
    'max-width',
    'min-height',
    'max-height'
].sort().reverse();
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
const PSEUDO_CLASSES = [
    'active',
    'any-link',
    'blank',
    'checked',
    'current',
    'default',
    'defined',
    'dir',
    'disabled',
    'drop',
    'empty',
    'enabled',
    'first',
    'first-child',
    'first-of-type',
    'fullscreen',
    'future',
    'focus',
    'focus-visible',
    'focus-within',
    'has',
    'host',
    'host-context',
    'hover',
    'indeterminate',
    'in-range',
    'invalid',
    'is',
    'lang',
    'last-child',
    'last-of-type',
    'left',
    'link',
    'local-link',
    'not',
    'nth-child',
    'nth-col',
    'nth-last-child',
    'nth-last-col',
    'nth-last-of-type',
    'nth-of-type',
    'only-child',
    'only-of-type',
    'optional',
    'out-of-range',
    'past',
    'placeholder-shown',
    'read-only',
    'read-write',
    'required',
    'right',
    'root',
    'scope',
    'target',
    'target-within',
    'user-invalid',
    'valid',
    'visited',
    'where' // where()
].sort().reverse();
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
const PSEUDO_ELEMENTS = [
    'after',
    'backdrop',
    'before',
    'cue',
    'cue-region',
    'first-letter',
    'first-line',
    'grammar-error',
    'marker',
    'part',
    'placeholder',
    'selection',
    'slotted',
    'spelling-error'
].sort().reverse();
const ATTRIBUTES = [
    'accent-color',
    'align-content',
    'align-items',
    'align-self',
    'alignment-baseline',
    'all',
    'anchor-name',
    'animation',
    'animation-composition',
    'animation-delay',
    'animation-direction',
    'animation-duration',
    'animation-fill-mode',
    'animation-iteration-count',
    'animation-name',
    'animation-play-state',
    'animation-range',
    'animation-range-end',
    'animation-range-start',
    'animation-timeline',
    'animation-timing-function',
    'appearance',
    'aspect-ratio',
    'backdrop-filter',
    'backface-visibility',
    'background',
    'background-attachment',
    'background-blend-mode',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-position-x',
    'background-position-y',
    'background-repeat',
    'background-size',
    'baseline-shift',
    'block-size',
    'border',
    'border-block',
    'border-block-color',
    'border-block-end',
    'border-block-end-color',
    'border-block-end-style',
    'border-block-end-width',
    'border-block-start',
    'border-block-start-color',
    'border-block-start-style',
    'border-block-start-width',
    'border-block-style',
    'border-block-width',
    'border-bottom',
    'border-bottom-color',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-bottom-style',
    'border-bottom-width',
    'border-collapse',
    'border-color',
    'border-end-end-radius',
    'border-end-start-radius',
    'border-image',
    'border-image-outset',
    'border-image-repeat',
    'border-image-slice',
    'border-image-source',
    'border-image-width',
    'border-inline',
    'border-inline-color',
    'border-inline-end',
    'border-inline-end-color',
    'border-inline-end-style',
    'border-inline-end-width',
    'border-inline-start',
    'border-inline-start-color',
    'border-inline-start-style',
    'border-inline-start-width',
    'border-inline-style',
    'border-inline-width',
    'border-left',
    'border-left-color',
    'border-left-style',
    'border-left-width',
    'border-radius',
    'border-right',
    'border-right-color',
    'border-right-style',
    'border-right-width',
    'border-spacing',
    'border-start-end-radius',
    'border-start-start-radius',
    'border-style',
    'border-top',
    'border-top-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-top-style',
    'border-top-width',
    'border-width',
    'bottom',
    'box-align',
    'box-decoration-break',
    'box-direction',
    'box-flex',
    'box-flex-group',
    'box-lines',
    'box-ordinal-group',
    'box-orient',
    'box-pack',
    'box-shadow',
    'box-sizing',
    'break-after',
    'break-before',
    'break-inside',
    'caption-side',
    'caret-color',
    'clear',
    'clip',
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'color-scheme',
    'column-count',
    'column-fill',
    'column-gap',
    'column-rule',
    'column-rule-color',
    'column-rule-style',
    'column-rule-width',
    'column-span',
    'column-width',
    'columns',
    'contain',
    'contain-intrinsic-block-size',
    'contain-intrinsic-height',
    'contain-intrinsic-inline-size',
    'contain-intrinsic-size',
    'contain-intrinsic-width',
    'container',
    'container-name',
    'container-type',
    'content',
    'content-visibility',
    'counter-increment',
    'counter-reset',
    'counter-set',
    'cue',
    'cue-after',
    'cue-before',
    'cursor',
    'cx',
    'cy',
    'direction',
    'display',
    'dominant-baseline',
    'empty-cells',
    'enable-background',
    'field-sizing',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'flex',
    'flex-basis',
    'flex-direction',
    'flex-flow',
    'flex-grow',
    'flex-shrink',
    'flex-wrap',
    'float',
    'flood-color',
    'flood-opacity',
    'flow',
    'font',
    'font-display',
    'font-family',
    'font-feature-settings',
    'font-kerning',
    'font-language-override',
    'font-optical-sizing',
    'font-palette',
    'font-size',
    'font-size-adjust',
    'font-smooth',
    'font-smoothing',
    'font-stretch',
    'font-style',
    'font-synthesis',
    'font-synthesis-position',
    'font-synthesis-small-caps',
    'font-synthesis-style',
    'font-synthesis-weight',
    'font-variant',
    'font-variant-alternates',
    'font-variant-caps',
    'font-variant-east-asian',
    'font-variant-emoji',
    'font-variant-ligatures',
    'font-variant-numeric',
    'font-variant-position',
    'font-variation-settings',
    'font-weight',
    'forced-color-adjust',
    'gap',
    'glyph-orientation-horizontal',
    'glyph-orientation-vertical',
    'grid',
    'grid-area',
    'grid-auto-columns',
    'grid-auto-flow',
    'grid-auto-rows',
    'grid-column',
    'grid-column-end',
    'grid-column-start',
    'grid-gap',
    'grid-row',
    'grid-row-end',
    'grid-row-start',
    'grid-template',
    'grid-template-areas',
    'grid-template-columns',
    'grid-template-rows',
    'hanging-punctuation',
    'height',
    'hyphenate-character',
    'hyphenate-limit-chars',
    'hyphens',
    'icon',
    'image-orientation',
    'image-rendering',
    'image-resolution',
    'ime-mode',
    'initial-letter',
    'initial-letter-align',
    'inline-size',
    'inset',
    'inset-area',
    'inset-block',
    'inset-block-end',
    'inset-block-start',
    'inset-inline',
    'inset-inline-end',
    'inset-inline-start',
    'isolation',
    'justify-content',
    'justify-items',
    'justify-self',
    'kerning',
    'left',
    'letter-spacing',
    'lighting-color',
    'line-break',
    'line-height',
    'line-height-step',
    'list-style',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'margin',
    'margin-block',
    'margin-block-end',
    'margin-block-start',
    'margin-bottom',
    'margin-inline',
    'margin-inline-end',
    'margin-inline-start',
    'margin-left',
    'margin-right',
    'margin-top',
    'margin-trim',
    'marker',
    'marker-end',
    'marker-mid',
    'marker-start',
    'marks',
    'mask',
    'mask-border',
    'mask-border-mode',
    'mask-border-outset',
    'mask-border-repeat',
    'mask-border-slice',
    'mask-border-source',
    'mask-border-width',
    'mask-clip',
    'mask-composite',
    'mask-image',
    'mask-mode',
    'mask-origin',
    'mask-position',
    'mask-repeat',
    'mask-size',
    'mask-type',
    'masonry-auto-flow',
    'math-depth',
    'math-shift',
    'math-style',
    'max-block-size',
    'max-height',
    'max-inline-size',
    'max-width',
    'min-block-size',
    'min-height',
    'min-inline-size',
    'min-width',
    'mix-blend-mode',
    'nav-down',
    'nav-index',
    'nav-left',
    'nav-right',
    'nav-up',
    'none',
    'normal',
    'object-fit',
    'object-position',
    'offset',
    'offset-anchor',
    'offset-distance',
    'offset-path',
    'offset-position',
    'offset-rotate',
    'opacity',
    'order',
    'orphans',
    'outline',
    'outline-color',
    'outline-offset',
    'outline-style',
    'outline-width',
    'overflow',
    'overflow-anchor',
    'overflow-block',
    'overflow-clip-margin',
    'overflow-inline',
    'overflow-wrap',
    'overflow-x',
    'overflow-y',
    'overlay',
    'overscroll-behavior',
    'overscroll-behavior-block',
    'overscroll-behavior-inline',
    'overscroll-behavior-x',
    'overscroll-behavior-y',
    'padding',
    'padding-block',
    'padding-block-end',
    'padding-block-start',
    'padding-bottom',
    'padding-inline',
    'padding-inline-end',
    'padding-inline-start',
    'padding-left',
    'padding-right',
    'padding-top',
    'page',
    'page-break-after',
    'page-break-before',
    'page-break-inside',
    'paint-order',
    'pause',
    'pause-after',
    'pause-before',
    'perspective',
    'perspective-origin',
    'place-content',
    'place-items',
    'place-self',
    'pointer-events',
    'position',
    'position-anchor',
    'position-visibility',
    'print-color-adjust',
    'quotes',
    'r',
    'resize',
    'rest',
    'rest-after',
    'rest-before',
    'right',
    'rotate',
    'row-gap',
    'ruby-align',
    'ruby-position',
    'scale',
    'scroll-behavior',
    'scroll-margin',
    'scroll-margin-block',
    'scroll-margin-block-end',
    'scroll-margin-block-start',
    'scroll-margin-bottom',
    'scroll-margin-inline',
    'scroll-margin-inline-end',
    'scroll-margin-inline-start',
    'scroll-margin-left',
    'scroll-margin-right',
    'scroll-margin-top',
    'scroll-padding',
    'scroll-padding-block',
    'scroll-padding-block-end',
    'scroll-padding-block-start',
    'scroll-padding-bottom',
    'scroll-padding-inline',
    'scroll-padding-inline-end',
    'scroll-padding-inline-start',
    'scroll-padding-left',
    'scroll-padding-right',
    'scroll-padding-top',
    'scroll-snap-align',
    'scroll-snap-stop',
    'scroll-snap-type',
    'scroll-timeline',
    'scroll-timeline-axis',
    'scroll-timeline-name',
    'scrollbar-color',
    'scrollbar-gutter',
    'scrollbar-width',
    'shape-image-threshold',
    'shape-margin',
    'shape-outside',
    'shape-rendering',
    'speak',
    'speak-as',
    'src',
    'stop-color',
    'stop-opacity',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'tab-size',
    'table-layout',
    'text-align',
    'text-align-all',
    'text-align-last',
    'text-anchor',
    'text-combine-upright',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-decoration-skip',
    'text-decoration-skip-ink',
    'text-decoration-style',
    'text-decoration-thickness',
    'text-emphasis',
    'text-emphasis-color',
    'text-emphasis-position',
    'text-emphasis-style',
    'text-indent',
    'text-justify',
    'text-orientation',
    'text-overflow',
    'text-rendering',
    'text-shadow',
    'text-size-adjust',
    'text-transform',
    'text-underline-offset',
    'text-underline-position',
    'text-wrap',
    'text-wrap-mode',
    'text-wrap-style',
    'timeline-scope',
    'top',
    'touch-action',
    'transform',
    'transform-box',
    'transform-origin',
    'transform-style',
    'transition',
    'transition-behavior',
    'transition-delay',
    'transition-duration',
    'transition-property',
    'transition-timing-function',
    'translate',
    'unicode-bidi',
    'user-modify',
    'user-select',
    'vector-effect',
    'vertical-align',
    'view-timeline',
    'view-timeline-axis',
    'view-timeline-inset',
    'view-timeline-name',
    'view-transition-name',
    'visibility',
    'voice-balance',
    'voice-duration',
    'voice-family',
    'voice-pitch',
    'voice-range',
    'voice-rate',
    'voice-stress',
    'voice-volume',
    'white-space',
    'white-space-collapse',
    'widows',
    'width',
    'will-change',
    'word-break',
    'word-spacing',
    'word-wrap',
    'writing-mode',
    'x',
    'y',
    'z-index',
    'zoom'
].sort().reverse();
/*
Language: CSS
Category: common, css, web
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/ /** @type LanguageFn */ function css(hljs) {
    const regex = hljs.regex;
    const modes = MODES(hljs);
    const VENDOR_PREFIX = {
        begin: /-(webkit|moz|ms|o)-(?=[a-z])/
    };
    const AT_MODIFIERS = "and or not only";
    const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes
    const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
    const STRINGS = [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
    ];
    return {
        name: 'CSS',
        case_insensitive: true,
        illegal: /[=|'\$]/,
        keywords: {
            keyframePosition: "from to"
        },
        classNameAliases: {
            // for visual continuity with `tag {}` and because we
            // don't have a great class for this?
            keyframePosition: "selector-tag"
        },
        contains: [
            modes.BLOCK_COMMENT,
            VENDOR_PREFIX,
            // to recognize keyframe 40% etc which are outside the scope of our
            // attribute value mode
            modes.CSS_NUMBER_MODE,
            {
                className: 'selector-id',
                begin: /#[A-Za-z0-9_-]+/,
                relevance: 0
            },
            {
                className: 'selector-class',
                begin: '\\.' + IDENT_RE,
                relevance: 0
            },
            modes.ATTRIBUTE_SELECTOR_MODE,
            {
                className: 'selector-pseudo',
                variants: [
                    {
                        begin: ':(' + PSEUDO_CLASSES.join('|') + ')'
                    },
                    {
                        begin: ':(:)?(' + PSEUDO_ELEMENTS.join('|') + ')'
                    }
                ]
            },
            // we may actually need this (12/2020)
            // { // pseudo-selector params
            //   begin: /\(/,
            //   end: /\)/,
            //   contains: [ hljs.CSS_NUMBER_MODE ]
            // },
            modes.CSS_VARIABLE,
            {
                className: 'attribute',
                begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b'
            },
            // attribute values
            {
                begin: /:/,
                end: /[;}{]/,
                contains: [
                    modes.BLOCK_COMMENT,
                    modes.HEXCOLOR,
                    modes.IMPORTANT,
                    modes.CSS_NUMBER_MODE,
                    ...STRINGS,
                    // needed to highlight these as strings and to avoid issues with
                    // illegal characters that might be inside urls that would tigger the
                    // languages illegal stack
                    {
                        begin: /(url|data-uri)\(/,
                        end: /\)/,
                        relevance: 0,
                        keywords: {
                            built_in: "url data-uri"
                        },
                        contains: [
                            ...STRINGS,
                            {
                                className: "string",
                                // any character other than `)` as in `url()` will be the start
                                // of a string, which ends with `)` (from the parent mode)
                                begin: /[^)]/,
                                endsWithParent: true,
                                excludeEnd: true
                            }
                        ]
                    },
                    modes.FUNCTION_DISPATCH
                ]
            },
            {
                begin: regex.lookahead(/@/),
                end: '[{;]',
                relevance: 0,
                illegal: /:/,
                contains: [
                    {
                        className: 'keyword',
                        begin: AT_PROPERTY_RE
                    },
                    {
                        begin: /\s/,
                        endsWithParent: true,
                        excludeEnd: true,
                        relevance: 0,
                        keywords: {
                            $pattern: /[a-z-]+/,
                            keyword: AT_MODIFIERS,
                            attribute: MEDIA_FEATURES.join(" ")
                        },
                        contains: [
                            {
                                begin: /[a-z-]+(?=:)/,
                                className: "attribute"
                            },
                            ...STRINGS,
                            modes.CSS_NUMBER_MODE
                        ]
                    }
                ]
            },
            {
                className: 'selector-tag',
                begin: '\\b(' + TAGS.join('|') + ')\\b'
            }
        ]
    };
}
module.exports = css;

},{}],"6ezKO":[function(require,module,exports,__globalThis) {
const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
const KEYWORDS = [
    "as",
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends",
    // It's reached stage 3, which is "recommended for implementation":
    "using"
];
const LITERALS = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
];
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const TYPES = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
];
const ERROR_TYPES = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
];
const BUILT_IN_GLOBALS = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
];
const BUILT_IN_VARIABLES = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global" // Node.js
];
const BUILT_INS = [].concat(BUILT_IN_GLOBALS, TYPES, ERROR_TYPES);
/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/ /** @type LanguageFn */ function javascript(hljs) {
    const regex = hljs.regex;
    /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */ const hasClosingTag = (match, { after })=>{
        const tag = "</" + match[0].slice(1);
        const pos = match.input.indexOf(tag, after);
        return pos !== -1;
    };
    const IDENT_RE$1 = IDENT_RE;
    const FRAGMENT = {
        begin: '<>',
        end: '</>'
    };
    // to avoid some special cases inside isTrulyOpeningTag
    const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
    const XML_TAG = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */ isTrulyOpeningTag: (match, response)=>{
            const afterMatchIndex = match[0].length + match.index;
            const nextChar = match.input[afterMatchIndex];
            if (// HTML should not include another raw `<` inside a tag
            // nested type?
            // `<Array<Array<number>>`, etc.
            nextChar === "<" || // the , gives away that this is not HTML
            // `<T, A extends keyof T, V>`
            nextChar === ",") {
                response.ignoreMatch();
                return;
            }
            // `<something>`
            // Quite possibly a tag, lets look for a matching closing tag...
            if (nextChar === ">") // if we cannot find a matching closing tag, then we
            // will ignore it
            {
                if (!hasClosingTag(match, {
                    after: afterMatchIndex
                })) response.ignoreMatch();
            }
            // `<blah />` (self-closing)
            // handled by simpleSelfClosing rule
            let m;
            const afterMatch = match.input.substring(afterMatchIndex);
            // some more template typing stuff
            //  <T = any>(key?: string) => Modify<
            if (m = afterMatch.match(/^\s*=/)) {
                response.ignoreMatch();
                return;
            }
            // `<From extends string>`
            // technically this could be HTML, but it smells like a type
            // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
            if (m = afterMatch.match(/^\s+extends\s+/)) {
                if (m.index === 0) {
                    response.ignoreMatch();
                    // eslint-disable-next-line no-useless-return
                    return;
                }
            }
        }
    };
    const KEYWORDS$1 = {
        $pattern: IDENT_RE,
        keyword: KEYWORDS,
        literal: LITERALS,
        built_in: BUILT_INS,
        "variable.language": BUILT_IN_VARIABLES
    };
    // https://tc39.es/ecma262/#sec-literals-numeric-literals
    const decimalDigits = '[0-9](_?[0-9])*';
    const frac = `\\.(${decimalDigits})`;
    // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
    // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
    const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
    const NUMBER = {
        className: 'number',
        variants: [
            // DecimalLiteral
            {
                begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` + `[eE][+-]?(${decimalDigits})\\b`
            },
            {
                begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b`
            },
            // DecimalBigIntegerLiteral
            {
                begin: `\\b(0|[1-9](_?[0-9])*)n\\b`
            },
            // NonDecimalIntegerLiteral
            {
                begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
            },
            {
                begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
            },
            {
                begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
            },
            // LegacyOctalIntegerLiteral (does not include underscore separators)
            // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
            {
                begin: "\\b0[0-7]+n?\\b"
            }
        ],
        relevance: 0
    };
    const SUBST = {
        className: 'subst',
        begin: '\\$\\{',
        end: '\\}',
        keywords: KEYWORDS$1,
        contains: [] // defined later
    };
    const HTML_TEMPLATE = {
        begin: '\.?html`',
        end: '',
        starts: {
            end: '`',
            returnEnd: false,
            contains: [
                hljs.BACKSLASH_ESCAPE,
                SUBST
            ],
            subLanguage: 'xml'
        }
    };
    const CSS_TEMPLATE = {
        begin: '\.?css`',
        end: '',
        starts: {
            end: '`',
            returnEnd: false,
            contains: [
                hljs.BACKSLASH_ESCAPE,
                SUBST
            ],
            subLanguage: 'css'
        }
    };
    const GRAPHQL_TEMPLATE = {
        begin: '\.?gql`',
        end: '',
        starts: {
            end: '`',
            returnEnd: false,
            contains: [
                hljs.BACKSLASH_ESCAPE,
                SUBST
            ],
            subLanguage: 'graphql'
        }
    };
    const TEMPLATE_STRING = {
        className: 'string',
        begin: '`',
        end: '`',
        contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
        ]
    };
    const JSDOC_COMMENT = hljs.COMMENT(/\/\*\*(?!\/)/, '\\*/', {
        relevance: 0,
        contains: [
            {
                begin: '(?=@[A-Za-z]+)',
                relevance: 0,
                contains: [
                    {
                        className: 'doctag',
                        begin: '@[A-Za-z]+'
                    },
                    {
                        className: 'type',
                        begin: '\\{',
                        end: '\\}',
                        excludeEnd: true,
                        excludeBegin: true,
                        relevance: 0
                    },
                    {
                        className: 'variable',
                        begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
                        endsParent: true,
                        relevance: 0
                    },
                    // eat spaces (not newlines) so we can find
                    // types or variables
                    {
                        begin: /(?=[^\n])\s/,
                        relevance: 0
                    }
                ]
            }
        ]
    });
    const COMMENT = {
        className: "comment",
        variants: [
            JSDOC_COMMENT,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_LINE_COMMENT_MODE
        ]
    };
    const SUBST_INTERNALS = [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        HTML_TEMPLATE,
        CSS_TEMPLATE,
        GRAPHQL_TEMPLATE,
        TEMPLATE_STRING,
        // Skip numbers when they are part of a variable name
        {
            match: /\$\d+/
        },
        NUMBER
    ];
    SUBST.contains = SUBST_INTERNALS.concat({
        // we need to pair up {} inside our subst to prevent
        // it from ending too early by matching another }
        begin: /\{/,
        end: /\}/,
        keywords: KEYWORDS$1,
        contains: [
            "self"
        ].concat(SUBST_INTERNALS)
    });
    const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
    const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
        // eat recursive parens in sub expressions
        {
            begin: /(\s*)\(/,
            end: /\)/,
            keywords: KEYWORDS$1,
            contains: [
                "self"
            ].concat(SUBST_AND_COMMENTS)
        }
    ]);
    const PARAMS = {
        className: 'params',
        // convert this to negative lookbehind in v12
        begin: /(\s*)\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS$1,
        contains: PARAMS_CONTAINS
    };
    // ES6 classes
    const CLASS_OR_EXTENDS = {
        variants: [
            // class Car extends vehicle
            {
                match: [
                    /class/,
                    /\s+/,
                    IDENT_RE$1,
                    /\s+/,
                    /extends/,
                    /\s+/,
                    regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
                ],
                scope: {
                    1: "keyword",
                    3: "title.class",
                    5: "keyword",
                    7: "title.class.inherited"
                }
            },
            // class Car
            {
                match: [
                    /class/,
                    /\s+/,
                    IDENT_RE$1
                ],
                scope: {
                    1: "keyword",
                    3: "title.class"
                }
            }
        ]
    };
    const CLASS_REFERENCE = {
        relevance: 0,
        match: regex.either(// Hard coded exceptions
        /\bJSON/, // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
        className: "title.class",
        keywords: {
            _: [
                // se we still get relevance credit for JS library classes
                ...TYPES,
                ...ERROR_TYPES
            ]
        }
    };
    const USE_STRICT = {
        label: "use_strict",
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
    };
    const FUNCTION_DEFINITION = {
        variants: [
            {
                match: [
                    /function/,
                    /\s+/,
                    IDENT_RE$1,
                    /(?=\s*\()/
                ]
            },
            // anonymous function
            {
                match: [
                    /function/,
                    /\s*(?=\()/
                ]
            }
        ],
        className: {
            1: "keyword",
            3: "title.function"
        },
        label: "func.def",
        contains: [
            PARAMS
        ],
        illegal: /%/
    };
    const UPPER_CASE_CONSTANT = {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
    };
    function noneOf(list) {
        return regex.concat("(?!", list.join("|"), ")");
    }
    const FUNCTION_CALL = {
        match: regex.concat(/\b/, noneOf([
            ...BUILT_IN_GLOBALS,
            "super",
            "import"
        ].map((x)=>`${x}\\s*\\(`)), IDENT_RE$1, regex.lookahead(/\s*\(/)),
        className: "title.function",
        relevance: 0
    };
    const PROPERTY_ACCESS = {
        begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/))),
        end: IDENT_RE$1,
        excludeBegin: true,
        keywords: "prototype",
        className: "property",
        relevance: 0
    };
    const GETTER_OR_SETTER = {
        match: [
            /get|set/,
            /\s+/,
            IDENT_RE$1,
            /(?=\()/
        ],
        className: {
            1: "keyword",
            3: "title.function"
        },
        contains: [
            {
                begin: /\(\)/
            },
            PARAMS
        ]
    };
    const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';
    const FUNCTION_VARIABLE = {
        match: [
            /const|var|let/,
            /\s+/,
            IDENT_RE$1,
            /\s*/,
            /=\s*/,
            /(async\s*)?/,
            regex.lookahead(FUNC_LEAD_IN_RE)
        ],
        keywords: "async",
        className: {
            1: "keyword",
            3: "title.function"
        },
        contains: [
            PARAMS
        ]
    };
    return {
        name: 'JavaScript',
        aliases: [
            'js',
            'jsx',
            'mjs',
            'cjs'
        ],
        keywords: KEYWORDS$1,
        // this will be extended by TypeScript
        exports: {
            PARAMS_CONTAINS,
            CLASS_REFERENCE
        },
        illegal: /#(?![$_A-z])/,
        contains: [
            hljs.SHEBANG({
                label: "shebang",
                binary: "node",
                relevance: 5
            }),
            USE_STRICT,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            HTML_TEMPLATE,
            CSS_TEMPLATE,
            GRAPHQL_TEMPLATE,
            TEMPLATE_STRING,
            COMMENT,
            // Skip numbers when they are part of a variable name
            {
                match: /\$\d+/
            },
            NUMBER,
            CLASS_REFERENCE,
            {
                scope: 'attr',
                match: IDENT_RE$1 + regex.lookahead(':'),
                relevance: 0
            },
            FUNCTION_VARIABLE,
            {
                begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
                keywords: 'return throw case',
                relevance: 0,
                contains: [
                    COMMENT,
                    hljs.REGEXP_MODE,
                    {
                        className: 'function',
                        // we have to count the parens to make sure we actually have the
                        // correct bounding ( ) before the =>.  There could be any number of
                        // sub-expressions inside also surrounded by parens.
                        begin: FUNC_LEAD_IN_RE,
                        returnBegin: true,
                        end: '\\s*=>',
                        contains: [
                            {
                                className: 'params',
                                variants: [
                                    {
                                        begin: hljs.UNDERSCORE_IDENT_RE,
                                        relevance: 0
                                    },
                                    {
                                        className: null,
                                        begin: /\(\s*\)/,
                                        skip: true
                                    },
                                    {
                                        begin: /(\s*)\(/,
                                        end: /\)/,
                                        excludeBegin: true,
                                        excludeEnd: true,
                                        keywords: KEYWORDS$1,
                                        contains: PARAMS_CONTAINS
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        begin: /,/,
                        relevance: 0
                    },
                    {
                        match: /\s+/,
                        relevance: 0
                    },
                    {
                        variants: [
                            {
                                begin: FRAGMENT.begin,
                                end: FRAGMENT.end
                            },
                            {
                                match: XML_SELF_CLOSING
                            },
                            {
                                begin: XML_TAG.begin,
                                // we carefully check the opening tag to see if it truly
                                // is a tag and not a false positive
                                'on:begin': XML_TAG.isTrulyOpeningTag,
                                end: XML_TAG.end
                            }
                        ],
                        subLanguage: 'xml',
                        contains: [
                            {
                                begin: XML_TAG.begin,
                                end: XML_TAG.end,
                                skip: true,
                                contains: [
                                    'self'
                                ]
                            }
                        ]
                    }
                ]
            },
            FUNCTION_DEFINITION,
            {
                // prevent this from getting swallowed up by function
                // since they appear "function like"
                beginKeywords: "while if switch catch for"
            },
            {
                // we have to count the parens to make sure we actually have the correct
                // bounding ( ).  There could be any number of sub-expressions inside
                // also surrounded by parens.
                begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE + '\\(' + // first parens
                '[^()]*(\\(' + '[^()]*(\\(' + '[^()]*' + '\\)[^()]*)*' + '\\)[^()]*)*' + '\\)\\s*\\{',
                returnBegin: true,
                label: "func.def",
                contains: [
                    PARAMS,
                    hljs.inherit(hljs.TITLE_MODE, {
                        begin: IDENT_RE$1,
                        className: "title.function"
                    })
                ]
            },
            // catch ... so it won't trigger the property rule below
            {
                match: /\.\.\./,
                relevance: 0
            },
            PROPERTY_ACCESS,
            // hack: prevents detection of keywords in some circumstances
            // .keyword()
            // $keyword = x
            {
                match: '\\$' + IDENT_RE$1,
                relevance: 0
            },
            {
                match: [
                    /\bconstructor(?=\s*\()/
                ],
                className: {
                    1: "title.function"
                },
                contains: [
                    PARAMS
                ]
            },
            FUNCTION_CALL,
            UPPER_CASE_CONSTANT,
            CLASS_OR_EXTENDS,
            GETTER_OR_SETTER,
            {
                match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
            }
        ]
    };
}
module.exports = javascript;

},{}],"j7EKL":[function(require,module,exports,__globalThis) {
const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
const KEYWORDS = [
    "as",
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends",
    // It's reached stage 3, which is "recommended for implementation":
    "using"
];
const LITERALS = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
];
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const TYPES = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
];
const ERROR_TYPES = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
];
const BUILT_IN_GLOBALS = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
];
const BUILT_IN_VARIABLES = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global" // Node.js
];
const BUILT_INS = [].concat(BUILT_IN_GLOBALS, TYPES, ERROR_TYPES);
/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/ /** @type LanguageFn */ function javascript(hljs) {
    const regex = hljs.regex;
    /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */ const hasClosingTag = (match, { after })=>{
        const tag = "</" + match[0].slice(1);
        const pos = match.input.indexOf(tag, after);
        return pos !== -1;
    };
    const IDENT_RE$1 = IDENT_RE;
    const FRAGMENT = {
        begin: '<>',
        end: '</>'
    };
    // to avoid some special cases inside isTrulyOpeningTag
    const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
    const XML_TAG = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */ isTrulyOpeningTag: (match, response)=>{
            const afterMatchIndex = match[0].length + match.index;
            const nextChar = match.input[afterMatchIndex];
            if (// HTML should not include another raw `<` inside a tag
            // nested type?
            // `<Array<Array<number>>`, etc.
            nextChar === "<" || // the , gives away that this is not HTML
            // `<T, A extends keyof T, V>`
            nextChar === ",") {
                response.ignoreMatch();
                return;
            }
            // `<something>`
            // Quite possibly a tag, lets look for a matching closing tag...
            if (nextChar === ">") // if we cannot find a matching closing tag, then we
            // will ignore it
            {
                if (!hasClosingTag(match, {
                    after: afterMatchIndex
                })) response.ignoreMatch();
            }
            // `<blah />` (self-closing)
            // handled by simpleSelfClosing rule
            let m;
            const afterMatch = match.input.substring(afterMatchIndex);
            // some more template typing stuff
            //  <T = any>(key?: string) => Modify<
            if (m = afterMatch.match(/^\s*=/)) {
                response.ignoreMatch();
                return;
            }
            // `<From extends string>`
            // technically this could be HTML, but it smells like a type
            // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
            if (m = afterMatch.match(/^\s+extends\s+/)) {
                if (m.index === 0) {
                    response.ignoreMatch();
                    // eslint-disable-next-line no-useless-return
                    return;
                }
            }
        }
    };
    const KEYWORDS$1 = {
        $pattern: IDENT_RE,
        keyword: KEYWORDS,
        literal: LITERALS,
        built_in: BUILT_INS,
        "variable.language": BUILT_IN_VARIABLES
    };
    // https://tc39.es/ecma262/#sec-literals-numeric-literals
    const decimalDigits = '[0-9](_?[0-9])*';
    const frac = `\\.(${decimalDigits})`;
    // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
    // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
    const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
    const NUMBER = {
        className: 'number',
        variants: [
            // DecimalLiteral
            {
                begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` + `[eE][+-]?(${decimalDigits})\\b`
            },
            {
                begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b`
            },
            // DecimalBigIntegerLiteral
            {
                begin: `\\b(0|[1-9](_?[0-9])*)n\\b`
            },
            // NonDecimalIntegerLiteral
            {
                begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
            },
            {
                begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
            },
            {
                begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
            },
            // LegacyOctalIntegerLiteral (does not include underscore separators)
            // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
            {
                begin: "\\b0[0-7]+n?\\b"
            }
        ],
        relevance: 0
    };
    const SUBST = {
        className: 'subst',
        begin: '\\$\\{',
        end: '\\}',
        keywords: KEYWORDS$1,
        contains: [] // defined later
    };
    const HTML_TEMPLATE = {
        begin: '\.?html`',
        end: '',
        starts: {
            end: '`',
            returnEnd: false,
            contains: [
                hljs.BACKSLASH_ESCAPE,
                SUBST
            ],
            subLanguage: 'xml'
        }
    };
    const CSS_TEMPLATE = {
        begin: '\.?css`',
        end: '',
        starts: {
            end: '`',
            returnEnd: false,
            contains: [
                hljs.BACKSLASH_ESCAPE,
                SUBST
            ],
            subLanguage: 'css'
        }
    };
    const GRAPHQL_TEMPLATE = {
        begin: '\.?gql`',
        end: '',
        starts: {
            end: '`',
            returnEnd: false,
            contains: [
                hljs.BACKSLASH_ESCAPE,
                SUBST
            ],
            subLanguage: 'graphql'
        }
    };
    const TEMPLATE_STRING = {
        className: 'string',
        begin: '`',
        end: '`',
        contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
        ]
    };
    const JSDOC_COMMENT = hljs.COMMENT(/\/\*\*(?!\/)/, '\\*/', {
        relevance: 0,
        contains: [
            {
                begin: '(?=@[A-Za-z]+)',
                relevance: 0,
                contains: [
                    {
                        className: 'doctag',
                        begin: '@[A-Za-z]+'
                    },
                    {
                        className: 'type',
                        begin: '\\{',
                        end: '\\}',
                        excludeEnd: true,
                        excludeBegin: true,
                        relevance: 0
                    },
                    {
                        className: 'variable',
                        begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
                        endsParent: true,
                        relevance: 0
                    },
                    // eat spaces (not newlines) so we can find
                    // types or variables
                    {
                        begin: /(?=[^\n])\s/,
                        relevance: 0
                    }
                ]
            }
        ]
    });
    const COMMENT = {
        className: "comment",
        variants: [
            JSDOC_COMMENT,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_LINE_COMMENT_MODE
        ]
    };
    const SUBST_INTERNALS = [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        HTML_TEMPLATE,
        CSS_TEMPLATE,
        GRAPHQL_TEMPLATE,
        TEMPLATE_STRING,
        // Skip numbers when they are part of a variable name
        {
            match: /\$\d+/
        },
        NUMBER
    ];
    SUBST.contains = SUBST_INTERNALS.concat({
        // we need to pair up {} inside our subst to prevent
        // it from ending too early by matching another }
        begin: /\{/,
        end: /\}/,
        keywords: KEYWORDS$1,
        contains: [
            "self"
        ].concat(SUBST_INTERNALS)
    });
    const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
    const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
        // eat recursive parens in sub expressions
        {
            begin: /(\s*)\(/,
            end: /\)/,
            keywords: KEYWORDS$1,
            contains: [
                "self"
            ].concat(SUBST_AND_COMMENTS)
        }
    ]);
    const PARAMS = {
        className: 'params',
        // convert this to negative lookbehind in v12
        begin: /(\s*)\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS$1,
        contains: PARAMS_CONTAINS
    };
    // ES6 classes
    const CLASS_OR_EXTENDS = {
        variants: [
            // class Car extends vehicle
            {
                match: [
                    /class/,
                    /\s+/,
                    IDENT_RE$1,
                    /\s+/,
                    /extends/,
                    /\s+/,
                    regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
                ],
                scope: {
                    1: "keyword",
                    3: "title.class",
                    5: "keyword",
                    7: "title.class.inherited"
                }
            },
            // class Car
            {
                match: [
                    /class/,
                    /\s+/,
                    IDENT_RE$1
                ],
                scope: {
                    1: "keyword",
                    3: "title.class"
                }
            }
        ]
    };
    const CLASS_REFERENCE = {
        relevance: 0,
        match: regex.either(// Hard coded exceptions
        /\bJSON/, // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
        className: "title.class",
        keywords: {
            _: [
                // se we still get relevance credit for JS library classes
                ...TYPES,
                ...ERROR_TYPES
            ]
        }
    };
    const USE_STRICT = {
        label: "use_strict",
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
    };
    const FUNCTION_DEFINITION = {
        variants: [
            {
                match: [
                    /function/,
                    /\s+/,
                    IDENT_RE$1,
                    /(?=\s*\()/
                ]
            },
            // anonymous function
            {
                match: [
                    /function/,
                    /\s*(?=\()/
                ]
            }
        ],
        className: {
            1: "keyword",
            3: "title.function"
        },
        label: "func.def",
        contains: [
            PARAMS
        ],
        illegal: /%/
    };
    const UPPER_CASE_CONSTANT = {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
    };
    function noneOf(list) {
        return regex.concat("(?!", list.join("|"), ")");
    }
    const FUNCTION_CALL = {
        match: regex.concat(/\b/, noneOf([
            ...BUILT_IN_GLOBALS,
            "super",
            "import"
        ].map((x)=>`${x}\\s*\\(`)), IDENT_RE$1, regex.lookahead(/\s*\(/)),
        className: "title.function",
        relevance: 0
    };
    const PROPERTY_ACCESS = {
        begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/))),
        end: IDENT_RE$1,
        excludeBegin: true,
        keywords: "prototype",
        className: "property",
        relevance: 0
    };
    const GETTER_OR_SETTER = {
        match: [
            /get|set/,
            /\s+/,
            IDENT_RE$1,
            /(?=\()/
        ],
        className: {
            1: "keyword",
            3: "title.function"
        },
        contains: [
            {
                begin: /\(\)/
            },
            PARAMS
        ]
    };
    const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';
    const FUNCTION_VARIABLE = {
        match: [
            /const|var|let/,
            /\s+/,
            IDENT_RE$1,
            /\s*/,
            /=\s*/,
            /(async\s*)?/,
            regex.lookahead(FUNC_LEAD_IN_RE)
        ],
        keywords: "async",
        className: {
            1: "keyword",
            3: "title.function"
        },
        contains: [
            PARAMS
        ]
    };
    return {
        name: 'JavaScript',
        aliases: [
            'js',
            'jsx',
            'mjs',
            'cjs'
        ],
        keywords: KEYWORDS$1,
        // this will be extended by TypeScript
        exports: {
            PARAMS_CONTAINS,
            CLASS_REFERENCE
        },
        illegal: /#(?![$_A-z])/,
        contains: [
            hljs.SHEBANG({
                label: "shebang",
                binary: "node",
                relevance: 5
            }),
            USE_STRICT,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            HTML_TEMPLATE,
            CSS_TEMPLATE,
            GRAPHQL_TEMPLATE,
            TEMPLATE_STRING,
            COMMENT,
            // Skip numbers when they are part of a variable name
            {
                match: /\$\d+/
            },
            NUMBER,
            CLASS_REFERENCE,
            {
                scope: 'attr',
                match: IDENT_RE$1 + regex.lookahead(':'),
                relevance: 0
            },
            FUNCTION_VARIABLE,
            {
                begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
                keywords: 'return throw case',
                relevance: 0,
                contains: [
                    COMMENT,
                    hljs.REGEXP_MODE,
                    {
                        className: 'function',
                        // we have to count the parens to make sure we actually have the
                        // correct bounding ( ) before the =>.  There could be any number of
                        // sub-expressions inside also surrounded by parens.
                        begin: FUNC_LEAD_IN_RE,
                        returnBegin: true,
                        end: '\\s*=>',
                        contains: [
                            {
                                className: 'params',
                                variants: [
                                    {
                                        begin: hljs.UNDERSCORE_IDENT_RE,
                                        relevance: 0
                                    },
                                    {
                                        className: null,
                                        begin: /\(\s*\)/,
                                        skip: true
                                    },
                                    {
                                        begin: /(\s*)\(/,
                                        end: /\)/,
                                        excludeBegin: true,
                                        excludeEnd: true,
                                        keywords: KEYWORDS$1,
                                        contains: PARAMS_CONTAINS
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        begin: /,/,
                        relevance: 0
                    },
                    {
                        match: /\s+/,
                        relevance: 0
                    },
                    {
                        variants: [
                            {
                                begin: FRAGMENT.begin,
                                end: FRAGMENT.end
                            },
                            {
                                match: XML_SELF_CLOSING
                            },
                            {
                                begin: XML_TAG.begin,
                                // we carefully check the opening tag to see if it truly
                                // is a tag and not a false positive
                                'on:begin': XML_TAG.isTrulyOpeningTag,
                                end: XML_TAG.end
                            }
                        ],
                        subLanguage: 'xml',
                        contains: [
                            {
                                begin: XML_TAG.begin,
                                end: XML_TAG.end,
                                skip: true,
                                contains: [
                                    'self'
                                ]
                            }
                        ]
                    }
                ]
            },
            FUNCTION_DEFINITION,
            {
                // prevent this from getting swallowed up by function
                // since they appear "function like"
                beginKeywords: "while if switch catch for"
            },
            {
                // we have to count the parens to make sure we actually have the correct
                // bounding ( ).  There could be any number of sub-expressions inside
                // also surrounded by parens.
                begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE + '\\(' + // first parens
                '[^()]*(\\(' + '[^()]*(\\(' + '[^()]*' + '\\)[^()]*)*' + '\\)[^()]*)*' + '\\)\\s*\\{',
                returnBegin: true,
                label: "func.def",
                contains: [
                    PARAMS,
                    hljs.inherit(hljs.TITLE_MODE, {
                        begin: IDENT_RE$1,
                        className: "title.function"
                    })
                ]
            },
            // catch ... so it won't trigger the property rule below
            {
                match: /\.\.\./,
                relevance: 0
            },
            PROPERTY_ACCESS,
            // hack: prevents detection of keywords in some circumstances
            // .keyword()
            // $keyword = x
            {
                match: '\\$' + IDENT_RE$1,
                relevance: 0
            },
            {
                match: [
                    /\bconstructor(?=\s*\()/
                ],
                className: {
                    1: "title.function"
                },
                contains: [
                    PARAMS
                ]
            },
            FUNCTION_CALL,
            UPPER_CASE_CONSTANT,
            CLASS_OR_EXTENDS,
            GETTER_OR_SETTER,
            {
                match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
            }
        ]
    };
}
/*
Language: TypeScript
Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
Contributors: Ike Ku <dempfi@yahoo.com>
Description: TypeScript is a strict superset of JavaScript
Website: https://www.typescriptlang.org
Category: common, scripting
*/ /** @type LanguageFn */ function typescript(hljs) {
    const regex = hljs.regex;
    const tsLanguage = javascript(hljs);
    const IDENT_RE$1 = IDENT_RE;
    const TYPES = [
        "any",
        "void",
        "number",
        "boolean",
        "string",
        "object",
        "never",
        "symbol",
        "bigint",
        "unknown"
    ];
    const NAMESPACE = {
        begin: [
            /namespace/,
            /\s+/,
            hljs.IDENT_RE
        ],
        beginScope: {
            1: "keyword",
            3: "title.class"
        }
    };
    const INTERFACE = {
        beginKeywords: 'interface',
        end: /\{/,
        excludeEnd: true,
        keywords: {
            keyword: 'interface extends',
            built_in: TYPES
        },
        contains: [
            tsLanguage.exports.CLASS_REFERENCE
        ]
    };
    const USE_STRICT = {
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use strict['"]/
    };
    const TS_SPECIFIC_KEYWORDS = [
        "type",
        // "namespace",
        "interface",
        "public",
        "private",
        "protected",
        "implements",
        "declare",
        "abstract",
        "readonly",
        "enum",
        "override",
        "satisfies"
    ];
    /*
    namespace is a TS keyword but it's fine to use it as a variable name too.
    const message = 'foo';
    const namespace = 'bar';
  */ const KEYWORDS$1 = {
        $pattern: IDENT_RE,
        keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
        literal: LITERALS,
        built_in: BUILT_INS.concat(TYPES),
        "variable.language": BUILT_IN_VARIABLES
    };
    const DECORATOR = {
        className: 'meta',
        begin: '@' + IDENT_RE$1
    };
    const swapMode = (mode, label, replacement)=>{
        const indx = mode.contains.findIndex((m)=>m.label === label);
        if (indx === -1) throw new Error("can not find mode to replace");
        mode.contains.splice(indx, 1, replacement);
    };
    // this should update anywhere keywords is used since
    // it will be the same actual JS object
    Object.assign(tsLanguage.keywords, KEYWORDS$1);
    tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
    // highlight the function params
    const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find((c)=>c.scope === "attr");
    // take default attr rule and extend it to support optionals
    const OPTIONAL_KEY_OR_ARGUMENT = Object.assign({}, ATTRIBUTE_HIGHLIGHT, {
        match: regex.concat(IDENT_RE$1, regex.lookahead(/\s*\?:/))
    });
    tsLanguage.exports.PARAMS_CONTAINS.push([
        tsLanguage.exports.CLASS_REFERENCE,
        ATTRIBUTE_HIGHLIGHT,
        OPTIONAL_KEY_OR_ARGUMENT
    ]);
    // Add the optional property assignment highlighting for objects or classes
    tsLanguage.contains = tsLanguage.contains.concat([
        DECORATOR,
        NAMESPACE,
        INTERFACE,
        OPTIONAL_KEY_OR_ARGUMENT
    ]);
    // TS gets a simpler shebang rule than JS
    swapMode(tsLanguage, "shebang", hljs.SHEBANG());
    // JS use strict rule purposely excludes `asm` which makes no sense
    swapMode(tsLanguage, "use_strict", USE_STRICT);
    const functionDeclaration = tsLanguage.contains.find((m)=>m.label === "func.def");
    functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript
    Object.assign(tsLanguage, {
        name: 'TypeScript',
        aliases: [
            'ts',
            'tsx',
            'mts',
            'cts'
        ]
    });
    return tsLanguage;
}
module.exports = typescript;

},{}]},["2aZ6o","8JWvp"], "8JWvp", "parcelRequire6b9b", {})

//# sourceMappingURL=wcag-ui.c6396971.js.map
