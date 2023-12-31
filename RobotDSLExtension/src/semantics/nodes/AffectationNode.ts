import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';
import { VariableNode } from './VariableNode.js';
import { ListAccessNode } from './ListAccessNode.js';


export class AffectationNode implements ASTInterfaces.Affectation {
    constructor(public $type: 'Affectation'
    
    ){}
    $container!: ASTInterfaces.For;
    Right!: ExprNode;
    variable!: VariableNode | ListAccessNode;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
