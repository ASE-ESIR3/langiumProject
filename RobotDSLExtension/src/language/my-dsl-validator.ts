import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { Function_, MyDslAstType } from './generated/ast.js';
import type { MyDslServices } from './my-dsl-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyDslValidator;
    const checks: ValidationChecks<MyDslAstType> = {
        Function_: validator.printFunName,
        //Variable: validator.printFunNam
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyDslValidator {


    printFunName(fun: Function_, accept: ValidationAcceptor): void {
        accept('warning', 'congrats, your name is : ' + fun.FunctionName + '.', { node: fun, property: 'FunctionName' });
         
    }
    /*printFunNam(var_: Variable, accept: ValidationAcceptor): void {
        accept('info', 'congrats, your name is : ' + var_.Name + '.', { node: var_, property: 'Name' });
    }*/
}
