/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

eval("function slideMobile() {\n  var wrapper = document.querySelector('[data-slide=\"wrapper\"]');\n  var lista = document.querySelector('[data-slide=\"lista\"]');\n  var distFinalPosition = 0;\n  var distStartX = 0;\n  var distMovement = 0;\n  var distMovePosition = 0;\n\n  function moveSlide(distX) {\n    distMovePosition = distX;\n    lista.style.transform = \"translate3d(\".concat(distX, \"px, 0, 0)\");\n  }\n\n  function updatePosition(clientX) {\n    distMovement = (distStartX - clientX) * 1.6;\n    return distFinalPosition - distMovement;\n  }\n\n  function onStart(event) {\n    var movetype;\n\n    if (event.type === 'mousedown') {\n      event.preventDefault();\n      distStartX = event.clientX;\n      movetype = 'mousemove';\n    } else {\n      distStartX = event.changedTouches[0].clientX;\n      movetype = 'touchmove';\n    }\n\n    wrapper.addEventListener(movetype, onMove);\n  }\n\n  function onMove(event) {\n    var pointerPosition = event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;\n    var finalPosition = updatePosition(pointerPosition);\n    moveSlide(finalPosition);\n  }\n\n  function onEnd(event) {\n    var movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';\n    wrapper.removeEventListener(movetype, onMove);\n    distFinalPosition = distMovePosition;\n  }\n\n  function addSlideEvents() {\n    wrapper.addEventListener('mousedown', onStart);\n    wrapper.addEventListener('touchstart', onStart);\n    wrapper.addEventListener('mouseup', onEnd);\n    wrapper.addEventListener('touchend', onEnd);\n  }\n  /*Para o Slide funcionar somente no Mobile*/\n\n\n  function debounce(callback, delay) {\n    var timer;\n    return function () {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      if (timer) clearTimeout(timer);\n      timer = setTimeout(function () {\n        callback.apply(void 0, args);\n        timer = null;\n      }, delay);\n    };\n  }\n\n  function addWindowEvents() {\n    var debouncedIsMobile = debounce(isMobile, 200);\n    window.addEventListener('load', isMobile);\n    window.addEventListener('resize', debouncedIsMobile);\n  }\n\n  function removeSlideEvents() {\n    wrapper.removeEventListener('mousedown', onStart);\n    wrapper.removeEventListener('touchstart', onStart);\n    wrapper.removeEventListener('mouseup', onEnd);\n    wrapper.removeEventListener('touchend', onEnd);\n  }\n\n  function isMobile() {\n    var windowWidth = window.innerWidth;\n    var windowMobile = 380;\n\n    if (windowWidth < windowMobile) {\n      addSlideEvents();\n    } else {\n      removeSlideEvents();\n    }\n  }\n\n  function init() {\n    addWindowEvents();\n    /*return this;*/\n  }\n\n  init();\n  /*Para o Slide funcionar somente no Mobile*/\n}\n\nslideMobile();\n\n//# sourceURL=webpack://estudando-slide/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/script.js"]();
/******/ 	
/******/ })()
;