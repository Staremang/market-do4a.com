/* eslint-disable no-param-reassign */
// import App from '../App';

const Utils = {
  isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },

  flattenArray(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? Utils.flattenArray(b) : b), []);
  },

  /**
   * Функция, которая возвращает преобразованный массив элементов
   * @function
   * @param {Array | Node | NodeList} o - Element which position & rectangle are returned
   * @return {Array}
   */
  toArray(o) {
    if (Array.isArray(o)) return o;
    if (typeof o === 'string') o = document.querySelectorAll(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) {
      return [].slice.call(o);
    }
    return [o];
  },

  parseTargets(targets) {
    if (targets) {
      return Utils.flattenArray(
        Array.isArray(targets) ? targets.map(Utils.toArray) : Utils.toArray(targets),
      );
    }
    return [];
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
  },


  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  parseJSON(response) {
    return response.json();
  },

  /**
   * Создает элемент из строки
   *
   * @param {String} html - html-код в виде строки
   * @returns {ChildNode}
   */
  htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  /**
   * Склонение слова в зависимости от числа
   *
   * @param {Number} n - Число
   * @param {Array|String} titles - Слово или массив из форм слова [товар, товара, товаров]
   * @returns {String}
   */
  declOfNum(n, titles) {
    if (typeof titles === 'string' || titles.length !== 3) {
      return titles;
    }

    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2];
  },

  sendRequest(url, options = {}) {
    // console.log(options);
    return fetch(url, options)
      .then(Utils.checkStatus)
      .then(Utils.parseJSON)
      .then((data) => {
        if (data.success) {
          return data.data;
        }
        throw data.message;
      });
  },

  sendRequestFull(url, options = {}) {
    return fetch(url, options)
      .then(Utils.checkStatus)
      .then(Utils.parseJSON);
  },


  /**
   * Координаты элемента на странице
   * @param el
   * @returns {{top: *, left: *}}
   */
  getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top
        + (window.pageYOffset || document.documentElement.scrollTop),
      left: rect.left
        + (window.pageXOffset || document.documentElement.scrollLeft),
    };
  },

  /**
   * Плавная прокрутка к элементу
   * @param {HTMLElement} element - Элемент
   * @param {Number} duration - Длительность анимации прокрутки
   */
  scrollTo(element, duration = 1000) {
    if (!element) {
      return;
    }

    const header = document.querySelector('.h-navbar-fixed');

    window.scrollTo({
      top: Utils.getOffset(element).top - (header ? header.offsetHeight : 0),
      behavior: 'smooth',
    });
  },

  scrollToTop(to, scrollDuration = 1000) {
    var cosParameter = window.scrollY / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();

    function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) {
        window.scrollTo(0, 0);
      }
      if (window.scrollY === 0) {
        return;
      }
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  },

  sessid() {
    if (global.BX && global.BX.bitrix_sessid) {
      return global.BX.bitrix_sessid();
    }
    if (global.app && global.app.bitrix_sessid) {
      return global.app.bitrix_sessid;
    }
    return '';
  },

  log(title = '', message = '') {
    console.log(
      `%c ${title} %c ${message} %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#4D4D4D ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent',
    );
  },

  htmlspecialchars(str) {
    if (typeof str !== 'string' || !str.replace) {
      return str;
    }

    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  wrapSubstring(haystack, chunks = '', wrapTagName = 'span', escapeParts = true) {
    if (haystack.length === 0) {
      return '';
    }

    if (escapeParts) {
      haystack = this.htmlspecialchars(haystack);
      wrapTagName = this.htmlspecialchars(wrapTagName);
    }

    if (chunks.length === 0 || chunks === '') {
      return haystack;
    }

    if (typeof chunks === 'string') {
      chunks = [chunks];
    }


    // let scan = '';
    // let search = '';
    const searched = {};

    chunks.forEach((chunk) => {
      const search = chunk.toString().toLowerCase();
      const scan = haystack.toLowerCase();

      if (typeof searched[search] !== 'undefined') return;

      const i = scan.indexOf(search);

      if (i >= 0) {
        const left = haystack.slice(0, i);
        const middle = haystack.slice(i, i + search.length);
        const right = haystack.slice(i + search.length, haystack.length);

        haystack = `${left}#A#${middle}#B#${right}`;
      }

      searched[search] = true;
    });

    return haystack.replace(/#A#/g, `<${wrapTagName}>`).replace(/#B#/g, `</${wrapTagName}>`);
  },
};
export default Utils;
