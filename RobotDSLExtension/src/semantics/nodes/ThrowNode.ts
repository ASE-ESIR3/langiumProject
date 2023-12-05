import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { ConstStringNode } from './ConstStringNode.js';

export class ThrowNode implements ASTInterfaces.Throw {
    constructor(public $type: 'Throw'
    
    ){}
    err!: ConstStringNode;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
