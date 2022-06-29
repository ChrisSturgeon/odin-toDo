/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ \"./src/task.js\");\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n\n\n\nwindow.localStorage.clear();\n\nvar makeBed = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('make bed', 'Make the bloody bed yeah!');\nvar postShorts = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('post shorts', 'Return shorts to Surfdome');\nvar goWalk = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('go walking', 'go for a bloody nice walk');\nvar fixToilet = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('fix toilet', 'fix the fucking toilet');\n\nfunction saveTask(task) {\n  window.localStorage.setItem(`${task.title}`, JSON.stringify(task));\n}\n\nconst allTasks = [makeBed, postShorts, goWalk, fixToilet];\n\nallTasks.forEach(saveTask);\n\n\n\n\nfunction getTask(name) {\n  var test = JSON.parse(window.localStorage.getItem(name));\n  fetchedTasks.push(test);\n}\n\nconst fetchedTasks = [];\n\nconsole.log(localStorage.length)\n\nfor (var i = 0; i < localStorage.length; i++) {\n  var obj = JSON.parse(localStorage.getItem( localStorage.key( i )));\nfetchedTasks.push(obj);\n}\n\nconsole.log(fetchedTasks);\n\n\n\n\n\n\n// const allTasks = [JSON.stringify(makeBed), JSON.stringify(postShorts)];\n\n// function addTask() {\n//   // window.localStorage.setItem(postShorts);\n//   window.localStorage.setItem('allTasks', allTasks);\n// }\n\n\n// function clearStorage() {\n//   window.localStorage.clear();\n// }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://odin-todo/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cleanSink\": () => (/* binding */ cleanSink),\n/* harmony export */   \"project\": () => (/* binding */ project)\n/* harmony export */ });\n\nconst project = (name) => {\n  const items = [];\n  const addTask = (task) => {\n    items.push(task);\n  }\n  return { name, items, addTask };\n}\n\nvar cleanSink = project('Clean Sink');\n\n\n\n//# sourceURL=webpack://odin-todo/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"task\": () => (/* binding */ task)\n/* harmony export */ });\nconst task = (title, description, dueDate, priority, project = \"default\" ) => {\n  var completed = false;\n  return { title, description, completed, dueDate, priority, project };\n}\n\n\n\n//# sourceURL=webpack://odin-todo/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;