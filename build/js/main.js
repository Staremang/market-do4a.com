(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = typeof document === 'undefined' ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ''
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    location: {
      hash: ''
    }
  } : document; // eslint-disable-line

  var win = typeof window === 'undefined' ? {
    document: doc,
    navigator: {
      userAgent: ''
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {}
  } : window; // eslint-disable-line

  /**
   * Dom7 2.1.3
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2019, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: February 11, 2019
   */

  class Dom7 {
    constructor(arr) {
      const self = this; // Create array-like object

      for (let i = 0; i < arr.length; i += 1) {
        self[i] = arr[i];
      }

      self.length = arr.length; // Return collection with methods

      return this;
    }

  }

  function $$1(selector, context) {
    const arr = [];
    let i = 0;

    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }

    if (selector) {
      // String
      if (typeof selector === 'string') {
        let els;
        let tempParent;
        const html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          let toCreate = 'div';
          if (html.indexOf('<li') === 0) toCreate = 'ul';
          if (html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
          if (html.indexOf('<tbody') === 0) toCreate = 'table';
          if (html.indexOf('<option') === 0) toCreate = 'select';
          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;

          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }

          for (i = 0; i < els.length; i += 1) {
            if (els[i]) arr.push(els[i]);
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }

    return new Dom7(arr);
  }

  $$1.fn = Dom7.prototype;
  $$1.Class = Dom7;
  $$1.Dom7 = Dom7;

  function unique(arr) {
    const uniqueArray = [];

    for (let i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
    }

    return uniqueArray;
  }


  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }

    const classes = className.split(' ');

    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
      }
    }

    return this;
  }

  function removeClass(className) {
    const classes = className.split(' ');

    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
      }
    }

    return this;
  }

  function hasClass(className) {
    if (!this[0]) return false;
    return this[0].classList.contains(className);
  }

  function toggleClass(className) {
    const classes = className.split(' ');

    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
      }
    }

    return this;
  }

  function attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    } // Set attrs


    for (let i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (const attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }

    return this;
  } // eslint-disable-next-line


  function removeAttr(attr) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }

    return this;
  } // eslint-disable-next-line

  function data(key, value) {
    let el;

    if (typeof value === 'undefined') {
      el = this[0]; // Get value

      if (el) {
        if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
          return el.dom7ElementDataStorage[key];
        }

        const dataKey = el.getAttribute(`data-${key}`);

        if (dataKey) {
          return dataKey;
        }

        return undefined;
      }

      return undefined;
    } // Set value


    for (let i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
      el.dom7ElementDataStorage[key] = value;
    }

    return this;
  }
  // eslint-disable-next-line


  function transform(transform) {
    for (let i = 0; i < this.length; i += 1) {
      const elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }

    return this;
  }

  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = `${duration}ms`; // eslint-disable-line
    }

    for (let i = 0; i < this.length; i += 1) {
      const elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }

    return this;
  } // Events


  function on(...args) {
    let [eventType, targetSelector, listener, capture] = args;

    if (typeof args[1] === 'function') {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }

    if (!capture) capture = false;

    function handleLiveEvent(e) {
      const target = e.target;
      if (!target) return;
      const eventData = e.target.dom7EventData || [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      if ($$1(target).is(targetSelector)) listener.apply(target, eventData);else {
        const parents = $$1(target).parents(); // eslint-disable-line

        for (let k = 0; k < parents.length; k += 1) {
          if ($$1(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
        }
      }
    }

    function handleEvent(e) {
      const eventData = e && e.target ? e.target.dom7EventData || [] : [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      listener.apply(this, eventData);
    }

    const events = eventType.split(' ');
    let j;

    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];

      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7Listeners) el.dom7Listeners = {};
          if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
          el.dom7Listeners[event].push({
            listener,
            proxyListener: handleEvent
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          const event = events[j];
          if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
          el.dom7LiveListeners[event].push({
            listener,
            proxyListener: handleLiveEvent
          });
          el.addEventListener(event, handleLiveEvent, capture);
        }
      }
    }

    return this;
  }

  function off(...args) {
    let [eventType, targetSelector, listener, capture] = args;

    if (typeof args[1] === 'function') {
      [eventType, listener, capture] = args;
      targetSelector = undefined;
    }

    if (!capture) capture = false;
    const events = eventType.split(' ');

    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];

      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let handlers;

        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }

        if (handlers && handlers.length) {
          for (let k = handlers.length - 1; k >= 0; k -= 1) {
            const handler = handlers[k];

            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }

    return this;
  }

  function trigger(...args) {
    const events = args[0].split(' ');
    const eventData = args[1];

    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];

      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let evt;

        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        } // eslint-disable-next-line


        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }

    return this;
  }

  function transitionEnd(callback) {
    const events = ['webkitTransitionEnd', 'transitionend'];
    const dom = this;
    let i;

    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) return;
      callback.call(this, e);

      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }

    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }

    return this;
  }

  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        const styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }

      return this[0].offsetWidth;
    }

    return null;
  }

  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        const styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }

      return this[0].offsetHeight;
    }

    return null;
  }

  function offset() {
    if (this.length > 0) {
      const el = this[0];
      const box = el.getBoundingClientRect();
      const body = doc.body;
      const clientTop = el.clientTop || body.clientTop || 0;
      const clientLeft = el.clientLeft || body.clientLeft || 0;
      const scrollTop = el === win ? win.scrollY : el.scrollTop;
      const scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
      };
    }

    return null;
  }

  function styles() {
    if (this[0]) return win.getComputedStyle(this[0], null);
    return {};
  }

  function css(props, value) {
    let i;

    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) return win.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (let prop in props) {
            this[i].style[prop] = props[prop];
          }
        }

        return this;
      }
    }

    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }

      return this;
    }

    return this;
  } // Dom manipulation


  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) return this; // Iterate over the current collection

    for (let i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    } // Return `this` to allow chained DOM operations


    return this;
  }


  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }

    return this;
  } // eslint-disable-next-line


  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }

      return null;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }

    return this;
  }

  function is(selector) {
    const el = this[0];
    let compareWith;
    let i;
    if (!el || typeof selector === 'undefined') return false;

    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
      compareWith = $$1(selector);

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    } else if (selector === doc) return el === doc;else if (selector === win) return el === win;

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    return false;
  }

  function index() {
    let child = this[0];
    let i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }

      return i;
    }

    return undefined;
  } // eslint-disable-next-line


  function eq(index) {
    if (typeof index === 'undefined') return this;
    const length = this.length;
    let returnIndex;

    if (index > length - 1) {
      return new Dom7([]);
    }

    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) return new Dom7([]);
      return new Dom7([this[returnIndex]]);
    }

    return new Dom7([this[index]]);
  }

  function append(...args) {
    let newChild;

    for (let k = 0; k < args.length; k += 1) {
      newChild = args[k];

      for (let i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;

          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (let j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  } // eslint-disable-next-line

  function prepend(newChild) {
    let i;
    let j;

    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;

        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }

    return this;
  } // eslint-disable-next-line

  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $$1(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }

        return new Dom7([]);
      }

      if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
      return new Dom7([]);
    }

    return new Dom7([]);
  }

  function nextAll(selector) {
    const nextEls = [];
    let el = this[0];
    if (!el) return new Dom7([]);

    while (el.nextElementSibling) {
      const next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if ($$1(next).is(selector)) nextEls.push(next);
      } else nextEls.push(next);

      el = next;
    }

    return new Dom7(nextEls);
  }

  function prev(selector) {
    if (this.length > 0) {
      const el = this[0];

      if (selector) {
        if (el.previousElementSibling && $$1(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }

        return new Dom7([]);
      }

      if (el.previousElementSibling) return new Dom7([el.previousElementSibling]);
      return new Dom7([]);
    }

    return new Dom7([]);
  }

  function prevAll(selector) {
    const prevEls = [];
    let el = this[0];
    if (!el) return new Dom7([]);

    while (el.previousElementSibling) {
      const prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if ($$1(prev).is(selector)) prevEls.push(prev);
      } else prevEls.push(prev);

      el = prev;
    }

    return new Dom7(prevEls);
  }

  function parent(selector) {
    const parents = []; // eslint-disable-line

    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($$1(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }

    return $$1(unique(parents));
  }

  function parents(selector) {
    const parents = []; // eslint-disable-line

    for (let i = 0; i < this.length; i += 1) {
      let parent = this[i].parentNode; // eslint-disable-line

      while (parent) {
        if (selector) {
          if ($$1(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }

        parent = parent.parentNode;
      }
    }

    return $$1(unique(parents));
  }

  function closest(selector) {
    let closest = this; // eslint-disable-line

    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }

    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }

    return closest;
  }

  function find(selector) {
    const foundElements = [];

    for (let i = 0; i < this.length; i += 1) {
      const found = this[i].querySelectorAll(selector);

      for (let j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }

    return new Dom7(foundElements);
  }

  function children(selector) {
    const children = []; // eslint-disable-line

    for (let i = 0; i < this.length; i += 1) {
      const childNodes = this[i].childNodes;

      for (let j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
        } else if (childNodes[j].nodeType === 1 && $$1(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }

    return new Dom7(unique(children));
  }

  function remove() {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }

    return this;
  }

  function add(...args) {
    const dom = this;
    let i;
    let j;

    for (i = 0; i < args.length; i += 1) {
      const toAdd = $$1(args[i]);

      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }

    return dom;
  }

  /**
   * Swiper 4.5.0
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * http://www.idangero.us/swiper/
   *
   * Copyright 2014-2019 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: February 22, 2019
   */
  const Methods = {
    addClass,
    removeClass,
    hasClass,
    toggleClass,
    attr,
    removeAttr,
    data,
    transform,
    transition: transition,
    on,
    off,
    trigger,
    transitionEnd: transitionEnd,
    outerWidth,
    outerHeight,
    offset,
    css,
    each,
    html,
    text,
    is,
    index,
    eq,
    append,
    prepend,
    next,
    nextAll,
    prev,
    prevAll,
    parent,
    parents,
    closest,
    find,
    children,
    remove,
    add,
    styles
  };
  Object.keys(Methods).forEach(methodName => {
    $$1.fn[methodName] = Methods[methodName];
  });
  const Utils = {
    deleteProps(obj) {
      const object = obj;
      Object.keys(object).forEach(key => {
        try {
          object[key] = null;
        } catch (e) {// no getter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    },

    nextTick(callback, delay = 0) {
      return setTimeout(callback, delay);
    },

    now() {
      return Date.now();
    },

    getTranslate(el, axis = 'x') {
      let matrix;
      let curTransform;
      let transformMatrix;
      const curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
          else curTransform = parseFloat(matrix[4]);
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
          else curTransform = parseFloat(matrix[5]);
      }

      return curTransform || 0;
    },

    parseUrlQuery(url) {
      const query = {};
      let urlToParse = url || win.location.href;
      let i;
      let params;
      let param;
      let length;

      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(paramsPart => paramsPart !== '');
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }

      return query;
    },

    isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },

    extend(...args) {
      const to = Object(args[0]);

      for (let i = 1; i < args.length; i += 1) {
        const nextSource = args[i];

        if (nextSource !== undefined && nextSource !== null) {
          const keysArray = Object.keys(Object(nextSource));

          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }

  };

  const Support = function Support() {
    const testDiv = doc.createElement('div');
    return {
      touch: win.Modernizr && win.Modernizr.touch === true || function checkTouch() {
        return !!(win.navigator.maxTouchPoints > 0 || 'ontouchstart' in win || win.DocumentTouch && doc instanceof win.DocumentTouch);
      }(),
      pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent || 'maxTouchPoints' in win.navigator && win.navigator.maxTouchPoints > 0),
      prefixedPointerEvents: !!win.navigator.msPointerEnabled,
      transition: function checkTransition() {
        const style = testDiv.style;
        return 'transition' in style || 'webkitTransition' in style || 'MozTransition' in style;
      }(),
      transforms3d: win.Modernizr && win.Modernizr.csstransforms3d === true || function checkTransforms3d() {
        const style = testDiv.style;
        return 'webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style;
      }(),
      flexbox: function checkFlexbox() {
        const style = testDiv.style;
        const styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');

        for (let i = 0; i < styles.length; i += 1) {
          if (styles[i] in style) return true;
        }

        return false;
      }(),
      observer: function checkObserver() {
        return 'MutationObserver' in win || 'WebkitMutationObserver' in win;
      }(),
      passiveListener: function checkPassiveListener() {
        let supportsPassive = false;

        try {
          const opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get() {
              supportsPassive = true;
            }

          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {// No support
        }

        return supportsPassive;
      }(),
      gestures: function checkGestures() {
        return 'ongesturestart' in win;
      }()
    };
  }();

  const Browser = function Browser() {
    function isSafari() {
      const ua = win.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }

    return {
      isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent)
    };
  }();

  class SwiperClass {
    constructor(params = {}) {
      const self = this;
      self.params = params; // Events

      self.eventsListeners = {};

      if (self.params && self.params.on) {
        Object.keys(self.params.on).forEach(eventName => {
          self.on(eventName, self.params.on[eventName]);
        });
      }
    }

    on(events, handler, priority) {
      const self = this;
      if (typeof handler !== 'function') return self;
      const method = priority ? 'unshift' : 'push';
      events.split(' ').forEach(event => {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });
      return self;
    }

    once(events, handler, priority) {
      const self = this;
      if (typeof handler !== 'function') return self;

      function onceHandler(...args) {
        handler.apply(self, args);
        self.off(events, onceHandler);

        if (onceHandler.f7proxy) {
          delete onceHandler.f7proxy;
        }
      }

      onceHandler.f7proxy = handler;
      return self.on(events, onceHandler, priority);
    }

    off(events, handler) {
      const self = this;
      if (!self.eventsListeners) return self;
      events.split(' ').forEach(event => {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
          self.eventsListeners[event].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.f7proxy && eventHandler.f7proxy === handler) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    }

    emit(...args) {
      const self = this;
      if (!self.eventsListeners) return self;
      let events;
      let data;
      let context;

      if (typeof args[0] === 'string' || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }

      const eventsArray = Array.isArray(events) ? events : events.split(' ');
      eventsArray.forEach(event => {
        if (self.eventsListeners && self.eventsListeners[event]) {
          const handlers = [];
          self.eventsListeners[event].forEach(eventHandler => {
            handlers.push(eventHandler);
          });
          handlers.forEach(eventHandler => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }

    useModulesParams(instanceParams) {
      const instance = this;
      if (!instance.modules) return;
      Object.keys(instance.modules).forEach(moduleName => {
        const module = instance.modules[moduleName]; // Extend params

        if (module.params) {
          Utils.extend(instanceParams, module.params);
        }
      });
    }

    useModules(modulesParams = {}) {
      const instance = this;
      if (!instance.modules) return;
      Object.keys(instance.modules).forEach(moduleName => {
        const module = instance.modules[moduleName];
        const moduleParams = modulesParams[moduleName] || {}; // Extend instance methods and props

        if (module.instance) {
          Object.keys(module.instance).forEach(modulePropName => {
            const moduleProp = module.instance[modulePropName];

            if (typeof moduleProp === 'function') {
              instance[modulePropName] = moduleProp.bind(instance);
            } else {
              instance[modulePropName] = moduleProp;
            }
          });
        } // Add event listeners


        if (module.on && instance.on) {
          Object.keys(module.on).forEach(moduleEventName => {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        } // Module create callback


        if (module.create) {
          module.create.bind(instance)(moduleParams);
        }
      });
    }

    static set components(components) {
      const Class = this;
      if (!Class.use) return;
      Class.use(components);
    }

    static installModule(module, ...params) {
      const Class = this;
      if (!Class.prototype.modules) Class.prototype.modules = {};
      const name = module.name || `${Object.keys(Class.prototype.modules).length}_${Utils.now()}`;
      Class.prototype.modules[name] = module; // Prototype

      if (module.proto) {
        Object.keys(module.proto).forEach(key => {
          Class.prototype[key] = module.proto[key];
        });
      } // Class


      if (module.static) {
        Object.keys(module.static).forEach(key => {
          Class[key] = module.static[key];
        });
      } // Callback


      if (module.install) {
        module.install.apply(Class, params);
      }

      return Class;
    }

    static use(module, ...params) {
      const Class = this;

      if (Array.isArray(module)) {
        module.forEach(m => Class.installModule(m));
        return Class;
      }

      return Class.installModule(module, ...params);
    }

  }

  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const $el = swiper.$el;

    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }

    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }

    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    } // Subtract paddings


    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);
    Utils.extend(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }

  function updateSlides() {
    const swiper = this;
    const params = swiper.params;
    const {
      $wrapperEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    let offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.snapGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;

    if (typeof swiperSize === 'undefined') {
      return;
    }

    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    if (rtl) slides.css({
      marginLeft: '',
      marginTop: ''
    });else slides.css({
      marginRight: '',
      marginBottom: ''
    });
    let slidesNumberEvenToRows;

    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }

      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    } // Calc slides


    let slideSize;
    const slidesPerColumn = params.slidesPerColumn;
    const slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    const numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);

    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      const slide = slides.eq(i);

      if (params.slidesPerColumn > 1) {
        // Set slides order
        let newSlideOrderIndex;
        let column;
        let row;

        if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;

          if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
            row += 1;

            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }

          newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
          slide.css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css(`margin-${swiper.isHorizontal() ? 'top' : 'left'}`, row !== 0 && params.spaceBetween && `${params.spaceBetween}px`).attr('data-swiper-column', column).attr('data-swiper-row', row);
      }

      if (slide.css('display') === 'none') continue; // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        const slideStyles = win.getComputedStyle(slide[0], null);
        const currentTransform = slide[0].style.transform;
        const currentWebKitTransform = slide[0].style.webkitTransform;

        if (currentTransform) {
          slide[0].style.transform = 'none';
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }

        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            const width = parseFloat(slideStyles.getPropertyValue('width'));
            const paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
            const paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
            const marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
            const marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
            const boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            const height = parseFloat(slideStyles.getPropertyValue('height'));
            const paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
            const paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
            const marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
            const marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
            const boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }

        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }

        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = `${slideSize}px`;
          } else {
            slides[i].style.height = `${slideSize}px`;
          }
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    let newSlidesGrid;

    if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({
        width: `${swiper.virtualSize + params.spaceBetween}px`
      });
    }

    if (!Support.flexbox || params.setWrapperSize) {
      if (swiper.isHorizontal()) $wrapperEl.css({
        width: `${swiper.virtualSize + params.spaceBetween}px`
      });else $wrapperEl.css({
        height: `${swiper.virtualSize + params.spaceBetween}px`
      });
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) $wrapperEl.css({
        width: `${swiper.virtualSize + params.spaceBetween}px`
      });else $wrapperEl.css({
        height: `${swiper.virtualSize + params.spaceBetween}px`
      });

      if (params.centeredSlides) {
        newSlidesGrid = [];

        for (let i = 0; i < snapGrid.length; i += 1) {
          let slidesGridItem = snapGrid[i];
          if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
          if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
        }

        snapGrid = newSlidesGrid;
      }
    } // Remove last grid elements depending on width


    if (!params.centeredSlides) {
      newSlidesGrid = [];

      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

        if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }

      snapGrid = newSlidesGrid;

      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (snapGrid.length === 0) snapGrid = [0];

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) slides.css({
          marginLeft: `${spaceBetween}px`
        });else slides.css({
          marginRight: `${spaceBetween}px`
        });
      } else slides.css({
        marginBottom: `${spaceBetween}px`
      });
    }

    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach(slideSizeValue => {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;

      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit('snapGridLengthChange');
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    let newHeight = 0;
    let i;

    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    } // Find slides currently in view


    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length) break;
        activeSlides.push(swiper.slides.eq(index)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    } // Find new height from highest slide in view


    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height


    if (newHeight) swiper.$wrapperEl.css('height', `${newHeight}px`);
  }

  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;

    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress(translate = this && this.translate || 0) {
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl
    } = swiper;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
    let offsetCenter = -translate;
    if (rtl) offsetCenter = translate; // Visible Slides

    slides.removeClass(params.slideVisibleClass);
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + params.spaceBetween);

      if (params.watchSlidesVisibility) {
        const slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        const isVisible = slideBefore >= 0 && slideBefore < swiper.size || slideAfter > 0 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }

      slide.progress = rtl ? -slideProgress : slideProgress;
    }

    swiper.visibleSlides = $$1(swiper.visibleSlides);
  }

  function updateProgress(translate = this && this.translate || 0) {
    const swiper = this;
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }

    Utils.extend(swiper, {
      progress,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.watchSlidesVisibility) swiper.updateSlidesProgress(translate);

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }

    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }

    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params,
      $wrapperEl,
      activeIndex,
      realIndex
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
    let activeSlide;

    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
    } else {
      activeSlide = slides.eq(activeIndex);
    } // Active classes


    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
      }
    } // Next Slide


    let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide


    let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }

    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
      }

      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      slidesGrid,
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;

    if (typeof activeIndex === 'undefined') {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      } // Normalize slideIndex


      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }

      return;
    } // Get real index


    const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
    Utils.extend(swiper, {
      snapIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');

    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }

    swiper.emit('slideChange');
  }

  function updateClickedSlide(e) {
    const swiper = this;
    const params = swiper.params;
    const slide = $$1(e.target).closest(`.${params.slideClass}`)[0];
    let slideFound = false;

    if (slide) {
      for (let i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) slideFound = true;
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($$1(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $$1(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };

  function getTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
    const swiper = this;
    const {
      params,
      rtlTranslate: rtl,
      translate,
      $wrapperEl
    } = swiper;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    let currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }

  function setTranslate(translate, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      $wrapperEl,
      progress
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (!params.virtualTranslate) {
      if (Support.transforms3d) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);else $wrapperEl.transform(`translate(${x}px, ${y}px)`);
    }

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate() {
    return -this.snapGrid[0];
  }

  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  var translate = {
    getTranslate,
    setTranslate,
    minTranslate,
    maxTranslate
  };

  function setTransition(duration, byController) {
    const swiper = this;
    swiper.$wrapperEl.transition(duration);
    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart(runCallbacks = true, direction) {
    const swiper = this;
    const {
      activeIndex,
      params,
      previousIndex
    } = swiper;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    let dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }

      swiper.emit('slideChangeTransitionStart');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1(runCallbacks = true, direction) {
    const swiper = this;
    const {
      activeIndex,
      previousIndex
    } = swiper;
    swiper.animating = false;
    swiper.setTransition(0);
    let dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }

      swiper.emit('slideChangeTransitionEnd');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition,
    transitionStart,
    transitionEnd: transitionEnd$1
  };

  function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl
    } = swiper;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    let snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    const translate = -snapGrid[snapIndex]; // Update progress

    swiper.updateProgress(translate); // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    } // Directions locks


    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }

      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) return false;
      }
    }

    let direction;
    if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }

      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (speed === 0 || !Support.transition) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    let newIndex = index;

    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    const {
      params,
      animating
    } = swiper;

    if (params.loop) {
      if (animating) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }

    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    const {
      params,
      animating,
      snapGrid,
      slidesGrid,
      rtlTranslate
    } = swiper;

    if (params.loop) {
      if (animating) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    const translate = rtlTranslate ? swiper.translate : -swiper.translate;

    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }

    const normalizedTranslate = normalize(translate);
    const normalizedSnapGrid = snapGrid.map(val => normalize(val));
    const normalizedSlidesGrid = slidesGrid.map(val => normalize(val));
    const currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    const prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    let prevIndex;

    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideToClosest(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    let index = swiper.activeIndex;
    const snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

    if (snapIndex < swiper.snapGrid.length - 1) {
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) / 2) {
        index = swiper.params.slidesPerGroup;
      }
    }

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide() {
    const swiper = this;
    const {
      params,
      $wrapperEl
    } = swiper;
    const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;

    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt($$1(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
          Utils.nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
        Utils.nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };

  function loopCreate() {
    const swiper = this;
    const {
      params,
      $wrapperEl
    } = swiper; // Remove duplicated slides

    $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
    let slides = $wrapperEl.children(`.${params.slideClass}`);

    if (params.loopFillGroupWithBlank) {
      const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

      if (blankSlidesNum !== params.slidesPerGroup) {
        for (let i = 0; i < blankSlidesNum; i += 1) {
          const blankNode = $$1(doc.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
          $wrapperEl.append(blankNode);
        }

        slides = $wrapperEl.children(`.${params.slideClass}`);
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;

    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    const prependSlides = [];
    const appendSlides = [];
    slides.each((index, el) => {
      const slide = $$1(el);
      if (index < swiper.loopedSlides) appendSlides.push(el);
      if (index < slides.length && index >= slides.length - swiper.loopedSlides) prependSlides.push(el);
      slide.attr('data-swiper-slide-index', index);
    });

    for (let i = 0; i < appendSlides.length; i += 1) {
      $wrapperEl.append($$1(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
    }

    for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
      $wrapperEl.prepend($$1(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix() {
    const swiper = this;
    const {
      params,
      activeIndex,
      slides,
      loopedSlides,
      allowSlidePrev,
      allowSlideNext,
      snapGrid,
      rtlTranslate: rtl
    } = swiper;
    let newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    const snapTranslate = -snapGrid[activeIndex];
    const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      const slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if (params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2 || activeIndex >= slides.length - loopedSlides) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      const slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  }

  function loopDestroy() {
    const swiper = this;
    const {
      $wrapperEl,
      params,
      slides
    } = swiper;
    $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };

  function setGrabCursor(moving) {
    const swiper = this;
    if (Support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked) return;
    const el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor() {
    const swiper = this;
    if (Support.touch || swiper.params.watchOverflow && swiper.isLocked) return;
    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };

  function appendSlide(slides) {
    const swiper = this;
    const {
      $wrapperEl,
      params
    } = swiper;

    if (params.loop) {
      swiper.loopDestroy();
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.append(slides[i]);
      }
    } else {
      $wrapperEl.append(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide(slides) {
    const swiper = this;
    const {
      params,
      $wrapperEl,
      activeIndex
    } = swiper;

    if (params.loop) {
      swiper.loopDestroy();
    }

    let newActiveIndex = activeIndex + 1;

    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.prepend(slides[i]);
      }

      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide(index, slides) {
    const swiper = this;
    const {
      $wrapperEl,
      params,
      activeIndex
    } = swiper;
    let activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
    }

    const baseLength = swiper.slides.length;

    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }

    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }

    let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    const slidesBuffer = [];

    for (let i = baseLength - 1; i >= index; i -= 1) {
      const currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.append(slides[i]);
      }

      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (let i = 0; i < slidesBuffer.length; i += 1) {
      $wrapperEl.append(slidesBuffer[i]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide(slidesIndexes) {
    const swiper = this;
    const {
      params,
      $wrapperEl,
      activeIndex
    } = swiper;
    let activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
    }

    let newActiveIndex = activeIndexBuffer;
    let indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (let i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides() {
    const swiper = this;
    const slidesIndexes = [];

    for (let i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }

    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide,
    prependSlide,
    addSlide,
    removeSlide,
    removeAllSlides
  };

  const Device = function Device() {
    const ua = win.navigator.userAgent;
    const device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap
    };
    const windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/); // Windows

    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    } // Android


    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }

    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    } // iOS


    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }

    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }

    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    } // iOS 8+ changed UA


    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    } // Desktop


    device.desktop = !(device.os || device.android || device.webView); // Webview

    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i); // Minimal UI

    if (device.os && device.os === 'ios') {
      const osVersionArr = device.osVersion.split('.');
      const metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    } // Pixel Ratio


    device.pixelRatio = win.devicePixelRatio || 1; // Export object

    return device;
  }();

  function onTouchStart(event) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches
    } = swiper;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }

    let e = event;
    if (e.originalEvent) e = e.originalEvent;
    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
    if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return;

    if (params.noSwiping && $$1(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`)[0]) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!$$1(e).closest(params.swipeHandler)[0]) return;
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= win.screen.width - edgeSwipeThreshold)) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) data.allowThresholdMove = false;

    if (e.type !== 'touchstart') {
      let preventDefault = true;
      if ($$1(e.target).is(data.formElements)) preventDefault = false;

      if (doc.activeElement && $$1(doc.activeElement).is(data.formElements) && doc.activeElement !== e.target) {
        doc.activeElement.blur();
      }

      const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }

    swiper.emit('touchStart', e);
  }

  function onTouchMove(event) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl
    } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      return;
    }

    if (data.isTouchEvent && e.type === 'mousemove') return;
    const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;

      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = Utils.now();
      }

      return;
    }

    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }

    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $$1(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

    if (typeof data.isScrolling === 'undefined') {
      let touchAngle;

      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;
    e.preventDefault();

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }

      swiper.emit('sliderFirstMove', e);
    }

    swiper.emit('sliderMove', e);
    data.isMoved = true;
    let diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) diff = -diff;
    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks


    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    } // Threshold


    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger) return; // Update active index in free mode

    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime
        });
      }

      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now()
      });
    } // Update progress


    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd(event) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      $wrapperEl,
      slidesGrid,
      snapGrid
    } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor


    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    } // Time diff


    const touchEndTime = Utils.now();
    const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap', e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime > 300) {
        if (data.clickTimeout) clearTimeout(data.clickTimeout);
        data.clickTimeout = Utils.nextTick(() => {
          if (!swiper || swiper.destroyed) return;
          swiper.emit('click', e);
        }, 300);
      }

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        if (data.clickTimeout) clearTimeout(data.clickTimeout);
        swiper.emit('doubleTap', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(() => {
      if (!swiper.destroyed) swiper.allowClick = true;
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }

        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          const lastMoveEvent = data.velocities.pop();
          const velocityEvent = data.velocities.pop();
          const distance = lastMoveEvent.position - velocityEvent.position;
          const time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;

          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          } // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.


          if (time > 150 || Utils.now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }

        swiper.velocity *= params.freeModeMomentumVelocityRatio;
        data.velocities.length = 0;
        let momentumDuration = 1000 * params.freeModeMomentumRatio;
        const momentumDistance = swiper.velocity * momentumDuration;
        let newPosition = swiper.translate + momentumDistance;
        if (rtl) newPosition = -newPosition;
        let doBounce = false;
        let afterBouncePosition;
        const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        let needsLoopFix;

        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }

            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }

            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (params.freeModeSticky) {
          let nextSlide;

          for (let j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }

          newPosition = -newPosition;
        }

        if (needsLoopFix) {
          swiper.once('transitionEnd', () => {
            swiper.loopFix();
          });
        } // Fix duration


        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(() => {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
            swiper.emit('momentumBounce');
            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(() => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);

          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(() => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      return;
    } // Find current slide


    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];

    for (let i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    } // Find current slide size


    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + params.slidesPerGroup);else swiper.slideTo(stopIndex);
      }

      if (swiper.swipeDirection === 'prev') {
        if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + params.slidesPerGroup);else swiper.slideTo(stopIndex);
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }

      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize() {
    const swiper = this;
    const {
      params,
      el
    } = swiper;
    if (el && el.offsetWidth === 0) return; // Breakpoints

    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks


    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      const newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();

      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    } // Return locks after resize


    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick(e) {
    const swiper = this;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function attachEvents() {
    const swiper = this;
    const {
      params,
      touchEvents,
      el,
      wrapperEl
    } = swiper;
    {
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    const target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    const capture = !!params.nested; // Touch Events

    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          const passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? {
            passive: false,
            capture
          } : capture);
          target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }

        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        target.addEventListener('click', swiper.onClick, true);
      }
    } // Resize handler

    swiper.on(Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
  }

  function detachEvents() {
    const swiper = this;
    const {
      params,
      touchEvents,
      el,
      wrapperEl
    } = swiper;
    const target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    const capture = !!params.nested; // Touch Events

    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          const passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }

        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        target.removeEventListener('click', swiper.onClick, true);
      }
    } // Resize handler

    swiper.off(Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize);
  }

  var events = {
    attachEvents,
    detachEvents
  };

  function setBreakpoint() {
    const swiper = this;
    const {
      activeIndex,
      initialized,
      loopedSlides = 0,
      params
    } = swiper;
    const breakpoints = params.breakpoints;
    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Set breakpoint for window width and update parameters

    const breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;

      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup'].forEach(param => {
          const paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === 'undefined') return;

          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      const breakpointParams = breakpointOnlyParams || swiper.originalParams;
      const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      Utils.extend(swiper.params, breakpointParams);
      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });
      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoint(breakpoints) {
    const swiper = this; // Get breakpoint for window width

    if (!breakpoints) return undefined;
    let breakpoint = false;
    const points = [];
    Object.keys(breakpoints).forEach(point => {
      points.push(point);
    });
    points.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];

      if (swiper.params.breakpointsInverse) {
        if (point <= win.innerWidth) {
          breakpoint = point;
        }
      } else if (point >= win.innerWidth && !breakpoint) {
        breakpoint = point;
      }
    }

    return breakpoint || 'max';
  }

  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };

  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params,
      rtl,
      $el
    } = swiper;
    const suffixes = [];
    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }

    if (!Support.flexbox) {
      suffixes.push('no-flexbox');
    }

    if (params.autoHeight) {
      suffixes.push('autoheight');
    }

    if (rtl) {
      suffixes.push('rtl');
    }

    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
    }

    if (Device.android) {
      suffixes.push('android');
    }

    if (Device.ios) {
      suffixes.push('ios');
    } // WP8 Touch Events Fix


    if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      suffixes.push(`wp8-${params.direction}`);
    }

    suffixes.forEach(suffix => {
      classNames.push(params.containerModifierClass + suffix);
    });
    $el.addClass(classNames.join(' '));
  }

  function removeClasses() {
    const swiper = this;
    const {
      $el,
      classNames
    } = swiper;
    $el.removeClass(classNames.join(' '));
  }

  var classes = {
    addClasses,
    removeClasses
  };

  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    let image;

    function onReady() {
      if (callback) callback();
    }

    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;

        if (sizes) {
          image.sizes = sizes;
        }

        if (srcset) {
          image.srcset = srcset;
        }

        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages() {
    const swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');

    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
      if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) swiper.update();
        swiper.emit('imagesReady');
      }
    }

    for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
      const imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
    }
  }

  var images = {
    loadImage,
    preloadImages
  };

  function checkOverflow() {
    const swiper = this;
    const wasLocked = swiper.isLocked;
    swiper.isLocked = swiper.snapGrid.length === 1;
    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked; // events

    if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? 'lock' : 'unlock');

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    //
    preventInteractionOnTransition: false,
    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: 'slide',
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    breakpointsInverse: false,
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    // NS
    containerModifierClass: 'swiper-container-',
    // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    // Callbacks
    runCallbacksOnInit: true
  };
  /* eslint no-param-reassign: "off" */

  const prototypes = {
    update,
    translate,
    transition: transition$1,
    slide,
    loop,
    grabCursor,
    manipulation,
    events,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes,
    images
  };
  const extendedDefaults = {};

  class Swiper extends SwiperClass {
    constructor(...args) {
      let el;
      let params;

      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        [el, params] = args;
      }

      if (!params) params = {};
      params = Utils.extend({}, params);
      if (el && !params.el) params.el = el;
      super(params);
      Object.keys(prototypes).forEach(prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      }); // Swiper Instance

      const swiper = this;

      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }

      Object.keys(swiper.modules).forEach(moduleName => {
        const module = swiper.modules[moduleName];

        if (module.params) {
          const moduleParamName = Object.keys(module.params)[0];
          const moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) return;
          if (!(moduleParamName in params && 'enabled' in moduleParams)) return;

          if (params[moduleParamName] === true) {
            params[moduleParamName] = {
              enabled: true
            };
          }

          if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
            params[moduleParamName].enabled = true;
          }

          if (!params[moduleParamName]) params[moduleParamName] = {
            enabled: false
          };
        }
      }); // Extend defaults with modules params

      const swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams); // Extend defaults with passed params

      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params); // Save Dom lib

      swiper.$ = $$1; // Find el

      const $el = $$1(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        const swipers = [];
        $el.each((index, containerEl) => {
          const newParams = Utils.extend({}, params, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper); // Find Wrapper

      const $wrapperEl = $el.children(`.${swiper.params.wrapperClass}`); // Extend Swiper

      Utils.extend(swiper, {
        $el,
        el,
        $wrapperEl,
        wrapperEl: $wrapperEl[0],
        // Classes
        classNames: [],
        // Slides
        slides: $$1(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },

        isVertical() {
          return swiper.params.direction === 'vertical';
        },

        // RTL
        rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: function touchEvents() {
          const touch = ['touchstart', 'touchmove', 'touchend'];
          let desktop = ['mousedown', 'mousemove', 'mouseup'];

          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (Support.prefixedPointerEvents) {
            desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
          }

          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2]
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2]
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      }); // Install Modules

      swiper.useModules(); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance


      return swiper;
    }

    slidesPerViewDynamic() {
      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        size: swiperSize,
        activeIndex
      } = swiper;
      let spv = 1;

      if (params.centeredSlides) {
        let slideSize = slides[activeIndex].swiperSlideSize;
        let breakLoop;

        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }

        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slidesGrid[i] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }

      return spv;
    }

    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed) return;
      const {
        snapGrid,
        params
      } = swiper; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      let translated;

      if (swiper.params.freeMode) {
        setTranslate();

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }

        if (!translated) {
          setTranslate();
        }
      }

      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }

      swiper.emit('update');
    }

    changeDirection(newDirection, needUpdate = true) {
      const swiper = this;
      const currentDirection = swiper.params.direction;

      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }

      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }

      if (currentDirection === 'vertical') {
        swiper.$el.removeClass(`${swiper.params.containerModifierClass}vertical wp8-vertical`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);

        if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
          swiper.$el.addClass(`${swiper.params.containerModifierClass}wp8-${newDirection}`);
        }
      }

      if (currentDirection === 'horizontal') {
        swiper.$el.removeClass(`${swiper.params.containerModifierClass}horizontal wp8-horizontal`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);

        if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
          swiper.$el.addClass(`${swiper.params.containerModifierClass}wp8-${newDirection}`);
        }
      }

      swiper.params.direction = newDirection;
      swiper.slides.each((slideIndex, slideEl) => {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });
      swiper.emit('changeDirection');
      if (needUpdate) swiper.update();
      return swiper;
    }

    init() {
      const swiper = this;
      if (swiper.initialized) return;
      swiper.emit('beforeInit'); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes


      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size


      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor


      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide


      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      } // Attach events


      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit('init');
    }

    destroy(deleteInstance = true, cleanStyles = true) {
      const swiper = this;
      const {
        params,
        $el,
        $wrapperEl,
        slides
      } = swiper;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles


      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');

        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy'); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(eventName => {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    }

    static extendDefaults(newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    }

    static get extendedDefaults() {
      return extendedDefaults;
    }

    static get defaults() {
      return defaults;
    }

    static get Class() {
      return SwiperClass;
    }

    static get $() {
      return $$1;
    }

  }

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device
    },
    static: {
      device: Device
    }
  };
  var Support$1 = {
    name: 'support',
    proto: {
      support: Support
    },
    static: {
      support: Support
    }
  };
  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser
    },
    static: {
      browser: Browser
    }
  };
  var Resize = {
    name: 'resize',

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },

          orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit('orientationchange');
          }

        }
      });
    },

    on: {
      init() {
        const swiper = this; // Emit resize

        win.addEventListener('resize', swiper.resize.resizeHandler); // Emit orientationchange

        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },

      destroy() {
        const swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      }

    }
  };
  const Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,

    attach(target, options = {}) {
      const swiper = this;
      const ObserverFunc = Observer.func;
      const observer = new ObserverFunc(mutations => {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }

        const observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });
      swiper.observer.observers.push(observer);
    },

    init() {
      const swiper = this;
      if (!Support.observer || !swiper.params.observer) return;

      if (swiper.params.observeParents) {
        const containerParents = swiper.$el.parents();

        for (let i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      } // Observe container


      swiper.observer.attach(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren
      }); // Observe wrapper

      swiper.observer.attach(swiper.$wrapperEl[0], {
        attributes: false
      });
    },

    destroy() {
      const swiper = this;
      swiper.observer.observers.forEach(observer => {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    }

  };
  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: []
        }
      });
    },

    on: {
      init() {
        const swiper = this;
        swiper.observer.init();
      },

      destroy() {
        const swiper = this;
        swiper.observer.destroy();
      }

    }
  };
  const Virtual = {
    update(force) {
      const swiper = this;
      const {
        slidesPerView,
        slidesPerGroup,
        centeredSlides
      } = swiper.params;
      const {
        addSlidesBefore,
        addSlidesAfter
      } = swiper.params.virtual;
      const {
        from: previousFrom,
        to: previousTo,
        slides,
        slidesGrid: previousSlidesGrid,
        renderSlide,
        offset: previousOffset
      } = swiper.virtual;
      swiper.updateActiveIndex();
      const activeIndex = swiper.activeIndex || 0;
      let offsetProp;
      if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
      let slidesAfter;
      let slidesBefore;

      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }

      const from = Math.max((activeIndex || 0) - slidesBefore, 0);
      const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      Utils.extend(swiper.virtual, {
        from,
        to,
        offset,
        slidesGrid: swiper.slidesGrid
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, `${offset}px`);
        }

        swiper.updateProgress();
        return;
      }

      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset,
          from,
          to,
          slides: function getSlides() {
            const slidesToRender = [];

            for (let i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }

            return slidesToRender;
          }()
        });
        onRendered();
        return;
      }

      const prependIndexes = [];
      const appendIndexes = [];

      if (force) {
        swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
      } else {
        for (let i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
          }
        }
      }

      for (let i = 0; i < slides.length; i += 1) {
        if (i >= from && i <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i);
          } else {
            if (i > previousTo) appendIndexes.push(i);
            if (i < previousFrom) prependIndexes.push(i);
          }
        }
      }

      appendIndexes.forEach(index => {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort((a, b) => b - a).forEach(index => {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);
      onRendered();
    },

    renderSlide(slide, index) {
      const swiper = this;
      const params = swiper.params.virtual;

      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }

      const $slideEl = params.renderSlide ? $$1(params.renderSlide.call(swiper, slide, index)) : $$1(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
      if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
      if (params.cache) swiper.virtual.cache[index] = $slideEl;
      return $slideEl;
    },

    appendSlide(slides) {
      const swiper = this;

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.push(slides[i]);
        }
      } else {
        swiper.virtual.slides.push(slides);
      }

      swiper.virtual.update(true);
    },

    prependSlide(slides) {
      const swiper = this;
      const activeIndex = swiper.activeIndex;
      let newActiveIndex = activeIndex + 1;
      let numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
        }

        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }

      if (swiper.params.virtual.cache) {
        const cache = swiper.virtual.cache;
        const newCache = {};
        Object.keys(cache).forEach(cachedIndex => {
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cache[cachedIndex];
        });
        swiper.virtual.cache = newCache;
      }

      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },

    removeSlide(slidesIndexes) {
      const swiper = this;
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
      let activeIndex = swiper.activeIndex;

      if (Array.isArray(slidesIndexes)) {
        for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);

          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }

          if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);

        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }

        if (slidesIndexes < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }

      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },

    removeAllSlides() {
      const swiper = this;
      swiper.virtual.slides = [];

      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }

      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    }

  };
  var virtual = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          removeSlide: Virtual.removeSlide.bind(swiper),
          removeAllSlides: Virtual.removeAllSlides.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {}
        }
      });
    },

    on: {
      beforeInit() {
        const swiper = this;
        if (!swiper.params.virtual.enabled) return;
        swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
        const overwriteParams = {
          watchSlidesProgress: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },

      setTranslate() {
        const swiper = this;
        if (!swiper.params.virtual.enabled) return;
        swiper.virtual.update();
      }

    }
  };

  function isEventSupported() {
    const eventName = 'onwheel';
    let isSupported = eventName in doc;

    if (!isSupported) {
      const element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && doc.implementation && doc.implementation.hasFeature // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    && doc.implementation.hasFeature('', '') !== true) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }

  const Mousewheel = {
    lastScrollTime: Utils.now(),
    event: function getEvent() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) return 'DOMMouseScroll';
      return isEventSupported() ? 'wheel' : 'mousewheel';
    }(),

    normalize(e) {
      // Reasonable defaults
      const PIXEL_STEP = 10;
      const LINE_HEIGHT = 40;
      const PAGE_HEIGHT = 800;
      let sX = 0;
      let sY = 0; // spinX, spinY

      let pX = 0;
      let pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in e) {
        sY = e.detail;
      }

      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }

      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }

      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },

    handleMouseEnter() {
      const swiper = this;
      swiper.mouseEntered = true;
    },

    handleMouseLeave() {
      const swiper = this;
      swiper.mouseEntered = false;
    },

    handle(event) {
      let e = event;
      const swiper = this;
      const params = swiper.params.mousewheel;
      if (!swiper.mouseEntered && !params.releaseOnEdges) return true;
      if (e.originalEvent) e = e.originalEvent; // jquery fix

      let delta = 0;
      const rtlFactor = swiper.rtlTranslate ? -1 : 1;
      const data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;else return true;
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;else return true;
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) return true;
      if (params.invert) delta = -delta;

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) return true;
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) return true;
        }

        swiper.mousewheel.lastScrollTime = new win.Date().getTime();
      } else {
        // Freemode or scrollContainer:
        if (swiper.params.loop) {
          swiper.loopFix();
        }

        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(() => {
            swiper.slideToClosest();
          }, 300);
        } // Emit event


        swiper.emit('scroll', e); // Stop autoplay

        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
      }

      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      return false;
    },

    enable() {
      const swiper = this;
      if (!Mousewheel.event) return false;
      if (swiper.mousewheel.enabled) return false;
      let target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $$1(swiper.params.mousewheel.eventsTarged);
      }

      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },

    disable() {
      const swiper = this;
      if (!Mousewheel.event) return false;
      if (!swiper.mousewheel.enabled) return false;
      let target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $$1(swiper.params.mousewheel.eventsTarged);
      }

      target.off(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    }

  };
  var mousewheel = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container'
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          lastScrollTime: Utils.now()
        }
      });
    },

    on: {
      init() {
        const swiper = this;
        if (swiper.params.mousewheel.enabled) swiper.mousewheel.enable();
      },

      destroy() {
        const swiper = this;
        if (swiper.mousewheel.enabled) swiper.mousewheel.disable();
      }

    }
  };
  const Navigation = {
    update() {
      // Update Navigation Buttons
      const swiper = this;
      const params = swiper.params.navigation;
      if (swiper.params.loop) return;
      const {
        $nextEl,
        $prevEl
      } = swiper.navigation;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }

        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }

        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },

    onPrevClick(e) {
      const swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) return;
      swiper.slidePrev();
    },

    onNextClick(e) {
      const swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) return;
      swiper.slideNext();
    },

    init() {
      const swiper = this;
      const params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) return;
      let $nextEl;
      let $prevEl;

      if (params.nextEl) {
        $nextEl = $$1(params.nextEl);

        if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && swiper.$el.find(params.nextEl).length === 1) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }

      if (params.prevEl) {
        $prevEl = $$1(params.prevEl);

        if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && swiper.$el.find(params.prevEl).length === 1) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }

      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      Utils.extend(swiper.navigation, {
        $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl,
        prevEl: $prevEl && $prevEl[0]
      });
    },

    destroy() {
      const swiper = this;
      const {
        $nextEl,
        $prevEl
      } = swiper.navigation;

      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }

      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    }

  };
  var navigation = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock'
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
          onNextClick: Navigation.onNextClick.bind(swiper),
          onPrevClick: Navigation.onPrevClick.bind(swiper)
        }
      });
    },

    on: {
      init() {
        const swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },

      toEdge() {
        const swiper = this;
        swiper.navigation.update();
      },

      fromEdge() {
        const swiper = this;
        swiper.navigation.update();
      },

      destroy() {
        const swiper = this;
        swiper.navigation.destroy();
      },

      click(e) {
        const swiper = this;
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if (swiper.params.navigation.hideOnClick && !$$1(e.target).is($prevEl) && !$$1(e.target).is($nextEl)) {
          let isHidden;

          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }

          if (isHidden === true) {
            swiper.emit('navigationShow', swiper);
          } else {
            swiper.emit('navigationHide', swiper);
          }

          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      }

    }
  };
  const Pagination = {
    update() {
      // Render || Update Pagination bullets/items
      const swiper = this;
      const rtl = swiper.rtl;
      const params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      const $el = swiper.pagination.$el; // Current/Total

      let current;
      const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

        if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
          current -= slidesLength - swiper.loopedSlides * 2;
        }

        if (current > total - 1) current -= total;
        if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      } // Types


      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        const bullets = swiper.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;

        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', `${swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)}px`);

          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += current - swiper.previousIndex;

            if (swiper.pagination.dynamicBulletIndex > params.dynamicMainBullets - 1) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }

          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }

        bullets.removeClass(`${params.bulletActiveClass} ${params.bulletActiveClass}-next ${params.bulletActiveClass}-next-next ${params.bulletActiveClass}-prev ${params.bulletActiveClass}-prev-prev ${params.bulletActiveClass}-main`);

        if ($el.length > 1) {
          bullets.each((index, bullet) => {
            const $bullet = $$1(bullet);
            const bulletIndex = $bullet.index();

            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }

            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(`${params.bulletActiveClass}-main`);
              }

              if (bulletIndex === firstIndex) {
                $bullet.prev().addClass(`${params.bulletActiveClass}-prev`).prev().addClass(`${params.bulletActiveClass}-prev-prev`);
              }

              if (bulletIndex === lastIndex) {
                $bullet.next().addClass(`${params.bulletActiveClass}-next`).next().addClass(`${params.bulletActiveClass}-next-next`);
              }
            }
          });
        } else {
          const $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);

          if (params.dynamicBullets) {
            const $firstDisplayedBullet = bullets.eq(firstIndex);
            const $lastDisplayedBullet = bullets.eq(lastIndex);

            for (let i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
            }

            $firstDisplayedBullet.prev().addClass(`${params.bulletActiveClass}-prev`).prev().addClass(`${params.bulletActiveClass}-prev-prev`);
            $lastDisplayedBullet.next().addClass(`${params.bulletActiveClass}-next`).next().addClass(`${params.bulletActiveClass}-next-next`);
          }
        }

        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          const bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - midIndex * swiper.pagination.bulletSize;
          const offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
        }
      }

      if (params.type === 'fraction') {
        $el.find(`.${params.currentClass}`).text(params.formatFractionCurrent(current + 1));
        $el.find(`.${params.totalClass}`).text(params.formatFractionTotal(total));
      }

      if (params.type === 'progressbar') {
        let progressbarDirection;

        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }

        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;

        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }

        $el.find(`.${params.progressbarFillClass}`).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
      }

      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }

      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },

    render() {
      // Render Container
      const swiper = this;
      const params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      const $el = swiper.pagination.$el;
      let paginationHTML = '';

      if (params.type === 'bullets') {
        const numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        for (let i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
          }
        }

        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(`.${params.bulletClass}`);
      }

      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
        }

        $el.html(paginationHTML);
      }

      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        }

        $el.html(paginationHTML);
      }

      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },

    init() {
      const swiper = this;
      const params = swiper.params.pagination;
      if (!params.el) return;
      let $el = $$1(params.el);
      if ($el.length === 0) return;

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && swiper.$el.find(params.el).length === 1) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
        swiper.pagination.dynamicBulletIndex = 0;

        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }

      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', `.${params.bulletClass}`, function onClick(e) {
          e.preventDefault();
          let index = $$1(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) index += swiper.loopedSlides;
          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el,
        el: $el[0]
      });
    },

    destroy() {
      const swiper = this;
      const params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      const $el = swiper.pagination.$el;
      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

      if (params.clickable) {
        $el.off('click', `.${params.bulletClass}`);
      }
    }

  };
  var pagination = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets',
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: number => number,
        formatFractionTotal: number => number,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-',
        // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable',
        // NEW
        lockClass: 'swiper-pagination-lock'
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0
        }
      });
    },

    on: {
      init() {
        const swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },

      activeIndexChange() {
        const swiper = this;

        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },

      snapIndexChange() {
        const swiper = this;

        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },

      slidesLengthChange() {
        const swiper = this;

        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },

      snapGridLengthChange() {
        const swiper = this;

        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },

      destroy() {
        const swiper = this;
        swiper.pagination.destroy();
      },

      click(e) {
        const swiper = this;

        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !$$1(e.target).hasClass(swiper.params.pagination.bulletClass)) {
          const isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);

          if (isHidden === true) {
            swiper.emit('paginationShow', swiper);
          } else {
            swiper.emit('paginationHide', swiper);
          }

          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      }

    }
  };
  const Scrollbar = {
    setTranslate() {
      const swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      const {
        scrollbar,
        rtlTranslate: rtl,
        progress
      } = swiper;
      const {
        dragSize,
        trackSize,
        $dragEl,
        $el
      } = scrollbar;
      const params = swiper.params.scrollbar;
      let newSize = dragSize;
      let newPos = (trackSize - dragSize) * progress;

      if (rtl) {
        newPos = -newPos;

        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }

      if (swiper.isHorizontal()) {
        if (Support.transforms3d) {
          $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
        } else {
          $dragEl.transform(`translateX(${newPos}px)`);
        }

        $dragEl[0].style.width = `${newSize}px`;
      } else {
        if (Support.transforms3d) {
          $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
        } else {
          $dragEl.transform(`translateY(${newPos}px)`);
        }

        $dragEl[0].style.height = `${newSize}px`;
      }

      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(() => {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },

    setTransition(duration) {
      const swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      swiper.scrollbar.$dragEl.transition(duration);
    },

    updateSize() {
      const swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      const {
        scrollbar
      } = swiper;
      const {
        $dragEl,
        $el
      } = scrollbar;
      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      const trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
      const divider = swiper.size / swiper.virtualSize;
      const moveDivider = divider * (trackSize / swiper.size);
      let dragSize;

      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = `${dragSize}px`;
      } else {
        $dragEl[0].style.height = `${dragSize}px`;
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }

      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }

      Utils.extend(scrollbar, {
        trackSize,
        divider,
        moveDivider,
        dragSize
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },

    setDragPosition(e) {
      const swiper = this;
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        $el,
        dragSize,
        trackSize
      } = scrollbar;
      let pointerPosition;

      if (swiper.isHorizontal()) {
        pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX;
      } else {
        pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
      }

      let positionRatio;
      positionRatio = (pointerPosition - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - dragSize / 2) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);

      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },

    onDragStart(e) {
      const swiper = this;
      const params = swiper.params.scrollbar;
      const {
        scrollbar,
        $wrapperEl
      } = swiper;
      const {
        $el,
        $dragEl
      } = scrollbar;
      swiper.scrollbar.isTouched = true;
      e.preventDefault();
      e.stopPropagation();
      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);
      clearTimeout(swiper.scrollbar.dragTimeout);
      $el.transition(0);

      if (params.hide) {
        $el.css('opacity', 1);
      }

      swiper.emit('scrollbarDragStart', e);
    },

    onDragMove(e) {
      const swiper = this;
      const {
        scrollbar,
        $wrapperEl
      } = swiper;
      const {
        $el,
        $dragEl
      } = scrollbar;
      if (!swiper.scrollbar.isTouched) return;
      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },

    onDragEnd(e) {
      const swiper = this;
      const params = swiper.params.scrollbar;
      const {
        scrollbar
      } = swiper;
      const {
        $el
      } = scrollbar;
      if (!swiper.scrollbar.isTouched) return;
      swiper.scrollbar.isTouched = false;

      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(() => {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }

      swiper.emit('scrollbarDragEnd', e);

      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },

    enableDraggable() {
      const swiper = this;
      if (!swiper.params.scrollbar.el) return;
      const {
        scrollbar,
        touchEventsTouch,
        touchEventsDesktop,
        params
      } = swiper;
      const $el = scrollbar.$el;
      const target = $el[0];
      const activeListener = Support.passiveListener && params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      const passiveListener = Support.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;

      if (!Support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },

    disableDraggable() {
      const swiper = this;
      if (!swiper.params.scrollbar.el) return;
      const {
        scrollbar,
        touchEventsTouch,
        touchEventsDesktop,
        params
      } = swiper;
      const $el = scrollbar.$el;
      const target = $el[0];
      const activeListener = Support.passiveListener && params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      const passiveListener = Support.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;

      if (!Support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },

    init() {
      const swiper = this;
      if (!swiper.params.scrollbar.el) return;
      const {
        scrollbar,
        $el: $swiperEl
      } = swiper;
      const params = swiper.params.scrollbar;
      let $el = $$1(params.el);

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

      if ($dragEl.length === 0) {
        $dragEl = $$1(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el,
        el: $el[0],
        $dragEl,
        dragEl: $dragEl[0]
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },

    destroy() {
      const swiper = this;
      swiper.scrollbar.disableDraggable();
    }

  };
  var scrollbar = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag'
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null
        }
      });
    },

    on: {
      init() {
        const swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },

      update() {
        const swiper = this;
        swiper.scrollbar.updateSize();
      },

      resize() {
        const swiper = this;
        swiper.scrollbar.updateSize();
      },

      observerUpdate() {
        const swiper = this;
        swiper.scrollbar.updateSize();
      },

      setTranslate() {
        const swiper = this;
        swiper.scrollbar.setTranslate();
      },

      setTransition(duration) {
        const swiper = this;
        swiper.scrollbar.setTransition(duration);
      },

      destroy() {
        const swiper = this;
        swiper.scrollbar.destroy();
      }

    }
  };
  /* eslint no-underscore-dangle: "off" */

  const Autoplay = {
    run() {
      const swiper = this;
      const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      let delay = swiper.params.autoplay.delay;

      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }

      swiper.autoplay.timeout = Utils.nextTick(() => {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      }, delay);
    },

    start() {
      const swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') return false;
      if (swiper.autoplay.running) return false;
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },

    stop() {
      const swiper = this;
      if (!swiper.autoplay.running) return false;
      if (typeof swiper.autoplay.timeout === 'undefined') return false;

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }

      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },

    pause(speed) {
      const swiper = this;
      if (!swiper.autoplay.running) return;
      if (swiper.autoplay.paused) return;
      if (swiper.autoplay.timeout) clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.paused = true;

      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    }

  };
  var autoplay = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),

          onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;

            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          }

        }
      });
    },

    on: {
      init() {
        const swiper = this;

        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      },

      beforeTransitionStart(speed, internal) {
        const swiper = this;

        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },

      sliderFirstMove() {
        const swiper = this;

        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },

      destroy() {
        const swiper = this;

        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
      }

    }
  };
  const Fade = {
    setTranslate() {
      const swiper = this;
      const {
        slides
      } = swiper;

      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = swiper.slides.eq(i);
        const offset = $slideEl[0].swiperSlideOffset;
        let tx = -offset;
        if (!swiper.params.virtualTranslate) tx -= swiper.translate;
        let ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }

        const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl.css({
          opacity: slideOpacity
        }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
      }
    },

    setTransition(duration) {
      const swiper = this;
      const {
        slides,
        $wrapperEl
      } = swiper;
      slides.transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        slides.transitionEnd(() => {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }

  };
  var effectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false
      }
    },

    create() {
      const swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper)
        }
      });
    },

    on: {
      beforeInit() {
        const swiper = this;
        if (swiper.params.effect !== 'fade') return;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },

      setTranslate() {
        const swiper = this;
        if (swiper.params.effect !== 'fade') return;
        swiper.fadeEffect.setTranslate();
      },

      setTransition(duration) {
        const swiper = this;
        if (swiper.params.effect !== 'fade') return;
        swiper.fadeEffect.setTransition(duration);
      }

    }
  };

  const components = [Device$1, Support$1, Browser$1, Resize, Observer$1];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  // TODO: Объединить в один класс
  var MobileMenu =
  /*#__PURE__*/
  function () {
    function MobileMenu() {
      var _this = this;

      _classCallCheck(this, MobileMenu);

      _defineProperty(this, "toggleMenu", function () {
        _this.el.classList.toggle('opened');

        _this.menuControlBtn.classList.toggle('active'); // Временно


        var searchEl = document.querySelector('.header-control__search');
        var searchControlBtn = document.querySelector('.header-control__button_search');
        searchEl.classList.remove('active');
        searchControlBtn.classList.remove('active');

        if (document.body.style.overflow) {
          document.body.style.overflow = '';
        } else {
          document.body.style.overflow = 'hidden';
        }
      });

      this.el = document.querySelector('.mobile-menu');
      this.menuControlBtn = document.querySelector('.header-control__menu-btn');
      this.menuOverlayEl = document.querySelector('.mobile-menu__overlay');
      this.init();
    }

    _createClass(MobileMenu, [{
      key: "init",
      value: function init() {
        this.el.MobileMenu = this;
        this.menuControlBtn.addEventListener('click', this.toggleMenu);
        this.menuOverlayEl.addEventListener('click', this.toggleMenu);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.el.MobileMenu = null;
        this.menuControlBtn.removeEventListener('click', this.toggleMenu);
        this.menuOverlayEl.removeEventListener('click', this.toggleMenu);
      }
    }]);

    return MobileMenu;
  }();

  function Header() {
    var headerEl = document.querySelector('.header');
    var wrapperEl = document.querySelector('.wrapper');
    var menuEl = document.querySelector('.mobile-menu');
    var fixedHeaderEl = headerEl.querySelector('.header__fixed-block');
    var searchEl = headerEl.querySelector('.header-control__search');
    var searchControlBtn = headerEl.querySelector('.header-control__button_search');
    var isFixed = false;
    var headerOffsetBreakpoints = headerEl.getBoundingClientRect().bottom + 300;

    function fixHeader() {
      headerOffsetBreakpoints = headerEl.getBoundingClientRect().bottom + 300;

      if (window.pageYOffset >= headerOffsetBreakpoints && !isFixed) {
        fixedHeaderEl.classList.add('fixed');
        isFixed = true;
      } else if (window.pageYOffset < headerOffsetBreakpoints && isFixed) {
        fixedHeaderEl.classList.remove('fixed');
        isFixed = false;
      }
    }

    function initMobile() {
      new MobileMenu();
      wrapperEl.style.paddingTop = "".concat(headerEl.getBoundingClientRect().height, "px");
      menuEl.style.top = "".concat(headerEl.getBoundingClientRect().height, "px");
      searchControlBtn.addEventListener('click', function (e) {
        e.preventDefault();
        searchEl.classList.toggle('active');
        searchControlBtn.classList.toggle('active');
      });
    }

    function initDesktop() {
      fixHeader();
      document.addEventListener('scroll', fixHeader);
    }

    if (document.documentElement.clientWidth < 1240) {
      initMobile();
    } else {
      initDesktop();
    }
  }

  function Input() {
    var $input = $('.input-field__input');
    $input.on('focus', function () {
      $(this).parent().addClass('active');
    });
    $input.on('blur', function () {
      if ($(this).val() === '') {
        $(this).parent().removeClass('active');
      }
    });
  }

  /*
   * anime.js v3.0.1
   * (c) 2019 Julian Garnier
   * Released under the MIT license
   * animejs.com
   */
  // Defaults
  var defaultInstanceSettings = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: 'normal',
    autoplay: true,
    timelineOffset: 0
  };
  var defaultTweenSettings = {
    duration: 1000,
    delay: 0,
    endDelay: 0,
    easing: 'easeOutElastic(1, .5)',
    round: 0
  };
  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective']; // Caching

  var cache = {
    CSS: {},
    springs: {}
  }; // Utils

  function minMax(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function stringContains(str, text) {
    return str.indexOf(text) > -1;
  }

  function applyArguments(func, args) {
    return func.apply(null, args);
  }

  var is$1 = {
    arr: function (a) {
      return Array.isArray(a);
    },
    obj: function (a) {
      return stringContains(Object.prototype.toString.call(a), 'Object');
    },
    pth: function (a) {
      return is$1.obj(a) && a.hasOwnProperty('totalLength');
    },
    svg: function (a) {
      return a instanceof SVGElement;
    },
    inp: function (a) {
      return a instanceof HTMLInputElement;
    },
    dom: function (a) {
      return a.nodeType || is$1.svg(a);
    },
    str: function (a) {
      return typeof a === 'string';
    },
    fnc: function (a) {
      return typeof a === 'function';
    },
    und: function (a) {
      return typeof a === 'undefined';
    },
    hex: function (a) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function (a) {
      return /^rgb/.test(a);
    },
    hsl: function (a) {
      return /^hsl/.test(a);
    },
    col: function (a) {
      return is$1.hex(a) || is$1.rgb(a) || is$1.hsl(a);
    },
    key: function (a) {
      return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes';
    }
  }; // Easings

  function parseEasingParameters(string) {
    var match = /\(([^)]+)\)/.exec(string);
    return match ? match[1].split(',').map(function (p) {
      return parseFloat(p);
    }) : [];
  } // Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js


  function spring(string, duration) {
    var params = parseEasingParameters(string);
    var mass = minMax(is$1.und(params[0]) ? 1 : params[0], .1, 100);
    var stiffness = minMax(is$1.und(params[1]) ? 100 : params[1], .1, 100);
    var damping = minMax(is$1.und(params[2]) ? 10 : params[2], .1, 100);
    var velocity = minMax(is$1.und(params[3]) ? 0 : params[3], .1, 100);
    var w0 = Math.sqrt(stiffness / mass);
    var zeta = damping / (2 * Math.sqrt(stiffness * mass));
    var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
    var a = 1;
    var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

    function solver(t) {
      var progress = duration ? duration * t / 1000 : t;

      if (zeta < 1) {
        progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
      } else {
        progress = (a + b * progress) * Math.exp(-progress * w0);
      }

      if (t === 0 || t === 1) {
        return t;
      }

      return 1 - progress;
    }

    function getDuration() {
      var cached = cache.springs[string];

      if (cached) {
        return cached;
      }

      var frame = 1 / 6;
      var elapsed = 0;
      var rest = 0;

      while (true) {
        elapsed += frame;

        if (solver(elapsed) === 1) {
          rest++;

          if (rest >= 16) {
            break;
          }
        } else {
          rest = 0;
        }
      }

      var duration = elapsed * frame * 1000;
      cache.springs[string] = duration;
      return duration;
    }

    return duration ? solver : getDuration;
  } // Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/


  function elastic(amplitude, period) {
    if (amplitude === void 0) amplitude = 1;
    if (period === void 0) period = .5;
    var a = minMax(amplitude, 1, 10);
    var p = minMax(period, .1, 2);
    return function (t) {
      return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
    };
  } // Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function


  function steps(steps) {
    if (steps === void 0) steps = 10;
    return function (t) {
      return Math.round(t * steps) * (1 / steps);
    };
  } // BezierEasing https://github.com/gre/bezier-easing


  var bezier = function () {
    var kSplineTableSize = 11;
    var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

    function A(aA1, aA2) {
      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }

    function B(aA1, aA2) {
      return 3.0 * aA2 - 6.0 * aA1;
    }

    function C(aA1) {
      return 3.0 * aA1;
    }

    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }

    function getSlope(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }

    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX,
          currentT,
          i = 0;

      do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;

        if (currentX > 0.0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > 0.0000001 && ++i < 10);

      return currentT;
    }

    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < 4; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);

        if (currentSlope === 0.0) {
          return aGuessT;
        }

        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }

      return aGuessT;
    }

    function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        return;
      }

      var sampleValues = new Float32Array(kSplineTableSize);

      if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }

      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }

        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= 0.001) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }

      return function (x) {
        if (mX1 === mY1 && mX2 === mY2) {
          return x;
        }

        if (x === 0 || x === 1) {
          return x;
        }

        return calcBezier(getTForX(x), mY1, mY2);
      };
    }

    return bezier;
  }();

  var penner = function () {
    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic']; // Approximated Penner equations http://matthewlein.com/ceaser/

    var curves = {
      In: [[0.550, 0.085, 0.680, 0.530],
      /* inQuad */
      [0.550, 0.055, 0.675, 0.190],
      /* inCubic */
      [0.895, 0.030, 0.685, 0.220],
      /* inQuart */
      [0.755, 0.050, 0.855, 0.060],
      /* inQuint */
      [0.470, 0.000, 0.745, 0.715],
      /* inSine */
      [0.950, 0.050, 0.795, 0.035],
      /* inExpo */
      [0.600, 0.040, 0.980, 0.335],
      /* inCirc */
      [0.600, -0.280, 0.735, 0.045],
      /* inBack */
      elastic
      /* inElastic */
      ],
      Out: [[0.250, 0.460, 0.450, 0.940],
      /* outQuad */
      [0.215, 0.610, 0.355, 1.000],
      /* outCubic */
      [0.165, 0.840, 0.440, 1.000],
      /* outQuart */
      [0.230, 1.000, 0.320, 1.000],
      /* outQuint */
      [0.390, 0.575, 0.565, 1.000],
      /* outSine */
      [0.190, 1.000, 0.220, 1.000],
      /* outExpo */
      [0.075, 0.820, 0.165, 1.000],
      /* outCirc */
      [0.175, 0.885, 0.320, 1.275],
      /* outBack */
      function (a, p) {
        return function (t) {
          return 1 - elastic(a, p)(1 - t);
        };
      }
      /* outElastic */
      ],
      InOut: [[0.455, 0.030, 0.515, 0.955],
      /* inOutQuad */
      [0.645, 0.045, 0.355, 1.000],
      /* inOutCubic */
      [0.770, 0.000, 0.175, 1.000],
      /* inOutQuart */
      [0.860, 0.000, 0.070, 1.000],
      /* inOutQuint */
      [0.445, 0.050, 0.550, 0.950],
      /* inOutSine */
      [1.000, 0.000, 0.000, 1.000],
      /* inOutExpo */
      [0.785, 0.135, 0.150, 0.860],
      /* inOutCirc */
      [0.680, -0.550, 0.265, 1.550],
      /* inOutBack */
      function (a, p) {
        return function (t) {
          return t < .5 ? elastic(a, p)(t * 2) / 2 : 1 - elastic(a, p)(t * -2 + 2) / 2;
        };
      }
      /* inOutElastic */
      ]
    };
    var eases = {
      linear: [0.250, 0.250, 0.750, 0.750]
    };

    var loop = function (coords) {
      curves[coords].forEach(function (ease, i) {
        eases['ease' + coords + names[i]] = ease;
      });
    };

    for (var coords in curves) loop(coords);

    return eases;
  }();

  function parseEasings(easing, duration) {
    if (is$1.fnc(easing)) {
      return easing;
    }

    var name = easing.split('(')[0];
    var ease = penner[name];
    var args = parseEasingParameters(easing);

    switch (name) {
      case 'spring':
        return spring(easing, duration);

      case 'cubicBezier':
        return applyArguments(bezier, args);

      case 'steps':
        return applyArguments(steps, args);

      default:
        return is$1.fnc(ease) ? applyArguments(ease, args) : applyArguments(bezier, ease);
    }
  } // Strings


  function selectString(str) {
    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch (e) {
      return;
    }
  } // Arrays


  function filterArray(arr, callback) {
    var len = arr.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    var result = [];

    for (var i = 0; i < len; i++) {
      if (i in arr) {
        var val = arr[i];

        if (callback.call(thisArg, val, i, arr)) {
          result.push(val);
        }
      }
    }

    return result;
  }

  function flattenArray(arr) {
    return arr.reduce(function (a, b) {
      return a.concat(is$1.arr(b) ? flattenArray(b) : b);
    }, []);
  }

  function toArray(o) {
    if (is$1.arr(o)) {
      return o;
    }

    if (is$1.str(o)) {
      o = selectString(o) || o;
    }

    if (o instanceof NodeList || o instanceof HTMLCollection) {
      return [].slice.call(o);
    }

    return [o];
  }

  function arrayContains(arr, val) {
    return arr.some(function (a) {
      return a === val;
    });
  } // Objects


  function cloneObject(o) {
    var clone = {};

    for (var p in o) {
      clone[p] = o[p];
    }

    return clone;
  }

  function replaceObjectProps(o1, o2) {
    var o = cloneObject(o1);

    for (var p in o1) {
      o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    }

    return o;
  }

  function mergeObjects(o1, o2) {
    var o = cloneObject(o1);

    for (var p in o2) {
      o[p] = is$1.und(o1[p]) ? o2[p] : o1[p];
    }

    return o;
  } // Colors


  function rgbToRgba(rgbValue) {
    var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
  }

  function hexToRgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(" + r + "," + g + "," + b + ",1)";
  }

  function hslToRgba(hslValue) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1], 10) / 360;
    var s = parseInt(hsl[2], 10) / 100;
    var l = parseInt(hsl[3], 10) / 100;
    var a = hsl[4] || 1;

    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }

      if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }

      if (t < 1 / 2) {
        return q;
      }

      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }

      return p;
    }

    var r, g, b;

    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
  }

  function colorToRgb(val) {
    if (is$1.rgb(val)) {
      return rgbToRgba(val);
    }

    if (is$1.hex(val)) {
      return hexToRgba(val);
    }

    if (is$1.hsl(val)) {
      return hslToRgba(val);
    }
  } // Units


  function getUnit(val) {
    var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);

    if (split) {
      return split[2];
    }
  }

  function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') {
      return 'px';
    }

    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) {
      return 'deg';
    }
  } // Values


  function getFunctionValue(val, animatable) {
    if (!is$1.fnc(val)) {
      return val;
    }

    return val(animatable.target, animatable.id, animatable.total);
  }

  function getAttribute(el, prop) {
    return el.getAttribute(prop);
  }

  function convertPxToUnit(el, value, unit) {
    var valueUnit = getUnit(value);

    if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) {
      return value;
    }

    var cached = cache.CSS[value + unit];

    if (!is$1.und(cached)) {
      return cached;
    }

    var baseline = 100;
    var tempEl = document.createElement(el.tagName);
    var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
    parentEl.appendChild(tempEl);
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;
    var factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    var convertedUnit = factor * parseFloat(value);
    cache.CSS[value + unit] = convertedUnit;
    return convertedUnit;
  }

  function getCSSValue(el, prop, unit) {
    if (prop in el.style) {
      var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
      return unit ? convertPxToUnit(el, value, unit) : value;
    }
  }

  function getAnimationType(el, prop) {
    if (is$1.dom(el) && !is$1.inp(el) && (getAttribute(el, prop) || is$1.svg(el) && el[prop])) {
      return 'attribute';
    }

    if (is$1.dom(el) && arrayContains(validTransforms, prop)) {
      return 'transform';
    }

    if (is$1.dom(el) && prop !== 'transform' && getCSSValue(el, prop)) {
      return 'css';
    }

    if (el[prop] != null) {
      return 'object';
    }
  }

  function getElementTransforms(el) {
    if (!is$1.dom(el)) {
      return;
    }

    var str = el.style.transform || '';
    var reg = /(\w+)\(([^)]*)\)/g;
    var transforms = new Map();
    var m;

    while (m = reg.exec(str)) {
      transforms.set(m[1], m[2]);
    }

    return transforms;
  }

  function getTransformValue(el, propName, animatable, unit) {
    var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
    var value = getElementTransforms(el).get(propName) || defaultVal;

    if (animatable) {
      animatable.transforms.list.set(propName, value);
      animatable.transforms['last'] = propName;
    }

    return unit ? convertPxToUnit(el, value, unit) : value;
  }

  function getOriginalTargetValue(target, propName, unit, animatable) {
    switch (getAnimationType(target, propName)) {
      case 'transform':
        return getTransformValue(target, propName, animatable, unit);

      case 'css':
        return getCSSValue(target, propName, unit);

      case 'attribute':
        return getAttribute(target, propName);

      default:
        return target[propName] || 0;
    }
  }

  function getRelativeValue(to, from) {
    var operator = /^(\*=|\+=|-=)/.exec(to);

    if (!operator) {
      return to;
    }

    var u = getUnit(to) || 0;
    var x = parseFloat(from);
    var y = parseFloat(to.replace(operator[0], ''));

    switch (operator[0][0]) {
      case '+':
        return x + y + u;

      case '-':
        return x - y + u;

      case '*':
        return x * y + u;
    }
  }

  function validateValue(val, unit) {
    if (is$1.col(val)) {
      return colorToRgb(val);
    }

    var originalUnit = getUnit(val);
    var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    return unit && !/\s/g.test(val) ? unitLess + unit : unitLess;
  } // getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
  // adapted from https://gist.github.com/SebLambla/3e0550c496c236709744


  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCircleLength(el) {
    return Math.PI * 2 * getAttribute(el, 'r');
  }

  function getRectLength(el) {
    return getAttribute(el, 'width') * 2 + getAttribute(el, 'height') * 2;
  }

  function getLineLength(el) {
    return getDistance({
      x: getAttribute(el, 'x1'),
      y: getAttribute(el, 'y1')
    }, {
      x: getAttribute(el, 'x2'),
      y: getAttribute(el, 'y2')
    });
  }

  function getPolylineLength(el) {
    var points = el.points;
    var totalLength = 0;
    var previousPos;

    for (var i = 0; i < points.numberOfItems; i++) {
      var currentPos = points.getItem(i);

      if (i > 0) {
        totalLength += getDistance(previousPos, currentPos);
      }

      previousPos = currentPos;
    }

    return totalLength;
  }

  function getPolygonLength(el) {
    var points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
  } // Path animation


  function getTotalLength(el) {
    if (el.getTotalLength) {
      return el.getTotalLength();
    }

    switch (el.tagName.toLowerCase()) {
      case 'circle':
        return getCircleLength(el);

      case 'rect':
        return getRectLength(el);

      case 'line':
        return getLineLength(el);

      case 'polyline':
        return getPolylineLength(el);

      case 'polygon':
        return getPolygonLength(el);
    }
  }

  function setDashoffset(el) {
    var pathLength = getTotalLength(el);
    el.setAttribute('stroke-dasharray', pathLength);
    return pathLength;
  } // Motion path


  function getParentSvgEl(el) {
    var parentEl = el.parentNode;

    while (is$1.svg(parentEl)) {
      parentEl = parentEl.parentNode;

      if (!is$1.svg(parentEl.parentNode)) {
        break;
      }
    }

    return parentEl;
  }

  function getParentSvg(pathEl, svgData) {
    var svg = svgData || {};
    var parentSvgEl = svg.el || getParentSvgEl(pathEl);
    var rect = parentSvgEl.getBoundingClientRect();
    var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
    var width = rect.width;
    var height = rect.height;
    var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
    return {
      el: parentSvgEl,
      viewBox: viewBox,
      x: viewBox[0] / 1,
      y: viewBox[1] / 1,
      w: width / viewBox[2],
      h: height / viewBox[3]
    };
  }

  function getPath(path, percent) {
    var pathEl = is$1.str(path) ? selectString(path)[0] : path;
    var p = percent || 100;
    return function (property) {
      return {
        property: property,
        el: pathEl,
        svg: getParentSvg(pathEl),
        totalLength: getTotalLength(pathEl) * (p / 100)
      };
    };
  }

  function getPathProgress(path, progress) {
    function point(offset) {
      if (offset === void 0) offset = 0;
      var l = progress + offset >= 1 ? progress + offset : 0;
      return path.el.getPointAtLength(l);
    }

    var svg = getParentSvg(path.el, path.svg);
    var p = point();
    var p0 = point(-1);
    var p1 = point(+1);

    switch (path.property) {
      case 'x':
        return (p.x - svg.x) * svg.w;

      case 'y':
        return (p.y - svg.y) * svg.h;

      case 'angle':
        return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  } // Decompose value


  function decomposeValue(val, unit) {
    var rgx = /-?\d*\.?\d+/g;
    var value = validateValue(is$1.pth(val) ? val.totalLength : val, unit) + '';
    return {
      original: value,
      numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
      strings: is$1.str(val) || unit ? value.split(rgx) : []
    };
  } // Animatables


  function parseTargets(targets) {
    var targetsArray = targets ? flattenArray(is$1.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
    return filterArray(targetsArray, function (item, pos, self) {
      return self.indexOf(item) === pos;
    });
  }

  function getAnimatables(targets) {
    var parsed = parseTargets(targets);
    return parsed.map(function (t, i) {
      return {
        target: t,
        id: i,
        total: parsed.length,
        transforms: {
          list: getElementTransforms(t)
        }
      };
    });
  } // Properties


  function normalizePropertyTweens(prop, tweenSettings) {
    var settings = cloneObject(tweenSettings); // Override duration if easing is a spring

    if (/^spring/.test(settings.easing)) {
      settings.duration = spring(settings.easing);
    }

    if (is$1.arr(prop)) {
      var l = prop.length;
      var isFromTo = l === 2 && !is$1.obj(prop[0]);

      if (!isFromTo) {
        // Duration divided by the number of tweens
        if (!is$1.fnc(tweenSettings.duration)) {
          settings.duration = tweenSettings.duration / l;
        }
      } else {
        // Transform [from, to] values shorthand to a valid tween value
        prop = {
          value: prop
        };
      }
    }

    var propArray = is$1.arr(prop) ? prop : [prop];
    return propArray.map(function (v, i) {
      var obj = is$1.obj(v) && !is$1.pth(v) ? v : {
        value: v
      }; // Default delay value should only be applied to the first tween

      if (is$1.und(obj.delay)) {
        obj.delay = !i ? tweenSettings.delay : 0;
      } // Default endDelay value should only be applied to the last tween


      if (is$1.und(obj.endDelay)) {
        obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
      }

      return obj;
    }).map(function (k) {
      return mergeObjects(k, settings);
    });
  }

  function flattenKeyframes(keyframes) {
    var propertyNames = filterArray(flattenArray(keyframes.map(function (key) {
      return Object.keys(key);
    })), function (p) {
      return is$1.key(p);
    }).reduce(function (a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }

      return a;
    }, []);
    var properties = {};

    var loop = function (i) {
      var propName = propertyNames[i];
      properties[propName] = keyframes.map(function (key) {
        var newKey = {};

        for (var p in key) {
          if (is$1.key(p)) {
            if (p == propName) {
              newKey.value = key[p];
            }
          } else {
            newKey[p] = key[p];
          }
        }

        return newKey;
      });
    };

    for (var i = 0; i < propertyNames.length; i++) loop(i);

    return properties;
  }

  function getProperties(tweenSettings, params) {
    var properties = [];
    var keyframes = params.keyframes;

    if (keyframes) {
      params = mergeObjects(flattenKeyframes(keyframes), params);
    }

    for (var p in params) {
      if (is$1.key(p)) {
        properties.push({
          name: p,
          tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
      }
    }

    return properties;
  } // Tweens


  function normalizeTweenValues(tween, animatable) {
    var t = {};

    for (var p in tween) {
      var value = getFunctionValue(tween[p], animatable);

      if (is$1.arr(value)) {
        value = value.map(function (v) {
          return getFunctionValue(v, animatable);
        });

        if (value.length === 1) {
          value = value[0];
        }
      }

      t[p] = value;
    }

    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
  }

  function normalizeTweens(prop, animatable) {
    var previousTween;
    return prop.tweens.map(function (t) {
      var tween = normalizeTweenValues(t, animatable);
      var tweenValue = tween.value;
      var to = is$1.arr(tweenValue) ? tweenValue[1] : tweenValue;
      var toUnit = getUnit(to);
      var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
      var previousValue = previousTween ? previousTween.to.original : originalValue;
      var from = is$1.arr(tweenValue) ? tweenValue[0] : previousValue;
      var fromUnit = getUnit(from) || getUnit(originalValue);
      var unit = toUnit || fromUnit;

      if (is$1.und(to)) {
        to = previousValue;
      }

      tween.from = decomposeValue(from, unit);
      tween.to = decomposeValue(getRelativeValue(to, from), unit);
      tween.start = previousTween ? previousTween.end : 0;
      tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
      tween.easing = parseEasings(tween.easing, tween.duration);
      tween.isPath = is$1.pth(tweenValue);
      tween.isColor = is$1.col(tween.from.original);

      if (tween.isColor) {
        tween.round = 1;
      }

      previousTween = tween;
      return tween;
    });
  } // Tween progress


  var setProgressValue = {
    css: function (t, p, v) {
      return t.style[p] = v;
    },
    attribute: function (t, p, v) {
      return t.setAttribute(p, v);
    },
    object: function (t, p, v) {
      return t[p] = v;
    },
    transform: function (t, p, v, transforms, manual) {
      transforms.list.set(p, v);

      if (p === transforms.last || manual) {
        var str = '';
        transforms.list.forEach(function (value, prop) {
          str += prop + "(" + value + ") ";
        });
        t.style.transform = str;
      }
    }
  }; // Set Value helper

  function setTargetsValue(targets, properties) {
    var animatables = getAnimatables(targets);
    animatables.forEach(function (animatable) {
      for (var property in properties) {
        var value = getFunctionValue(properties[property], animatable);
        var target = animatable.target;
        var valueUnit = getUnit(value);
        var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
        var unit = valueUnit || getUnit(originalValue);
        var to = getRelativeValue(validateValue(value, unit), originalValue);
        var animType = getAnimationType(target, property);
        setProgressValue[animType](target, property, to, animatable.transforms, true);
      }
    });
  } // Animations


  function createAnimation(animatable, prop) {
    var animType = getAnimationType(animatable.target, prop.name);

    if (animType) {
      var tweens = normalizeTweens(prop, animatable);
      var lastTween = tweens[tweens.length - 1];
      return {
        type: animType,
        property: prop.name,
        animatable: animatable,
        tweens: tweens,
        duration: lastTween.end,
        delay: tweens[0].delay,
        endDelay: lastTween.endDelay
      };
    }
  }

  function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(function (animatable) {
      return properties.map(function (prop) {
        return createAnimation(animatable, prop);
      });
    })), function (a) {
      return !is$1.und(a);
    });
  } // Create Instance


  function getInstanceTimings(animations, tweenSettings) {
    var animLength = animations.length;

    var getTlOffset = function (anim) {
      return anim.timelineOffset ? anim.timelineOffset : 0;
    };

    var timings = {};
    timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) {
      return getTlOffset(anim) + anim.duration;
    })) : tweenSettings.duration;
    timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) {
      return getTlOffset(anim) + anim.delay;
    })) : tweenSettings.delay;
    timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) {
      return getTlOffset(anim) + anim.duration - anim.endDelay;
    })) : tweenSettings.endDelay;
    return timings;
  }

  var instanceID = 0;

  function createNewInstance(params) {
    var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    var properties = getProperties(tweenSettings, params);
    var animatables = getAnimatables(params.targets);
    var animations = getAnimations(animatables, properties);
    var timings = getInstanceTimings(animations, tweenSettings);
    var id = instanceID;
    instanceID++;
    return mergeObjects(instanceSettings, {
      id: id,
      children: [],
      animatables: animatables,
      animations: animations,
      duration: timings.duration,
      delay: timings.delay,
      endDelay: timings.endDelay
    });
  } // Core


  var activeInstances = [];
  var pausedInstances = [];
  var raf;

  var engine = function () {
    function play() {
      raf = requestAnimationFrame(step);
    }

    function step(t) {
      var activeInstancesLength = activeInstances.length;

      if (activeInstancesLength) {
        var i = 0;

        while (i < activeInstancesLength) {
          var activeInstance = activeInstances[i];

          if (!activeInstance.paused) {
            activeInstance.tick(t);
          } else {
            var instanceIndex = activeInstances.indexOf(activeInstance);

            if (instanceIndex > -1) {
              activeInstances.splice(instanceIndex, 1);
              activeInstancesLength = activeInstances.length;
            }
          }

          i++;
        }

        play();
      } else {
        raf = cancelAnimationFrame(raf);
      }
    }

    return play;
  }();

  function handleVisibilityChange() {
    if (document.hidden) {
      activeInstances.forEach(function (ins) {
        return ins.pause();
      });
      pausedInstances = activeInstances.slice(0);
      activeInstances = [];
    } else {
      pausedInstances.forEach(function (ins) {
        return ins.play();
      });
    }
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  } // Public Instance


  function anime(params) {
    if (params === void 0) params = {};
    var startTime = 0,
        lastTime = 0,
        now = 0;
    var children,
        childrenLength = 0;
    var resolve = null;

    function makePromise(instance) {
      var promise = window.Promise && new Promise(function (_resolve) {
        return resolve = _resolve;
      });
      instance.finished = promise;
      return promise;
    }

    var instance = createNewInstance(params);
    var promise = makePromise(instance);

    function toggleInstanceDirection() {
      var direction = instance.direction;

      if (direction !== 'alternate') {
        instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
      }

      instance.reversed = !instance.reversed;
      children.forEach(function (child) {
        return child.reversed = instance.reversed;
      });
    }

    function adjustTime(time) {
      return instance.reversed ? instance.duration - time : time;
    }

    function resetTime() {
      startTime = 0;
      lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
    }

    function seekCild(time, child) {
      if (child) {
        child.seek(time - child.timelineOffset);
      }
    }

    function syncInstanceChildren(time) {
      if (!instance.reversePlayback) {
        for (var i = 0; i < childrenLength; i++) {
          seekCild(time, children[i]);
        }
      } else {
        for (var i$1 = childrenLength; i$1--;) {
          seekCild(time, children[i$1]);
        }
      }
    }

    function setAnimationsProgress(insTime) {
      var i = 0;
      var animations = instance.animations;
      var animationsLength = animations.length;

      while (i < animationsLength) {
        var anim = animations[i];
        var animatable = anim.animatable;
        var tweens = anim.tweens;
        var tweenLength = tweens.length - 1;
        var tween = tweens[tweenLength]; // Only check for keyframes if there is more than one tween

        if (tweenLength) {
          tween = filterArray(tweens, function (t) {
            return insTime < t.end;
          })[0] || tween;
        }

        var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
        var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
        var strings = tween.to.strings;
        var round = tween.round;
        var numbers = [];
        var toNumbersLength = tween.to.numbers.length;
        var progress = void 0;

        for (var n = 0; n < toNumbersLength; n++) {
          var value = void 0;
          var toNumber = tween.to.numbers[n];
          var fromNumber = tween.from.numbers[n] || 0;

          if (!tween.isPath) {
            value = fromNumber + eased * (toNumber - fromNumber);
          } else {
            value = getPathProgress(tween.value, eased * toNumber);
          }

          if (round) {
            if (!(tween.isColor && n > 2)) {
              value = Math.round(value * round) / round;
            }
          }

          numbers.push(value);
        } // Manual Array.reduce for better performances


        var stringsLength = strings.length;

        if (!stringsLength) {
          progress = numbers[0];
        } else {
          progress = strings[0];

          for (var s = 0; s < stringsLength; s++) {
            var a = strings[s];
            var b = strings[s + 1];
            var n$1 = numbers[s];

            if (!isNaN(n$1)) {
              if (!b) {
                progress += n$1 + ' ';
              } else {
                progress += n$1 + b;
              }
            }
          }
        }

        setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
        anim.currentValue = progress;
        i++;
      }
    }

    function setCallback(cb) {
      if (instance[cb] && !instance.passThrough) {
        instance[cb](instance);
      }
    }

    function countIteration() {
      if (instance.remaining && instance.remaining !== true) {
        instance.remaining--;
      }
    }

    function setInstanceProgress(engineTime) {
      var insDuration = instance.duration;
      var insDelay = instance.delay;
      var insEndDelay = insDuration - instance.endDelay;
      var insTime = adjustTime(engineTime);
      instance.progress = minMax(insTime / insDuration * 100, 0, 100);
      instance.reversePlayback = insTime < instance.currentTime;

      if (children) {
        syncInstanceChildren(insTime);
      }

      if (!instance.began && instance.currentTime > 0) {
        instance.began = true;
        setCallback('begin');
        setCallback('loopBegin');
      }

      if (insTime <= insDelay && instance.currentTime !== 0) {
        setAnimationsProgress(0);
      }

      if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
        setAnimationsProgress(insDuration);
      }

      if (insTime > insDelay && insTime < insEndDelay) {
        if (!instance.changeBegan) {
          instance.changeBegan = true;
          instance.changeCompleted = false;
          setCallback('changeBegin');
        }

        setCallback('change');
        setAnimationsProgress(insTime);
      } else {
        if (instance.changeBegan) {
          instance.changeCompleted = true;
          instance.changeBegan = false;
          setCallback('changeComplete');
        }
      }

      instance.currentTime = minMax(insTime, 0, insDuration);

      if (instance.began) {
        setCallback('update');
      }

      if (engineTime >= insDuration) {
        lastTime = 0;
        countIteration();

        if (instance.remaining) {
          startTime = now;
          setCallback('loopComplete');
          setCallback('loopBegin');

          if (instance.direction === 'alternate') {
            toggleInstanceDirection();
          }
        } else {
          instance.paused = true;

          if (!instance.completed) {
            instance.completed = true;
            setCallback('loopComplete');
            setCallback('complete');

            if (!instance.passThrough && 'Promise' in window) {
              resolve();
              promise = makePromise(instance);
            }
          }
        }
      }
    }

    instance.reset = function () {
      var direction = instance.direction;
      instance.passThrough = false;
      instance.currentTime = 0;
      instance.progress = 0;
      instance.paused = true;
      instance.began = false;
      instance.changeBegan = false;
      instance.completed = false;
      instance.changeCompleted = false;
      instance.reversePlayback = false;
      instance.reversed = direction === 'reverse';
      instance.remaining = instance.loop;
      children = instance.children;
      childrenLength = children.length;

      for (var i = childrenLength; i--;) {
        instance.children[i].reset();
      }

      if (instance.reversed && instance.loop !== true || direction === 'alternate' && instance.loop === 1) {
        instance.remaining++;
      }

      setAnimationsProgress(0);
    }; // Set Value helper


    instance.set = function (targets, properties) {
      setTargetsValue(targets, properties);
      return instance;
    };

    instance.tick = function (t) {
      now = t;

      if (!startTime) {
        startTime = now;
      }

      setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
    };

    instance.seek = function (time) {
      setInstanceProgress(adjustTime(time));
    };

    instance.pause = function () {
      instance.paused = true;
      resetTime();
    };

    instance.play = function () {
      if (!instance.paused) {
        return;
      }

      if (instance.completed) {
        instance.reset();
      }

      instance.paused = false;
      activeInstances.push(instance);
      resetTime();

      if (!raf) {
        engine();
      }
    };

    instance.reverse = function () {
      toggleInstanceDirection();
      resetTime();
    };

    instance.restart = function () {
      instance.reset();
      instance.play();
    };

    instance.reset();

    if (instance.autoplay) {
      instance.play();
    }

    return instance;
  } // Remove targets from animation


  function removeTargetsFromAnimations(targetsArray, animations) {
    for (var a = animations.length; a--;) {
      if (arrayContains(targetsArray, animations[a].animatable.target)) {
        animations.splice(a, 1);
      }
    }
  }

  function removeTargets(targets) {
    var targetsArray = parseTargets(targets);

    for (var i = activeInstances.length; i--;) {
      var instance = activeInstances[i];
      var animations = instance.animations;
      var children = instance.children;
      removeTargetsFromAnimations(targetsArray, animations);

      for (var c = children.length; c--;) {
        var child = children[c];
        var childAnimations = child.animations;
        removeTargetsFromAnimations(targetsArray, childAnimations);

        if (!childAnimations.length && !child.children.length) {
          children.splice(c, 1);
        }
      }

      if (!animations.length && !children.length) {
        instance.pause();
      }
    }
  } // Stagger helpers


  function stagger(val, params) {
    if (params === void 0) params = {};
    var direction = params.direction || 'normal';
    var easing = params.easing ? parseEasings(params.easing) : null;
    var grid = params.grid;
    var axis = params.axis;
    var fromIndex = params.from || 0;
    var fromFirst = fromIndex === 'first';
    var fromCenter = fromIndex === 'center';
    var fromLast = fromIndex === 'last';
    var isRange = is$1.arr(val);
    var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
    var val2 = isRange ? parseFloat(val[1]) : 0;
    var unit = getUnit(isRange ? val[1] : val) || 0;
    var start = params.start || 0 + (isRange ? val1 : 0);
    var values = [];
    var maxValue = 0;
    return function (el, i, t) {
      if (fromFirst) {
        fromIndex = 0;
      }

      if (fromCenter) {
        fromIndex = (t - 1) / 2;
      }

      if (fromLast) {
        fromIndex = t - 1;
      }

      if (!values.length) {
        for (var index = 0; index < t; index++) {
          if (!grid) {
            values.push(Math.abs(fromIndex - index));
          } else {
            var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            var toX = index % grid[0];
            var toY = Math.floor(index / grid[0]);
            var distanceX = fromX - toX;
            var distanceY = fromY - toY;
            var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (axis === 'x') {
              value = -distanceX;
            }

            if (axis === 'y') {
              value = -distanceY;
            }

            values.push(value);
          }

          maxValue = Math.max.apply(Math, values);
        }

        if (easing) {
          values = values.map(function (val) {
            return easing(val / maxValue) * maxValue;
          });
        }

        if (direction === 'reverse') {
          values = values.map(function (val) {
            return axis ? val < 0 ? val * -1 : -val : Math.abs(maxValue - val);
          });
        }
      }

      var spacing = isRange ? (val2 - val1) / maxValue : val1;
      return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
    };
  } // Timeline


  function timeline(params) {
    if (params === void 0) params = {};
    var tl = anime(params);
    tl.duration = 0;

    tl.add = function (instanceParams, timelineOffset) {
      var tlIndex = activeInstances.indexOf(tl);
      var children = tl.children;

      if (tlIndex > -1) {
        activeInstances.splice(tlIndex, 1);
      }

      function passThrough(ins) {
        ins.passThrough = true;
      }

      for (var i = 0; i < children.length; i++) {
        passThrough(children[i]);
      }

      var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
      insParams.targets = insParams.targets || params.targets;
      var tlDuration = tl.duration;
      insParams.autoplay = false;
      insParams.direction = tl.direction;
      insParams.timelineOffset = is$1.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
      passThrough(tl);
      tl.seek(insParams.timelineOffset);
      var ins = anime(insParams);
      passThrough(ins);
      children.push(ins);
      var timings = getInstanceTimings(children, params);
      tl.delay = timings.delay;
      tl.endDelay = timings.endDelay;
      tl.duration = timings.duration;
      tl.seek(0);
      tl.reset();

      if (tl.autoplay) {
        tl.play();
      }

      return tl;
    };

    return tl;
  }

  anime.version = '3.0.1';
  anime.speed = 1;
  anime.running = activeInstances;
  anime.remove = removeTargets;
  anime.get = getOriginalTargetValue;
  anime.set = setTargetsValue;
  anime.convertPx = convertPxToUnit;
  anime.path = getPath;
  anime.setDashoffset = setDashoffset;
  anime.stagger = stagger;
  anime.timeline = timeline;
  anime.easing = parseEasings;
  anime.penner = penner;

  anime.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var Utils$1 = {
    isObject: function isObject(o) {
      return _typeof(o) === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var to = Object(arguments.length <= 0 ? undefined : arguments[0]);

      for (var i = 1; i < arguments.length; i += 1) {
        var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));

          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (Utils$1.isObject(to[nextKey]) && Utils$1.isObject(nextSource[nextKey])) {
                Utils$1.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils$1.isObject(to[nextKey]) && Utils$1.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils$1.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }
  };

  function startHeroSlideAnimation(slide, func) {
    var leftLine = slide.querySelector('.hero-slider__left-line');
    var rightLine = slide.querySelector('.hero-slider__right-line');
    var image = slide.querySelector('.hero-slider__img');
    var text = slide.querySelector('.hero-slider__inner');
    var transformStyle = window.getComputedStyle(leftLine).transform;
    leftLine.style.transform = transformStyle;
    rightLine.style.transform = transformStyle;
    var animation = anime.timeline({
      autoplay: false,
      complete: func
    });
    animation.add({
      targets: slide,
      translateX: {
        // value: [-1579, 0],
        value: ['-100%', 0],
        easing: 'spring(1, 100, 20, 0)'
      },
      opacity: {
        value: [0, 1],
        easing: 'cubicBezier(.25, .1, .25, 1)',
        duration: 400
      }
    }).add({
      // Заголовки
      targets: text,
      translateX: [-160, 0],
      scale: [1.3, 1],
      easing: 'spring(1, 100, 20, 0)'
    }, 200).add({
      // Правая полоска
      targets: rightLine,
      translateX: {
        value: [-670, 0],
        easing: 'spring(1, 100, 20, 0)'
      },
      opacity: {
        value: [0, 1],
        easing: 'cubicBezier(.25, .1, .25, 1)',
        duration: 300
      }
    }, 300).add({
      // Левая полоска
      targets: leftLine,
      translateX: {
        value: [-670, 0],
        easing: 'spring(1, 100, 20, 0)'
      },
      opacity: {
        value: [0, 1],
        easing: 'cubicBezier(.25, .1, .25, 1)',
        duration: 300
      }
    }, 400).add({
      targets: image,
      translateX: {
        value: [-110, 0],
        easing: 'spring(1, 100, 20, 0)'
      },
      opacity: {
        value: [0, 1],
        easing: 'cubicBezier(.25, .1, .25, 1)',
        duration: 300
      }
    }, 800); // animation
    //   .add({
    //     targets: image,
    //     translateX: {
    //       value: 112,
    //       easing: 'linear',
    //     },
    //     duration: 11420,
    //   });

    return animation;
  }

  var HeroSliderEffect = {
    init: function init() {
      // const animations = [];
      var swiper = this;
      var slides = swiper.slides;
      swiper.heroSliderEffect.animationsArray = Array.from(slides).map(function (el) {
        return {
          start: startHeroSlideAnimation(el, function () {
            return swiper.emit('transitionEnd');
          }),
          second: anime({
            autoplay: false,
            duration: swiper.params.heroSliderEffect.duration,
            easing: 'easeInOutQuad',
            targets: el.querySelector('.hero-slider__img'),
            translateX: [0, '5%'],
            complete: function complete() {
              // console.log('sdfsdf');
              swiper.slideNext();
            }
          })
        };
      });
      swiper.heroSliderEffect.animationsArray[0].start.play();
    },
    setTranslate: function setTranslate(translate) {
      console.log("setTranslate, active:".concat(this.activeIndex, ", prev: ").concat(this.previousIndex, ", translate: ").concat(translate));
      var swiper = this;
      var slides = swiper.slides; //
      // // if (swiper.animations.length === 0) {
      // //
      // // }

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) tx -= swiper.translate;

        if (!swiper.isHorizontal()) {
          tx = 0;
        } // const slideOpacity = swiper.params.fadeEffect.crossFade
        //   ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
        //   : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);


        var slideOpacity = 1 + Math.min(Math.max($slideEl[0].progress, -1), 0); // console.log($slideEl[0].progress);
        //
        // $slideEl
        //   .css({
        //     opacity: slideOpacity,
        //   })
        //   .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
      }
    },
    setTransition: function setTransition(duration) {
      console.log("setTransition, active:".concat(this.activeIndex, ", prev: ").concat(this.previousIndex)); //
      // const swiper = this;
      // const { slides, $wrapperEl } = swiper;
      //
      // for (let i = 0; i < slides.length; i += 1) {
      //   // this.animateSlide[i].reset();
      //   swiper.heroSliderEffect.animationsArray[i].start.seek(0);
      //
      //   if (i === swiper.activeIndex) {
      //     swiper.heroSliderEffect.animationsArray[i].start.play();
      //     // this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
      //   } else if (i === swiper.previousIndex) {
      //     swiper.heroSliderEffect.animationsArray[i].start.seek(swiper.heroSliderEffect.animationsArray[i].start.duration);
      //   }
      // }
      // slides.transition(duration);
      // if (swiper.params.virtualTranslate && duration !== 0) {
      //   let eventTriggered = false;
      //   slides.transitionEnd(() => {
      //     if (eventTriggered) return;
      //     if (!swiper || swiper.destroyed) return;
      //     eventTriggered = true;
      //     swiper.animating = false;
      //     const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
      //     for (let i = 0; i < triggerEvents.length; i += 1) {
      //       $wrapperEl.trigger(triggerEvents[i]);
      //     }
      //   });
      // }
    },
    setTransitionStart: function setTransitionStart() {
      // console.log(`transitionStart, active:${this.activeIndex}, prev: ${this.previousIndex}`);
      var swiper = this;
      var slides = swiper.slides;
      var bullets = swiper.pagination.bullets;

      for (var i = 0; i < slides.length; i += 1) {
        // this.animateSlide[i].reset();
        var $line = bullets.eq(i).find('.hero-slider-control__loader-line');
        $line.transition(300);
        $line.removeClass('active');
        var slideAnim = swiper.heroSliderEffect.animationsArray[i]; // console.log(slideAnim);

        slideAnim.start.seek(0);
        slideAnim.second.pause();

        if (i === swiper.activeIndex) {
          slideAnim.start.play(); // this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
        } else if (i === swiper.previousIndex) {
          slideAnim.start.seek(slideAnim.start.duration);
        }
      }
    },
    setTransitionEnd: function setTransitionEnd() {
      // console.log(`transitionEnd, active:${this.activeIndex}, prev: ${this.previousIndex}`);
      var swiper = this;
      var slides = swiper.slides;
      var bullets = swiper.pagination.bullets;

      for (var i = 0; i < slides.length; i += 1) {
        // this.animateSlide[i].reset();
        // swiper.heroSliderEffect.animationsArray[i].end.seek(0);
        // anime();
        //
        var $line = bullets.eq(i).find('.hero-slider-control__loader-line');
        $line.transition(swiper.params.heroSliderEffect.duration);
        var slideAnim = swiper.heroSliderEffect.animationsArray[i];
        slideAnim.second.pause(); // console.log(slideAnim.second.completed);

        slideAnim.second.seek(0);

        if (i === swiper.activeIndex) {
          // slideAnim.second.seek(0);
          slideAnim.second.play();
          $line.addClass('active'); // this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
        } else if (i === swiper.previousIndex) ;
      }
    }
  };
  var HeaderSlider = {
    name: 'effect-hero-slider',
    params: {
      heroSliderEffect: {
        duration: 10000,
        animationsArray: [] // crossFade: false,

      }
    },
    create: function create() {
      var swiper = this;
      Utils$1.extend(swiper, {
        heroSliderEffect: {
          init: HeroSliderEffect.init.bind(swiper),
          setTranslate: HeroSliderEffect.setTranslate.bind(swiper),
          setTransition: HeroSliderEffect.setTransition.bind(swiper),
          setTransitionStart: HeroSliderEffect.setTransitionStart.bind(swiper),
          setTransitionEnd: HeroSliderEffect.setTransitionEnd.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'hero-slider') return;
        swiper.heroSliderEffect.animationsArray = [];
        swiper.classNames.push("".concat(swiper.params.containerModifierClass, "fade"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        }; // Utils.extend(swiper.animations, animations);

        Utils$1.extend(swiper.params, overwriteParams);
        Utils$1.extend(swiper.originalParams, overwriteParams);
      },
      // init() {
      //   const swiper = this;
      //   if (swiper.params.effect !== 'hero-slider') return;
      //   console.log(this.slides);
      // },
      // setTranslate(translate) {
      //   const swiper = this;
      //   if (swiper.params.effect !== 'hero-slider') return;
      //   swiper.heroSliderEffect.setTranslate(translate);
      // },
      // setTransition(duration) {
      //   const swiper = this;
      //   if (swiper.params.effect !== 'hero-slider') return;
      //   swiper.heroSliderEffect.setTransition(duration);
      // },
      init: function init() {
        var swiper = this;
        if (swiper.params.effect !== 'hero-slider') return;
        swiper.heroSliderEffect.init();
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.effect !== 'hero-slider') return;
        swiper.heroSliderEffect.setTransitionStart();
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.effect !== 'hero-slider') return;
        swiper.heroSliderEffect.setTransitionEnd();
      }
    }
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var ymaps_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function getNsParamValue(url) {
    var results = RegExp('[\\?&]ns=([^&#]*)').exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  exports.default = {
    load: function load(src) {
      src = src || 'https://api-maps.yandex.ru/2.1/?lang=en_RU';
      this.promise = this.promise || new Promise(function (resolve, reject) {
        var elem = document.createElement('script');
        elem.type = 'text/javascript';
        elem.src = src;
        elem.onload = resolve;

        elem.onerror = function (e) {
          return reject(e);
        };

        document.body.appendChild(elem);
      }).then(function () {
        var ns = getNsParamValue(src);

        if (ns && ns !== 'ymaps') {
          (0, eval)('var ymaps = ' + ns + ';');
        }

        return new Promise(function (resolve) {
          if (!commonjsGlobal.ymaps) {
            throw new Error('Failed to find ymaps in the global scope');
          }

          if (!commonjsGlobal.ymaps.ready) {
            throw new Error('ymaps.ready is missing');
          }

          return ymaps.ready(resolve);
        });
      });
      return this.promise;
    }
  };
  });

  var ymaps$1 = unwrapExports(ymaps_1);

  function initMap(el, param, data) {
    if (!el || el === '') return;

    var init = function init(maps) {
      // Создание карты.
      var mainPageMap = new maps.Map(el, param);
      var objectManager = new maps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
      });
      var templateBalloonLayout = maps.templateLayoutFactory.createClass("<div class=\"map-balloon \">\n        <div class=\"map-balloon__inner\">\n          $[[options.contentLayout observeSize]]\n        </div>\n      </div>", {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function build() {
          this.constructor.superclass.build.call(this);
          this.$element = $('.map-balloon', this.getParentElement());
          this.applyElementOffset(); // this.$element.find('.close')
          //   .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function clear() {
          // this._$element.find('.close')
          //   .off('click');
          this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function onSublayoutSizeChange() {
          templateBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this.isElement(this.$element)) {
            return;
          }

          this.applyElementOffset();
          this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function applyElementOffset() {
          this.$element.css({
            left: -(this.$element[0].offsetWidth / 2) // top: -(this._$element[0].offsetHeight),
            // top: -(this._$element[0].offsetHeight / 2),

          });
        },
        // /**
        //  * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
        //  * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
        //  * @function
        //  * @name onCloseClick
        //  */
        // onCloseClick: function (e) {
        //   e.preventDefault();
        //
        //   this.events.fire('userclose');
        // },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function getShape() {
          if (!this.isElement(this.$element)) {
            return templateBalloonLayout.superclass.getShape.call(this);
          }

          var position = this.$element.position();
          return new maps.shape.Rectangle(new maps.geometry.pixel.Rectangle([[position.left, position.top], [position.left + this.$element[0].offsetWidth, 0]]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        isElement: function isElement(element) {
          return element && element[0];
        }
      });
      var templateBalloonContentLayout = maps.templateLayoutFactory.createClass("\n        <div class=\"map-balloon__address\">{{ properties.address }}</div>\n        <div class=\"map-balloon__tel\">{{ properties.tel }}</div>\n        <div class=\"map-balloon__scheme\">{{ properties.link }}</div>");
      objectManager.objects.options.set({
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/marker.svg',
        // Размеры метки.
        iconImageSize: [58, 74],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-29, -74],
        balloonShadow: false,
        balloonLayout: templateBalloonLayout,
        balloonContentLayout: templateBalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        // balloonContentLayout: balloonLayout
        // Не скрываем иконку при открытом балуне.
        hideIconOnBalloonOpen: false,
        // И дополнительно смещаем балун, для открытия над иконкой.
        balloonOffset: [40, 15]
      });
      objectManager.objects.events.add('balloonopen', function (e) {
        e.get('target').options.set('iconImageHref', 'img/marker-selected.svg');
      }).add('balloonclose', function (e) {
        e.get('target').options.set('iconImageHref', 'img/marker.svg');
      });
      mainPageMap.geoObjects.add(objectManager);
      objectManager.add(data);
    };

    ymaps$1.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(init).catch(function (error) {
      return console.log('Failed to load Yandex Maps', error);
    });
  }

  initMap(document.querySelector('#map'), {
    center: [55.76, 37.64],
    zoom: 7,
    controls: []
  }, {
    type: 'Feature',
    id: 0,
    geometry: {
      type: 'Point',
      coordinates: [55.76, 37.64]
    },
    properties: {
      address: 'ул. Невзоровых, 64к2',
      tel: '8 (920) 028-20-44',
      link: 'Схема проезда'
    }
  });

  Swiper.use([navigation, pagination, scrollbar, effectFade, autoplay, mousewheel, virtual]);
  Swiper.use([HeaderSlider]);

  function initMain() {
    var mainHeroSliderEl = document.querySelector('.hero-slider');
    var mainStarSliderEl = document.querySelector('#stars-slider');
    var mainBestArticlesEl = document.querySelector('.best-articles__slider');
    var $mainSetSliderEl = $('.set-block__slider'); // document.addEventListener('scroll', () => {
    //   const mainStarSliderScrollbarRect = mainStarSliderScrollbarEl.getBoundingClientRect();
    //
    //   if (mainStarSliderScrollbarRect.top < 300) {
    //     if (!mainStarSliderScrollbarFixed) {
    //       mainStarSliderScrollbarEl.style.position = 'fixed';
    //       mainStarSliderScrollbarEl.style.left = `${ mainStarSliderScrollbarRect.left }px`;
    //       mainStarSliderScrollbarEl.style.top = `${ mainStarSliderScrollbarRect.top }px`;
    //       mainStarSliderScrollbarFixed = true;
    //     }
    //   } else {
    //     if (mainStarSliderScrollbarFixed) {
    //       mainStarSliderScrollbarEl.style.position = '';
    //       mainStarSliderScrollbarEl.style.left = '';
    //       mainStarSliderScrollbarEl.style.top = '';
    //       mainStarSliderScrollbarFixed = false;
    //     }
    //   }
    // });

    var mainStarSliderScrollbarEl = mainStarSliderEl.querySelector('.slider__scrollbar'); // let mainStarSliderScrollbarFixed = false;
    // const menu = document.querySelector('.menu');

    var menuPosition = mainStarSliderScrollbarEl.getBoundingClientRect(); // window.addEventListener('scroll', () => {
    //   if (window.pageYOffset >= menuPosition.top) {
    //     mainStarSliderScrollbarEl.style.position = 'fixed';
    //     mainStarSliderScrollbarEl.style.top = '300px';
    //     mainStarSliderScrollbarEl.style.left = `${ menuPosition.left }px`;
    //   } else {
    //     mainStarSliderScrollbarEl.style.position = '';
    //     mainStarSliderScrollbarEl.style.top = '';
    //     mainStarSliderScrollbarEl.style.left = '';
    //   }
    // });

    var sticky = new Sticky('#stars-slider .slider__controls'); // const sticky = new Sticky('#stars-slider .slider__scrollbar');

    $mainSetSliderEl.owlCarousel({
      loop: true,
      items: 1,
      center: true,
      autoWidth: true,
      // stagePadding: 10,
      nav: false,
      dots: false,
      margin: 10,
      navContainerClass: 'slider-nav',
      navText: ["<svg width=\"17\" height=\"10\" viewBox=\"0 0 17 10\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.5 5.96968L7.5 5.96968L7.5 9.5498L0 5.21968L7.5 0.88955L7.5 4.46968L16.5 4.46968L16.5 5.96968Z\"/>\n      </svg>", "<svg width=\"17\" height=\"10\" viewBox=\"0 0 17 10\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.5 3.96978L9.5 3.96978L9.5 0.389649L17 4.71978L9.5 9.0499L9.5 5.46978L0.5 5.46978L0.5 3.96978Z\"/>\n      </svg>"],
      navClass: ['btn slider-nav__button slider-nav__button_left', 'btn slider-nav__button slider-nav__button_right'],
      responsive: {
        768: {
          autoWidth: false,
          center: false,
          margin: 0,
          nav: true
        }
      }
    });
    var mainHeroSlider = new Swiper(mainHeroSliderEl, {
      touchEventsTarget: 'wrapper',
      effect: 'hero-slider',
      // runCallbacksOnInit: false,
      // watchSlidesVisibility: true,
      // resistance: false,
      // loop: true,
      // speed: 0,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      //   waitForTransition: false,
      // },
      containerModifierClass: 'slider_',
      slideClass: 'slider__slide',
      slideBlankClass: 'slider__slide_invisible-blank',
      slideActiveClass: 'slider__slide_active',
      slideDuplicateActiveClass: 'slider__slide_duplicate-active',
      slideVisibleClass: 'slider__slide_visible',
      slideDuplicateClass: 'slider__slide_duplicate',
      slideNextClass: 'slider__slide_next',
      slideDuplicateNextClass: 'slider__slide_duplicate-next',
      slidePrevClass: 'slider__slide_prev',
      slideDuplicatePrevClass: 'slider__slide_duplicate-prev',
      wrapperClass: 'slider__wrapper',
      // heroSliderEffect: {
      //   duration: 1000,
      // },
      pagination: {
        el: '.hero-slider-control',
        clickable: true,
        bulletClass: 'hero-slider-control__item',
        bulletActiveClass: 'active',
        renderBullet: function renderBullet(index, className) {
          return "\n            <div class=\"".concat(className, "\">\n              <div class=\"hero-slider-control__title\">").concat(this.slides[index].querySelector('.hero-slider__title').innerHTML, "</div>\n              <div class=\"hero-slider-control__loader\">\n                <div class=\"hero-slider-control__loader-line\"></div>\n              </div>\n            </div>");
        }
      }
    });

    if (document.documentElement.clientWidth >= 768) {
      var mainStarSlider = new Swiper(mainStarSliderEl, {
        slidesPerView: 'auto',
        freeMode: true,
        // freeModeMomentum: false,
        // freeModeSticky: false,
        touchEventsTarget: 'wrapper',
        containerModifierClass: 'slider_',
        slideClass: 'slider__slide',
        slideBlankClass: 'slider__slide_invisible-blank',
        slideActiveClass: 'slider__slide_active',
        slideDuplicateActiveClass: 'slider__slide_duplicate-active',
        slideVisibleClass: 'slider__slide_visible',
        slideDuplicateClass: 'slider__slide_duplicate',
        slideNextClass: 'slider__slide_next',
        slideDuplicateNextClass: 'slider__slide_duplicate-next',
        slidePrevClass: 'slider__slide_prev',
        slideDuplicatePrevClass: 'slider__slide_duplicate-prev',
        wrapperClass: 'slider__wrapper',
        mousewheel: {
          forceToAxis: true,
          invert: true,
          releaseOnEdges: true
        },
        scrollbar: {
          el: '.slider__scrollbar',
          hide: false,
          draggable: true,
          dragSize: 80,
          dragClass: 'slider__track',
          snapOnRelease: false
        },
        on: {
          setTranslate: function setTranslate(arg) {
            // if (document.documentElement.clientWidth > 768) {
            arg = arg / 90 + 1;
            if (arg < 0) arg = 0;
            if (arg > 1) arg = 1;
            document.querySelector('.stars__info').style.opacity = arg;
            this.el.querySelector('.slider__explanation_tablet').style.opacity = arg;
            this.el.querySelector('.slider__explanation_desktop').style.opacity = arg; // }
          },
          touchStart: function touchStart() {
            this.scrollbar.el.classList.add('active');
          },
          scrollbarDragStart: function scrollbarDragStart() {
            this.scrollbar.el.classList.add('active');
          },
          touchEnd: function touchEnd() {
            this.scrollbar.el.classList.remove('active');
          },
          scrollbarDragEnd: function scrollbarDragEnd() {
            this.scrollbar.el.classList.remove('active');
          }
        }
      });
      var mainBestArticles = new Swiper(mainBestArticlesEl, {
        slidesPerView: 'auto',
        freeMode: true,
        // freeModeMomentum: false,
        // spaceBetween: 24,
        touchEventsTarget: 'wrapper',
        containerModifierClass: 'slider_',
        slideClass: 'slider__slide',
        slideBlankClass: 'slider__slide_invisible-blank',
        slideActiveClass: 'slider__slide_active',
        slideDuplicateActiveClass: 'slider__slide_duplicate-active',
        slideVisibleClass: 'slider__slide_visible',
        slideDuplicateClass: 'slider__slide_duplicate',
        slideNextClass: 'slider__slide_next',
        slideDuplicateNextClass: 'slider__slide_duplicate-next',
        slidePrevClass: 'slider__slide_prev',
        slideDuplicatePrevClass: 'slider__slide_duplicate-prev',
        wrapperClass: 'slider__wrapper',
        mousewheel: {
          forceToAxis: true,
          invert: true,
          releaseOnEdges: true
        },
        scrollbar: {
          el: '.slider__scrollbar',
          hide: false,
          draggable: true,
          dragSize: 80,
          dragClass: 'slider__track',
          snapOnRelease: false
        },
        breakpointsInverse: true,
        breakpoints: {
          on: {
            setTranslate: function setTranslate(arg) {
              // if (document.documentElement.clientWidth > 768) {
              arg = arg / 90 + 1;
              if (arg < 0) arg = 0;
              if (arg > 1) arg = 1;
              this.el.querySelector('.slider__explanation_tablet').style.opacity = arg;
              this.el.querySelector('.slider__explanation_desktop').style.opacity = arg; // }
            },
            touchStart: function touchStart() {
              this.scrollbar.el.classList.add('active');
            },
            scrollbarDragStart: function scrollbarDragStart() {
              this.scrollbar.el.classList.add('active');
            },
            touchEnd: function touchEnd() {
              this.scrollbar.el.classList.remove('active');
            },
            scrollbarDragEnd: function scrollbarDragEnd() {
              this.scrollbar.el.classList.remove('active');
            }
          }
        }
      });
    }
  }

  $(document).ready(function () {
    console.log('webpack');
    $('[data-fancybox]').fancybox({
      closeExisting: true
    });
    Header();
    Input();
    var bodyClass = document.body.classList;

    if (bodyClass.contains('main')) {
      initMain();
    }
  });

}));