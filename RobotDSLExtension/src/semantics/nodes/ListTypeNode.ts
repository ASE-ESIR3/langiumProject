import { AstNode, CstNode, LangiumDocument } from 'langium';
import * as ASTInterfaces from '../../language/generated/ast.js';
import { MyDslVisitor } from '../visitor.js';
import { BooleanNode } from './BooleanNode.js';
import { NumberNode } from './NumberNode.js';

export class ListTypeNode implements ASTInterfaces.ListType {
    constructor(public $type: 'ListType'){}
    type!: NumberNode | BooleanNode ;
    $container?: AstNode;
    $containerProperty?: string;
    $containerIndex?: number;
    $cstNode?: CstNode;
    $document?: LangiumDocument<AstNode>;

    accept(visitor: MyDslVisitor) : any {};
}

