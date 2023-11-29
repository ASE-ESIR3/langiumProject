import * as ASTInterfaces from '../../language/generated/ast.js';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';

export class ReturnNode implements ASTInterfaces.Rbreturn {
    constructor(public $type: 'Rbreturn',
                public $container: ASTInterfaces.Expr){}
    returnedExpr!: ExprNode;
    accept(visitor: MyDslVisitor) : any {};
}

