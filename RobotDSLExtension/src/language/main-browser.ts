import { AstNode, EmptyFileSystem, LangiumServices, URI, startLanguageServer } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createMyDslServices } from './my-dsl-module.js';
import { interpreter } from '../semantics/interpreter.js';
import { programNode } from '../semantics/nodes/programNode.js';
//import { interpreter } from '../semantics/interpreter.js';

// additional imports

async function extractAstNodeFromString<T extends AstNode>(content: string, services: LangiumServices): Promise<T> {
  // create a document from a string instead of a file
  const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://minilogo.document'));
  // proceed with build & validation
  await services.shared.workspace.DocumentBuilder.build([doc], { validation: true });
  // get the parse result (root of our AST)
  return doc.parseResult?.value as T;
}

declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared,MyDsl} = createMyDslServices({ connection, ...EmptyFileSystem });
console.log("started language server");

startLanguageServer(shared);

connection.onNotification('browser/execute', async params => {
    console.log("received execute notification");
    console.log(params);
    const doc = await extractAstNodeFromString<programNode>(params.content,MyDsl);
    console.log("starting interpretation");
    //MyDsl.shared.workspace.DocumentBuilder.build([doc], { validation: true });
    const statements = interpreter.interpret(doc);
    /*var statements = [
        { type: 'Forward', Value: 100 },
        { type: 'Rotate', Value: (300 as Number) },
        { type: 'Forward', Value: 100 },
        { type: 'Rotate', Value: (300 as Number) },
        { type: 'Forward', Value: 100 },
        { type: 'Rotate', Value: (300 as Number) }
      ]*/
    console.log(statements);
    connection.sendNotification('browser/sendStatements', statements);
});