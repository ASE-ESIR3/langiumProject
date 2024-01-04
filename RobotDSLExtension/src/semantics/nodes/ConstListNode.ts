import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ExprNode } from './ExprNode.js';


export class ConstListNode implements ASTInterfaces.ConstList {
    constructor(public $type: 'ConstList',
                public $container: ASTInterfaces.Statment){}
    Values!: ExprNode[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    javascriptType?: any = Number;
    accept(visitor: MyDslVisitor) : any {};
}
