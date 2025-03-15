function e(e,r){return Object.keys(r).forEach(function(t){!("default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(e,t))&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}})}),e}function r(e,r,t,o){Object.defineProperty(e,r,{get:t,set:o,enumerable:!0,configurable:!0})}var t={},o={};r(o,"trueTypeOf",()=>n),r(o,"isNull",()=>a),r(o,"isUndefined",()=>c),r(o,"isNullOrUndefined",()=>i),r(o,"isObject",()=>f),r(o,"isSymbol",()=>s),r(o,"isFunction",()=>d),r(o,"isBoolean",()=>x),r(o,"isNumber",()=>u),r(o,"isDate",()=>l),r(o,"isString",()=>b),r(o,"isRegExp",()=>p),r(o,"isArray",()=>m);/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String} The object type
 */const n=e=>Object.prototype.toString.call(e).slice(8,-1),a=e=>"Null"===n(e),c=e=>"Undefined"===n(e),i=e=>a(e)||c(e),f=e=>"Object"===n(e),s=e=>"Symbol"===n(e),d=e=>"Function"===n(e),x=e=>"Boolean"===n(e),u=e=>"Number"===n(e),l=e=>"Date"===n(e),b=e=>"String"===n(e),p=e=>"RegExp"===n(e),m=e=>"Array"===n(e);var g={};r(g,"Asserts",()=>h);class h{static _checkAssert(e,r=!1){if(e){if(e instanceof Function){if(r)try{return e()}catch(e){return!1}return e()}return e}return!1}static all(e=[],r=!1){return e.every(e=>h._checkAssert(e,r))}static one(e=[],r=!1){return e.some(e=>h._checkAssert(e,r))}}var v={};function C(e,r=300){let t;return(...o)=>{clearTimeout(t),t=setTimeout(()=>{e.apply(this,o)},r)}}r(v,"debounce",()=>C);var y={};function w(e,r=300){let t;return(...o)=>{t||(t=!0,setTimeout(()=>{e.apply(this,o),t=!1},r))}}r(y,"throttle",()=>w);var S={};r(S,"buildFileList",()=>j),r(S,"buildFileArray",()=>O);const j=e=>{if(e instanceof FileList)return e;let r=new DataTransfer;for(let t of e)r.items.add(t);return r.files},O=e=>e instanceof Array?e:Array.from(e);var U={};r(U,"md5",()=>T);const T=function(e){function r(e,r){return e<<r|e>>>32-r}function t(e,r){var t,o,n,a,c;return(n=0x80000000&e,a=0x80000000&r,t=0x40000000&e,o=0x40000000&r,c=(0x3fffffff&e)+(0x3fffffff&r),t&o)?0x80000000^c^n^a:t|o?0x40000000&c?0xc0000000^c^n^a:0x40000000^c^n^a:c^n^a}function o(e,o,n,a,c,i,f){return e=t(e,t(t(o&n|~o&a,c),f)),t(r(e,i),o)}function n(e,o,n,a,c,i,f){return e=t(e,t(t(o&a|n&~a,c),f)),t(r(e,i),o)}function a(e,o,n,a,c,i,f){return e=t(e,t(t(o^n^a,c),f)),t(r(e,i),o)}function c(e,o,n,a,c,i,f){return e=t(e,t(t(n^(o|~a),c),f)),t(r(e,i),o)}function i(e){var r,t="",o="";for(r=0;r<=3;r++)t+=(o="0"+(e>>>8*r&255).toString(16)).substr(o.length-2,2);return t}var f,s,d,x,u,l,b,p,m,g=[];for(f=0,g=function(e){for(var r,t=e.length,o=t+8,n=((o-o%64)/64+1)*16,a=Array(n-1),c=0,i=0;i<t;)r=(i-i%4)/4,c=i%4*8,a[r]=a[r]|e.charCodeAt(i)<<c,i++;return r=(i-i%4)/4,c=i%4*8,a[r]=a[r]|128<<c,a[n-2]=t<<3,a[n-1]=t>>>29,a}(e=function(e){e=e.replace(/\r\n/g,"\n");for(var r="",t=0;t<e.length;t++){var o=e.charCodeAt(t);o<128?r+=String.fromCharCode(o):(o>127&&o<2048?r+=String.fromCharCode(o>>6|192):(r+=String.fromCharCode(o>>12|224),r+=String.fromCharCode(o>>6&63|128)),r+=String.fromCharCode(63&o|128))}return r}(e)),l=0x67452301,b=0xefcdab89,p=0x98badcfe,m=0x10325476;f<g.length;f+=16)s=l,d=b,x=p,u=m,l=o(l,b,p,m,g[f+0],7,0xd76aa478),m=o(m,l,b,p,g[f+1],12,0xe8c7b756),p=o(p,m,l,b,g[f+2],17,0x242070db),b=o(b,p,m,l,g[f+3],22,0xc1bdceee),l=o(l,b,p,m,g[f+4],7,0xf57c0faf),m=o(m,l,b,p,g[f+5],12,0x4787c62a),p=o(p,m,l,b,g[f+6],17,0xa8304613),b=o(b,p,m,l,g[f+7],22,0xfd469501),l=o(l,b,p,m,g[f+8],7,0x698098d8),m=o(m,l,b,p,g[f+9],12,0x8b44f7af),p=o(p,m,l,b,g[f+10],17,0xffff5bb1),b=o(b,p,m,l,g[f+11],22,0x895cd7be),l=o(l,b,p,m,g[f+12],7,0x6b901122),m=o(m,l,b,p,g[f+13],12,0xfd987193),p=o(p,m,l,b,g[f+14],17,0xa679438e),b=o(b,p,m,l,g[f+15],22,0x49b40821),l=n(l,b,p,m,g[f+1],5,0xf61e2562),m=n(m,l,b,p,g[f+6],9,0xc040b340),p=n(p,m,l,b,g[f+11],14,0x265e5a51),b=n(b,p,m,l,g[f+0],20,0xe9b6c7aa),l=n(l,b,p,m,g[f+5],5,0xd62f105d),m=n(m,l,b,p,g[f+10],9,0x2441453),p=n(p,m,l,b,g[f+15],14,0xd8a1e681),b=n(b,p,m,l,g[f+4],20,0xe7d3fbc8),l=n(l,b,p,m,g[f+9],5,0x21e1cde6),m=n(m,l,b,p,g[f+14],9,0xc33707d6),p=n(p,m,l,b,g[f+3],14,0xf4d50d87),b=n(b,p,m,l,g[f+8],20,0x455a14ed),l=n(l,b,p,m,g[f+13],5,0xa9e3e905),m=n(m,l,b,p,g[f+2],9,0xfcefa3f8),p=n(p,m,l,b,g[f+7],14,0x676f02d9),b=n(b,p,m,l,g[f+12],20,0x8d2a4c8a),l=a(l,b,p,m,g[f+5],4,0xfffa3942),m=a(m,l,b,p,g[f+8],11,0x8771f681),p=a(p,m,l,b,g[f+11],16,0x6d9d6122),b=a(b,p,m,l,g[f+14],23,0xfde5380c),l=a(l,b,p,m,g[f+1],4,0xa4beea44),m=a(m,l,b,p,g[f+4],11,0x4bdecfa9),p=a(p,m,l,b,g[f+7],16,0xf6bb4b60),b=a(b,p,m,l,g[f+10],23,0xbebfbc70),l=a(l,b,p,m,g[f+13],4,0x289b7ec6),m=a(m,l,b,p,g[f+0],11,0xeaa127fa),p=a(p,m,l,b,g[f+3],16,0xd4ef3085),b=a(b,p,m,l,g[f+6],23,0x4881d05),l=a(l,b,p,m,g[f+9],4,0xd9d4d039),m=a(m,l,b,p,g[f+12],11,0xe6db99e5),p=a(p,m,l,b,g[f+15],16,0x1fa27cf8),b=a(b,p,m,l,g[f+2],23,0xc4ac5665),l=c(l,b,p,m,g[f+0],6,0xf4292244),m=c(m,l,b,p,g[f+7],10,0x432aff97),p=c(p,m,l,b,g[f+14],15,0xab9423a7),b=c(b,p,m,l,g[f+5],21,0xfc93a039),l=c(l,b,p,m,g[f+12],6,0x655b59c3),m=c(m,l,b,p,g[f+3],10,0x8f0ccc92),p=c(p,m,l,b,g[f+10],15,0xffeff47d),b=c(b,p,m,l,g[f+1],21,0x85845dd1),l=c(l,b,p,m,g[f+8],6,0x6fa87e4f),m=c(m,l,b,p,g[f+15],10,0xfe2ce6e0),p=c(p,m,l,b,g[f+6],15,0xa3014314),b=c(b,p,m,l,g[f+13],21,0x4e0811a1),l=c(l,b,p,m,g[f+4],6,0xf7537e82),m=c(m,l,b,p,g[f+11],10,0xbd3af235),p=c(p,m,l,b,g[f+2],15,0x2ad7d2bb),b=c(b,p,m,l,g[f+9],21,0xeb86d391),l=t(l,s),b=t(b,d),p=t(p,x),m=t(m,u);return(i(l)+i(b)+i(p)+i(m)).toLowerCase()};var A={};r(A,"encodeBase64",()=>I),r(A,"decodeBase64",()=>k),r(A,"jsonToBase64",()=>E),r(A,"base64ToJson",()=>R);const I=e=>{if(!b(e))throw Error("@wcag-js/core error, encodeBase64: the provided parameter is not a valid string");return btoa(encodeURIComponent(e))},k=e=>{if(!b(e))throw Error("@wcag-js/core error, decodeBase64: the provided parameter is not a valid string");return decodeURIComponent(atob(e))},E=e=>{if(!f(e))throw Error("@wcag-js/core error, jsonToBase64: the provided parameter is not a valid object");return I(JSON.stringify(e))},R=e=>{if(!b(e))throw Error("@wcag-js/core error, base64ToJson: the provided parameter is not a valid string");return JSON.parse(k(e))};var B={};r(B,"parseJWT",()=>N);const N=e=>JSON.parse(decodeURIComponent(atob(e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join("")));var J={};r(J,"CookieStorage",()=>D);class D{static setItem(e,r,t=7){let o=new Date(Date.now()+864e5*t).toUTCString();document.cookie=`${encodeURIComponent(e)}=${encodeURIComponent(r)}; expires=${o}; path=/`}static getItem(e){return document.cookie.split("; ").find(r=>r.startsWith(`${encodeURIComponent(e)}=`))?.split("=")[1]||null}static removeItem(e){document.cookie=`${encodeURIComponent(e)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`}static clear(){document.cookie.split(";").forEach(e=>{document.cookie=e.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)})}}Object.defineProperty(self,"cookieStorage",{value:D,configurable:!1,enumerable:!1,writable:!1});var F={};r(F,"wcagUIExtender",()=>$);const $=e=>{let r=r||window;Object.assign(r,{wcagUI:{...r.wcagUI,...mixin}})};e(t,o),e(t,g),e(t,v),e(t,y),e(t,S),e(t,U),e(t,A),e(t,B),e(t,J),e(t,F),e(module.exports,t);