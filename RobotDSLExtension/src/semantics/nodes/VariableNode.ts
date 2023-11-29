import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';

export class VariableNode implements ASTInterfaces.Variable {
    constructor(public $type: 'Variable'
    
    ){}
    $container!: ASTInterfaces.VariableDefinition | ASTInterfaces.Affectation;
    Name!: string;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
