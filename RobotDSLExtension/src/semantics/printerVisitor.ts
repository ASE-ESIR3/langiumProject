import { functionNode  } from "./nodes/functionNode.js";
import { programNode } from "./nodes/programNode.js";
import { StatementNode } from "./nodes/statementNode.js";
import { StatementBlockNode} from "./nodes/statementBlockNode.js";
import { MyDslVisitor } from "./visitor.js";
import { ExprNode } from "./nodes/ExprNode.js";
import { isStatementBlock } from "../language/generated/ast.js";
import { VariableDefinitionNode } from "./nodes/VariableDefinitionNode.js";
import { ConstNumberNode } from "./nodes/constNumberNode.js";
import { AdditionNode } from "./nodes/AdditionNode.js";
import { MultiplicationNode } from "./nodes/MultiplicationNode.js";
import { SoustractionNode } from "./nodes/SoustractionNode.js";
import { DivisionNode } from "./nodes/DivisionNode.js";
import { VariableNode } from "./nodes/VariableNode.js";
import { functionCallNode } from "./nodes/FunctionCallNode.js";
//import { isStatementBlock } from "../language/generated/ast.js";


export class PrintVisitor implements MyDslVisitor {
    public venv: Map<string, number> = new Map<string, number>();
    constructor() {
    
    }

    visit(model: programNode): any {
        this.visitProgram(model);
    }

    visitProgram(node: programNode): any {
        console.log("Program");
        console.log("Number of functions in the program :" + node.function.length);
        node.function.forEach(element => {
            element.accept(this);
        });
    }

    visitFunction_(node: functionNode): any {
        console.log("Function_");
        console.log("Function Name: " + node.FunctionName);
        node.Body.accept(this);

        return null;
    }

    visitStatmentBlock(node: StatementBlockNode):any {
        console.log("StatementBlock");
        console.log("Number of statements in the block :" + node.statments.length);
        node.statments.forEach(element => {
            element.accept(this);
        });
        return null;
    }

    visitStatment(node: StatementNode) {
        console.log("Statement");
        console.log("Statement type: " + node.$type);

        if (isStatementBlock(node)){
            const node_ = ( node as StatementBlockNode)
            console.log("Number of statements in the block :" + node_.statments.length);
            node_.statments.forEach(element => {
                element.accept(this);
            });
        }

        return null;
    }

    visitConstNumber(node: ConstNumberNode){
        console.log("ConstNumber");
        console.log("ConstNumber value: " + node.Value);
        return node.Value;
    }

    visitExpr(node: ExprNode){
        console.log("Expr");
        console.log("Expr type: " + node.$type);
        return 
    }

    visitVariableDefinition(node:VariableDefinitionNode){
        console.log("VariableDefinition");
        (node.left as ExprNode).accept(this);
        const value = (node.left as ExprNode).accept(this);
        console.log("VariableDefinition value: " + value);
        this.venv.set(node.variable.Name, value);
    }

    visitAddition(node: AdditionNode ){
        console.log("Addition");
        return parseInt((node.Left as ExprNode).accept(this)) + parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitMultiplication(node: MultiplicationNode ){
        console.log("Multiplication");
        return parseInt((node.Left as ExprNode).accept(this)) * parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitSoustraction(node: SoustractionNode ){
        console.log("Soustraction");
        return parseInt((node.Left as ExprNode).accept(this)) - parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitDivision(node: DivisionNode ){
        console.log("Division");
        return Math.round(parseInt((node.Left as ExprNode).accept(this)) / parseInt((node.Right as ExprNode).accept(this))); 
    }

    visitVariable(node: VariableNode){
        console.log("Variable");
        console.log("Variable name: " + node.Name);
        return this.venv.get(node.Name);
    }

    visitFunctionCall(node: functionCallNode){
        console.log("FunctionCall");
        console.log("FunctionCall name: " + node.functionName);
        if(node.functionName == "print"){
            console.log("FunctionCall print");
            return null;
        }
        return null;
    }

}

