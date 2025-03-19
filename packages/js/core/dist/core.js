function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}require("./core.css"),e(module.exports,"componentDecorator",()=>b),e(module.exports,"events",()=>x),e(module.exports,"encoding",()=>v),e(module.exports,"extender",()=>E),e(module.exports,"helpers",()=>C);var t={};e(t,"trueTypeOf",()=>r),e(t,"isNull",()=>n),e(t,"isUndefined",()=>o),e(t,"isNullOrUndefined",()=>a),e(t,"isObject",()=>i),e(t,"isSymbol",()=>l),e(t,"isFunction",()=>s),e(t,"isBoolean",()=>c),e(t,"isNumber",()=>d),e(t,"isDate",()=>f),e(t,"isString",()=>u),e(t,"isRegExp",()=>p),e(t,"isArray",()=>h);/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String} The object type
 */const r=e=>Object.prototype.toString.call(e).slice(8,-1),n=e=>"Null"===r(e),o=e=>"Undefined"===r(e),a=e=>n(e)||o(e),i=e=>"Object"===r(e),l=e=>"Symbol"===r(e),s=e=>"Function"===r(e),c=e=>"Boolean"===r(e),d=e=>"Number"===r(e),f=e=>"Date"===r(e),u=e=>"String"===r(e),p=e=>"RegExp"===r(e),h=e=>"Array"===r(e);function m(e,t=""){return Object.entries(e).reduce((e,r)=>(e[`handle${r[0].pascalize()}${t}`]=r[1],e),{})}function b(e,t){!function(e,t){if(!e[t])throw Error(`The meta ${t} is required for the wcagUI component: ${e}`)}(t,"name"),customElements&&!customElements.get(t.name)&&customElements.define(t.name,t,t.extends?{extends:t.extends}:void 0),function(e){Object.assign(e.prototype,{componentName:e.name},e.attributes&&{...m(e.attributes,"Change")},e.events&&{...m(e.events)},{handleEvent(e){this[`handle${e.type.capitalize()}`](e)},attributeChangedCallback(e,t,r){this[`handle${e.pascalize()}Change`]?.(t,r),this.onAttributeChanged instanceof Function&&this.onAttributeChanged(e,t,r)},connectedCallback(){for(let t of Object.keys(e.events))this.addEventListener(t,this);this.onConnected instanceof Function&&this.onConnected()},disconnectedCallback(){for(let t of Object.keys(e.events))this.removeEventListener(t,this);this.onDisconnected instanceof Function&&this.onDisconnected()}}),e.attributes&&Object.defineProperty(e,"observedAttributes",{get:()=>Object.keys(e.attributes)})}(t),Object.assign(self,{wcagUI:{...self.wcagUI,[e]:t}})}Object.defineProperties(String,{isString:{value:e=>u(e)},guid:{value:()=>`${Math.random().toString(16).slice(2,10)}-${Math.random().toString(16).slice(2,6)}-4${Math.random().toString(16).slice(2,5)}-${Math.random().toString(16).slice(2,6)}-${Math.random().toString(16).slice(2,14)}`},capitalize:{value:e=>String.isString(e)&&String.prototype.capitalize.call(e)},camelize:{value:e=>String.isString(e)&&String.prototype.camelize.call(e)},pascalize:{value:e=>String.isString(e)&&String.prototype.pascalize.call(e)},toBoolean:{value:e=>String.isString(e)&&String.prototype.toBoolean.call(e)}}),Object.defineProperties(String.prototype,{capitalize:{value(){return this.charAt(0).toUpperCase()+this.slice(1)}},camelize:{value(){return this.toLowerCase().replace(/[-_\s]+(.)?/g,(e,t)=>t?t.toUpperCase():"").replace(/^(.)/,(e,t)=>t.toLowerCase())}},pascalize:{value(){return this.replace(/(^|-)([a-z])/g,(e,t,r)=>r.toUpperCase())}},toBoolean:{value(){return/^\s*(true|1|on|yes)\s*$/i.test(this)}}}),!function(){let{keys:e}=Object,t=t=>{let r=e(t),n=[],o=new Set,{length:a}=r;for(let e=0;e<a;e++){n[e]=t[r[e]];try{delete t[r[e]]}catch(t){o.add(e)}}return()=>{for(let e=0;e<a;e++)o.has(e)||(t[r[e]]=n[e])}},r=(e,t=document,r=MutationObserver,n=["*"])=>{let o=(t,r,n,a,i,l)=>{for(let s of t)(l||"querySelectorAll"in s)&&(i?n.has(s)||(n.add(s),a.delete(s),e(s,i)):a.has(s)||(a.add(s),n.delete(s),e(s,i)),l||o(s.querySelectorAll(r),r,n,a,i,!0))},a=new r(e=>{if(n.length){let t=n.join(","),r=new Set,a=new Set;for(let{addedNodes:n,removedNodes:i}of e)o(i,t,r,a,!1,!1),o(n,t,r,a,!0,!1)}}),{observe:i}=a;return(a.observe=e=>i.call(a,e,{subtree:!0,childList:!0}))(t),a},n="querySelectorAll",o=e=>n in e,{filter:a}=[];var i=e=>{let t=new WeakMap,i=e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector,l=(r,n)=>{let o;if(n)for(let a,l=i(r),s=0,{length:d}=c;s<d;s++)l.call(r,a=c[s])&&(t.has(r)||t.set(r,new Set),(o=t.get(r)).has(a)||(o.add(a),e.handle(r,n,a)));else if(t.has(r))for(let a of(o=t.get(r),t.delete(r),o))e.handle(r,n,a)},s=(e,t=!0)=>{for(let r of e)l(r,t)},{query:c}=e,d=e.root||document,f=r(l,d,MutationObserver,c),{attachShadow:u}=Element.prototype;return u&&(Element.prototype.attachShadow=function(e){let t=u.call(this,e);return f.observe(t),t}),c.length&&s(d[n](c)),{drop:e=>{for(let r of e)t.delete(r)},flush:()=>{for(let e of f.takeRecords())s(a.call(e.removedNodes,o),!1),s(a.call(e.addedNodes,o),!0)},observer:f,parse:s}};let{createElement:l}=document,{define:s,get:c,upgrade:d}=customElements,{construct:f}=Reflect||{construct(e){return e.call(this)}},{defineProperty:u,getOwnPropertyNames:p,setPrototypeOf:h}=Object,m=new WeakMap,b=new Set,g=new Map,x=new Map,v=new Map,y=new Map,S=[],w=[],C=e=>y.get(e)||c.call(customElements,e),{parse:E}=i({query:w,handle:(e,r,n)=>{let o=v.get(n);if(r&&!o.isPrototypeOf(e)){let r=t(e);N=h(e,o);try{new o.constructor}finally{N=null,r()}}let a=`${r?"":"dis"}connectedCallback`;a in o&&e[a]()}}),{parse:O}=i({query:S,handle(e,t){m.has(e)&&(t?b.add(e):b.delete(e),w.length&&M.call(w,e))}}),{attachShadow:A}=Element.prototype;A&&(Element.prototype.attachShadow=function(e){let t=A.call(this,e);return m.set(this,t),t});let $=e=>{if(!x.has(e)){let t;let r=new Promise(e=>{t=e});x.set(e,{$:r,_:t})}return x.get(e).$},j=((e,t)=>{let r=e=>{for(let t of e)n(t)},n=({target:e,attributeName:t,oldValue:r})=>{e.attributeChangedCallback(t,r,e.getAttribute(t))};return(o,a)=>{let{observedAttributes:i}=o.constructor;return i&&e(a).then(()=>{for(let e of(new t(r).observe(o,{attributes:!0,attributeOldValue:!0,attributeFilter:i}),i))o.hasAttribute(e)&&n({target:o,attributeName:e,oldValue:null})}),o}})($,MutationObserver),N=null;function M(e){E(m.get(e).querySelectorAll(this),e.isConnected)}p(self).filter(e=>/^HTML.*Element$/.test(e)).forEach(e=>{let t=self[e];function r(){let{constructor:e}=this;if(!g.has(e))throw TypeError("Illegal constructor");let{is:r,tag:n}=g.get(e);if(r){if(N)return j(N,r);let t=l.call(document,n);return t.setAttribute("is",r),j(h(t,e.prototype),r)}return f.call(this,t,[],e)}h(r,t),u(r.prototype=t.prototype,"constructor",{value:t}),u(self,e,{value:r})}),document.createElement=function(e,t){let r=t&&t.is;if(r){let t=y.get(r);if(t&&g.get(t).tag===e)return new t}let n=l.call(document,e);return r&&n.setAttribute("is",r),n},customElements.get=C,customElements.whenDefined=$,customElements.upgrade=function(e){let t=e.getAttribute("is");if(t){let r=y.get(t);if(r){j(h(e,r.prototype),t);return}}d.call(customElements,e)},customElements.define=function(e,t,r){let n;if(C(e))throw Error(`'${e}' has already been defined as a custom element`);let o=r&&r.extends;g.set(t,o?{is:e,tag:o}:{is:"",tag:e}),o?(n=`${o}[is="${e}"]`,v.set(n,t.prototype),y.set(e,t),w.push(n)):(s.apply(customElements,arguments),S.push(n=e)),$(e).then(()=>{o?(E(document.querySelectorAll(n)),b.forEach(M,[n])):O(document.querySelectorAll(n))}),x.get(e)._(t)}}();const g=function(e,t,r={},n,o){o=o??this??self;let a=new CustomEvent(`${e}.${t}`,{bubbles:!0,cancelable:!0,detail:{...r,...n&&{originalEvent:n}}});console.log(`CustomEvent emitted: ${e}.${t}`),o.dispatchEvent(a)},x={cancelEvent:(e,t=!0,r=!0,n=!0)=>{if(e)return t&&e.preventDefault(),r&&e.stopPropagation(),n&&e.stopImmediatePropagation(),!1},dispatchCustomEvent:g,dispatchComponentEvent:function(e,t,r){let n=this.componentName;g.call(this,n,e,t,r??new Event(`${n}.${e}`))}},v={base64:{encode:e=>{if(!u(e))throw Error("@wcag-js/core error, encodeBase64: the provided parameter is not a valid string");return btoa(encodeURIComponent(e))},decode:e=>{if(!u(e))throw Error("@wcag-js/core error, decodeBase64: the provided parameter is not a valid string");return decodeURIComponent(atob(e))},fromJSON:e=>{if(!i(e))throw Error("@wcag-js/core error, base64.fromJSON: the provided parameter is not a valid object");return encodeBase64(JSON.stringify(e))},toJSON:e=>{if(!u(e))throw Error("@wcag-js/core error, base64ToJson: the provided parameter is not a valid string");return JSON.parse(decodeBase64(e))}},jwt:{parse:e=>JSON.parse(decodeURIComponent(atob(e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join("")))},md5:function(e){function t(e,t){return e<<t|e>>>32-t}function r(e,t){var r,n,o,a,i;return(o=0x80000000&e,a=0x80000000&t,r=0x40000000&e,n=0x40000000&t,i=(0x3fffffff&e)+(0x3fffffff&t),r&n)?0x80000000^i^o^a:r|n?0x40000000&i?0xc0000000^i^o^a:0x40000000^i^o^a:i^o^a}function n(e,n,o,a,i,l,s){return e=r(e,r(r(n&o|~n&a,i),s)),r(t(e,l),n)}function o(e,n,o,a,i,l,s){return e=r(e,r(r(n&a|o&~a,i),s)),r(t(e,l),n)}function a(e,n,o,a,i,l,s){return e=r(e,r(r(n^o^a,i),s)),r(t(e,l),n)}function i(e,n,o,a,i,l,s){return e=r(e,r(r(o^(n|~a),i),s)),r(t(e,l),n)}function l(e){var t,r="",n="";for(t=0;t<=3;t++)r+=(n="0"+(e>>>8*t&255).toString(16)).substr(n.length-2,2);return r}var s,c,d,f,u,p,h,m,b,g=[];for(s=0,g=function(e){for(var t,r=e.length,n=r+8,o=((n-n%64)/64+1)*16,a=Array(o-1),i=0,l=0;l<r;)t=(l-l%4)/4,i=l%4*8,a[t]=a[t]|e.charCodeAt(l)<<i,l++;return t=(l-l%4)/4,i=l%4*8,a[t]=a[t]|128<<i,a[o-2]=r<<3,a[o-1]=r>>>29,a}(e=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",r=0;r<e.length;r++){var n=e.charCodeAt(r);n<128?t+=String.fromCharCode(n):(n>127&&n<2048?t+=String.fromCharCode(n>>6|192):(t+=String.fromCharCode(n>>12|224),t+=String.fromCharCode(n>>6&63|128)),t+=String.fromCharCode(63&n|128))}return t}(e)),p=0x67452301,h=0xefcdab89,m=0x98badcfe,b=0x10325476;s<g.length;s+=16)c=p,d=h,f=m,u=b,p=n(p,h,m,b,g[s+0],7,0xd76aa478),b=n(b,p,h,m,g[s+1],12,0xe8c7b756),m=n(m,b,p,h,g[s+2],17,0x242070db),h=n(h,m,b,p,g[s+3],22,0xc1bdceee),p=n(p,h,m,b,g[s+4],7,0xf57c0faf),b=n(b,p,h,m,g[s+5],12,0x4787c62a),m=n(m,b,p,h,g[s+6],17,0xa8304613),h=n(h,m,b,p,g[s+7],22,0xfd469501),p=n(p,h,m,b,g[s+8],7,0x698098d8),b=n(b,p,h,m,g[s+9],12,0x8b44f7af),m=n(m,b,p,h,g[s+10],17,0xffff5bb1),h=n(h,m,b,p,g[s+11],22,0x895cd7be),p=n(p,h,m,b,g[s+12],7,0x6b901122),b=n(b,p,h,m,g[s+13],12,0xfd987193),m=n(m,b,p,h,g[s+14],17,0xa679438e),h=n(h,m,b,p,g[s+15],22,0x49b40821),p=o(p,h,m,b,g[s+1],5,0xf61e2562),b=o(b,p,h,m,g[s+6],9,0xc040b340),m=o(m,b,p,h,g[s+11],14,0x265e5a51),h=o(h,m,b,p,g[s+0],20,0xe9b6c7aa),p=o(p,h,m,b,g[s+5],5,0xd62f105d),b=o(b,p,h,m,g[s+10],9,0x2441453),m=o(m,b,p,h,g[s+15],14,0xd8a1e681),h=o(h,m,b,p,g[s+4],20,0xe7d3fbc8),p=o(p,h,m,b,g[s+9],5,0x21e1cde6),b=o(b,p,h,m,g[s+14],9,0xc33707d6),m=o(m,b,p,h,g[s+3],14,0xf4d50d87),h=o(h,m,b,p,g[s+8],20,0x455a14ed),p=o(p,h,m,b,g[s+13],5,0xa9e3e905),b=o(b,p,h,m,g[s+2],9,0xfcefa3f8),m=o(m,b,p,h,g[s+7],14,0x676f02d9),h=o(h,m,b,p,g[s+12],20,0x8d2a4c8a),p=a(p,h,m,b,g[s+5],4,0xfffa3942),b=a(b,p,h,m,g[s+8],11,0x8771f681),m=a(m,b,p,h,g[s+11],16,0x6d9d6122),h=a(h,m,b,p,g[s+14],23,0xfde5380c),p=a(p,h,m,b,g[s+1],4,0xa4beea44),b=a(b,p,h,m,g[s+4],11,0x4bdecfa9),m=a(m,b,p,h,g[s+7],16,0xf6bb4b60),h=a(h,m,b,p,g[s+10],23,0xbebfbc70),p=a(p,h,m,b,g[s+13],4,0x289b7ec6),b=a(b,p,h,m,g[s+0],11,0xeaa127fa),m=a(m,b,p,h,g[s+3],16,0xd4ef3085),h=a(h,m,b,p,g[s+6],23,0x4881d05),p=a(p,h,m,b,g[s+9],4,0xd9d4d039),b=a(b,p,h,m,g[s+12],11,0xe6db99e5),m=a(m,b,p,h,g[s+15],16,0x1fa27cf8),h=a(h,m,b,p,g[s+2],23,0xc4ac5665),p=i(p,h,m,b,g[s+0],6,0xf4292244),b=i(b,p,h,m,g[s+7],10,0x432aff97),m=i(m,b,p,h,g[s+14],15,0xab9423a7),h=i(h,m,b,p,g[s+5],21,0xfc93a039),p=i(p,h,m,b,g[s+12],6,0x655b59c3),b=i(b,p,h,m,g[s+3],10,0x8f0ccc92),m=i(m,b,p,h,g[s+10],15,0xffeff47d),h=i(h,m,b,p,g[s+1],21,0x85845dd1),p=i(p,h,m,b,g[s+8],6,0x6fa87e4f),b=i(b,p,h,m,g[s+15],10,0xfe2ce6e0),m=i(m,b,p,h,g[s+6],15,0xa3014314),h=i(h,m,b,p,g[s+13],21,0x4e0811a1),p=i(p,h,m,b,g[s+4],6,0xf7537e82),b=i(b,p,h,m,g[s+11],10,0xbd3af235),m=i(m,b,p,h,g[s+2],15,0x2ad7d2bb),h=i(h,m,b,p,g[s+9],21,0xeb86d391),p=r(p,c),h=r(h,d),m=r(m,f),b=r(b,u);return(l(p)+l(h)+l(m)+l(b)).toLowerCase()}};var y={};e(y,"buildFileList",()=>S),e(y,"buildFileArray",()=>w);const S=e=>{if(e instanceof FileList)return e;let t=new DataTransfer;for(let r of e)t.items.add(r);return t.files},w=e=>e instanceof Array?e:Array.from(e),C={debounce:function(e,t=300){let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>{e.apply(this,n)},t)}},throttle:function(e,t=300){let r;return(...n)=>{r||(r=!0,setTimeout(()=>{e.apply(this,n),r=!1},t))}},files:y,types:t},E=e=>{let t=t||window;Object.assign(t,{wcagUI:{...t.wcagUI,...mixin}})};