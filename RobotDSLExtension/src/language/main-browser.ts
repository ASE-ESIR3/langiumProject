import { EmptyFileSystem, URI, startLanguageServer } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { MyDslServices, createMyDslServices } from './my-dsl-module.js';
import { interpreter } from '../semantics/interpreter.js';
import { programNode } from '../semantics/nodes/programNode.js';
import { MyError } from '../semantics/errors.js';
import { compiler } from '../semantics/compiler.js';
//import { interpreter } from '../semantics/interpreter.js';

// additional imports

async function extractAstNodeFromString(content: string, services: MyDslServices): Promise<any> {
  // create a document from a string instead of a file
  console.log("extractAstNodeFromString");
  const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://minilogo.document'));
  // proceed with build & validation
  console.log("proceed with build & validation");
  await services.shared.workspace.DocumentBuilder.build([doc], { validation: true});
  // get the parse result (root of our AST)
  console.log("get the parse result (root of our AST)");
  return doc;
}


function validate(document){
  const validationErrors = (document.diagnostics ?? []).filter(e => e.severity === 1);
  var errors = [];
  if (validationErrors.length > 0) {
      for (const validationError of validationErrors) {
        errors.push(new MyError(validationError.range.start.line + 1, validationError.message, document.textDocument.getText(validationError.range)));
        
      }

  }
  return errors;
}

declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared,MyDsl} = createMyDslServices({ connection, ...EmptyFileSystem });

startLanguageServer(shared);

connection.onNotification('browser/execute', async params => {
    try{
    const doc = await extractAstNodeFromString(params.content,MyDsl);
    var parsevalue = doc.parseResult?.value as programNode;
    var errors = validate(doc);
    if(errors.length > 0){
      connection.sendNotification('browser/sendValidationResults', {errorCount:errors.length,errors:errors});
      return;
    }
    var statements = []
    statements = interpreter.interpret(parsevalue);
    var typeerrors = interpreter.typeErors;
    if(typeerrors.length > 0){
      connection.sendNotification('browser/sendValidationResults', {errorCount:typeerrors.length,errors:typeerrors});
      return;
    }
    connection.sendNotification('browser/sendStatements', statements);
    }
    catch(e){
      connection.sendNotification('browser/sendValidationResults', {errorCount:errors.length,errors:errors});
    }

});

connection.onNotification('browser/Validate', async params => {

  try{
    const doc = await extractAstNodeFromString(params.content,MyDsl);
    var parsevalue = doc.parseResult?.value as programNode;
    var errors = validate(doc);
    if(errors.length > 0){
      connection.sendNotification('browser/sendValidationResults', {errorCount:errors.length,errors:errors});
      return;
    }
    interpreter.interpret(parsevalue);
    var typeerrors = interpreter.typeErors;
    if(typeerrors.length > 0){
      connection.sendNotification('browser/sendValidationResults', {errorCount:typeerrors.length,errors:typeerrors});
      return;
    }
    connection.sendNotification('browser/sendValidationResults', {errorCount:0,errors:null});
  }
  catch(e){
    connection.sendNotification('browser/sendValidationResults', {errorCount:errors.length,errors:errors});
  }
  
});

connection.onNotification('browser/compile', async params => {

  try{
    const doc = await extractAstNodeFromString(params.content,MyDsl);
    var parsevalue = doc.parseResult?.value as programNode;
    var errors = validate(doc);
    if(errors.length > 0){
      connection.sendNotification('browser/sendValidationResults', {errorCount:errors.length,errors:errors});
      return;
    }
    interpreter.interpret(parsevalue);
    var typeerrors = interpreter.typeErors;
    if(typeerrors.length > 0){
      connection.sendNotification('browser/sendValidationResults', {errorCount:typeerrors.length,errors:typeerrors});
      return;
    }
    var compiledCode = compiler.compile(parsevalue);
    connection.sendNotification('browser/sendCompiledCode', compiledCode);
    }
    catch(e){
      connection.sendNotification('browser/sendValidationResults', {errorCount:errors.length,errors:errors});
    }
});