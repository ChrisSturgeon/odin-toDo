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

/***/ "./src/domEvents.js":
/*!**************************!*\
  !*** ./src/domEvents.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectBtns\": () => (/* binding */ projectBtns),\n/* harmony export */   \"test\": () => (/* binding */ test)\n/* harmony export */ });\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ \"./src/projects.js\");\n\n\n\n\nfunction projectBtns() {\n  var content = document.getElementById('sideBar');\n  for (var project of (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectNames)()) {\n    var btn = document.createElement('button');\n    btn.innerText = project;\n    btn.setAttribute('value', project);\n    btn.addEventListener('click', testPrint);\n    content.appendChild(btn);\n  };\n};\n\nfunction testPrint() {\n  var project = (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.fetchProject) ( this.value );\n}\n\nfunction test() {\n  console.log('test');\n}\n\n//# sourceURL=webpack://odin-todo/./src/domEvents.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n/* harmony import */ var _sampleData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sampleData */ \"./src/sampleData.js\");\n/* harmony import */ var _domEvents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domEvents.js */ \"./src/domEvents.js\");\n\n\n\n\n\n(0,_sampleData__WEBPACK_IMPORTED_MODULE_2__.sampleData)();\n\n(0,_domEvents_js__WEBPACK_IMPORTED_MODULE_3__.test)();\n\n(0,_domEvents_js__WEBPACK_IMPORTED_MODULE_3__.projectBtns)();\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://odin-todo/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchProject\": () => (/* binding */ fetchProject),\n/* harmony export */   \"project\": () => (/* binding */ project),\n/* harmony export */   \"projectNames\": () => (/* binding */ projectNames),\n/* harmony export */   \"saveProject\": () => (/* binding */ saveProject)\n/* harmony export */ });\n\n// Project obj factory function.\nfunction project() {\n  var arr = [];\n  function addTask(task) {\n    this.arr.push(task);\n  }\n  return { arr, addTask }\n};\n\n// Saves project in local storage.\nfunction saveProject(key, value) {\n  window.localStorage.setItem(`${key}`, JSON.stringify(value));\n}\n\n// Retrieves project from local storage and adds methods.\nfunction fetchProject(name) {\n  project = JSON.parse(window.localStorage.getItem(name));\n  project.addTask = function(name) {\n    this.arr.push(name)\n  };\n\n  project.removeTask = function(name) {\n    this.arr = this.arr.filter(task => task['title'] !== name); \n  }\n    console.log(project);\n    return project;\n  };\n\n// Returns array of project names in local storage.\nfunction projectNames() {\n  var nameArr = [];\n  for (var i = 0; i < localStorage.length; i++) {\n    nameArr.push((localStorage.key(i)));\n  };\n  return nameArr;\n}\n\n\n\n\n\n\n//# sourceURL=webpack://odin-todo/./src/projects.js?");

/***/ }),

/***/ "./src/sampleData.js":
/*!***************************!*\
  !*** ./src/sampleData.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sampleData\": () => (/* binding */ sampleData)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n\n\n\n\n\nfunction sampleData() {\n  if (localStorage.length == 0) {\n    console.log('Local storage empty, loading sample data...')\n\n    // Create example projects\n    var cleaning = (0,_projects__WEBPACK_IMPORTED_MODULE_0__.project)();\n    var coding = (0,_projects__WEBPACK_IMPORTED_MODULE_0__.project)();\n\n    // Cleaning sample data\n    cleaning.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('bathroom', 'low'));\n    cleaning.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('kitchen', 'high'));\n    cleaning.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('bedroom', 'medium'));\n    cleaning.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('garage', 'medium'));\n    (0,_projects__WEBPACK_IMPORTED_MODULE_0__.saveProject)('cleaning', cleaning);\n\n    // Coding sample data\n    coding.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('refactor', 'low'));\n    coding.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('style', 'low'));\n    coding.addTask((0,_tasks_js__WEBPACK_IMPORTED_MODULE_1__.task)('bug hunt', 'medium'));\n    (0,_projects__WEBPACK_IMPORTED_MODULE_0__.saveProject)('coding', coding);\n\n  };\n};\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://odin-todo/./src/sampleData.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"task\": () => (/* binding */ task)\n/* harmony export */ });\nfunction task(title, priority) {\n  return {title, priority}\n}\n\n\n//# sourceURL=webpack://odin-todo/./src/tasks.js?");

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