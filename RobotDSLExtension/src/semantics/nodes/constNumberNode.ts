import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';


export class ConstNumberNode implements ASTInterfaces.ConstNumber {
    constructor(public $type: 'ConstNumber',
                public $container: ASTInterfaces.Statment){}
    Value!: number;
    
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
