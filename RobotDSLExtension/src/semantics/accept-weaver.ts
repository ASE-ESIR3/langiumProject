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

        (<any> node).accept = (visitor: MyDslVisitor) => {return visitor.visitProgram(node as unknown as programNode);}
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

    checks: ValidationChecks<MyDslAstType> = {
        Program : this.weaveProgram,
        Function_ : this.weaveFunction_,
        StatementBlock : this.weaveStatmentBlock,
        Statment : this.weaveStatment,
        Expr: this.weaveExpr,
        VariableDefinition: this.weaveVaribaleDefinition,
        ConstNumber: this.weaveConstNumber,
        Addition: this.weaveAddition,
        Multiplication: this.weaveMultiplication,
        Soustraction: this.weaveSoustraction,
        Division: this.weaveDivision

    };

}
