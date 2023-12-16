import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { FunctionCall, Function_, MyDslAstType, Program } from './generated/ast.js';
import type { MyDslServices } from './my-dsl-module.js';
/** 
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyDslServices) {
    const registry = services
    .validation.ValidationRegistry;
    const validator = services.validation.MyDslValidator;
    const checks: ValidationChecks<MyDslAstType> = {
        Function_: validator.ensurefunctionName,
        Program: validator.ensureMainFunctionExists,
        FunctionCall: validator.ensurefunctionCalledExists,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyDslValidator {
    public program!: Program;
    public funcnames: string[] = [];

    ensurefunctionName(fun: Function_, accept: ValidationAcceptor): void {
        if (!fun.FunctionName.charAt(0).match(/[a-z]/)) {
            accept('warning', 'Function name should not becapitalized.', { node: fun, property: 'FunctionName' });
        }

        if(fun.FunctionName.toLowerCase() == "main" && !fun.FunctionName.charAt(0).match(/[a-z]/)){
            accept('error', 'Function main should be written like "main".', { node: fun, property: 'FunctionName' });
        }

        if(fun.FunctionName.toLowerCase() == "setup"){
            accept('error', 'Function cant be named setup. it is a reserved word.', { node: fun, property: 'FunctionName' });
        }

        if(fun.FunctionName.toLowerCase() == "loop"){
            accept('error', 'Function cant be named loop. it is a reserved word.', { node: fun, property: 'FunctionName' });
        }
        
        //if function is already defined in the funcnames then throw error
        if(this.funcnames.includes(fun.FunctionName)){
            accept('error', 'Function "' + fun.FunctionName + '" is already defined.', { node: fun, property: 'FunctionName' });
        }
        else{
            this.funcnames.push(fun.FunctionName);
        }

    }





    ensurefunctionCalledExists(fun: FunctionCall, accept: ValidationAcceptor): void {
        for (const element of this.program.function) {
            const functionElement = element as Function_;
            if (functionElement.FunctionName === fun.functionName) {
                return;
            }
        }
        
        accept('warning', 'Function "' + fun.functionName + '" does not exist.', { node: fun, property: 'functionName' });

    }

    
    ensureMainFunctionExists(prog: Program, accept: ValidationAcceptor): void {
        this.program = prog;
        if (!prog.function.find(fun => fun.FunctionName == "main")) {
            accept('error', 'Your program does not contain any main() function.', { node: prog, property: 'function' });
        }
    }

}
