(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{119:function(e,t,a){"use strict";a.r(t);var o={load:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"//api-maps.yandex.ru/2.1/?lang=en_RU";return this.promise||(this.promise=new Promise(function(t,a){var o=document.createElement("script");o.onload=t,o.onerror=a,o.type="text/javascript",o.src=e,document.body.appendChild(o)}).then(function(){var t,a=null===(t=e.match(/[\\?&]ns=([^&#]*)/))?"":decodeURIComponent(t[1].replace(/\+/g," "));return a&&"ymaps"!==a&&(0,eval)("var ymaps = ".concat(a,";")),new Promise(function(e){return ymaps.ready(e)})})),this.promise}};function n(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}a.d(t,"default",function(){return r});var l,C,i,r=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.app;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),a&&""!==a&&(this.el=t,this.data=a.storeManagerData,this.map=null,this.yandexMap=null,this.objectManager=null,this.loadMapApi())}var t,a,l;return t=e,l=[{key:"getFeatureCollection",value:function(e){var t={type:"FeatureCollection",features:[]};return t.features=Object.keys(e).map(function(t){var a=e[t];return{type:"Feature",id:a.id,geometry:{type:"Point",coordinates:a.coords.split(",").map(function(e){return parseFloat(e)})},properties:{address:a.name,tel:a.phone[0],link:"Схема проезда",cityId:a.city}}}),t}}],(a=[{key:"createMap",value:function(){var t=this;this.map=new this.yandexMap.Map(this.el,{center:[55.76,37.64],zoom:7,controls:[]}),this.objectManager=new this.yandexMap.ObjectManager({clusterize:!0}),this.template={iconLayout:this.yandexMap.templateLayoutFactory.createClass(e.defaultOptions.template.icon),iconActiveLayout:this.yandexMap.templateLayoutFactory.createClass(e.defaultOptions.template.iconActive),balloonLayout:this.yandexMap.templateLayoutFactory.createClass(e.defaultOptions.template.balloon),balloonContentLayout:this.yandexMap.templateLayoutFactory.createClass(e.defaultOptions.template.balloonContent)},this.objectManager.clusters.options.set("preset","islands#redClusterIcons"),this.objectManager.objects.options.set({hasHint:!1,iconLayout:this.template.iconLayout,iconOffset:[-29,-75],iconShape:{type:"Rectangle",coordinates:[[0,0],[58,75]]},balloonPanelMaxMapArea:0,balloonShadow:!1,balloonAutoPan:!1,hideIconOnBalloonOpen:!1,balloonOffset:[-64,15],balloonLayout:this.template.balloonLayout,balloonContentLayout:this.template.balloonContentLayout}),this.objectManager.objects.events.add("balloonopen",function(e){t.objectManager.objects.setObjectOptions(e.get("objectId"),{iconLayout:t.template.iconActiveLayout})}).add("balloonclose",function(e){t.objectManager.objects.setObjectOptions(e.get("objectId"),{iconLayout:t.template.iconLayout})}).add("click",function(e){t.objectManager.objects.balloon.isOpen(e.get("objectId"))&&t.objectManager.objects.balloon.close()}),this.map.geoObjects.add(this.objectManager),this.objectManager.add(e.getFeatureCollection(this.data.stores)),this.objectManager.setFilter(function(e){return e.properties.cityId===t.data.currentCityId}),this.map.setBounds(this.objectManager.getBounds(),{checkZoomRange:!0}),this.objectManager.setFilter("true"),Array.prototype.forEach.call(document.querySelectorAll("[data-marker-id]"),function(e){return e.addEventListener("click",function(e){e.preventDefault(),t.openBalloon(e.target.dataset.markerId)})})}},{key:"loadMapApi",value:function(){var e=this;o.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(function(t){e.yandexMap=t,e.createMap()}).catch(function(e){return console.error("Failed to load Yandex Maps",e)})}},{key:"openBalloon",value:function(e){var t=this.objectManager.objects.getById(e);this.objectManager.objects.balloon.open(e),this.map.panTo(t.geometry.coordinates)}}])&&n(t.prototype,a),l&&n(t,l),e}();i={map:{center:[55.76,37.64],zoom:7,controls:[]},apiUrl:"https://api-maps.yandex.ru/2.1/?lang=ru_RU",balloon:{balloonPanelMaxMapArea:0,balloonShadow:!1,balloonAutoPan:!1,hideIconOnBalloonOpen:!1,balloonOffset:[-64,15]},template:{icon:'<svg width="58" height="75" viewBox="0 0 58 75" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M58 29.376C58 45.3405 29 74.4697 29 74.4697C29 74.4697 0 45.3405 0 29.376C0 13.4115 12.9837 0.469727 29 0.469727C45.0163 0.469727 58 13.4115 58 29.376Z" fill="#F4412D"/>\n            <path d="M17.2554 31.7278L18.8788 32.8211C18.9665 33.7395 19.0981 34.7454 19.493 35.5763C19.5807 35.8387 20.0195 36.3198 20.195 36.5384C20.4582 36.8883 20.6776 37.107 20.9408 37.4131L21.7744 38.244C22.0377 38.5064 22.3448 38.8126 22.608 39.0312C23.2661 39.556 23.6171 39.8622 24.4068 40.4744C25.6353 41.3928 27.0831 42.18 28.4871 43.011C29.7594 43.7982 29.3645 43.7982 30.593 43.0547C32.6989 41.7864 33.6203 41.2616 35.5946 39.8184C36.2527 39.3374 37.6128 38.0691 38.227 37.4568C38.6219 37.0632 39.4116 36.1448 39.6748 35.6638C40.2891 34.6142 40.3329 34.483 40.3329 32.996V23.1123C39.28 22.6312 38.2709 22.1502 37.174 21.7128C33.4887 20.4008 29.3207 19.7886 25.5037 20.7507L25.9863 18.9576C26.6444 18.8702 27.5219 18.6952 28.18 18.6952C28.4432 18.6952 28.4871 18.6515 28.7503 18.6515C30.7685 18.6078 30.8124 18.6515 32.7867 18.9139L34.8049 19.3075C35.463 19.4824 36.1211 19.6136 36.7353 19.8323C38.1831 20.2696 38.929 20.532 40.3329 21.1443L42.0001 21.8878V33.5646C42.0001 34.6142 41.7369 35.0078 41.3859 35.8387C41.2982 36.1011 40.7717 36.8008 40.5962 37.0195C40.4646 37.1944 40.2891 37.3694 40.1574 37.5443C39.982 37.763 39.8942 37.8504 39.6748 38.0254C39.4993 38.2003 39.4116 38.3315 39.2361 38.5502C38.0515 39.6872 37.4812 40.1683 36.1211 41.2616C35.814 41.4803 34.761 42.2675 34.4539 42.4862C34.2784 42.6174 34.059 42.7486 33.8835 42.836C32.7867 43.5358 31.3827 44.3667 30.242 45.0227C29.4523 45.5038 29.891 45.5475 27.7851 44.323C27.0392 43.8856 26.074 43.3171 25.372 42.836C24.4507 42.2238 24.0997 42.0051 23.0906 41.2616C22.257 40.6056 21.4673 39.9496 20.6776 39.2936C20.2388 38.9 18.9226 37.4568 18.5716 37.0195C18.3961 36.8008 18.3084 36.6696 18.1768 36.451C17.0799 34.7891 17.2554 33.7832 17.2554 31.7278Z" fill="#101010"/>\n            <path d="M18.9226 32.8655L18.089 32.297C17.2554 31.7285 17.2554 31.7285 17.2554 31.7285C16.4218 31.2037 16.2024 31.1162 15.4565 30.4602C15.2811 30.329 15.1933 30.1978 15.0617 30.0229C14.3158 29.1045 14.0526 28.9295 14.2281 27.9674C14.272 27.7925 14.3597 27.5738 14.4036 27.3989C14.6229 27.049 14.6668 26.6554 14.8423 26.2618L15.4127 24.9498C15.4565 24.8623 15.5004 24.8186 15.5443 24.6874C15.632 24.5125 15.7198 24.3813 15.8075 24.2063C16.3779 23.0255 16.2901 23.3317 16.9482 22.3258C17.2992 21.801 19.1419 19.5706 19.6684 19.0021C19.8 18.8271 19.8878 18.7397 20.0194 18.6085C20.1071 18.521 20.151 18.521 20.1949 18.4335L20.7214 17.8213C21.5111 16.8591 21.6427 16.7279 22.3447 15.6346C22.7396 15.0223 23.7925 13.3605 24.2751 12.9669C24.5823 12.7045 24.8455 12.5295 25.2404 12.4421C25.5913 12.3546 26.1617 12.3109 26.5566 12.2671C27.083 12.2234 27.3902 12.2671 27.9166 12.3109C29.2329 12.4421 30.3297 12.5295 31.3388 13.4042C31.8653 13.8853 32.1724 14.8474 32.1724 15.5909C32.1724 15.9407 32.304 16.6405 32.0846 16.8591C31.6459 17.1653 29.8032 17.3839 29.5838 17.4277C29.189 17.4714 27.1269 17.7775 26.9514 17.6901C26.7321 17.6026 26.7321 17.5589 26.6443 17.3839L26.074 16.0282C26.0301 15.897 25.8985 15.5471 25.7668 15.6346C25.6352 15.7658 25.6352 15.897 25.6791 16.0719C25.723 16.4655 25.9423 16.9903 26.0301 17.2965C26.2933 18.2586 26.074 19.0021 26.0301 19.0895L25.1087 22.4133C24.9332 22.8943 24.4506 24.425 24.2313 24.9935C24.1874 25.1247 24.0558 25.3434 23.968 25.4746C23.4415 26.3493 22.5202 27.705 22.6957 28.8421C22.8712 29.8917 23.6609 30.4165 24.4506 30.7226C24.8016 30.8975 25.8107 31.0725 26.2056 31.1162C26.2056 31.1162 24.4945 30.5477 23.7487 29.8917C22.1692 28.4485 25.0649 24.8623 25.0649 24.8623C25.4597 24.3375 26.5566 24.2938 26.8637 24.3375C29.0135 24.6874 30.0665 26.6991 30.1103 26.8741C30.1103 26.8741 31.953 24.6874 36.6036 24.6874C38.0076 24.6874 39.8503 25.5621 40.1135 25.6933V33.5653C40.1135 34.4837 39.8941 34.921 39.4993 35.5333C38.7096 36.8015 37.4372 38.0698 36.3404 38.9445C36.121 39.1194 35.9894 39.2506 35.6384 39.5567C35.1997 39.8629 34.5854 40.4314 34.1467 40.6501L32.1285 36.3205C30.8123 36.7141 31.1633 36.6703 29.9348 36.8453C28.8819 36.9765 27.6534 36.9327 26.6004 36.6703C26.2056 36.5829 25.723 36.4517 25.2842 36.3205C21.6427 35.1834 18.9226 32.8655 18.9226 32.8655Z" fill="white"/>\n          </svg>',iconActive:'<svg width="58" height="75" viewBox="0 0 58 75" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M58 29.376C58 45.3405 29 74.4697 29 74.4697C29 74.4697 0 45.3405 0 29.376C0 13.4115 12.9837 0.469727 29 0.469727C45.0163 0.469727 58 13.4115 58 29.376Z" fill="#101010"/>\n            <path d="M17.2553 31.7278L18.8786 32.8211C18.9664 33.7395 19.098 34.7454 19.4929 35.5763C19.5806 35.8387 20.0193 36.3198 20.1948 36.5384C20.4581 36.8883 20.6775 37.107 20.9407 37.4131L21.7743 38.244C22.0375 38.5064 22.3446 38.8126 22.6079 39.0312C23.266 39.556 23.617 39.8622 24.4067 40.4744C25.6352 41.3928 27.083 42.18 28.4869 43.011C29.7593 43.7982 29.3644 43.7982 30.5929 43.0547C32.6988 41.7864 33.6202 41.2616 35.5945 39.8184C36.2526 39.3374 37.6127 38.0691 38.2269 37.4568C38.6217 37.0632 39.4115 36.1448 39.6747 35.6638C40.2889 34.6142 40.3328 34.483 40.3328 32.996V23.1123C39.2799 22.6312 38.2708 22.1502 37.1739 21.7128C33.4885 20.4008 29.3205 19.7886 25.5035 20.7507L25.9862 18.9576C26.6443 18.8702 27.5217 18.6952 28.1798 18.6952C28.4431 18.6952 28.4869 18.6515 28.7502 18.6515C30.7684 18.6078 30.8123 18.6515 32.7866 18.9139L34.8047 19.3075C35.4629 19.4824 36.121 19.6136 36.7352 19.8323C38.183 20.2696 38.9289 20.532 40.3328 21.1443L42 21.8878V33.5646C42 34.6142 41.7368 35.0078 41.3858 35.8387C41.298 36.1011 40.7716 36.8008 40.5961 37.0195C40.4644 37.1944 40.2889 37.3694 40.1573 37.5443C39.9818 37.763 39.8941 37.8504 39.6747 38.0254C39.4992 38.2003 39.4115 38.3315 39.236 38.5502C38.0514 39.6872 37.481 40.1683 36.121 41.2616C35.8138 41.4803 34.7609 42.2675 34.4538 42.4862C34.2783 42.6174 34.0589 42.7486 33.8834 42.836C32.7866 43.5358 31.3826 44.3667 30.2419 45.0227C29.4522 45.5038 29.8909 45.5475 27.785 44.323C27.0391 43.8856 26.0739 43.3171 25.3719 42.836C24.4506 42.2238 24.0996 42.0051 23.0905 41.2616C22.2569 40.6056 21.4672 39.9496 20.6774 39.2936C20.2387 38.9 18.9225 37.4568 18.5715 37.0195C18.396 36.8008 18.3083 36.6696 18.1767 36.451C17.0798 34.7891 17.2553 33.7832 17.2553 31.7278Z" fill="#F4412D"/>\n            <path d="M18.9224 32.8655L18.0888 32.297C17.2552 31.7285 17.2552 31.7285 17.2552 31.7285C16.4216 31.2037 16.2023 31.1162 15.4564 30.4602C15.2809 30.329 15.1932 30.1978 15.0616 30.0229C14.3157 29.1045 14.0525 28.9295 14.228 27.9674C14.2718 27.7925 14.3596 27.5738 14.4035 27.3989C14.6228 27.049 14.6667 26.6554 14.8422 26.2618L15.4125 24.9498C15.4564 24.8623 15.5003 24.8186 15.5442 24.6874C15.6319 24.5125 15.7197 24.3813 15.8074 24.2063C16.3778 23.0255 16.29 23.3317 16.9481 22.3258C17.2991 21.801 19.1418 19.5706 19.6683 19.0021C19.7999 18.8271 19.8877 18.7397 20.0193 18.6085C20.107 18.521 20.1509 18.521 20.1948 18.4335L20.7213 17.8213C21.511 16.8591 21.6426 16.7279 22.3446 15.6346C22.7394 15.0223 23.7924 13.3605 24.275 12.9669C24.5821 12.7045 24.8454 12.5295 25.2402 12.4421C25.5912 12.3546 26.1616 12.3109 26.5564 12.2671C27.0829 12.2234 27.39 12.2671 27.9165 12.3109C29.2327 12.4421 30.3296 12.5295 31.3387 13.4042C31.8651 13.8853 32.1723 14.8474 32.1723 15.5909C32.1723 15.9407 32.3039 16.6405 32.0845 16.8591C31.6458 17.1653 29.8031 17.3839 29.5837 17.4277C29.1889 17.4714 27.1268 17.7775 26.9513 17.6901C26.7319 17.6026 26.7319 17.5589 26.6442 17.3839L26.0738 16.0282C26.03 15.897 25.8983 15.5471 25.7667 15.6346C25.6351 15.7658 25.6351 15.897 25.679 16.0719C25.7228 16.4655 25.9422 16.9903 26.03 17.2965C26.2932 18.2586 26.0738 19.0021 26.03 19.0895L25.1086 22.4133C24.9331 22.8943 24.4505 24.425 24.2311 24.9935C24.1873 25.1247 24.0556 25.3434 23.9679 25.4746C23.4414 26.3493 22.5201 27.705 22.6956 28.8421C22.8711 29.8917 23.6608 30.4165 24.4505 30.7226C24.8015 30.8975 25.8106 31.0725 26.2055 31.1162C26.2055 31.1162 24.4944 30.5477 23.7485 29.8917C22.1691 28.4485 25.0647 24.8623 25.0647 24.8623C25.4596 24.3375 26.5564 24.2938 26.8636 24.3375C29.0134 24.6874 30.0663 26.6991 30.1102 26.8741C30.1102 26.8741 31.9529 24.6874 36.6035 24.6874C38.0075 24.6874 39.8501 25.5621 40.1134 25.6933V33.5653C40.1134 34.4837 39.894 34.921 39.4992 35.5333C38.7094 36.8015 37.4371 38.0698 36.3403 38.9445C36.1209 39.1194 35.9893 39.2506 35.6383 39.5567C35.1995 39.8629 34.5853 40.4314 34.1466 40.6501L32.1284 36.3205C30.8122 36.7141 31.1632 36.6703 29.9347 36.8453C28.8817 36.9765 27.6533 36.9327 26.6003 36.6703C26.2055 36.5829 25.7228 36.4517 25.2841 36.3205C21.6426 35.1834 18.9224 32.8655 18.9224 32.8655Z" fill="white"/>\n          </svg>',balloon:'<div class="map-balloon ">\n            <div class="map-balloon__inner">\n              $[[options.contentLayout observeSize]]\n            </div>\n          </div>',balloonContent:'<div class="map-balloon__address">{{ properties.address }}</div>\n           <div class="map-balloon__tel">{{ properties.tel }}</div>\n           <div class="map-balloon__scheme">{{ properties.link }}</div>'}},(C="defaultOptions")in(l=r)?Object.defineProperty(l,C,{value:i,enumerable:!0,configurable:!0,writable:!0}):l[C]=i}}]);