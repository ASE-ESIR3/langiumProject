import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { FunctionCallParametersNode } from './FunctionCallParameterNode.js';

export class functionCallNode implements ASTInterfaces.FunctionCall {
    constructor(public $type: 'FunctionCall'){}
    functionName!: string;
    functionparameters!: FunctionCallParametersNode;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: MyDslVisitor) : any {};
}
