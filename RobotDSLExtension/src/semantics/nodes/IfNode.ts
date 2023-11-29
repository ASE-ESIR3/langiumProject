import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { StatementBlockNode } from './statementBlockNode.js';
import { ExprNode } from './ExprNode.js';

export class IfNode implements ASTInterfaces.Ifz {
    constructor(public $type: 'Ifz',
                public $container: ASTInterfaces.Program){}
    Elsez!: StatementBlockNode[];
    Condition!: ExprNode;
    Body!: StatementBlockNode;
    type!: ASTInterfaces.Type;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    
    accept(visitor: MyDslVisitor) : any {};
}
