import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { StatementBlockNode } from './statementBlockNode.js';
import { ExprNode } from './ExprNode.js';

export class WhileNode implements ASTInterfaces.RbLoop {
    constructor(public $type: 'RbLoop',
                public $container: ASTInterfaces.Program){}
    Body!: StatementBlockNode;
    Condition!: ExprNode;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    
    accept(visitor: MyDslVisitor) : any {};
}
