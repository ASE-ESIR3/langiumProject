import { functionNode  } from "./nodes/functionNode.js";
import { programNode } from "./nodes/programNode.js";
import { StatementNode } from "./nodes/statementNode.js";
import { StatementBlockNode} from "./nodes/statementBlockNode.js";
import { MyDslVisitor } from "./visitor.js";
import { ExprNode } from "./nodes/ExprNode.js";
import { isBreak, isKM, isMM, isStatementBlock } from "../language/generated/ast.js";
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
import { ConstStringNode } from "./nodes/ConstStringNode.js";
import { Scene } from "../web/simulator/scene.js";
import { MyError } from "./errors.js";
import { AstNode } from "langium";
import { BreakNode } from "./nodes/BreakNode.js";
//import { MyError } from "./errors.js";
//import { integer } from "vscode-languageclient";

export class variableStorage {
    public value:any;
    public type:string;
    constructor(value:any,type:string){
        this.value = value;
        this.type = type;
    }
}
export class Context {
    public variables: Map<string, variableStorage> = new Map<string, variableStorage>();
    public returnVal: any;
    public isReturning = false;
}


export class InterpretorVisitor implements MyDslVisitor {
    public typeErrors: any[] = [];
    public robotinstruction: any[] = [];
    public ctx = [new Context()];

    public progNode: programNode | undefined;

    public scene:Scene;

    
    ensureType(node:AstNode,type:string, value:any){
        var typeOfExp:string = convertExprStringToNode(value);
        if(type != typeOfExp ){
            //get line of the node
            var line = node.$cstNode?.range.start.line+1;
            
            this.typeErrors.push(new MyError(line, "Type error: expect type "+type+" bug got "+typeOfExp , "Type error"));
            console.error("Type error: expect type "+type+" bug got "+typeOfExp+ "at line "+line);
        }
    
    }

    getCurrentContext() {
        return this.ctx[this.ctx.length - 1];
    }

    printContext() {
        console.log("Current context: " + this.getCurrentContext().variables.values());
    }

    constructor() {
    
    }

    visit(model: programNode,scene:Scene): any {
        this.scene = scene;
        this.progNode = model;
        this.visitProgram(model);
        return this.robotinstruction;
    }

    visitProgram(node: programNode): any {

        const mainFunction = node.function.find(f => f.FunctionName === 'main');
        if (mainFunction) { 
            mainFunction.accept(this); // start interpretation from the main function
        } else {
            console.error("No main function found in the program");
            this.typeErrors.push(new MyError(0,"No main function found in the program"," programm error"));
        }
        return null;

    }

    visitFunction_(node: functionNode): any {
        node.Body.accept(this);
        return null;
    }

    visitStatmentBlock(node: StatementBlockNode): any {
        for (const element of node.statments) {
            const ret = element.accept(this);
            if (this.getCurrentContext().isReturning) {
                return ret;
            }
            if (ret == "break"){
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
                if (this.getCurrentContext().isReturning){
                    return ret;
                }
                if (ret == "break"){
                    return ret;
                }
            }
        }
        if (isBreak(node)){
            return "break";
        }
        return ret;
    }

    visitConstNumber(node: ConstNumberNode):number{
        return node.Value;
    }

    visitConstBoolean(node: ConstBooleanNode):boolean {
        return node.Value;
    }

    visitExpr(node: ExprNode){
        return node.accept(this);
    }

    visitVariableDefinition(node:VariableDefinitionNode){
        const value = node.left ? node.left.accept(this) : undefined;
        if(value){
            this.ensureType(node,node.type.$type,value);
        }
        this.getCurrentContext().variables.set(node.variable.Name,  new variableStorage(value,node.type.$type));
    }

