import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { StatementBlockNode } from './statementBlockNode.js';
import { ExprNode } from './ExprNode.js';
import { VariableNode } from './VariableNode.js';
import { VariableDefinitionNode } from './VariableDefinitionNode.js';
import { AffectationNode } from './AffectationNode.js';

export class ForNode implements ASTInterfaces.For {
    constructor(public $type: 'For'){}
    
    Initialization!: VariableNode | VariableDefinitionNode;
    Increment!: AffectationNode | ExprNode;
    Body!: StatementBlockNode;
    Condition!: ExprNode;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    
    accept(visitor: MyDslVisitor) : any {};
}
