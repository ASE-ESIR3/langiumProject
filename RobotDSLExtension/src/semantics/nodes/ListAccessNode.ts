import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';
import { VariableNode } from './VariableNode.js';


export class ListAccessNode implements ASTInterfaces.ListAccess {
    constructor(public $type: 'ListAccess',
                public $container: undefined){}
    variable!: VariableNode;
    index!: ExprNode;

    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
