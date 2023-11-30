import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';
import { UnitNode } from './UnitNode.js';


export class ForwardNode implements ASTInterfaces.Forward {
    constructor(public $type: 'Forward',
                public $container: ASTInterfaces.Expr){}
    unit!: UnitNode;
    Value!: ExprNode;
    
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}

