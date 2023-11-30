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
import { WhileNode } from "./nodes/WhileNode.js";
import { MoreThanNode } from "./nodes/MoreThanNode.js";
import { LessThanNode } from "./nodes/LessThanNode.js";
import { FunctionDefinitionParametersNode } from "./nodes/FunctionDefinitionParametersNode.js";
import { ReturnNode } from "./nodes/ReturnNode.js";
import { ForNode } from "./nodes/ForNode.js";
import { BooleanNode } from "./nodes/BooleanNode.js";
import { NumberNode } from "./nodes/NumberNode.js";
import { TypeNode } from "./nodes/TypeNode.js";
import { UnitNode } from "./nodes/UnitNode.js";
import { ForwardNode } from "./nodes/ForwardNode.js";
import { RotateNode } from "./nodes/RotateNode.js";

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
    visitif(node: any):any;
    visitWhile(node: WhileNode):any;
    visitMoreThan(node: MoreThanNode):any;
    visitLessThan(node: LessThanNode):any;
    visitFunctionDefinitionParameters(node: FunctionDefinitionParametersNode):any;
    visitReturn(node: ReturnNode):any;
    visitFor(node: ForNode):any;
    visitBoolean(node:BooleanNode) : any;
    visitNumber(node:NumberNode) : any;
    visitType(node:TypeNode) : any;
    visitUnit(node:UnitNode) : any;
    visitForward(node:ForwardNode) : any;
    visitRotate(node:RotateNode) : any;
}
