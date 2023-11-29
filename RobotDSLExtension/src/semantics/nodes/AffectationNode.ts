import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';
import { VariableNode } from './VariableNode.js';

export class AffectationNode implements ASTInterfaces.Affectation {
    constructor(public $type: 'Affectation'
    
    ){}
    Right!: ExprNode;
    variable!: VariableNode;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
