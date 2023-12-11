import { EmptyFileSystem, startLanguageServer } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createMyDslServices } from './my-dsl-module.js';
import { interpreter } from '../semantics/interpreter.js';
import { programNode } from '../semantics/nodes/programNode.js';
//import { interpreter } from '../semantics/interpreter.js';

// additional imports


declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared} = createMyDslServices({ connection, ...EmptyFileSystem });
console.log("started language server");

startLanguageServer(shared);

connection.onNotification('browser/execute', params => {
    console.log("received execute notification");
    console.log(params);
    const doc = shared.workspace.LangiumDocumentFactory.fromString(params.content,params.uri);
    console.log("starting interpretation");
    //MyDsl.shared.workspace.DocumentBuilder.build([doc], { validation: true });
    const statements = interpreter.interpret(doc.parseResult.value as programNode);
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