import type { programNode } from '../semantics/nodes/programNode.js';
import { Command } from 'commander';
import { MyDslLanguageMetaData } from '../language/generated/module.js';
import { createMyDslServices } from '../language/my-dsl-module.js';
import { extractAstNode } from './cli-util.js';
import { NodeFileSystem } from 'langium/node';
import { interpreter } from '../semantics/interpreter.js';
import { compiler } from '../semantics/compiler.js';
import { readFileSync, writeFile } from 'fs';

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
            var startTime = Date.now();
            var compiledCode = compiler.compile(model);
            console.log("the compiled code is : " + compiledCode);
            
            var arduinoBoilerCode = "";
            var file = "src/compiler/ArduinoCode/program/RB0021_Omni4WD_PID/RB0021_Omni4WD_PID.ino";
            readFileSync(file, 'utf8').split(/\r?\n/).forEach(function (line) {
                arduinoBoilerCode = arduinoBoilerCode.concat(line + "\n");
            });
            compiledCode = arduinoBoilerCode.concat(compiledCode);
            
            //write to file
            writeFile(destination + "outArduino.ino", compiledCode, function (err: any) {
                if (err) return console.log(err);
            });
            const endTime = Date.now();
            console.log(`compilation took ${endTime - startTime}ms`);
            console.log("Compiled code at " + destination);

        });


    program
        .command('interpret')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .description('interprets the source file')
        .action(async (fileName: string) => {
            const services = createMyDslServices(NodeFileSystem).MyDsl;
            const model = await extractAstNode<programNode>(fileName, services);
            interpreter.interpret(model);
            console.log("types errors ",interpreter.typeErors);

        });

    program.parse(process.argv);
}


