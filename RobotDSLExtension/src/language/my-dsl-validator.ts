import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MyDslAstType, Person } from './generated/ast.js';
import type { MyDslServices } from './my-dsl-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MyDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MyDslValidator;
    const checks: ValidationChecks<MyDslAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MyDslValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
