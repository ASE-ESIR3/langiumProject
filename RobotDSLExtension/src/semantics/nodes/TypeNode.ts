import * as ASTInterfaces from '../../language/generated/ast.js';
import { MyDslVisitor } from '../visitor.js';

export class TypeNode implements ASTInterfaces.Type {
    constructor(public $type: 'Type'){}
    accept(visitor: MyDslVisitor) : any {};
}

