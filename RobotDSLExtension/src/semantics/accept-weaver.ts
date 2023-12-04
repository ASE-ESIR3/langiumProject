import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MyDslAstType } from '../language/generated/ast.js';
import * as InterfaceAST from '../language/generated/ast.js';
import type { MyDslServices } from '../language/my-dsl-module.js';
import { programNode } from './nodes/programNode.js';
import { functionNode } from './nodes/functionNode.js';
import { MyDslVisitor } from './visitor.js';
import { StatementBlockNode } from './nodes/statementBlockNode.js';
import { StatementNode } from './nodes/statementNode.js';
import { ExprNode } from './nodes/ExprNode.js';
import { VariableDefinitionNode } from './nodes/VariableDefinitionNode.js';
import { ConstNumberNode } from './nodes/constNumberNode.js';
import { AdditionNode } from './nodes/AdditionNode.js';
import { MultiplicationNode } from './nodes/MultiplicationNode.js';
import { SoustractionNode } from './nodes/SoustractionNode.js';
import { DivisionNode } from './nodes/DivisionNode.js';
import { VariableNode } from './nodes/VariableNode.js';
import { functionCallNode } from './nodes/FunctionCallNode.js';
import { FunctionCallParametersNode } from './nodes/FunctionCallParameterNode.js';
import { AffectationNode } from './nodes/AffectationNode.js';
import { ConstBooleanNode } from './nodes/ConstBooleanNode.js';
import { EqualsNode } from './nodes/equalsNode.js';
import { NotNode } from './nodes/NotNode.js';
import { AndNode } from './nodes/AndNode.js';
import { OrNode } from './nodes/OrNode.js';
import { IfNode } from './nodes/IfNode.js';
import { WhileNode } from './nodes/WhileNode.js';
import { MoreThanNode } from './nodes/MoreThanNode.js';
import { LessThanNode } from './nodes/LessThanNode.js';
import { FunctionDefinitionParametersNode } from './nodes/FunctionDefinitionParametersNode.js';
import { ReturnNode } from './nodes/ReturnNode.js';
import { ForNode } from './nodes/ForNode.js';
import { BooleanNode } from './nodes/BooleanNode.js';
import { NumberNode } from './nodes/NumberNode.js';
import { TypeNode } from './nodes/TypeNode.js';
import { UnitNode } from './nodes/UnitNode.js';
import { ForwardNode } from './nodes/ForwardNode.js';
import { RotateNode } from './nodes/RotateNode.js';


/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: MyDslServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new MyDslAcceptWeaver;
    registry.register(weaver.checks, weaver);
}

/**
 * TODO :
 * You must implement a weaving function for each concrete concept of the language.
 * you will also need to fill the check data structure to map the weaving function to the Type of node
 */
