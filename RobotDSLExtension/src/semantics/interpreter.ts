import { InterpretorVisitor } from './interpretorVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';


export class interpreter{
    static interpret(model: programNode){
        const visitor = new InterpretorVisitor();
        const startTime = Date.now();
        visitor.visit(model);
        const endTime = Date.now();
        console.log(`Interpretation took ${endTime - startTime}ms`);
    }
}
