import { EmptyFileSystem, URI, startLanguageServer } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createMyDslServices } from './my-dsl-module.js';
import { programNode } from '../semantics/nodes/programNode.js';
import { interpreter } from '../semantics/interpreter.js';
import { weaveAcceptMethods } from '../semantics/accept-weaver.js';
// additional imports


declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared, MyDsl} = createMyDslServices({ connection, ...EmptyFileSystem });
console.log("started language server");

startLanguageServer(shared);

connection.onNotification('browser/execute', params => {
    
    
    console.log("received execute notification");
    console.log(params);
    const program = params.content;
    const parseResult = shared.workspace.LangiumDocumentFactory.fromString<programNode>(program, URI.parse("memory://MyDsl.document"));
    console.log("starting interpretation");
    weaveAcceptMethods(MyDsl);
    console.log(parseResult.parseResult.value.accept);
    const statements = interpreter.interpret(parseResult.parseResult.value as programNode);
    console.log(statements);
    connection.sendNotification('browser/sendStatements', statements);
});