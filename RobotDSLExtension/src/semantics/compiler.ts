import { CompilerVisitor } from './compilerVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';
import { writeFile } from 'fs';

export class compiler{
    static compile(model: programNode,destination:string){
        console.log("compiling to " + destination);
        const visitor = new CompilerVisitor();
        const startTime = Date.now();
        var compiledCode = "#include <stdio.h>\n#include <stdlib.h>\n";
        compiledCode = compiledCode.concat(visitor.visit(model));
        //write to file
        writeFile(destination + "main.ino", compiledCode, function (err: any) {
            if (err) return console.log(err);
        });
        const endTime = Date.now();
        console.log(`compilation took ${endTime - startTime}ms`);
        console.log("Compiled code at " + destination);
    }
}
