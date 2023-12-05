import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';


export class ConstStringNode implements ASTInterfaces.ConstString {
    constructor(public $type: 'ConstString'){}
    $container: ASTInterfaces.Throw;
    Value!: string;
    
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
