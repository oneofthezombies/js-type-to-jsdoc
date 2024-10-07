const vscode = require("vscode");
const { Project, SyntaxKind } = require("ts-morph");

/** @type {Set<string>} */
const filePathSet = new Set();

/**
 * @param {vscode.ExtensionContext} extensionContext
 */
function activate(extensionContext) {
  import("@oneofthezombies/type-anno").then((typeAnno) => {
    extensionContext.subscriptions.push(
      vscode.languages.registerDocumentFormattingEditProvider("javascript", {
        provideDocumentFormattingEdits(document, options, token) {
          return new Promise((resolve) => {
            (async () => {
              const a = options;
              const b = token;
              const filePath = document.uri.fsPath;
              try {
                if (filePathSet.has(filePath)) {
                  return;
                }

                filePathSet.add(filePath);

                const project = new Project({
                  useInMemoryFileSystem: true,
                  compilerOptions: {
                    allowJs: true,
                    checkJs: false,
                  },
                });

                const fileContent = document.getText();
                const sourceFile = project.createSourceFile(
                  filePath,
                  fileContent,
                  {
                    overwrite: true,
                  }
                );

                const edit = new vscode.WorkspaceEdit();
                const fullRange = new vscode.Range(
                  document.positionAt(0),
                  document.positionAt(fileContent.length)
                );
                const transformedCode = sourceFile.getFullText();
                edit.replace(document.uri, fullRange, transformedCode);
                await vscode.workspace.applyEdit(edit);
              } catch (error) {
                vscode.window.showErrorMessage(error);
              } finally {
                filePathSet.delete(filePath);
                resolve(null);
              }
            })();
          });
        },
      })
    );
  });
}

/**
 * aaa
 * @param {number} a
 * bbbb
 * ccccc
 */
function deactivate(a) {}

module.exports = {
  activate,
  deactivate,
};
