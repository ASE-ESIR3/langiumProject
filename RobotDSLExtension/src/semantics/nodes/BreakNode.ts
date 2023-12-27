import * as ASTInterfaces from '../../language/generated/ast.js';
import { MyDslVisitor } from '../visitor.js';

export class BreakNode implements ASTInterfaces.Break {
    constructor(public $type: 'Break'){}
    accept(visitor: MyDslVisitor) : any {};
}
