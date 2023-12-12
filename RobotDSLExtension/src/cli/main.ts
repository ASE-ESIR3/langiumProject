import type { programNode } from '../semantics/nodes/programNode.js';
import { Command } from 'commander';
import { MyDslLanguageMetaData } from '../language/generated/module.js';
import { createMyDslServices } from '../language/my-dsl-module.js';
import { extractAstNode } from './cli-util.js';
import { NodeFileSystem } from 'langium/node';
import { interpreter } from '../semantics/interpreter.js';
import { compiler } from '../semantics/compiler.js';

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
            const services = createMyDslServices(NodeFileSystem).MyDsl;
            const model = await extractAstNode<programNode>(fileName, services);
            compiler.compile(model,destination);

        });


    program
        .command('interpret')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('interprets the source file')
        .action(async (fileName: string) => {
            console.log("interpreting1");
            const services = createMyDslServices(NodeFileSystem).MyDsl;
            console.log("interpreting2");
            const model = await extractAstNode<programNode>(fileName, services);
            console.log("interpreting3");
            interpreter.interpret(model);

        });

    program.parse(process.argv);
}


