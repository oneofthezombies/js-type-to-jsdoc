const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  import("@oneofthezombies/type-anno").then((typeAnno) => {
    context.subscriptions.push(
      vscode.languages.registerDocumentFormattingEditProvider("javascript", {
        provideDocumentFormattingEdits(document, options, token) {
          vscode.window.showInformationMessage("called");
          return undefined;
        },
      })
    );
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
