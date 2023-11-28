import { AdditionNode } from "./nodes/AdditionNode.js";
import { DivisionNode } from "./nodes/DivisionNode.js";
import { ExprNode } from "./nodes/ExprNode.js";
import { functionCallNode } from "./nodes/FunctionCallNode.js";
import { MultiplicationNode } from "./nodes/MultiplicationNode.js";
import { SoustractionNode } from "./nodes/SoustractionNode.js";
import { VariableDefinitionNode } from "./nodes/VariableDefinitionNode.js";
import { VariableNode } from "./nodes/VariableNode.js";
import { ConstNumberNode } from "./nodes/constNumberNode.js";
import { functionNode  } from "./nodes/functionNode.js";
import { programNode } from "./nodes/programNode.js";
import { StatementBlockNode } from "./nodes/statementBlockNode.js";
import { StatementNode } from "./nodes/statementNode.js";
import { MyDslVisitor } from "./visitor.js";

export class PrintVisitor implements MyDslVisitor {
    
    visit(model: programNode): any {
        this.visitProgram(model);
    }

    visitProgram(node: programNode): any {
        console.log("Program");
        console.log(node);
        node.function.forEach(element => {
            element.accept(this);
        });
    }

    visitFunction_(node: functionNode): any {
        console.log("Function_");
        console.log(node.FunctionName);
        return null;
    }

    visitStatment(node: StatementNode) {
        
    }

    visitStatmentBlock(node: StatementBlockNode) {
        
    }

    visitExpr(node: ExprNode) {
        
    }

    visitVariableDefinition(node: VariableDefinitionNode) {
        
    }

    visitConstNumber(node: ConstNumberNode) {
        
    }

    visitAddition(node: AdditionNode) {
        
    }

    visitMultiplication(node: MultiplicationNode) {
        
    }   

    visitSoustraction(node: SoustractionNode) {
        
    }

    visitDivision(node: DivisionNode) {
        
    }

    visitVariable(node: VariableNode) {
        
    }

    visitFunctionCall(node: functionCallNode) {
        
    }

}
