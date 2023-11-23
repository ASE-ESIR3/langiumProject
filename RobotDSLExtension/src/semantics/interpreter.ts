import { PrintVisitor } from '../semantics/visitor.js';
import type { programNode } from '../semantics/visitor.js';


export class interpreter{
    static interpret(model: programNode){
        const visitor = new PrintVisitor();
        visitor.visitProgram(model);
        console.log(model);
    }

}
