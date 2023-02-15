/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWebviewContent = void 0;
const getWebviewContent = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>To Err</title>
    </head>
    <body>
        <h1> HEY!</h1>
    </body>
    </html>`;
};
exports.getWebviewContent = getWebviewContent;


/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const toErr_1 = __webpack_require__(2);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('toErr.start', () => {
        // Create and show a new webview
        const panel = vscode.window.createWebviewPanel('toErr', // Identifies the type of the webview. Used internally
        'Start to err', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
        );
        panel.webview.html = (0, toErr_1.getWebviewContent)();
        panel.onDidDispose(() => {
            // When the panel is closed, cancel any future updates to the webview content
            console.log(`CLEARED`);
        }, null, context.subscriptions);
    }));
    vscode.languages.onDidChangeDiagnostics((diagnosticChangeEvent) => {
        const diagnostic = vscode.languages.getDiagnostics(diagnosticChangeEvent?.uris?.[0]);
    }, null, context.subscriptions);
    vscode.workspace.onDidSaveTextDocument((savedFile) => {
        console.log(`WHAAAT SAVES ${JSON.stringify(savedFile)}`);
        const diagnostic = vscode.languages.getDiagnostics(savedFile?.uri);
        console.log(`ON SAVE FUCK ${JSON.stringify(diagnostic)}`);
    }, null, context.subscriptions);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map