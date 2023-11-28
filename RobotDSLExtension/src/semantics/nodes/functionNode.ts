import * as ASTInterfaces from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { MyDslVisitor } from '../visitor.js';
import { StatementBlockNode } from './statementBlockNode.js';

export class functionNode implements ASTInterfaces.Function_ {
    constructor(public $type: 'Function_',
                public $container: ASTInterfaces.Program){}
    type!: ASTInterfaces.Type;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    FunctionName!: string;
    functiondefinitionparameters!: ASTInterfaces.FunctionDefinitionParameters;
    Body!: StatementBlockNode;
    accept(visitor: MyDslVisitor) : any {};
}
