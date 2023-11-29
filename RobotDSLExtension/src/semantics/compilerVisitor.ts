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
import { FunctionDefinitionParametersNode } from "./nodes/FunctionDefinitionParametersNode.js";



export class CompilerVisitor implements MyDslVisitor {
    public ctx = [new Map<string, any>()];
    public progNode: programNode | undefined;

    constructor() {
    
    }

    visit(model: programNode): any {
        this.progNode = model;
        return this.visitProgram(model);
    }

    visitProgram(node: programNode): any {
        var ret = ""
        for (let i = 0; i < node.function.length; i++) {
            const element = node.function[i];
            
            ret = ret.concat(element.accept(this));
        }
        return ret;
    }

    visitFunction_(node: functionNode): any {

        return "int " + node.FunctionName + "(" + node.functiondefinitionparameters.accept(this) + ")" +  node.Body.accept(this);
    }

    visitStatmentBlock(node: StatementBlockNode):any {
        
        var ret = "{\n";
        const node_ = ( node as StatementBlockNode);
        for (let i = 0; i < node_.statments.length; i++) {
             const element = node_.statments[i];
                ret = ret.concat(element.accept(this)+ "\n");
                
            }
        ret.concat("}\n");
    }

    visitStatment(node: StatementNode) {
        var ret = "";
        if (isStatementBlock(node)){
            ret = "{\n";
            const node_ = ( node as StatementBlockNode);
            for (let i = 0; i < node_.statments.length; i++) {
                 const element = node_.statments[i];
                    ret = ret.concat(element.accept(this)+ ";\n");
                    
                }
            ret = ret.concat("}\n");
        }
        return ret ;
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
        var right = "";
        if (node.left != null){
            right = " = " + node.left.accept(this);
        }
        return "int " + node.variable.Name + right ;
    }

    visitAddition(node: AdditionNode ){
        return (node.Left as ExprNode).accept(this) + "+"  +(node.Right as ExprNode).accept(this); 
    }

    visitMultiplication(node: MultiplicationNode ){
        return(node.Left as ExprNode).accept(this) + "*" + (node.Right).accept(this); 
    }

    visitSoustraction(node: SoustractionNode ){
        return (node.Left as ExprNode).accept(this) + "-" + (node.Right as ExprNode).accept(this); 
    }

    visitDivision(node: DivisionNode ){
        return (node.Left as ExprNode).accept(this) + "/" + (node.Right as ExprNode).accept(this); 
    }

    visitVariable(node: VariableNode){
        return node.Name;
    }

    visitFunctionCall(node: functionCallNode){
        if(node.functionName == "print"){
            return 'printf("%d",' + node.functionparameters.accept(this) + ")";
        }

        if (node.functionName == "getDistance"){
            return "getDistance()";
        }

        

        return node.functionName + "(" + node.functionparameters.accept(this) + ")";
    }

    visitFunctionCallParameters(node: FunctionCallParametersNode) {
        var ret = "";
        node.expr.forEach( (element,i) => {
            if (i == node.expr.length - 1){
                ret = ret.concat(element.accept(this));
            }
            else{
                ret = ret.concat(element.accept(this) + ",");
            }
        });
        return ret;
    }

    visitAffectation(node: AffectationNode) {
        return node.variable.Name + " = " + node.Right.accept(this);
    }

    visitAnd(node: AndNode) {
        return node.Left.accept(this) + "&&" + node.Right.accept(this);  
    }

    visitOr(node: OrNode) {
        return node.Left.accept(this) + "||" + node.Right.accept(this);    
    }

    visitNot(node: NotNode) {
        return "!" + node.right.accept(this);    
    }

    visitEquals(node: EqualsNode) {

        return node.Left.accept(this) + "==" + node.Right.accept(this);    
    }

    visitif(node: IfNode) {
        var ret = "if (" + node.Condition.accept(this) + ")\n" + node.Body.accept(this) + "\n\n";

        node.Elsez.forEach(element => {
            ret = ret.concat("else" + element.accept(this));
        });
        return ret;
    
    }

    visitWhile(node: WhileNode) {
        
        const ret = "while (" + node.Condition.accept(this) + "){\n" + node.Body.accept(this) + "\n}\n";
        return ret;
    }

    visitMoreThan(node: MoreThanNode) {
        return parseInt(node.Left.accept(this)) + ">" +  parseInt(node.Right.accept(this));  
    }

    visitLessThan(node: LessThanNode) {

        return node.Left.accept(this) + "<" + node.Right.accept(this);    
    }

    visitFunctionDefinitionParameters(node: FunctionDefinitionParametersNode) {
        var ret = "";
        node.variabledefinition.forEach( (element,i) => {
            if (i == node.variabledefinition.length - 1){
                ret = ret.concat(element.accept(this));
            }
            else{
                ret = ret.concat(element.accept(this) + ",");
            }
        });
        return ret;
        
    }

    visitReturn(node: ReturnNode) {
        return "return " + node.returnedExpr.accept(this);
    }

}

