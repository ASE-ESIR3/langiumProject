import { InterpretorVisitor } from './interpretorVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';


export class interpreter{
    static interpret(model: programNode){
        const visitor = new InterpretorVisitor();
        visitor.visit(model);
    }
}
