
import { functionCallNode } from "./nodes/FunctionCallNode.js";
import { VariableNode } from "./nodes/VariableNode.js";
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


export class InterpretorVisitor implements MyDslVisitor {
    public venv: Map<string, any> = new Map<string, any>();
    constructor() {
    
    }

    visit(model: programNode): any {
        this.visitProgram(model);
    }

    visitProgram(node: programNode): any {
        node.function.forEach(element => {
            element.accept(this);
        });
    }

    visitFunction_(node: functionNode): any {

        node.Body.accept(this);

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
        return (node.Value as boolean).valueOf() ;
    }

    visitExpr(node: ExprNode){
        return node.accept(this);
    }

    visitVariableDefinition(node:VariableDefinitionNode){
        const value = (node.left as ExprNode).accept(this);
        this.venv.set(node.variable.Name, value);
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
        return this.venv.get(node.Name);
    }

    visitFunctionCall(node: functionCallNode){
        if(node.functionName == "print"){
            console.log(node.functionparameters.accept(this));
            return null;
        }

        if (node.functionName == "sqrt"){
            return Math.round(Math.sqrt(node.functionparameters.accept(this)[0]));
        }

        if (node.functionName == "getDistance"){
            return 0;
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
        this.venv.set(node.variable.Name, value);
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

}

