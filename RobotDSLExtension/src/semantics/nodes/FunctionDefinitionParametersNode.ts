import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { VariableDefinitionNode } from './VariableDefinitionNode.js';

export class FunctionDefinitionParametersNode implements ASTInterfaces.FunctionDefinitionParameters {
    constructor(public $type: 'FunctionDefinitionParameters'){}
    variabledefinition!: VariableDefinitionNode[];
    $container!: ASTInterfaces.Function_;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
