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
import { FunctionCallParametersNode } from "./nodes/FunctionCallParameterNode.js";
import { AffectationNode } from "./nodes/AffectationNode.js";
import { ConstBooleanNode } from "./nodes/ConstBooleanNode.js";
import { AndNode } from "./nodes/AndNode.js";
import { OrNode } from "./nodes/OrNode.js";
import { NotNode } from "./nodes/NotNode.js";
import { EqualsNode } from "./nodes/equalsNode.js";
import { IfNode } from "./nodes/IfNode.js";
import { WhileNode } from "./nodes/WhileNode.js";
import { LessThanNode } from "./nodes/LessThanNode.js";
import { MoreThanNode } from "./nodes/MoreThanNode.js";
import { ReturnNode } from "./nodes/ReturnNode.js";



export class InterpretorVisitor implements MyDslVisitor {
    public ctx = [new Map<string, any>()];
    public progNode: programNode | undefined;
    getCurrentContext() {
        return this.ctx[this.ctx.length - 1];
    }

    constructor() {
    
    }

    visit(model: programNode): any {
        this.progNode = model;
        this.visitProgram(model);
    }

    visitProgram(node: programNode): any {
        const mainFunction = node.function.find(f => f.FunctionName === 'main');
        // If 'main' function is found, start the interpretation from there
        if (mainFunction) {
            mainFunction.accept(this); // Start interpretation from the main function
        } else {
            // Handle case where there is no 'main' function
            console.error("No main function found in the program");
        }

    }

    visitFunction_(node: functionNode): any {
        this.ctx.push(new Map<string, any>());
        node.Body.accept(this);
        this.ctx.pop();
        return null;
    }

    visitStatmentBlock(node: StatementBlockNode):any {
        
        node.statments.forEach(element => {
            element.accept(this);
        });
        
        return null;
    }

    visitStatment(node: StatementNode) {

        if (isStatementBlock(node)){
            const node_ = ( node as StatementBlockNode)

            node_.statments.forEach(element => {
                element.accept(this);
            });
        }

        return null;
    }

    visitConstNumber(node: ConstNumberNode){
        return node.Value;
    }

    visitConstBoolean(node: ConstBooleanNode) {
        return node.Value.valueOf();
    }

    visitExpr(node: ExprNode){
        return node.accept(this);
    }

    visitVariableDefinition(node:VariableDefinitionNode){
        const value = node.left ? node.left.accept(this) : undefined;
        this.getCurrentContext().set(node.variable.Name, value);
    }

    visitAddition(node: AdditionNode ){
        return parseInt((node.Left as ExprNode).accept(this)) + parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitMultiplication(node: MultiplicationNode ){
        return parseInt((node.Left as ExprNode).accept(this)) * parseInt((node.Right).accept(this)); 
    }

    visitSoustraction(node: SoustractionNode ){
        return parseInt((node.Left as ExprNode).accept(this)) - parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitDivision(node: DivisionNode ){
        return Math.round(parseInt((node.Left as ExprNode).accept(this)) / parseInt((node.Right as ExprNode).accept(this))); 
    }

    visitVariable(node: VariableNode){
        // Look for the variable in the stack of contexts
        for (let i = this.ctx.length - 1; i >= 0; i--) {
            if (this.ctx[i].has(node.Name)) {
                return this.ctx[i].get(node.Name);
            }
        }
        // Handle the case where the variable is not found
        throw new Error(`Variable ${node.Name} not found`);
    }

    visitFunctionCall(node: functionCallNode){
        if(node.functionName == "print"){
            console.log(node.functionparameters.accept(this)[0]);
            return null;
        }

        if (node.functionName == "sqrt"){
            return Math.round(Math.sqrt(node.functionparameters.accept(this)[0]));
        }

        if (node.functionName == "getDistance"){
            return 0;
        }

        const func = this.progNode!.function.find(f => f.FunctionName === node.functionName);
        if (func) {
            this.ctx.push(new Map<string, any>());
            if ( func.functiondefinitionparameters.variabledefinition.length != 0){
                const parameters = node.functionparameters.expr;
                func.functiondefinitionparameters.variabledefinition.forEach((node,i) => {
                    this.getCurrentContext().set(node.variable.Name, parameters[i].accept(this));
                });
            }
            
            func.Body.accept(this);
            
            this.ctx.pop();
            return 0;
        } else {
            throw new Error(`Function ${node.functionName} not found`);
        }

        return null;
    }

    visitFunctionCallParameters(node: FunctionCallParametersNode) {
        const values:any[] = [];
        node.expr.forEach(element => {
            values.push((element as ExprNode).accept(this));
        });
        return values;
    }

    visitAffectation(node: AffectationNode) {
        const value = (node.Right as ExprNode).accept(this);
        this.getCurrentContext().set(node.variable.Name, value);
    }

    visitAnd(node: AndNode) {
        return node.Left.accept(this) && node.Right.accept(this);  
    }

    visitOr(node: OrNode) {
        return node.Left.accept(this) || node.Right.accept(this);    
    }

    visitNot(node: NotNode) {
        return !node.right.accept(this);    
    }

    visitEquals(node: EqualsNode) {

        return node.Left.accept(this) === node.Right.accept(this);    
    }

    visitif(node: IfNode) {
        if (node.Condition.accept(this) == "true"){
            node.Body.accept(this);
        }
        else{
            node.Elsez.forEach(element => {
                element.accept(this);
            });
        }
    }

    visitWhile(node: WhileNode) {
        
        while ( node.Condition.accept(this)){
            node.Body.accept(this);
        }
    }

    visitMoreThan(node: MoreThanNode) {
        return parseInt(node.Left.accept(this)) > parseInt(node.Right.accept(this));  
    }

    visitLessThan(node: LessThanNode) {

        return parseInt(node.Left.accept(this)) < parseInt(node.Right.accept(this));    
    }

    visitFunctionDefinitionParameters(node: any) {
        
    }

    visitReturn(node: ReturnNode) {
        return node.returnedExpr.accept(this);
    }

}

