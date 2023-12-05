import { functionNode  } from "./nodes/functionNode.js";
import { programNode } from "./nodes/programNode.js";
import { StatementNode } from "./nodes/statementNode.js";
import { StatementBlockNode} from "./nodes/statementBlockNode.js";
import { MyDslVisitor } from "./visitor.js";
import { ExprNode } from "./nodes/ExprNode.js";
import { isKM, isMM, isStatementBlock } from "../language/generated/ast.js";
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
import { ForNode } from "./nodes/ForNode.js";
import { BooleanNode } from "./nodes/BooleanNode.js";
import { NumberNode } from "./nodes/NumberNode.js";
import { TypeNode } from "./nodes/TypeNode.js";
import { UnitNode } from "./nodes/UnitNode.js";
import { ForwardNode } from "./nodes/ForwardNode.js";
import { RotateNode } from "./nodes/RotateNode.js";
import { ThrowNode } from "./nodes/ThrowNode.js";
import { exit } from "process";
import { ConstStringNode } from "./nodes/ConstStringNode.js";



export class InterpretorVisitor implements MyDslVisitor {
    public robotinstruction: string[] = [];
    public ctx = [new Map<string, any>()];
    public progNode: programNode | undefined;
    public isReturning = false;
    getCurrentContext() {
        return this.ctx[this.ctx.length - 1];
    }

    printContext() {
        console.log("Current context: " + this.getCurrentContext().values());
    }

    constructor() {
    
    }

    visit(model: programNode): any {
        this.progNode = model;
        this.visitProgram(model);
        console.log("Robot has been moving:");
        console.log(this.robotinstruction)
    }

    visitProgram(node: programNode): any {
        const mainFunction = node.function.find(f => f.FunctionName === 'main');
        if (mainFunction) {
            mainFunction.accept(this); // start interpretation from the main function
        } else {
            console.error("No main function found in the program");
        }

    }

    visitFunction_(node: functionNode): any {
        this.ctx.push(new Map<string, any>());
        node.Body.accept(this);
        this.ctx.pop();
        return null;
    }

    visitStatmentBlock(node: StatementBlockNode): any {
        for (const element of node.statments) {
            const ret = element.accept(this);
            if (this.isReturning) {
                return ret;
            }
        }
        return null;
    }

    visitStatment(node: StatementNode) {
        var ret = null;
        if (isStatementBlock(node)){
            const node_ = ( node as StatementBlockNode);
            for (let i = 0; i < node_.statments.length; i++) {
                 const element = node_.statments[i];

                    ret = element.accept(this);
                    if (this.isReturning){
                        return ret;
                    }
                }
        }
        return ret;
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
        for (let i = this.ctx.length - 1; i >= 0; i--) {
            if (this.ctx[i].has(node.Name)) {
                return this.ctx[i].get(node.Name);
            }
        }
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
            if ( func.functiondefinitionparameters != null){
                if ( func.functiondefinitionparameters.variabledefinition.length != 0){
                    const parameters = node.functionparameters.expr;
                    func.functiondefinitionparameters.variabledefinition.forEach((node,i) => {
                        this.getCurrentContext().set(node.variable.Name, parameters[i].accept(this));
                    });
                }
            }

            const returnVal = func.Body.accept(this);
            this.isReturning = false;
            this.ctx.pop();
            return returnVal;
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

        return node.Left.accept(this) == node.Right.accept(this);    
    }

    visitif(node: IfNode) {
        if (node.Condition.accept(this) == "true"){
            return node.Body.accept(this);
            
        }
        else{
            var ret = null;
            for (let i = 0; i < node.Elsez.length; i++) {
                const element = node.Elsez[i];
                   ret = element.accept(this);
                   if (this.isReturning){
                       return ret;
                   }
               }

        }
    
    }

    visitWhile(node: WhileNode) {
        
        while ( node.Condition.accept(this)){
            const ret = node.Body.accept(this);
            if(this.isReturning){
                return ret;
            }
        }
    }

    visitFor(node: ForNode) {
        this.ctx.push(new Map<string, any>());
        node.Initialization.accept(this);
        while ( node.Condition.accept(this)){
            node.Increment.accept(this);
            const ret = node.Body.accept(this);
            if(this.isReturning){
                return ret;
            }
        }
        this.ctx.pop();
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
        this.isReturning = true;
        if (node.returnedExpr) {
            return node.returnedExpr.accept(this);
        }
        return null;
    }

    visitBoolean(node: BooleanNode) {
        return Boolean;

    }

    visitNumber(node: NumberNode) {
        return Number;
    }

    visitType(node: TypeNode) {
        
    }

    visitUnit(node: UnitNode) {
        if (isMM(node)){
            return 0.1;
        }
        if (isKM(node)){
            return 0.01;
        }

        return 1;
           
    }

    visitForward(node: ForwardNode) {
        var action = "forward " + node.Value.accept(this)*node.unit.accept(this);
        this.robotinstruction.push(action);
        console.log(action)

        return null;
    }

    visitRotate(node: RotateNode) {
        var action = "rotate " + node.Value.accept(this);
        this.robotinstruction.push(action);
        console.log(action)
        return null;
    }

    visitThrow(node: ThrowNode) {
        console.log("Error has been thrown: " + node.err.accept(this));
        exit(0);
    }

    visitConstString(node: ConstStringNode) {
        return node.Value;
    }
}

