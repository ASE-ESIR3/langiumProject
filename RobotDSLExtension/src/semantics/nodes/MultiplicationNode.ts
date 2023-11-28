import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';


export class MultiplicationNode implements ASTInterfaces.Multiplication {
    constructor(public $type: 'Multiplication',
                public $container: ASTInterfaces.Expr){}
    Left!: ASTInterfaces.Expr;
    Right!: ASTInterfaces.Expr;
    Value!: number;
    
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}

