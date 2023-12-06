import { interpreter } from '../semantics/interpreter.js';
import { programNode } from '../semantics/nodes/programNode.js';


export function generateStatements(model: programNode): any[] {
    return interpreter.interpret(model);
}
