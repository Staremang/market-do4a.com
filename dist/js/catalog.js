!function(t){function e(e){for(var n,a,s=e[0],l=e[1],u=e[2],p=0,f=[];p<s.length;p++)a=s[p],o[a]&&f.push(o[a][0]),o[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);for(c&&c(e);f.length;)f.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],n=!0,s=1;s<r.length;s++){var l=r[s];0!==o[l]&&(n=!1)}n&&(i.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},o={1:0},i=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var c=l;i.push([100,0]),r()}({100:function(t,e,r){"use strict";r.r(e);r(34),r(35),r(101)},101:function(t,e,r){"use strict";(function(t){var e=r(59),n=r.n(e),o=r(0);t(function(){o.a.parseTargets(".input-range").map(function(t){return n.a.create(t,{start:[3e3,7e3],step:10,connect:!0,tooltips:!0,range:{min:50,max:1e4},format:{to:function(t){return"".concat(Math.floor(t)," ₽")},from:function(t){return t.replace(" ₽","")}},cssPrefix:"input-range",cssClasses:{target:"",base:"__base",origin:"__origin",handle:"__handle",handleLower:"__handle-lower",handleUpper:"__handle-upper",touchArea:"__touch-area",horizontal:"_horizontal",vertical:"_vertical",background:"__background",connect:"__connect",connects:"__connects",ltr:"_ltr",rtl:"_rtl",draggable:"_draggable",drag:"_state-drag",tap:"_state-tap",active:"__active",tooltip:"__tooltip",pips:"__pips",pipsHorizontal:"__pips_horizontal",pipsVertical:"__pips_vertical",marker:"__marker",markerHorizontal:"__marker_horizontal",markerVertical:"__marker_vertical",markerNormal:"__marker_normal",markerLarge:"__marker_large",markerSub:"__marker_sub",value:"__value",valueHorizontal:"__value_horizontal",valueVertical:"__value_vertical",valueNormal:"__value_normal",valueLarge:"__value_large",valueSub:"__value_sub"}})}),t(".cat-mob-control__button_filter").on("click",function(e){e.preventDefault(),t(".filter-menu-m#mobile-filter").addClass("active"),t("body").css("overflow","hidden")}),t(document).on("scroll",function(e){t(".catalog-filter-m").css("top","".concat(Math.max(app.Header.header.fixedOffset-window.pageYOffset,0),"px"))}),t(document).on("click.filter.menu",'[data-toggle="m-filter"]',function(e){e.preventDefault(),e.stopPropagation();var r=t(e.currentTarget),n=r.data("target"),o=n?t(n):r.siblings(".filter-menu-m");o.addClass("active"),o.css("top","".concat(Math.max(app.Header.header.fixedOffset-window.pageYOffset,0),"px")),t("body").css("overflow","hidden")}).on("click.filter.close",".filter-menu-m__btn-back, .filter-menu-m__btn-close",function(e){e.preventDefault(),e.stopPropagation(),t(e.currentTarget).parents(".filter-menu-m").eq(0).removeClass("active"),0===t(".filter-menu-m.active").length&&t("body").css("overflow","")})})}).call(this,r(1))},59:function(t,e,r){var n,o,i;/*! nouislider - 13.1.4 - 3/20/2019 */o=[],void 0===(i="function"==typeof(n=function(){"use strict";var t="13.1.4";function e(t){t.parentElement.removeChild(t)}function r(t){return null!=t}function n(t){t.preventDefault()}function o(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function i(t,e,r){r>0&&(u(t,e),setTimeout(function(){c(t,e)},r))}function a(t){return Math.max(Math.min(t,100),0)}function s(t){return Array.isArray(t)?t:[t]}function l(t){var e=(t=String(t)).split(".");return e.length>1?e[1].length:0}function u(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function c(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function p(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||""),n=e?window.pageXOffset:r?t.documentElement.scrollLeft:t.body.scrollLeft,o=e?window.pageYOffset:r?t.documentElement.scrollTop:t.body.scrollTop;return{x:n,y:o}}function f(t,e){return 100/(e-t)}function d(t,e){return 100*e/(t[1]-t[0])}function h(t,e){for(var r=1;t>=e[r];)r+=1;return r}function m(t,e,r){if(r>=t.slice(-1)[0])return 100;var n=h(r,t),o=t[n-1],i=t[n],a=e[n-1],s=e[n];return a+function(t,e){return d(t,t[0]<0?e+Math.abs(t[0]):e-t[0])}([o,i],r)/f(a,s)}function g(t,e,r,n){if(100===n)return n;var o=h(n,t),i=t[o-1],a=t[o];return r?n-i>(a-i)/2?a:i:e[o-1]?t[o-1]+function(t,e){return Math.round(t/e)*e}(n-t[o-1],e[o-1]):n}function v(e,r,n){var i;if("number"==typeof r&&(r=[r]),!Array.isArray(r))throw new Error("noUiSlider ("+t+"): 'range' contains invalid value.");if(!o(i="min"===e?0:"max"===e?100:parseFloat(e))||!o(r[0]))throw new Error("noUiSlider ("+t+"): 'range' value isn't numeric.");n.xPct.push(i),n.xVal.push(r[0]),i?n.xSteps.push(!isNaN(r[1])&&r[1]):isNaN(r[1])||(n.xSteps[0]=r[1]),n.xHighestCompleteStep.push(0)}function b(t,e,r){if(e)if(r.xVal[t]!==r.xVal[t+1]){r.xSteps[t]=d([r.xVal[t],r.xVal[t+1]],e)/f(r.xPct[t],r.xPct[t+1]);var n=(r.xVal[t+1]-r.xVal[t])/r.xNumSteps[t],o=Math.ceil(Number(n.toFixed(3))-1),i=r.xVal[t]+r.xNumSteps[t]*o;r.xHighestCompleteStep[t]=i}else r.xSteps[t]=r.xHighestCompleteStep[t]=r.xVal[t]}function S(t,e,r){var n;this.xPct=[],this.xVal=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var o=[];for(n in t)t.hasOwnProperty(n)&&o.push([t[n],n]);for(o.length&&"object"==typeof o[0][0]?o.sort(function(t,e){return t[0][0]-e[0][0]}):o.sort(function(t,e){return t[0]-e[0]}),n=0;n<o.length;n++)v(o[n][1],o[n][0],this);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)b(n,this.xNumSteps[n],this)}S.prototype.getMargin=function(e){var r=this.xNumSteps[0];if(r&&e/r%1!=0)throw new Error("noUiSlider ("+t+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&d(this.xVal,e)},S.prototype.toStepping=function(t){return t=m(this.xVal,this.xPct,t)},S.prototype.fromStepping=function(t){return function(t,e,r){if(r>=100)return t.slice(-1)[0];var n=h(r,e),o=t[n-1],i=t[n],a=e[n-1],s=e[n];return function(t,e){return e*(t[1]-t[0])/100+t[0]}([o,i],(r-a)*f(a,s))}(this.xVal,this.xPct,t)},S.prototype.getStep=function(t){return t=g(this.xPct,this.xSteps,this.snap,t)},S.prototype.getDefaultStep=function(t,e,r){var n=h(t,this.xPct);return(100===t||e&&t===this.xPct[n-1])&&(n=Math.max(n-1,1)),(this.xVal[n]-this.xVal[n-1])/r},S.prototype.getNearbySteps=function(t){var e=h(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},S.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(l);return Math.max.apply(null,t)},S.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var w={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number};function x(e){if(function(t){return"object"==typeof t&&"function"==typeof t.to&&"function"==typeof t.from}(e))return!0;throw new Error("noUiSlider ("+t+"): 'format' requires 'to' and 'from' methods.")}function y(e,r){if(!o(r))throw new Error("noUiSlider ("+t+"): 'step' is not numeric.");e.singleStep=r}function E(e,r){if("object"!=typeof r||Array.isArray(r))throw new Error("noUiSlider ("+t+"): 'range' is not an object.");if(void 0===r.min||void 0===r.max)throw new Error("noUiSlider ("+t+"): Missing 'min' or 'max' in 'range'.");if(r.min===r.max)throw new Error("noUiSlider ("+t+"): 'range' 'min' and 'max' cannot be equal.");e.spectrum=new S(r,e.snap,e.singleStep)}function _(e,r){if(r=s(r),!Array.isArray(r)||!r.length)throw new Error("noUiSlider ("+t+"): 'start' option is incorrect.");e.handles=r.length,e.start=r}function C(e,r){if(e.snap=r,"boolean"!=typeof r)throw new Error("noUiSlider ("+t+"): 'snap' option must be a boolean.")}function N(e,r){if(e.animate=r,"boolean"!=typeof r)throw new Error("noUiSlider ("+t+"): 'animate' option must be a boolean.")}function k(e,r){if(e.animationDuration=r,"number"!=typeof r)throw new Error("noUiSlider ("+t+"): 'animationDuration' option must be a number.")}function P(e,r){var n,o=[!1];if("lower"===r?r=[!0,!1]:"upper"===r&&(r=[!1,!0]),!0===r||!1===r){for(n=1;n<e.handles;n++)o.push(r);o.push(!1)}else{if(!Array.isArray(r)||!r.length||r.length!==e.handles+1)throw new Error("noUiSlider ("+t+"): 'connect' option doesn't match handle count.");o=r}e.connect=o}function U(e,r){switch(r){case"horizontal":e.ort=0;break;case"vertical":e.ort=1;break;default:throw new Error("noUiSlider ("+t+"): 'orientation' option is invalid.")}}function M(e,r){if(!o(r))throw new Error("noUiSlider ("+t+"): 'margin' option must be numeric.");if(0!==r&&(e.margin=e.spectrum.getMargin(r),!e.margin))throw new Error("noUiSlider ("+t+"): 'margin' option is only supported on linear sliders.")}function O(e,r){if(!o(r))throw new Error("noUiSlider ("+t+"): 'limit' option must be numeric.");if(e.limit=e.spectrum.getMargin(r),!e.limit||e.handles<2)throw new Error("noUiSlider ("+t+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function V(e,r){if(!o(r)&&!Array.isArray(r))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(r)&&2!==r.length&&!o(r[0])&&!o(r[1]))throw new Error("noUiSlider ("+t+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==r){if(Array.isArray(r)||(r=[r,r]),e.padding=[e.spectrum.getMargin(r[0]),e.spectrum.getMargin(r[1])],!1===e.padding[0]||!1===e.padding[1])throw new Error("noUiSlider ("+t+"): 'padding' option is only supported on linear sliders.");if(e.padding[0]<0||e.padding[1]<0)throw new Error("noUiSlider ("+t+"): 'padding' option must be a positive number(s).");if(e.padding[0]+e.padding[1]>=100)throw new Error("noUiSlider ("+t+"): 'padding' option must not exceed 100% of the range.")}}function A(e,r){switch(r){case"ltr":e.dir=0;break;case"rtl":e.dir=1;break;default:throw new Error("noUiSlider ("+t+"): 'direction' option was not recognized.")}}function z(e,r){if("string"!=typeof r)throw new Error("noUiSlider ("+t+"): 'behaviour' must be a string containing options.");var n=r.indexOf("tap")>=0,o=r.indexOf("drag")>=0,i=r.indexOf("fixed")>=0,a=r.indexOf("snap")>=0,s=r.indexOf("hover")>=0,l=r.indexOf("unconstrained")>=0;if(i){if(2!==e.handles)throw new Error("noUiSlider ("+t+"): 'fixed' behaviour must be used with 2 handles");M(e,e.start[1]-e.start[0])}if(l&&(e.margin||e.limit))throw new Error("noUiSlider ("+t+"): 'unconstrained' behaviour cannot be used with margin or limit");e.events={tap:n||a,drag:o,fixed:i,snap:a,hover:s,unconstrained:l}}function L(e,r){if(!1!==r)if(!0===r){e.tooltips=[];for(var n=0;n<e.handles;n++)e.tooltips.push(!0)}else{if(e.tooltips=s(r),e.tooltips.length!==e.handles)throw new Error("noUiSlider ("+t+"): must pass a formatter for all handles.");e.tooltips.forEach(function(e){if("boolean"!=typeof e&&("object"!=typeof e||"function"!=typeof e.to))throw new Error("noUiSlider ("+t+"): 'tooltips' must be passed a formatter or 'false'.")})}}function j(t,e){t.ariaFormat=e,x(e)}function H(t,e){t.format=e,x(e)}function D(e,r){if(e.keyboardSupport=r,"boolean"!=typeof r)throw new Error("noUiSlider ("+t+"): 'keyboardSupport' option must be a boolean.")}function F(t,e){t.documentElement=e}function T(e,r){if("string"!=typeof r&&!1!==r)throw new Error("noUiSlider ("+t+"): 'cssPrefix' must be a string or `false`.");e.cssPrefix=r}function R(e,r){if("object"!=typeof r)throw new Error("noUiSlider ("+t+"): 'cssClasses' must be an object.");if("string"==typeof e.cssPrefix)for(var n in e.cssClasses={},r)r.hasOwnProperty(n)&&(e.cssClasses[n]=e.cssPrefix+r[n]);else e.cssClasses=r}function q(e){var n={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:w,format:w},o={step:{r:!1,t:y},start:{r:!0,t:_},connect:{r:!0,t:P},direction:{r:!0,t:A},snap:{r:!1,t:C},animate:{r:!1,t:N},animationDuration:{r:!1,t:k},range:{r:!0,t:E},orientation:{r:!1,t:U},margin:{r:!1,t:M},limit:{r:!1,t:O},padding:{r:!1,t:V},behaviour:{r:!0,t:z},ariaFormat:{r:!1,t:j},format:{r:!1,t:H},tooltips:{r:!1,t:L},keyboardSupport:{r:!0,t:D},documentElement:{r:!1,t:F},cssPrefix:{r:!0,t:T},cssClasses:{r:!0,t:R}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(o).forEach(function(a){if(!r(e[a])&&void 0===i[a]){if(o[a].r)throw new Error("noUiSlider ("+t+"): '"+a+"' is required.");return!0}o[a].t(n,r(e[a])?e[a]:i[a])}),n.pips=e.pips;var a=document.createElement("div"),s=void 0!==a.style.msTransform,l=void 0!==a.style.transform;return n.transformRule=l?"transform":s?"msTransform":"webkitTransform",n.style=[["left","top"],["right","bottom"]][n.dir][n.ort],n}function B(r,o,l){var f,d,h,m,g,v,b,S,w=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},x=window.CSS&&CSS.supports&&CSS.supports("touch-action","none"),y=x&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),E=r,_=o.spectrum,C=[],N=[],k=[],P=0,U={},M=r.ownerDocument,O=o.documentElement||M.documentElement,V=M.body,A=-1,z=0,L=1,j=2,H="rtl"===M.dir||1===o.ort?0:100;function D(t,e){var r=M.createElement("div");return e&&u(r,e),t.appendChild(r),r}function F(t,e){var r=D(t,o.cssClasses.origin),n=D(r,o.cssClasses.handle);return D(n,o.cssClasses.touchArea),n.setAttribute("data-handle",e),o.keyboardSupport&&(n.setAttribute("tabindex","0"),n.addEventListener("keydown",function(t){return function(t,e){if(B()||Y(e))return!1;var r=["Left","Right"],n=["Down","Up"];o.dir&&!o.ort?r.reverse():o.ort&&!o.dir&&n.reverse();var i=t.key.replace("Arrow",""),a=i===n[0]||i===r[0],s=i===n[1]||i===r[1];if(!a&&!s)return!0;t.preventDefault();var l=a?0:1,u=St(e)[l];return null!==u&&(!1===u&&(u=_.getDefaultStep(N[e],a,10)),u=Math.max(u,1e-7),u*=a?-1:1,vt(e,C[e]+u,!0),!1)}(t,e)})),n.setAttribute("role","slider"),n.setAttribute("aria-orientation",o.ort?"vertical":"horizontal"),0===e?u(n,o.cssClasses.handleLower):e===o.handles-1&&u(n,o.cssClasses.handleUpper),r}function T(t,e){return!!e&&D(t,o.cssClasses.connect)}function R(t,e){return!!o.tooltips[e]&&D(t.firstChild,o.cssClasses.tooltip)}function B(){return E.hasAttribute("disabled")}function Y(t){var e=d[t];return e.hasAttribute("disabled")}function X(){g&&(at("update.tooltips"),g.forEach(function(t){t&&e(t)}),g=null)}function I(){X(),g=d.map(R),it("update.tooltips",function(t,e,r){if(g[e]){var n=t[e];!0!==o.tooltips[e]&&(n=o.tooltips[e].to(r[e])),g[e].innerHTML=n}})}function J(t,e,r){var n=M.createElement("div"),i=[];i[z]=o.cssClasses.valueNormal,i[L]=o.cssClasses.valueLarge,i[j]=o.cssClasses.valueSub;var a=[];a[z]=o.cssClasses.markerNormal,a[L]=o.cssClasses.markerLarge,a[j]=o.cssClasses.markerSub;var s=[o.cssClasses.valueHorizontal,o.cssClasses.valueVertical],l=[o.cssClasses.markerHorizontal,o.cssClasses.markerVertical];function c(t,e){var r=e===o.cssClasses.value,n=r?s:l,u=r?i:a;return e+" "+n[o.ort]+" "+u[t]}return u(n,o.cssClasses.pips),u(n,0===o.ort?o.cssClasses.pipsHorizontal:o.cssClasses.pipsVertical),Object.keys(t).forEach(function(i){!function(t,i,a){if((a=e?e(i,a):a)!==A){var s=D(n,!1);s.className=c(a,o.cssClasses.marker),s.style[o.style]=t+"%",a>z&&((s=D(n,!1)).className=c(a,o.cssClasses.value),s.setAttribute("data-value",i),s.style[o.style]=t+"%",s.innerHTML=r.to(i))}}(i,t[i][0],t[i][1])}),n}function W(){m&&(e(m),m=null)}function $(e){W();var r=e.mode,n=e.density||1,o=e.filter||!1,i=e.values||!1,a=e.stepped||!1,s=function(e,r,n){if("range"===e||"steps"===e)return _.xVal;if("count"===e){if(r<2)throw new Error("noUiSlider ("+t+"): 'values' (>= 2) required for mode 'count'.");var o=r-1,i=100/o;for(r=[];o--;)r[o]=o*i;r.push(100),e="positions"}return"positions"===e?r.map(function(t){return _.fromStepping(n?_.getStep(t):t)}):"values"===e?n?r.map(function(t){return _.fromStepping(_.getStep(_.toStepping(t)))}):r:void 0}(r,i,a),l=function(t,e,r){var n,o={},i=_.xVal[0],a=_.xVal[_.xVal.length-1],s=!1,l=!1,u=0;return(n=r.slice().sort(function(t,e){return t-e}),r=n.filter(function(t){return!this[t]&&(this[t]=!0)},{}))[0]!==i&&(r.unshift(i),s=!0),r[r.length-1]!==a&&(r.push(a),l=!0),r.forEach(function(n,i){var a,c,p,f,d,h,m,g,v,b,S=n,w=r[i+1],x="steps"===e;if(x&&(a=_.xNumSteps[i]),a||(a=w-S),!1!==S&&void 0!==w)for(a=Math.max(a,1e-7),c=S;c<=w;c=(c+a).toFixed(7)/1){for(g=(d=(f=_.toStepping(c))-u)/t,b=d/(v=Math.round(g)),p=1;p<=v;p+=1)o[(h=u+p*b).toFixed(5)]=[_.fromStepping(h),0];m=r.indexOf(c)>-1?L:x?j:z,!i&&s&&(m=0),c===w&&l||(o[f.toFixed(5)]=[c,m]),u=f}}),o}(n,r,s),u=e.format||{to:Math.round};return m=E.appendChild(J(l,o,u))}function G(){var t=f.getBoundingClientRect(),e="offset"+["Width","Height"][o.ort];return 0===o.ort?t.width||f[e]:t.height||f[e]}function K(t,e,r,n){var i=function(i){return!!(i=function(t,e,r){var n,o,i=0===t.type.indexOf("touch"),a=0===t.type.indexOf("mouse"),s=0===t.type.indexOf("pointer");if(0===t.type.indexOf("MSPointer")&&(s=!0),i){var l=function(t){return t.target===r||r.contains(t.target)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(u.length>1)return!1;n=u[0].pageX,o=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;n=c.pageX,o=c.pageY}}return e=e||p(M),(a||s)&&(n=t.clientX+e.x,o=t.clientY+e.y),t.pageOffset=e,t.points=[n,o],t.cursor=a||s,t}(i,n.pageOffset,n.target||e))&&!(B()&&!n.doNotReject)&&(a=E,s=o.cssClasses.tap,!((a.classList?a.classList.contains(s):new RegExp("\\b"+s+"\\b").test(a.className))&&!n.doNotReject)&&!(t===w.start&&void 0!==i.buttons&&i.buttons>1)&&(!n.hover||!i.buttons)&&(y||i.preventDefault(),i.calcPoint=i.points[o.ort],void r(i,n)));var a,s},a=[];return t.split(" ").forEach(function(t){e.addEventListener(t,i,!!y&&{passive:!0}),a.push([t,i])}),a}function Q(t){var e,r,n,i,s,l,u=t-(e=f,r=o.ort,n=e.getBoundingClientRect(),i=e.ownerDocument,s=i.documentElement,l=p(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(l.x=0),r?n.top+l.y-s.clientTop:n.left+l.x-s.clientLeft),c=100*u/G();return c=a(c),o.dir?100-c:c}function Z(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&et(t,e)}function tt(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return et(t,e);var r=(o.dir?-1:1)*(t.calcPoint-e.startCalcPoint),n=100*r/e.baseSize;ct(r>0,n,e.locations,e.handleNumbers)}function et(t,e){e.handle&&(c(e.handle,o.cssClasses.active),P-=1),e.listeners.forEach(function(t){O.removeEventListener(t[0],t[1])}),0===P&&(c(E,o.cssClasses.drag),ft(),t.cursor&&(V.style.cursor="",V.removeEventListener("selectstart",n))),e.handleNumbers.forEach(function(t){st("change",t),st("set",t),st("end",t)})}function rt(t,e){if(e.handleNumbers.some(Y))return!1;var r;if(1===e.handleNumbers.length){var i=d[e.handleNumbers[0]];r=i.children[0],P+=1,u(r,o.cssClasses.active)}t.stopPropagation();var a=[],s=K(w.move,O,tt,{target:t.target,handle:r,listeners:a,startCalcPoint:t.calcPoint,baseSize:G(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:N.slice()}),l=K(w.end,O,et,{target:t.target,handle:r,listeners:a,doNotReject:!0,handleNumbers:e.handleNumbers}),c=K("mouseout",O,Z,{target:t.target,handle:r,listeners:a,doNotReject:!0,handleNumbers:e.handleNumbers});a.push.apply(a,s.concat(l,c)),t.cursor&&(V.style.cursor=getComputedStyle(t.target).cursor,d.length>1&&u(E,o.cssClasses.drag),V.addEventListener("selectstart",n,!1)),e.handleNumbers.forEach(function(t){st("start",t)})}function nt(t){t.stopPropagation();var e=Q(t.calcPoint),r=function(t){var e=100,r=!1;return d.forEach(function(n,o){if(!Y(o)){var i=Math.abs(N[o]-t);(i<e||100===i&&100===e)&&(r=o,e=i)}}),r}(e);if(!1===r)return!1;o.events.snap||i(E,o.cssClasses.tap,o.animationDuration),dt(r,e,!0,!0),ft(),st("slide",r,!0),st("update",r,!0),st("change",r,!0),st("set",r,!0),o.events.snap&&rt(t,{handleNumbers:[r]})}function ot(t){var e=Q(t.calcPoint),r=_.getStep(e),n=_.fromStepping(r);Object.keys(U).forEach(function(t){"hover"===t.split(".")[0]&&U[t].forEach(function(t){t.call(v,n)})})}function it(t,e){U[t]=U[t]||[],U[t].push(e),"update"===t.split(".")[0]&&d.forEach(function(t,e){st("update",e)})}function at(t){var e=t&&t.split(".")[0],r=e&&t.substring(e.length);Object.keys(U).forEach(function(t){var n=t.split(".")[0],o=t.substring(n.length);e&&e!==n||r&&r!==o||delete U[t]})}function st(t,e,r){Object.keys(U).forEach(function(n){var i=n.split(".")[0];t===i&&U[n].forEach(function(t){t.call(v,C.map(o.format.to),e,C.slice(),r||!1,N.slice())})})}function lt(t,e,r,n,i,s){return d.length>1&&!o.events.unconstrained&&(n&&e>0&&(r=Math.max(r,t[e-1]+o.margin)),i&&e<d.length-1&&(r=Math.min(r,t[e+1]-o.margin))),d.length>1&&o.limit&&(n&&e>0&&(r=Math.min(r,t[e-1]+o.limit)),i&&e<d.length-1&&(r=Math.max(r,t[e+1]-o.limit))),o.padding&&(0===e&&(r=Math.max(r,o.padding[0])),e===d.length-1&&(r=Math.min(r,100-o.padding[1]))),!((r=a(r=_.getStep(r)))===t[e]&&!s)&&r}function ut(t,e){var r=o.ort;return(r?e:t)+", "+(r?t:e)}function ct(t,e,r,n){var o=r.slice(),i=[!t,t],a=[t,!t];n=n.slice(),t&&n.reverse(),n.length>1?n.forEach(function(t,r){var n=lt(o,t,o[t]+e,i[r],a[r],!1);!1===n?e=0:(e=n-o[t],o[t]=n)}):i=a=[!0];var s=!1;n.forEach(function(t,n){s=dt(t,r[t]+e,i[n],a[n])||s}),s&&n.forEach(function(t){st("update",t),st("slide",t)})}function pt(t,e){return o.dir?100-t-e:t}function ft(){k.forEach(function(t){var e=N[t]>50?-1:1,r=3+(d.length+e*t);d[t].style.zIndex=r})}function dt(t,e,r,n){return!1!==(e=lt(N,t,e,r,n,!1))&&(function(t,e){N[t]=e,C[t]=_.fromStepping(e);var r="translate("+ut(pt(e,0)-H+"%","0")+")";d[t].style[o.transformRule]=r,ht(t),ht(t+1)}(t,e),!0)}function ht(t){if(h[t]){var e=0,r=100;0!==t&&(e=N[t-1]),t!==h.length-1&&(r=N[t]);var n=r-e,i="translate("+ut(pt(e,n)+"%","0")+")",a="scale("+ut(n/100,"1")+")";h[t].style[o.transformRule]=i+" "+a}}function mt(t,e){return null===t||!1===t||void 0===t?N[e]:("number"==typeof t&&(t=String(t)),t=o.format.from(t),!1===(t=_.toStepping(t))||isNaN(t)?N[e]:t)}function gt(t,e){var r=s(t),n=void 0===N[0];e=void 0===e||!!e,o.animate&&!n&&i(E,o.cssClasses.tap,o.animationDuration),k.forEach(function(t){dt(t,mt(r[t],t),!0,!1)}),k.forEach(function(t){dt(t,N[t],!0,!0)}),ft(),k.forEach(function(t){st("update",t),null!==r[t]&&e&&st("set",t)})}function vt(e,r,n){if(!((e=Number(e))>=0&&e<k.length))throw new Error("noUiSlider ("+t+"): invalid handle number, got: "+e);dt(e,mt(r,e),!0,!0),st("update",e),n&&st("set",e)}function bt(){var t=C.map(o.format.to);return 1===t.length?t[0]:t}function St(t){var e=N[t],r=_.getNearbySteps(e),n=C[t],i=r.thisStep.step,a=null;if(o.snap)return[n-r.stepBefore.startValue||null,r.stepAfter.startValue-n||null];!1!==i&&n+i>r.stepAfter.startValue&&(i=r.stepAfter.startValue-n),a=n>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&n-r.stepBefore.highestStep,100===e?i=null:0===e&&(a=null);var s=_.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(s))),null!==a&&!1!==a&&(a=Number(a.toFixed(s))),[a,i]}return u(S=E,o.cssClasses.target),0===o.dir?u(S,o.cssClasses.ltr):u(S,o.cssClasses.rtl),0===o.ort?u(S,o.cssClasses.horizontal):u(S,o.cssClasses.vertical),f=D(S,o.cssClasses.base),function(t,e){var r=D(e,o.cssClasses.connects);d=[],(h=[]).push(T(r,t[0]));for(var n=0;n<o.handles;n++)d.push(F(e,n)),k[n]=n,h.push(T(r,t[n+1]))}(o.connect,f),(b=o.events).fixed||d.forEach(function(t,e){K(w.start,t.children[0],rt,{handleNumbers:[e]})}),b.tap&&K(w.start,f,nt,{}),b.hover&&K(w.move,f,ot,{hover:!0}),b.drag&&h.forEach(function(t,e){if(!1!==t&&0!==e&&e!==h.length-1){var r=d[e-1],n=d[e],i=[t];u(t,o.cssClasses.draggable),b.fixed&&(i.push(r.children[0]),i.push(n.children[0])),i.forEach(function(t){K(w.start,t,rt,{handles:[r,n],handleNumbers:[e-1,e]})})}}),gt(o.start),o.pips&&$(o.pips),o.tooltips&&I(),it("update",function(t,e,r,n,i){k.forEach(function(t){var e=d[t],n=lt(N,t,0,!0,!0,!0),a=lt(N,t,100,!0,!0,!0),s=i[t],l=o.ariaFormat.to(r[t]);n=_.fromStepping(n).toFixed(1),a=_.fromStepping(a).toFixed(1),s=_.fromStepping(s).toFixed(1),e.children[0].setAttribute("aria-valuemin",n),e.children[0].setAttribute("aria-valuemax",a),e.children[0].setAttribute("aria-valuenow",s),e.children[0].setAttribute("aria-valuetext",l)})}),v={destroy:function(){for(var t in o.cssClasses)o.cssClasses.hasOwnProperty(t)&&c(E,o.cssClasses[t]);for(;E.firstChild;)E.removeChild(E.firstChild);delete E.noUiSlider},steps:function(){return k.map(St)},on:it,off:at,get:bt,set:gt,setHandle:vt,reset:function(t){gt(o.start,t)},__moveHandles:function(t,e,r){ct(t,e,N,r)},options:l,updateOptions:function(t,e){var r=bt(),n=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];n.forEach(function(e){void 0!==t[e]&&(l[e]=t[e])});var i=q(l);n.forEach(function(e){void 0!==t[e]&&(o[e]=i[e])}),_=i.spectrum,o.margin=i.margin,o.limit=i.limit,o.padding=i.padding,o.pips?$(o.pips):W(),o.tooltips?I():X(),N=[],gt(t.start||r,e)},target:E,removePips:W,removeTooltips:X,pips:$}}return{__spectrum:S,version:t,create:function(e,r){if(!e||!e.nodeName)throw new Error("noUiSlider ("+t+"): create requires a single element, got: "+e);if(e.noUiSlider)throw new Error("noUiSlider ("+t+"): Slider was already initialized.");var n=q(r),o=B(e,n,r);return e.noUiSlider=o,o}}})?n.apply(e,o):n)||(t.exports=i)}});