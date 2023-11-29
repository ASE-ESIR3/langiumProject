import { functionNode } from "./nodes/functionNode.js";
import { programNode } from "./nodes/programNode.js";
import { StatementNode } from "./nodes/statementNode.js";
import { StatementBlockNode} from "./nodes/statementBlockNode.js";
import { ExprNode } from "./nodes/ExprNode.js";
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

export interface MyDslVisitor {
    visitProgram(node: programNode): any;
    visitFunction_(node: functionNode): any;
    visitStatment(node: StatementNode): any;
    visitStatmentBlock(node: StatementBlockNode): any;
    visitExpr(node: ExprNode): any;
    visitVariableDefinition(node: VariableDefinitionNode):any;
    visitConstNumber(node: ConstNumberNode):any;
    visitAddition(node: AdditionNode ):any;
    visitMultiplication(node: MultiplicationNode ):any;
    visitSoustraction(node: SoustractionNode ):any;
    visitDivision(node: DivisionNode ):any;
    visitVariable(node: VariableNode):any;
    visitFunctionCall(node: functionCallNode):any;
    visitFunctionCallParameters(node: FunctionCallParametersNode):any;
    visitAffectation(node: AffectationNode):any;
    visitConstBoolean(node: ConstBooleanNode):any;
    visitOr(node: any):any;
    visitAnd(node: any):any;
    visitNot(node: any):any;
    visitEquals(node: any):any;
}