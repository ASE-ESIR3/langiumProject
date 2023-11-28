import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';

export class VariableDefinitionNode implements ASTInterfaces.VariableDefinition {
    constructor(public $type: 'VariableDefinition'
    
    ){}
    $container!: ASTInterfaces.FunctionDefinitionParameters;
    left?: ASTInterfaces.Expr | undefined;
    type!: ASTInterfaces.Type;
    variable!: ASTInterfaces.Variable;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
