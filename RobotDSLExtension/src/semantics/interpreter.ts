import { PrintVisitor } from '../semantics/printerVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';


export class interpreter{
    static interpret(model: programNode){
        const visitor = new PrintVisitor();
        visitor.visit(model);
    }
}
