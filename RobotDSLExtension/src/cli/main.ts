import type { programNode } from '../semantics/visitor.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { MyDslLanguageMetaData } from '../language/generated/module.js';
import { createMyDslServices } from '../language/my-dsl-module.js';
import { extractAstNode } from './cli-util.js';
import { generateJavaScript } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import { interpreter } from '../semantics/interpreter.js';
//import { PrintVisitor } from '../semantics/visitor.js';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createMyDslServices(NodeFileSystem).MyDsl;
    const model = await extractAstNode<programNode>(fileName, services);
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
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);


    program
        .command('print')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('prints the AST of a source file')
        .action(async (fileName: string) => {
            const services = createMyDslServices(NodeFileSystem).MyDsl;
            const model = await extractAstNode<programNode>(fileName, services);
            interpreter.interpret(model);

        });

    program.parse(process.argv);
}
