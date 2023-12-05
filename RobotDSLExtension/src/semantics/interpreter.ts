import { InterpretorVisitor } from './interpretorVisitor.js';
import type { programNode } from '../semantics/nodes/programNode.js';
import { BaseScene, Scene } from '../web/simulator/scene.js';


export class interpreter{
    static interpret(model: programNode){
        const visitor = new InterpretorVisitor();
        const startTime = Date.now();
        var scene:Scene = new BaseScene();
        visitor.visit(model,scene);
        const endTime = Date.now();
        console.log(`Interpretation took ${endTime - startTime}ms`);
    }
}
