import * as ASTInterfaces from '../../language/generated/ast.js';
import { MyDslVisitor } from '../visitor.js';

export class BooleanNode implements ASTInterfaces.Boolean {
    constructor(public $type: 'Boolean'){}
    accept(visitor: MyDslVisitor) : any {};
}

