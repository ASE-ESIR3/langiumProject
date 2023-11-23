import * as ASTInterfaces from '../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';

export interface MyDslVisitor {
    // TODO : create one visit method for each concept of the language
    visitProgram(node: programNode): any;
    visitFunction_(node: functionNode): any;
}

// TODO : create one concrete class for each concept
export class programNode implements ASTInterfaces.Program {
    constructor(
        public $type: 'Program'
    ){}
    function!: functionNode[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept (visitor: MyDslVisitor) : any {
        return visitor.visitProgram(this);
    }
}

export class functionNode implements ASTInterfaces.Function_ {
    constructor(
        public $type: 'Function_',
        public $container: ASTInterfaces.Program,
        
    ){}
    type!: ASTInterfaces.Type;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    FunctionName!: string;
    functiondefinitionparameters!: ASTInterfaces.FunctionDefinitionParameters;
    Body!: ASTInterfaces.StatementBlock;
    accept(visitor: MyDslVisitor) : any {
        return visitor.visitFunction_(this);
    }
}

export class PrintVisitor implements MyDslVisitor {
    visitProgram(node: programNode): any {
        console.log("Program");
        console.log(node.function);
        node.function.forEach(element => {
            element.accept(this);
            console.log(node.function);
        });
    
    }

    visitFunction_(node: functionNode): any {
        console.log("Function_");
        console.log(node.FunctionName);
        return null;
    }
}