export class MyDslAcceptWeaver {
    weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void{

        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitProgram(node as programNode);}
    }

    weaveFunction_(node : InterfaceAST.Function_, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitFunction_(node as functionNode);}
    }

    weaveStatmentBlock(node : InterfaceAST.StatementBlock, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitStatmentBlock(node as StatementBlockNode);}
    }

    weaveStatment(node : InterfaceAST.Statment, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitStatment(node as StatementNode);}
    }

    weaveExpr(node : InterfaceAST.Expr, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitExpr(node as ExprNode);}
    }

    weaveVaribaleDefinition(node : InterfaceAST.VariableDefinition, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitVariableDefinition(node as VariableDefinitionNode);}
    }

    weaveConstNumber(node : InterfaceAST.ConstNumber, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitConstNumber(node as ConstNumberNode);}
    }

    weaveAddition(node : InterfaceAST.Addition, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitAddition(node as AdditionNode);}
    }

    weaveSoustraction(node : InterfaceAST.Soustraction, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitSoustraction(node as SoustractionNode);}
    }

    weaveMultiplication(node : InterfaceAST.Multiplication, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitMultiplication(node as MultiplicationNode);}
    }

    weaveDivision(node : InterfaceAST.Division, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitDivision(node as DivisionNode);}
    }

    weaveVariable(node : InterfaceAST.Variable, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitVariable(node as VariableNode);}
    }

    weaveFunctionCall(node : InterfaceAST.FunctionCall, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitFunctionCall(node as functionCallNode);}
    }

    weaveFunctionCallParameters(node : InterfaceAST.FunctionCallParameters, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitFunctionCallParameters(node as FunctionCallParametersNode);}
    }

    weaveAffectation(node : InterfaceAST.Affectation, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitAffectation(node as AffectationNode);}
    }

    weaveConstBoolean(node : InterfaceAST.ConstBoolean, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitConstBoolean(node as ConstBooleanNode);}
    }

    weaveOr(node : InterfaceAST.Or, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitOr(node as OrNode);}
    }

    weaveAnd(node : InterfaceAST.And, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitAnd(node as AndNode);}
    }

    weaveNot(node : InterfaceAST.Not, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitNot(node as NotNode);}
    }

    weaveEquals(node : InterfaceAST.Equals, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitEquals(node as EqualsNode);}
    }

    weaveIf(node : InterfaceAST.Ifz, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitif(node as IfNode);}
    }

    weaveWhile(node : InterfaceAST.RbLoop, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitWhile(node as WhileNode);}
    }

    weaveFor(node : InterfaceAST.For, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitFor(node as ForNode);}
    }

    weaveMoreThan(node : InterfaceAST.MoreThan, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitMoreThan(node as MoreThanNode);}
    }

    weaveLessThan(node : InterfaceAST.LessThan, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitLessThan(node as LessThanNode);}
    }

    weaveFunctionDefinitionParameters(node : InterfaceAST.FunctionDefinitionParameters, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitFunctionDefinitionParameters(node as FunctionDefinitionParametersNode);}
    }

    weaveReturn(node : InterfaceAST.Rbreturn, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitReturn(node as ReturnNode);}
    }

    weaveBoolean(node : InterfaceAST.Boolean, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitBoolean(node as BooleanNode);}
    }

    weaveNumber(node : InterfaceAST.Number_, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitNumber(node as NumberNode);}
    }

    weaveType(node : InterfaceAST.Type, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitType(node as TypeNode);}
    }

    weaveUnit(node : InterfaceAST.Unit, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitUnit(node as UnitNode);}
    }

    weaveForward(node : InterfaceAST.Forward, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitForward(node as ForwardNode);}
    }

    weaveRotate(node : InterfaceAST.Rotate, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitRotate(node as RotateNode);}
    }

    checks: ValidationChecks<MyDslAstType> = {
        Program : this.weaveProgram,
        Function_ : this.weaveFunction_,
        StatementBlock : this.weaveStatmentBlock,
        Statment : this.weaveStatment,
        //Expr: this.weaveExpr,
        VariableDefinition: this.weaveVaribaleDefinition,
        ConstNumber: this.weaveConstNumber,
        ConstBoolean: this.weaveConstBoolean,
        Addition: this.weaveAddition,
        Multiplication: this.weaveMultiplication,
        Soustraction: this.weaveSoustraction,
        Division: this.weaveDivision,
        Variable: this.weaveVariable,
        FunctionCall: this.weaveFunctionCall,
        FunctionCallParameters: this.weaveFunctionCallParameters,
        Affectation: this.weaveAffectation,
        Or: this.weaveOr,
        And: this.weaveAnd,
        Not: this.weaveNot,
        Equals: this.weaveEquals,
        Ifz: this.weaveIf,
        RbLoop: this.weaveWhile,
        LessThan: this.weaveLessThan,
        MoreThan: this.weaveMoreThan,
        FunctionDefinitionParameters: this.weaveFunctionDefinitionParameters, 
        Rbreturn: this.weaveReturn,
        For: this.weaveFor,
        Number_: this.weaveNumber,
        Boolean: this.weaveBoolean,
        Type: this.weaveType,
        Unit: this.weaveUnit,
        Forward: this.weaveForward,
        Rotate: this.weaveRotate,

    };

}
