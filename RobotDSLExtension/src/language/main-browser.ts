import { EmptyFileSystem, startLanguageServer } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createMyDslServices } from './my-dsl-module.js';

// additional imports


declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared} = createMyDslServices({ connection, ...EmptyFileSystem });

startLanguageServer(shared);
/*
// Send a notification with the serialized AST after every document change
type DocumentChange = { uri: string, content: string, diagnostics: Diagnostic[] };
const documentChangeNotification = new NotificationType<DocumentChange>('browser/DocumentChange');
// use the built-in AST serializer
const jsonSerializer = MyDsl.serializer.JsonSerializer;
// listen on fully validated documents
shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, documents => {
    // perform this for every validated document in this build phase batch
    for (const document of documents) {
        const model = document.parseResult.value as programNode;
        let json: Command[] = [];
        
        // only generate commands if there are no errors
        if(document.diagnostics === undefined 
            || document.diagnostics.filter((i) => i.severity === 1).length === 0
            ) {
            json = generateStatements(model);
        }
        
        // inject the commands into the model
        // this is safe so long as you careful to not clobber existing properties
        // and is incredibly helpful to enrich the feedback you get from the LS per document
        (model as unknown as {$commands: Command[]}).$commands = json;

        // send the notification for this validated document,
        // with the serialized AST + generated commands as the content
        connection.sendNotification(documentChangeNotification, {
            uri: document.uri.toString(),
            content: jsonSerializer.serialize(model, { sourceText: true, textRegions: true }),
            diagnostics: document.diagnostics ?? []
        });
    }
});

export class Command {
    constructor(public name: string, public args: string[]) { }
}*/