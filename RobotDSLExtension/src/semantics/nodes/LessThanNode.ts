import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';


export class LessThanNode implements ASTInterfaces.LessThan {
    constructor(public $type: 'LessThan',
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