    visitAddition(node: AdditionNode ): number{
        return parseInt((node.Left as ExprNode).accept(this)) + parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitMultiplication(node: MultiplicationNode ) : number{
        return parseInt((node.Left as ExprNode).accept(this)) * parseInt((node.Right).accept(this)); 
    }

    visitSoustraction(node: SoustractionNode ) : number{
        return parseInt((node.Left as ExprNode).accept(this)) - parseInt((node.Right as ExprNode).accept(this)); 
    }

    visitDivision(node: DivisionNode ): number{
        return Math.round(parseInt((node.Left as ExprNode).accept(this)) / parseInt((node.Right as ExprNode).accept(this))); 
    }

    visitVariable(node: VariableNode){
        for (let i = this.ctx.length - 1; i >= 0; i--) {
            if (this.ctx[i].variables.has(node.Name)) {
                return this.ctx[i].variables.get(node.Name).value;
            }
        }
        this.typeErrors.push(new MyError(node.$cstNode.range.start.line, "VariableError: "+node.Name+" has never been declared in this scop" , "Variable error"));
        console.error("Line:" + node.$cstNode.range.start.line+". VariableError: "+node.Name+" has never been declared in this scop");
    }

    visitFunctionCall(node: functionCallNode){
        if(node.functionName == "print"){
            return null;
        }

        if (node.functionName == "sqrt"){
            return Math.round(Math.sqrt(node.functionparameters.accept(this)[0]));
        }

        if (node.functionName == "getDistance"){
            return 0;//this.scene.robot.getRay().findClosestIntersection(this.scene.entities);

        }

        const func = this.progNode!.function.find(f => f.FunctionName === node.functionName);
        
        if (func) {
            this.ctx.push(new Context());
            if ( func.functiondefinitionparameters != null){
                if ( func.functiondefinitionparameters.variabledefinition.length != 0){
                    const parameters = node.functionparameters.expr;
                    func.functiondefinitionparameters.variabledefinition.forEach((node,i) => {
                        var value = parameters[i].accept(this);
                        this.ensureType(node,node.type.$type,value);
                        this.getCurrentContext().variables.set(node.variable.Name, new variableStorage(value,node.type.$type));
                    });
                }
            }

            const returnVal = func.Body.accept(this);
            this.ensureType(node,func.type.$type,returnVal);

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
        var type = this.getCurrentContext().variables.get(node.variable.Name).type;
        this.ensureType(node,type,value);
        this.getCurrentContext().variables.get(node.variable.Name).value = value;
    }

    visitAnd(node: AndNode):boolean {
        return node.Left.accept(this) && node.Right.accept(this);  
    }

    visitOr(node: OrNode):boolean {
        return node.Left.accept(this) || node.Right.accept(this);    
    }

    visitNot(node: NotNode):boolean {
        return !node.right.accept(this);    
    }

    visitEquals(node: EqualsNode):boolean {

        return node.Left.accept(this) == node.Right.accept(this);    
    }

    visitif(node: IfNode) {
        if (evalCondition(node.Condition.accept(this))){
            return node.Body.accept(this);
        }

        else{
            var ret = null;
            for (let i = 0; i < node.Elsez.length; i++) {
                const element = node.Elsez[i];
                   ret = element.accept(this);
                   if (this.getCurrentContext().isReturning){
                       return ret;
                   }
               }
        }
    
    }

    visitWhile(node: WhileNode) {
        
        while ( evalCondition(node.Condition.accept(this))){
            const ret = node.Body.accept(this);
            if(this.getCurrentContext().isReturning){
                return ret;
            }
            if (ret == "break"){
                return null;
            }
        }
    }

    visitFor(node: ForNode) {
        this.ctx.push(new Context());
        node.Initialization.accept(this);
        while ( node.Condition.accept(this)){
            node.Increment.accept(this);
            const ret = node.Body.accept(this);
            if(this.getCurrentContext().isReturning){
                return ret;
            }
            if(ret == "break"){
                return null;
            }
        }
        this.ctx.pop();
    }

    visitMoreThan(node: MoreThanNode):boolean {
        return parseInt(node.Left.accept(this)) > parseInt(node.Right.accept(this));  
    }

    visitLessThan(node: LessThanNode):boolean {
        return parseInt(node.Left.accept(this)) < parseInt(node.Right.accept(this));    
    }

    visitFunctionDefinitionParameters(node: any) {
        
    }

    visitReturn(node: ReturnNode) {
        this.getCurrentContext().isReturning = true;
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
        var value = node.Value.accept(this);
        this.ensureType(node,"Number_",value);

        var action = {type: "Forward", Value: value*node.unit.accept(this)};
        this.scene.robot.move(node.Value.accept(this)*node.unit.accept(this));
        this.robotinstruction.push(action);
        return null;
    }

    visitRotate(node: RotateNode) {

        var value = node.Value.accept(this);
        
        this.ensureType(node,"Number_",value);

        var action = {type: "Rotate", Value: parseInt(value)};
        this.scene.robot.turn(value);
        this.robotinstruction.push(action);
        return null;
    }

    visitThrow(node: ThrowNode) {
        console.log("Error has been thrown: " + node.err.accept(this));
        //exit(0);
    }

    visitConstString(node: ConstStringNode):string {
        return node.Value;
    }

    visitBreak(node: BreakNode) {
        return "break";
    }

}

function evalCondition(val:any):boolean{
    if (typeof val == "boolean")
        return val;
    if (typeof val == "string")
        return val == "true";
    else
        return val != 0;
}

function convertExprStringToNode(str:string){
    var val = parseInt(str);
    if(!Number.isNaN(val)){
        return "Number_";
    }
    else if(str == "true" || str == "false"){
        return "Boolean";
    }
    return "Void";
}

/*function MyTypeof(expr:any,type:TypeNode):any{

    if((typeof expr) == "number"){
        return NumberNode;
    }
    if((typeof expr) == "boolean"){
        return BooleanNode;
    }
    return Void;
}*/