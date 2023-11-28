import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { StatementNode } from './statementNode.js';

export class StatementBlockNode implements ASTInterfaces.StatementBlock {
    constructor(public $type: 'StatementBlock',
    ){}
    $container!: ASTInterfaces.Function_ | ASTInterfaces.ConditionnalStructure | ASTInterfaces.Ifz;
    statments!: StatementNode[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
