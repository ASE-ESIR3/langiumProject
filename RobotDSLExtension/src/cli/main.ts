import type { programNode } from '../semantics/nodes/programNode.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { MyDslLanguageMetaData } from '../language/generated/module.js';
import { createMyDslServices } from '../language/my-dsl-module.js';
import { extractAstNode } from './cli-util.js';
import { generateJavaScript } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import { interpreter } from '../semantics/interpreter.js';
import { compiler } from '../semantics/compiler.js';
import { readFileSync, writeFileSync } from 'fs';
//import { PrintVisitor } from '../semantics/visitor.js';



function concatenateStandardWithFile(fileName: string,globalOut:string = ""){
    
    var standard:string = readFileSync('src/standardLib/standard.rbtdsl', 'utf8');
    var file:string = readFileSync(fileName, 'utf8');
    //write in output file
    var output:string = standard.concat(file);
    writeFileSync(globalOut, output);


}


export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const globalOutputFile = 'outGenerated.rbtdsl';
    const services = createMyDslServices(NodeFileSystem).MyDsl;
    concatenateStandardWithFile(fileName,globalOutputFile);
    const model = await extractAstNode<programNode>(globalOutputFile, services);
    const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    const fileExtensions = MyDslLanguageMetaData.fileExtensions.join(', ');
    program
        .command('compile')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`).argument('<destination>', `destination folder`)
        .description('compile the code to arduino code')
        .action(async (fileName: string,destination:string) => {
            const globalOutputFile = 'outGenerated.rbtdsl';
            concatenateStandardWithFile(fileName,globalOutputFile);
            const services = createMyDslServices(NodeFileSystem).MyDsl;
            const model = await extractAstNode<programNode>(globalOutputFile, services);
            compiler.compile(model,destination);

        });


    program
        .command('interpret')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('interprets the source file')
        .action(async (fileName: string) => {
            const services = createMyDslServices(NodeFileSystem).MyDsl;
            const model = await extractAstNode<programNode>(fileName, services);
            interpreter.interpret(model);

        });

    program.parse(process.argv);
}


