import { CompilerVisitor } from './compilerVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';
import { readFileSync, writeFile } from 'fs';

export class compiler{
    static compile(model: programNode,destination:string){
        console.log("compiling to " + destination);
        const visitor = new CompilerVisitor();
        const startTime = Date.now();

        var compiledCode = "";
        
        compiledCode = compiledCode.concat(visitor.visit(model));

        var arduinoBoilerCode = "";
        var file = "src/compiler/ArduinoCode/program/RB0021_Omni4WD_PID/RB0021_Omni4WD_PID.ino";

        readFileSync(file, 'utf8').split(/\r?\n/).forEach(function (line) {
            arduinoBoilerCode = arduinoBoilerCode.concat(line + "\n");
        }
        );
    
        compiledCode = arduinoBoilerCode.concat(compiledCode);
        console.log("the compiled code is : " + compiledCode);
        //write to file
        writeFile(destination + "outArduino.ino", compiledCode, function (err: any) {
            if (err) return console.log(err);
        });
        const endTime = Date.now();
        console.log(`compilation took ${endTime - startTime}ms`);
        console.log("Compiled code at " + destination);
    }

}
