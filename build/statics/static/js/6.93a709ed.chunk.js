(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[6],{212:function(t,e,n){},218:function(t,e,n){"use strict";n.r(e);var r=n(29),o=n(0),a=n.n(o),u=n(57),c=n.n(u),i=n(30);n(212);function s(){var t=Object(o.useState)(!1),e=Object(r.a)(t,2),n=e[0],u=e[1],s="".concat(i.AGENT_HOST,"/screenshot?a=").concat(Date.now());return a.a.createElement("div",{className:"SnapshotPage"},a.a.createElement("button",{className:"button is-primary is-outlined centered",type:"button",onClick:function(){return u(!n)}},"Click to take a Screenshot"),n&&a.a.createElement("div",{className:"modal is-active"},a.a.createElement("div",{className:"modal-background"}),a.a.createElement("div",{className:"modal-content"},a.a.createElement("p",{className:"image is-4by3"},a.a.createElement("img",{key:c.a.generate(),src:s,alt:""}))),a.a.createElement("button",{type:"button",className:"modal-close is-large","aria-label":"close",onClick:function(){return u(!1)}})))}n.d(e,"default",(function(){return s}))},29:function(t,e,n){"use strict";function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var u,c=t[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(i){o=!0,a=i}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(e,"a",(function(){return r}))},30:function(t,e,n){"use strict";n.r(e),n.d(e,"AGENT_HOST",(function(){return r})),n.d(e,"FILE_EXPLORER_ROOT",(function(){return o}));var r="/api",o="/home"},45:function(t,e,n){"use strict";var r,o,a,u=n(68),c="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function i(){a=!1}function s(t){if(t){if(t!==r){if(t.length!==c.length)throw new Error("Custom alphabet for shortid must be "+c.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+c.length+" unique characters. These characters were not unique: "+e.join(", "));r=t,i()}}else r!==c&&(r=c,i())}function l(){return a||(a=function(){r||s(c);for(var t,e=r.split(""),n=[],o=u.nextValue();e.length>0;)o=u.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}t.exports={get:function(){return r||c},characters:function(t){return s(t),r},seed:function(t){u.seed(t),o!==t&&(i(),o=t)},lookup:function(t){return l()[t]},shuffled:l}},57:function(t,e,n){"use strict";t.exports=n(67)},67:function(t,e,n){"use strict";var r=n(45),o=n(69),a=n(73),u=n(74)||0;function c(){return o(u)}t.exports=c,t.exports.generate=c,t.exports.seed=function(e){return r.seed(e),t.exports},t.exports.worker=function(e){return u=e,t.exports},t.exports.characters=function(t){return void 0!==t&&r.characters(t),r.shuffled()},t.exports.isValid=a},68:function(t,e,n){"use strict";var r=1;t.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(t){r=t}}},69:function(t,e,n){"use strict";var r,o,a=n(70),u=(n(45),1567752802062),c=7;t.exports=function(t){var e="",n=Math.floor(.001*(Date.now()-u));return n===o?r++:(r=0,o=n),e+=a(c),e+=a(t),r>0&&(e+=a(r)),e+=a(n)}},70:function(t,e,n){"use strict";var r=n(45),o=n(71),a=n(72);t.exports=function(t){for(var e,n=0,u="";!e;)u+=a(o,r.get(),1),e=t<Math.pow(16,n+1),n++;return u}},71:function(t,e,n){"use strict";var r,o="object"===typeof window&&(window.crypto||window.msCrypto);r=o&&o.getRandomValues?function(t){return o.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},t.exports=r},72:function(t,e){t.exports=function(t,e,n){for(var r=(2<<Math.log(e.length-1)/Math.LN2)-1,o=Math.ceil(1.6*r*n/e.length),a="";;)for(var u=o,c=t(u);u--;)if((a+=e[c[u]&r]||"").length===+n)return a}},73:function(t,e,n){"use strict";var r=n(45);t.exports=function(t){return!(!t||"string"!==typeof t||t.length<6)&&!new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)}},74:function(t,e,n){"use strict";t.exports=0}}]);
//# sourceMappingURL=6.93a709ed.chunk.js.map