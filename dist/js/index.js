/*!
 * Front for marketdo4a.com 1.8.0 
 * By Roman Meshcheryakov, Riverstart, 2020
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{15:function(e,t){e.exports=jQuery},25:function(e,t,i){"use strict";var n=i(0);class s{constructor(e){const t=this;for(let i=0;i<e.length;i+=1)t[i]=e[i];return t.length=e.length,this}}function l(e,t){const i=[];let l=0;if(e&&!t&&e instanceof s)return e;if(e)if("string"==typeof e){let s,r;const o=e.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){let e="div";for(0===o.indexOf("<li")&&(e="ul"),0===o.indexOf("<tr")&&(e="tbody"),0!==o.indexOf("<td")&&0!==o.indexOf("<th")||(e="tr"),0===o.indexOf("<tbody")&&(e="table"),0===o.indexOf("<option")&&(e="select"),r=n.a.createElement(e),r.innerHTML=o,l=0;l<r.childNodes.length;l+=1)i.push(r.childNodes[l])}else for(s=t||"#"!==e[0]||e.match(/[ .<>:~]/)?(t||n.a).querySelectorAll(e.trim()):[n.a.getElementById(e.trim().split("#")[1])],l=0;l<s.length;l+=1)s[l]&&i.push(s[l])}else if(e.nodeType||e===n.b||e===n.a)i.push(e);else if(e.length>0&&e[0].nodeType)for(l=0;l<e.length;l+=1)i.push(e[l]);return new s(i)}function r(e){const t=[];for(let i=0;i<e.length;i+=1)-1===t.indexOf(e[i])&&t.push(e[i]);return t}function o(e){return n.b.requestAnimationFrame?n.b.requestAnimationFrame(e):n.b.webkitRequestAnimationFrame?n.b.webkitRequestAnimationFrame(e):n.b.setTimeout(e,1e3/60)}l.fn=s.prototype,l.Class=s,l.Dom7=s;var a=Object.freeze({addClass:function(e){if(void 0===e)return this;const t=e.split(" ");for(let e=0;e<t.length;e+=1)for(let i=0;i<this.length;i+=1)void 0!==this[i]&&void 0!==this[i].classList&&this[i].classList.add(t[e]);return this},removeClass:function(e){const t=e.split(" ");for(let e=0;e<t.length;e+=1)for(let i=0;i<this.length;i+=1)void 0!==this[i]&&void 0!==this[i].classList&&this[i].classList.remove(t[e]);return this},hasClass:function(e){return!!this[0]&&this[0].classList.contains(e)},toggleClass:function(e){const t=e.split(" ");for(let e=0;e<t.length;e+=1)for(let i=0;i<this.length;i+=1)void 0!==this[i]&&void 0!==this[i].classList&&this[i].classList.toggle(t[e]);return this},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(let i=0;i<this.length;i+=1)if(2===arguments.length)this[i].setAttribute(e,t);else for(const t in e)this[i][t]=e[t],this[i].setAttribute(t,e[t]);return this},removeAttr:function(e){for(let t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},prop:function(e,t){if(1!==arguments.length||"string"!=typeof e){for(let i=0;i<this.length;i+=1)if(2===arguments.length)this[i][e]=t;else for(const t in e)this[i][t]=e[t];return this}if(this[0])return this[0][e]},data:function(e,t){let i;if(void 0!==t){for(let n=0;n<this.length;n+=1)i=this[n],i.dom7ElementDataStorage||(i.dom7ElementDataStorage={}),i.dom7ElementDataStorage[e]=t;return this}if(i=this[0],i){if(i.dom7ElementDataStorage&&e in i.dom7ElementDataStorage)return i.dom7ElementDataStorage[e];const t=i.getAttribute(`data-${e}`);return t||void 0}},removeData:function(e){for(let t=0;t<this.length;t+=1){const i=this[t];i.dom7ElementDataStorage&&i.dom7ElementDataStorage[e]&&(i.dom7ElementDataStorage[e]=null,delete i.dom7ElementDataStorage[e])}},dataset:function(){const e=this[0];if(!e)return;const t={};if(e.dataset)for(const i in e.dataset)t[i]=e.dataset[i];else for(let n=0;n<e.attributes.length;n+=1){const s=e.attributes[n];s.name.indexOf("data-")>=0&&(t[(i=s.name.split("data-")[1],i.toLowerCase().replace(/-(.)/g,(e,t)=>t.toUpperCase()))]=s.value)}var i;for(const e in t)"false"===t[e]?t[e]=!1:"true"===t[e]?t[e]=!0:parseFloat(t[e])===1*t[e]&&(t[e]*=1);return t},val:function(e){const t=this;if(void 0!==e){for(let i=0;i<t.length;i+=1){const n=t[i];if(Array.isArray(e)&&n.multiple&&"select"===n.nodeName.toLowerCase())for(let t=0;t<n.options.length;t+=1)n.options[t].selected=e.indexOf(n.options[t].value)>=0;else n.value=e}return t}if(t[0]){if(t[0].multiple&&"select"===t[0].nodeName.toLowerCase()){const e=[];for(let i=0;i<t[0].selectedOptions.length;i+=1)e.push(t[0].selectedOptions[i].value);return e}return t[0].value}},transform:function(e){for(let t=0;t<this.length;t+=1){const i=this[t].style;i.webkitTransform=e,i.transform=e}return this},transition:function(e){"string"!=typeof e&&(e=`${e}ms`);for(let t=0;t<this.length;t+=1){const i=this[t].style;i.webkitTransitionDuration=e,i.transitionDuration=e}return this},on:function(...e){let[t,i,n,s]=e;function r(e){const t=e.target;if(!t)return;const s=e.target.dom7EventData||[];if(s.indexOf(e)<0&&s.unshift(e),l(t).is(i))n.apply(t,s);else{const e=l(t).parents();for(let t=0;t<e.length;t+=1)l(e[t]).is(i)&&n.apply(e[t],s)}}function o(e){const t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),n.apply(this,t)}"function"==typeof e[1]&&([t,n,s]=e,i=void 0),s||(s=!1);const a=t.split(" ");let c;for(let e=0;e<this.length;e+=1){const t=this[e];if(i)for(c=0;c<a.length;c+=1){const e=a[c];t.dom7LiveListeners||(t.dom7LiveListeners={}),t.dom7LiveListeners[e]||(t.dom7LiveListeners[e]=[]),t.dom7LiveListeners[e].push({listener:n,proxyListener:r}),t.addEventListener(e,r,s)}else for(c=0;c<a.length;c+=1){const e=a[c];t.dom7Listeners||(t.dom7Listeners={}),t.dom7Listeners[e]||(t.dom7Listeners[e]=[]),t.dom7Listeners[e].push({listener:n,proxyListener:o}),t.addEventListener(e,o,s)}}return this},off:function(...e){let[t,i,n,s]=e;"function"==typeof e[1]&&([t,n,s]=e,i=void 0),s||(s=!1);const l=t.split(" ");for(let e=0;e<l.length;e+=1){const t=l[e];for(let e=0;e<this.length;e+=1){const l=this[e];let r;if(!i&&l.dom7Listeners?r=l.dom7Listeners[t]:i&&l.dom7LiveListeners&&(r=l.dom7LiveListeners[t]),r&&r.length)for(let e=r.length-1;e>=0;e-=1){const i=r[e];n&&i.listener===n||n&&i.listener&&i.listener.dom7proxy&&i.listener.dom7proxy===n?(l.removeEventListener(t,i.proxyListener,s),r.splice(e,1)):n||(l.removeEventListener(t,i.proxyListener,s),r.splice(e,1))}}}return this},once:function(...e){const t=this;let[i,n,s,l]=e;function r(...e){s.apply(this,e),t.off(i,n,r,l),r.dom7proxy&&delete r.dom7proxy}return"function"==typeof e[1]&&([i,s,l]=e,n=void 0),r.dom7proxy=s,t.on(i,n,r,l)},trigger:function(...e){const t=e[0].split(" "),i=e[1];for(let s=0;s<t.length;s+=1){const l=t[s];for(let t=0;t<this.length;t+=1){const s=this[t];let r;try{r=new n.b.CustomEvent(l,{detail:i,bubbles:!0,cancelable:!0})}catch(e){r=n.a.createEvent("Event"),r.initEvent(l,!0,!0),r.detail=i}s.dom7EventData=e.filter((e,t)=>t>0),s.dispatchEvent(r),s.dom7EventData=[],delete s.dom7EventData}}return this},transitionEnd:function(e){const t=["webkitTransitionEnd","transitionend"],i=this;let n;function s(l){if(l.target===this)for(e.call(this,l),n=0;n<t.length;n+=1)i.off(t[n],s)}if(e)for(n=0;n<t.length;n+=1)i.on(t[n],s);return this},animationEnd:function(e){const t=["webkitAnimationEnd","animationend"],i=this;let n;function s(l){if(l.target===this)for(e.call(this,l),n=0;n<t.length;n+=1)i.off(t[n],s)}if(e)for(n=0;n<t.length;n+=1)i.on(t[n],s);return this},width:function(){return this[0]===n.b?n.b.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetWidth+parseFloat(e.getPropertyValue("margin-right"))+parseFloat(e.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},height:function(){return this[0]===n.b?n.b.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetHeight+parseFloat(e.getPropertyValue("margin-top"))+parseFloat(e.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},offset:function(){if(this.length>0){const e=this[0],t=e.getBoundingClientRect(),i=n.a.body,s=e.clientTop||i.clientTop||0,l=e.clientLeft||i.clientLeft||0,r=e===n.b?n.b.scrollY:e.scrollTop,o=e===n.b?n.b.scrollX:e.scrollLeft;return{top:t.top+r-s,left:t.left+o-l}}return null},hide:function(){for(let e=0;e<this.length;e+=1)this[e].style.display="none";return this},show:function(){for(let e=0;e<this.length;e+=1){const t=this[e];"none"===t.style.display&&(t.style.display=""),"none"===n.b.getComputedStyle(t,null).getPropertyValue("display")&&(t.style.display="block")}return this},styles:function(){return this[0]?n.b.getComputedStyle(this[0],null):{}},css:function(e,t){let i;if(1===arguments.length){if("string"!=typeof e){for(i=0;i<this.length;i+=1)for(let t in e)this[i].style[t]=e[t];return this}if(this[0])return n.b.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(i=0;i<this.length;i+=1)this[i].style[e]=t;return this}return this},toArray:function(){const e=[];for(let t=0;t<this.length;t+=1)e.push(this[t]);return e},each:function(e){if(!e)return this;for(let t=0;t<this.length;t+=1)if(!1===e.call(this[t],t,this[t]))return this;return this},forEach:function(e){if(!e)return this;for(let t=0;t<this.length;t+=1)if(!1===e.call(this[t],this[t],t))return this;return this},filter:function(e){const t=[],i=this;for(let n=0;n<i.length;n+=1)e.call(i[n],n,i[n])&&t.push(i[n]);return new s(t)},map:function(e){const t=[],i=this;for(let n=0;n<i.length;n+=1)t.push(e.call(i[n],n,i[n]));return new s(t)},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:void 0;for(let t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(let t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){const t=this[0];let i,r;if(!t||void 0===e)return!1;if("string"==typeof e){if(t.matches)return t.matches(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);for(i=l(e),r=0;r<i.length;r+=1)if(i[r]===t)return!0;return!1}if(e===n.a)return t===n.a;if(e===n.b)return t===n.b;if(e.nodeType||e instanceof s){for(i=e.nodeType?[e]:e,r=0;r<i.length;r+=1)if(i[r]===t)return!0;return!1}return!1},indexOf:function(e){for(let t=0;t<this.length;t+=1)if(this[t]===e)return t;return-1},index:function(){let e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;const t=this.length;let i;return e>t-1?new s([]):e<0?(i=t+e,new s(i<0?[]:[this[i]])):new s([this[e]])},append:function(...e){let t;for(let i=0;i<e.length;i+=1){t=e[i];for(let e=0;e<this.length;e+=1)if("string"==typeof t){const i=n.a.createElement("div");for(i.innerHTML=t;i.firstChild;)this[e].appendChild(i.firstChild)}else if(t instanceof s)for(let i=0;i<t.length;i+=1)this[e].appendChild(t[i]);else this[e].appendChild(t)}return this},appendTo:function(e){return l(e).append(this),this},prepend:function(e){let t,i;for(t=0;t<this.length;t+=1)if("string"==typeof e){const s=n.a.createElement("div");for(s.innerHTML=e,i=s.childNodes.length-1;i>=0;i-=1)this[t].insertBefore(s.childNodes[i],this[t].childNodes[0])}else if(e instanceof s)for(i=0;i<e.length;i+=1)this[t].insertBefore(e[i],this[t].childNodes[0]);else this[t].insertBefore(e,this[t].childNodes[0]);return this},prependTo:function(e){return l(e).prepend(this),this},insertBefore:function(e){const t=l(e);for(let e=0;e<this.length;e+=1)if(1===t.length)t[0].parentNode.insertBefore(this[e],t[0]);else if(t.length>1)for(let i=0;i<t.length;i+=1)t[i].parentNode.insertBefore(this[e].cloneNode(!0),t[i])},insertAfter:function(e){const t=l(e);for(let e=0;e<this.length;e+=1)if(1===t.length)t[0].parentNode.insertBefore(this[e],t[0].nextSibling);else if(t.length>1)for(let i=0;i<t.length;i+=1)t[i].parentNode.insertBefore(this[e].cloneNode(!0),t[i].nextSibling)},next:function(e){return this.length>0?e?this[0].nextElementSibling&&l(this[0].nextElementSibling).is(e)?new s([this[0].nextElementSibling]):new s([]):this[0].nextElementSibling?new s([this[0].nextElementSibling]):new s([]):new s([])},nextAll:function(e){const t=[];let i=this[0];if(!i)return new s([]);for(;i.nextElementSibling;){const n=i.nextElementSibling;e?l(n).is(e)&&t.push(n):t.push(n),i=n}return new s(t)},prev:function(e){if(this.length>0){const t=this[0];return e?t.previousElementSibling&&l(t.previousElementSibling).is(e)?new s([t.previousElementSibling]):new s([]):t.previousElementSibling?new s([t.previousElementSibling]):new s([])}return new s([])},prevAll:function(e){const t=[];let i=this[0];if(!i)return new s([]);for(;i.previousElementSibling;){const n=i.previousElementSibling;e?l(n).is(e)&&t.push(n):t.push(n),i=n}return new s(t)},siblings:function(e){return this.nextAll(e).add(this.prevAll(e))},parent:function(e){const t=[];for(let i=0;i<this.length;i+=1)null!==this[i].parentNode&&(e?l(this[i].parentNode).is(e)&&t.push(this[i].parentNode):t.push(this[i].parentNode));return l(r(t))},parents:function(e){const t=[];for(let i=0;i<this.length;i+=1){let n=this[i].parentNode;for(;n;)e?l(n).is(e)&&t.push(n):t.push(n),n=n.parentNode}return l(r(t))},closest:function(e){let t=this;return void 0===e?new s([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){const t=[];for(let i=0;i<this.length;i+=1){const n=this[i].querySelectorAll(e);for(let e=0;e<n.length;e+=1)t.push(n[e])}return new s(t)},children:function(e){const t=[];for(let i=0;i<this.length;i+=1){const n=this[i].childNodes;for(let i=0;i<n.length;i+=1)e?1===n[i].nodeType&&l(n[i]).is(e)&&t.push(n[i]):1===n[i].nodeType&&t.push(n[i])}return new s(r(t))},remove:function(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},detach:function(){return this.remove()},add:function(...e){const t=this;let i,n;for(i=0;i<e.length;i+=1){const s=l(e[i]);for(n=0;n<s.length;n+=1)t[t.length]=s[n],t.length+=1}return t},empty:function(){for(let e=0;e<this.length;e+=1){const t=this[e];if(1===t.nodeType){for(let e=0;e<t.childNodes.length;e+=1)t.childNodes[e].parentNode&&t.childNodes[e].parentNode.removeChild(t.childNodes[e]);t.textContent=""}}return this}});var c=Object.freeze({scrollTo:function(...e){let[t,i,n,s,l]=e;return 4===e.length&&"function"==typeof s&&(l=s,[t,i,n,l,s]=e),void 0===s&&(s="swing"),this.each((function(){const e=this;let r,a,c,d,u,h,f,p,g=i>0||0===i,m=t>0||0===t;if(void 0===s&&(s="swing"),g&&(r=e.scrollTop,n||(e.scrollTop=i)),m&&(a=e.scrollLeft,n||(e.scrollLeft=t)),!n)return;g&&(c=e.scrollHeight-e.offsetHeight,u=Math.max(Math.min(i,c),0)),m&&(d=e.scrollWidth-e.offsetWidth,h=Math.max(Math.min(t,d),0));let v=null;g&&u===r&&(g=!1),m&&h===a&&(m=!1),o((function t(i=(new Date).getTime()){null===v&&(v=i);const c=Math.max(Math.min((i-v)/n,1),0),d="linear"===s?c:.5-Math.cos(c*Math.PI)/2;let b;g&&(f=r+d*(u-r)),m&&(p=a+d*(h-a)),g&&u>r&&f>=u&&(e.scrollTop=u,b=!0),g&&u<r&&f<=u&&(e.scrollTop=u,b=!0),m&&h>a&&p>=h&&(e.scrollLeft=h,b=!0),m&&h<a&&p<=h&&(e.scrollLeft=h,b=!0),b?l&&l():(g&&(e.scrollTop=f),m&&(e.scrollLeft=p),o(t))}))}))},scrollTop:function(...e){let[t,i,n,s]=e;3===e.length&&"function"==typeof n&&([t,i,s,n]=e);const l=this;return void 0===t?l.length>0?l[0].scrollTop:null:l.scrollTo(void 0,t,i,n,s)},scrollLeft:function(...e){let[t,i,n,s]=e;3===e.length&&"function"==typeof n&&([t,i,s,n]=e);const l=this;return void 0===t?l.length>0?l[0].scrollLeft:null:l.scrollTo(t,void 0,i,n,s)}});var d=Object.freeze({animate:function(e,t){const i=this,s={props:Object.assign({},e),params:Object.assign({duration:300,easing:"swing"},t),elements:i,animating:!1,que:[],easingProgress:(e,t)=>"swing"===e?.5-Math.cos(t*Math.PI)/2:"function"==typeof e?e(t):t,stop(){var e;s.frameId&&(e=s.frameId,n.b.cancelAnimationFrame?n.b.cancelAnimationFrame(e):n.b.webkitCancelAnimationFrame?n.b.webkitCancelAnimationFrame(e):n.b.clearTimeout(e)),s.animating=!1,s.elements.each((e,t)=>{delete t.dom7AnimateInstance}),s.que=[]},done(e){if(s.animating=!1,s.elements.each((e,t)=>{delete t.dom7AnimateInstance}),e&&e(i),s.que.length>0){const e=s.que.shift();s.animate(e[0],e[1])}},animate(e,t){if(s.animating)return s.que.push([e,t]),s;const l=[];s.elements.each((t,i)=>{let r,o,a,c,d;i.dom7AnimateInstance||(s.elements[t].dom7AnimateInstance=s),l[t]={container:i},Object.keys(e).forEach(s=>{r=n.b.getComputedStyle(i,null).getPropertyValue(s).replace(",","."),o=parseFloat(r),a=r.replace(o,""),c=parseFloat(e[s]),d=e[s]+a,l[t][s]={initialFullValue:r,initialValue:o,unit:a,finalValue:c,finalFullValue:d,currentValue:o}})});let r,a,c=null,d=0,u=0,h=!1;return s.animating=!0,s.frameId=o((function n(){let f,p;r=(new Date).getTime(),h||(h=!0,t.begin&&t.begin(i)),null===c&&(c=r),t.progress&&t.progress(i,Math.max(Math.min((r-c)/t.duration,1),0),c+t.duration-r<0?0:c+t.duration-r,c),l.forEach(i=>{const n=i;a||n.done||Object.keys(e).forEach(i=>{if(a||n.done)return;f=Math.max(Math.min((r-c)/t.duration,1),0),p=s.easingProgress(t.easing,f);const{initialValue:o,finalValue:h,unit:g}=n[i];n[i].currentValue=o+p*(h-o);const m=n[i].currentValue;(h>o&&m>=h||h<o&&m<=h)&&(n.container.style[i]=h+g,u+=1,u===Object.keys(e).length&&(n.done=!0,d+=1),d===l.length&&(a=!0)),a?s.done(t.complete):n.container.style[i]=m+g})}),a||(s.frameId=o(n))})),s}};if(0===s.elements.length)return i;let l;for(let e=0;e<s.elements.length;e+=1)s.elements[e].dom7AnimateInstance?l=s.elements[e].dom7AnimateInstance:s.elements[e].dom7AnimateInstance=s;return l||(l=s),"stop"===e?l.stop():l.animate(s.props,s.params),i},stop:function(){const e=this;for(let t=0;t<e.length;t+=1)e[t].dom7AnimateInstance&&e[t].dom7AnimateInstance.stop()}});const u="resize scroll".split(" ");function h(e,...t){if(void 0===t[0]){for(let t=0;t<this.length;t+=1)u.indexOf(e)<0&&(e in this[t]?this[t][e]():l(this[t]).trigger(e));return this}return this.on(e,...t)}[a,c,d,Object.freeze({click:function(...e){return h.bind(this)("click",...e)},blur:function(...e){return h.bind(this)("blur",...e)},focus:function(...e){return h.bind(this)("focus",...e)},focusin:function(...e){return h.bind(this)("focusin",...e)},focusout:function(...e){return h.bind(this)("focusout",...e)},keyup:function(...e){return h.bind(this)("keyup",...e)},keydown:function(...e){return h.bind(this)("keydown",...e)},keypress:function(...e){return h.bind(this)("keypress",...e)},submit:function(...e){return h.bind(this)("submit",...e)},change:function(...e){return h.bind(this)("change",...e)},mousedown:function(...e){return h.bind(this)("mousedown",...e)},mousemove:function(...e){return h.bind(this)("mousemove",...e)},mouseup:function(...e){return h.bind(this)("mouseup",...e)},mouseenter:function(...e){return h.bind(this)("mouseenter",...e)},mouseleave:function(...e){return h.bind(this)("mouseleave",...e)},mouseout:function(...e){return h.bind(this)("mouseout",...e)},mouseover:function(...e){return h.bind(this)("mouseover",...e)},touchstart:function(...e){return h.bind(this)("touchstart",...e)},touchend:function(...e){return h.bind(this)("touchend",...e)},touchmove:function(...e){return h.bind(this)("touchmove",...e)},resize:function(...e){return h.bind(this)("resize",...e)},scroll:function(...e){return h.bind(this)("scroll",...e)}})].forEach(e=>{Object.keys(e).forEach(t=>{l.fn[t]=e[t]})}),t.a=l},258:function(e,t,i){"use strict";i.r(t);var n=i(16),s=i.n(n),l=i(14),r=i(50),o=i(62);s()((function(){l.a.init(),Object(r.c)(".hero-slider"),Object(r.d)(".set-block__slider"),Object(r.e)({slider:"#stars-slider",info:".stars__info",control:"#stars-slider .slider__controls"}),document.documentElement.clientWidth>=768&&([].forEach.call(document.querySelectorAll(".arnold"),(function(e){o.a.add(e.querySelector(".arnold__bg"),{y:-.08,x:0}),o.a.add(e.querySelector(".arnold__img"),{y:.08,x:0})})),Object(r.a)(".best-articles__slider"),i.e(15).then(i.bind(null,53)).then((function(e){return new(0,e.default)("#map")})))}))},50:function(e,t,i){"use strict";i.d(t,"a",(function(){return s})),i.d(t,"c",(function(){return c})),i.d(t,"d",(function(){return u})),i.d(t,"e",(function(){return f})),i.d(t,"b",(function(){return g}));var n=i(4);function s(e){return new n.g(e,{slidesPerView:"auto",freeMode:!0,touchEventsTarget:"wrapper",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",wrapperClass:"slider__wrapper",mousewheel:{forceToAxis:!0,invert:!0},scrollbar:{el:".slider-scrollbar",hide:!1,draggable:!0,dragSize:80,dragClass:"slider-scrollbar-track",snapOnRelease:!1},on:{setTranslate:function(e){this.$el.find(".slider-scrollbar-note").css("opacity",Math.max(Math.min(e/90+1,1),0))}}})}n.g.use([n.d,n.f,n.c,n.b]);var l=i(11),r=i.n(l),o=i(23),a=i.n(o);function c(e){return d.apply(this,arguments)}function d(){return(d=a()(r.a.mark((function e(t){var s,l,o,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=document.querySelector(t)){e.next=3;break}return e.abrupt("return");case 3:if(!(s.querySelectorAll(".slider__slide").length<2)){e.next=6;break}return[].forEach.call(s.querySelectorAll(".swiper-lazy"),(function(e){e.classList.remove("swiper-lazy"),e.classList.add("lazyload")})),e.abrupt("return");case 6:return s.classList.add("slider"),e.next=9,Promise.all([i.e(17),i.e(18)]).then(i.bind(null,280));case 9:l=e.sent,o=l.default,n.g.use([n.e,o,n.h]),(a=new n.g(s,{init:!1,touchEventsTarget:"wrapper",effect:"hero-slider",lazy:{loadPrevNext:!0},containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",wrapperClass:"slider__wrapper",pagination:{el:".hero-slider-control",clickable:!0,bulletClass:"hero-slider-control__item",bulletActiveClass:"active",renderBullet:function(e,t){return'\n            <div class="'.concat(t,'">\n              <div class="hero-slider-control__title">').concat(this.slides[e].querySelector(".hero-slider__title").textContent,'</div>\n              <div class="hero-slider-control__loader">\n                <div class="hero-slider-control__loader-line"></div>\n              </div>\n            </div>')}}})).pagination.render(),a.init();case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(e){[].forEach.call(document.querySelectorAll(e),(function(e){var t=document.createElement("button");t.className="btn btn-red slider-button slider-button_prev",t.innerHTML='<svg viewBox="0 0 9 6" focusable="false" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9 3.26664L4.2 3.26664L4.2 5.17604L0.2 2.86664L4.2 0.557238L4.2 2.46664L9 2.46664L9 3.26664Z" /></svg>',e.appendChild(t);var i=document.createElement("button");i.className="btn btn-red slider-button slider-button_next",i.innerHTML='<svg viewBox="0 0 9 6" focusable="false" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M-1.66925e-07 2.73336L4.8 2.73336L4.8 0.82396L8.8 3.13336L4.8 5.44276L4.8 3.53336L-2.36863e-07 3.53336L-1.66925e-07 2.73336Z" /></svg>',e.appendChild(i),new n.g(e.querySelector(".slider"),{touchEventsTarget:"wrapper",wrapperClass:"slider__wrapper",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",slidesPerView:"auto",loopedSlides:6,spaceBetween:10,centeredSlides:!0,loop:!0,navigation:{nextEl:i,prevEl:t,disabledClass:"slider-button_disabled",hiddenClass:"slider-button_hidden"},a11y:{prevSlideMessage:"Предыдущий слайд",nextSlideMessage:"Следующий слайд"},breakpoints:{768:{loopedSlides:null,slidesPerView:1,spaceBetween:0}}})}))}n.g.use([n.d,n.f,n.c,n.b]),n.g.use([n.d,n.f,n.c,n.b]);var h=i(25);function f(e){return p.apply(this,arguments)}function p(){return(p=a()(r.a.mark((function e(t){var s,l,o,a,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=t.slider,l=t.info,o=t.control,a=document.querySelector(s)){e.next=4;break}return e.abrupt("return");case 4:if(!(document.documentElement.clientWidth<768)){e.next=7;break}return[].forEach.call(a.querySelectorAll(".swiper-lazy"),(function(e){e.classList.remove("swiper-lazy"),e.classList.add("lazyload")})),e.abrupt("return");case 7:if(new n.g(a,{slidesPerView:"auto",freeMode:!0,watchSlidesVisibility:!0,lazy:!0,runCallbacksOnInit:!1,touchEventsTarget:"wrapper",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",wrapperClass:"slider__wrapper",mousewheel:{forceToAxis:!0,invert:!0,releaseOnEdges:!0},scrollbar:{el:".slider__scrollbar",hide:!1,draggable:!0,dragSize:80,dragClass:"slider__track",snapOnRelease:!1},on:{setTranslate:function(e){var t=Math.max(Math.min(e/90+1,1),0);this.$el.find(".slider__explanation").css("opacity",t),Object(h.a)(l).css("opacity",t),this.scrollbar.el&&(e?this.scrollbar.el.classList.add("active"):this.scrollbar.el.classList.remove("active"))}}}),!o){e.next=14;break}return e.next=11,i.e(16).then(i.t.bind(null,281,7));case 11:c=e.sent,new(0,c.default)(o,{marginTop:150,stickyClass:"is-sticky"});case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){new n.g(".search-page-slider",{touchEventsTarget:"wrapper",wrapperClass:"slider__wrapper",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",slidesPerView:"auto",watchSlidesVisibility:!0,freeMode:!0,freeModeSticky:!0,freeModeMomentumRatio:.4,freeModeMomentumVelocityRatio:.5,mousewheel:{forceToAxis:!0,invert:!0},navigation:{nextEl:".slider-button_next",prevEl:".slider-button_prev",disabledClass:"slider-button_disabled",hiddenClass:"slider-button_hidden"},a11y:{prevSlideMessage:"Предыдущий слайд",nextSlideMessage:"Следующий слайд"}})}n.g.use([n.d,n.f,n.c,n.b]),n.g.use([n.d,n.a,n.c])},62:function(e,t,i){"use strict";var n=i(8),s=i.n(n),l=i(9),r=i.n(l),o=i(2),a=i.n(o),c=i(17),d=function(){function e(){var t=this;s()(this,e),a()(this,"onResize",(function(){t.vp=Object(c.d)()})),a()(this,"onScroll",(function(){t.requestTick()})),a()(this,"onUdate",(function(){t.scrollTicking=!1,t.calculate()})),this.items=[],this.scrollTicking=!1,this.vp=Object(c.d)(),this.calculate(),window.addEventListener("scroll",this.onScroll),window.addEventListener("resize",this.onResize)}return r()(e,[{key:"add",value:function(e,t){var i=t.x,n=t.y;this.items.push({el:e,offset:Object(c.c)(e),x:i,y:n})}},{key:"remove",value:function(e){this.items=this.items.filter((function(t){return t.el!==e}))}},{key:"requestTick",value:function(){this.scrollTicking||requestAnimationFrame(this.onUdate),this.scrollTicking=!0}},{key:"calculate",value:function(){var e=this;this.items.forEach((function(t){var i=t.el.getBoundingClientRect().top+t.el.clientHeight/2,n=(i-e.vp.height/2)*t.x,s=(i-e.vp.height/2)*t.y;t.el.style.transform="translate3d(".concat(n,"px, ").concat(s,"px, 0)")}))}}]),e}();t.a=new d}},[[258,1,0]]]);