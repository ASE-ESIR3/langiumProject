import { CompilerVisitor } from './compilerVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';

export class compiler{
    static compile(model: programNode):string{
        const visitor = new CompilerVisitor();
        var compiledCode = "";
        compiledCode = compiledCode.concat(visitor.visit(model));
        return compiledCode;
    }
}
