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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./src/storage.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n// Run this snippet each time any of the projects are clicked on passing in the clicked project name as the argument\n// It will cycle through and display the associated ones;\n\n\nvar currentTasks = ((0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.filterTasks)('cow'));\n\nconsole.log(currentTasks);\n\n\n  \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://odin-todo/./src/index.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"filterTasks\": () => (/* binding */ filterTasks)\n/* harmony export */ });\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ \"./src/task.js\");\n\n// All functions relating to saving and fetching from localStorage\n\n// Sample Data \nvar makeBed = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('make bed', 'Make the bloody bed yeah!');\nvar postShorts = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('post shorts', 'Return shorts to Surfdome');\nvar goWalk = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('go walking', 'go for a bloody nice walk', 'cow');\nvar fixToilet = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('fix toilet', 'fix the fucking toilet');\nvar shoutLoud = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('shout loud', 'shout as loud as I can', 'cow');\n\nconst allTasks = [makeBed, postShorts, goWalk, fixToilet, shoutLoud];\n\nallTasks.forEach(saveTask);\n\n\n// Stores individual task in localStorage.\nfunction saveTask(task) {\n  window.localStorage.setItem(`${task.title}`, JSON.stringify(task));\n}\n\n// Fetches and returns all tasks in array.\nfunction fetchAll() {\n  const fetchedTasks = [];\n  for (var i = 0; i < localStorage.length; i++) {\n    var obj = JSON.parse(localStorage.getItem( localStorage.key( i )));\n    fetchedTasks.push(obj);\n  };\n  return fetchedTasks;\n}\n\nfunction filterTasks(projectName) {\n  var allTasks = fetchAll();\n  var relatedTasks = [];\n  for (var task of allTasks) {\n    if (task.project === projectName) {\n      relatedTasks.push(task);\n      }\n    };\n  return relatedTasks;\n};\n\n\n\n\n\n//# sourceURL=webpack://odin-todo/./src/storage.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"task\": () => (/* binding */ task)\n/* harmony export */ });\nconst task = (title, description, project = \"default\", dueDate, priority, ) => {\n  var completed = false;\n  return { title, description, completed, dueDate, priority, project };\n}\n\n\n\n//# sourceURL=webpack://odin-todo/./src/task.js?");

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