import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';


export class MultiplicationNode implements ASTInterfaces.Multiplication {
    constructor(public $type: 'Multiplication',
                public $container: ASTInterfaces.Expr){}
    Left!: ExprNode;
    Right!: ExprNode;
    Value!: number;
    
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}

