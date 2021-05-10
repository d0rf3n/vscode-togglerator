// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "togglerator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('togglerator.toggle', () => {
		const activeEditor = vscode.window.activeTextEditor
		if (!activeEditor) {
			vscode.window.showErrorMessage('No active editor.')
			return;
		}

		const textLine = activeEditor.document.lineAt(activeEditor.selection.active.line);
		console.log(activeEditor.selection.active.line);
		
		var tags : string[] = ["TODO","DONE"];

		const tagsConfig : string = vscode.workspace.getConfiguration('togglerator').get('tags')!
		if (tagsConfig) {
			tags = tagsConfig.split(';');
		}


		const regex = new RegExp('(' + tags.join('|') + ')');
		const words = textLine.text.match(regex);

		if (!words) {
			vscode.window.showErrorMessage('Line contains nothing to toggle.');
			return;
		}

		// vscode.window.showInformationMessage(word[0]);

		// at least the current line is retained
		var newLineText : string = textLine.text

		for (let i = 0; i < tags.length; i++) {
			if (tags[i] == words[0]) {
				newLineText = textLine.text.replace(words[0],tags[i == tags.length-1 ? 0 : i+1]);
				break;
			}
		}

		// if (words[0] == 'TODO') {
		// 	newLineText = textLine.text.replace(/TODO/,'WAIT')
		// } else if (words[0] == 'WAIT') {
		// 	newLineText = textLine.text.replace(/WAIT/,'DONE')
		// } else if (words[0] == 'DONE') {
		// 	newLineText = textLine.text.replace(/DONE/,'TODO')
		// }
		// vscode.window.showInformationMessage(newLineText);
		activeEditor.edit(editBuilder => {
			editBuilder.replace(textLine.range, newLineText)
		})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
