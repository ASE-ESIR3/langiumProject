import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { StatementBlockNode } from './statementBlockNode.js';
import { FunctionDefinitionParametersNode } from './FunctionDefinitionParametersNode.js';
import { NumberNode } from './NumberNode.js';
import { BooleanNode } from './BooleanNode.js';
import { programNode } from './programNode.js';

export class functionNode implements ASTInterfaces.Function_ {
    constructor(public $type: 'Function_'){}
    $container!: programNode;
    type!: NumberNode | BooleanNode ;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    FunctionName!: string;
    functiondefinitionparameters!: FunctionDefinitionParametersNode;
    Body!: StatementBlockNode;
    accept(visitor: MyDslVisitor) : any {
    };
}
