import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MyDslAstType } from '../language/generated/ast.js';
import * as InterfaceAST from '../language/generated/ast.js';
import * as ClassAST from './visitor.js';
import { PrintVisitor } from './visitor.js';
import type { MyDslServices } from '../language/my-dsl-module.js';

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: MyDslServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new MyDslAcceptWeaver;
    registry.register(weaver.checks, weaver);
}

/**
 * TODO :
 * You must implement a weaving function for each concrete concept of the language.
 * you will also need to fill the check data structure to map the weaving function to the Type of node
 */
export class MyDslAcceptWeaver {
    weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: PrintVisitor) => {return visitor.visitProgram(node as unknown as ClassAST.programNode);}
    }

    weaveFunction_(node : InterfaceAST.Function_, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: PrintVisitor) => {return visitor.visitFunction_(node as unknown as ClassAST.functionNode);}
    }

    checks: ValidationChecks<MyDslAstType> = {
        Program : this.weaveProgram,
        Function_ : this.weaveFunction_,
        
    };

}
