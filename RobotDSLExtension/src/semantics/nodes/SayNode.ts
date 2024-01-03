import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';


export class SayNode implements ASTInterfaces.Say {
    constructor(public $type: 'Say',
                public $container: ASTInterfaces.Expr){}
    msg!: ExprNode[];

    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
