import * as ASTInterfaces from '../../language/generated/ast.js';
import { MyDslVisitor } from '../visitor.js';

export class NumberNode implements ASTInterfaces.Number_ {
    constructor(public $type: 'Number_'){}

    accept(visitor: MyDslVisitor) : any {};
}

