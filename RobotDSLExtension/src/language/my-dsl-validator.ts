import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { Function_, MyDslAstType, Program } from './generated/ast.js';
import type { MyDslServices } from './my-dsl-module.js';
/** 
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyDslValidator;
    
    const checks: ValidationChecks<MyDslAstType> = {
        Function_: validator.ensurefunctionName,
        Program: validator.ensureMainFunctionExists,
        //Variable: validator.printFunNam
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyDslValidator {


    ensurefunctionName(fun: Function_, accept: ValidationAcceptor): void {
        if (!fun.FunctionName.charAt(0).match(/[a-z]/)) {
            accept('warning', 'Function name should not becapitalized.', { node: fun, property: 'FunctionName' });
        }
        if(fun.FunctionName.toLowerCase() == "main" && !fun.FunctionName.charAt(0).match(/[a-z]/)){
            accept('error', 'Function main should be written like "main".', { node: fun, property: 'FunctionName' });
            
        }
    }
    
    ensureMainFunctionExists(prog: Program, accept: ValidationAcceptor): void {
        if (!prog.function.find(fun => fun.FunctionName == "main")) {
            accept('error', 'Your program does not contain any main() function.', { node: prog, property: 'function' });
        }
    }

}
