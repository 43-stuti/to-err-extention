// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {getWebviewContent} from './toErr';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('toErr.start', () => {
		  // Create and show a new webview
			const panel = vscode.window.createWebviewPanel(
				'toErr', // Identifies the type of the webview. Used internally
				'Start to err', // Title of the panel displayed to the user
				vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				{} // Webview options. More on these later.
			);
			panel.webview.html = getWebviewContent();
			panel.onDidDispose(
				() => {
				  // When the panel is closed, cancel any future updates to the webview content
				 console.log(`CLEARED`);
				},
				null,
				context.subscriptions
			  );
		})
	  );
	vscode.languages.onDidChangeDiagnostics(
    (diagnosticChangeEvent) => {
		const diagnostic = vscode.languages.getDiagnostics(diagnosticChangeEvent?.uris?.[0]);
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidSaveTextDocument(
    (savedFile) => {
		const diagnostic = vscode.languages.getDiagnostics(savedFile?.uri);
    },
    null,
    context.subscriptions
  );
}


 
// This method is called when your extension is deactivated
export function deactivate() {}
