/******************************************************************************
 * This file was generated by langium-cli 2.0.1.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export const MyDslTerminals = {
    ID: /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/,
    INT: /[0-9]+/,
    STRING: /("((\\([\s\S]))|((?!(((\\|")|\n)|\r))[\s\S]*?))*(("|\n)|\r))/,
    ML_COMMENT: /(\/\*([\s\S]*?\*\/))/,
    SL_COMMENT: /(\/\/((?!(\n|\r))[\s\S]*?)(\r?\n)?)/,
    WS: /((( |	)|\r)|\n)+/,
};

export type EBoolean = boolean;

export function isEBoolean(item: unknown): item is EBoolean {
    return typeof item === 'boolean';
}

export type EInt = number;

export function isEInt(item: unknown): item is EInt {
    return typeof item === 'number';
}

export type EString = string;

export function isEString(item: unknown): item is EString {
    return (typeof item === 'string' && (/(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/.test(item)));
}

export interface Function_ extends AstNode {
    readonly $container: Program;
    readonly $type: 'Function_';
    Body: StatementBlock
    functiondefinitionparameters: FunctionDefinitionParameters
    FunctionName: string
    type: Type
}

export const Function_ = 'Function_';

export function isFunction_(item: unknown): item is Function_ {
    return reflection.isInstance(item, Function_);
}

export interface FunctionCallParameters extends AstNode {
    readonly $container: FunctionCall;
    readonly $type: 'FunctionCallParameters';
    expr: Array<Expr>
}

export const FunctionCallParameters = 'FunctionCallParameters';

export function isFunctionCallParameters(item: unknown): item is FunctionCallParameters {
    return reflection.isInstance(item, FunctionCallParameters);
}

export interface FunctionDefinitionParameters extends AstNode {
    readonly $container: Function_;
    readonly $type: 'FunctionDefinitionParameters';
    variabledefinition: Array<VariableDefinition>
}

export const FunctionDefinitionParameters = 'FunctionDefinitionParameters';

export function isFunctionDefinitionParameters(item: unknown): item is FunctionDefinitionParameters {
    return reflection.isInstance(item, FunctionDefinitionParameters);
}

export interface Program extends AstNode {
    readonly $type: 'Program';
    function: Array<Function_>
}

export const Program = 'Program';

export function isProgram(item: unknown): item is Program {
    return reflection.isInstance(item, Program);
}

export interface Statment extends AstNode {
    readonly $type: 'Addition' | 'Affectation' | 'And' | 'BinaryExpr' | 'Break' | 'ConditionnalStructure' | 'ConstBoolean' | 'ConstList' | 'ConstNumber' | 'ConstString' | 'ConstVoid' | 'ConstantExpr' | 'Division' | 'Equals' | 'Expr' | 'For' | 'Forward' | 'FunctionCall' | 'Ifz' | 'LessThan' | 'ListAccess' | 'MoreThan' | 'Multiplication' | 'Not' | 'Or' | 'RbLoop' | 'Rbreturn' | 'RobotInstruction' | 'Rotate' | 'Say' | 'Soustraction' | 'StatementBlock' | 'Statment' | 'Throw' | 'UnaryExpr' | 'UnaryRightExpr' | 'Variable' | 'VariableDefinition' | 'Wait';
}

export const Statment = 'Statment';

export function isStatment(item: unknown): item is Statment {
    return reflection.isInstance(item, Statment);
}

export interface Type extends AstNode {
    readonly $type: 'Boolean' | 'ListType' | 'Number_' | 'String_' | 'Type' | 'Void';
}

export const Type = 'Type';

export function isType(item: unknown): item is Type {
    return reflection.isInstance(item, Type);
}

export interface Unit extends AstNode {
    readonly $type: 'CM' | 'KM' | 'MM' | 'Unit';
}

export const Unit = 'Unit';

export function isUnit(item: unknown): item is Unit {
    return reflection.isInstance(item, Unit);
}

export interface Affectation extends Statment {
    readonly $container: For;
    readonly $type: 'Affectation';
    Right: Expr
    variable: ListAccess | Variable
}

export const Affectation = 'Affectation';

export function isAffectation(item: unknown): item is Affectation {
    return reflection.isInstance(item, Affectation);
}

export interface Break extends Statment {
    readonly $type: 'Break';
}

export const Break = 'Break';

export function isBreak(item: unknown): item is Break {
    return reflection.isInstance(item, Break);
}

export interface ConditionnalStructure extends Statment {
    readonly $type: 'ConditionnalStructure' | 'For' | 'Ifz' | 'RbLoop';
    Body: StatementBlock
    Condition: Expr
}

export const ConditionnalStructure = 'ConditionnalStructure';

export function isConditionnalStructure(item: unknown): item is ConditionnalStructure {
    return reflection.isInstance(item, ConditionnalStructure);
}

export interface Expr extends Statment {
    readonly $type: 'Addition' | 'And' | 'BinaryExpr' | 'ConstBoolean' | 'ConstList' | 'ConstNumber' | 'ConstString' | 'ConstVoid' | 'ConstantExpr' | 'Division' | 'Equals' | 'Expr' | 'FunctionCall' | 'LessThan' | 'ListAccess' | 'MoreThan' | 'Multiplication' | 'Not' | 'Or' | 'Soustraction' | 'UnaryExpr' | 'UnaryRightExpr' | 'Variable';
}

export const Expr = 'Expr';

export function isExpr(item: unknown): item is Expr {
    return reflection.isInstance(item, Expr);
}

export interface Rbreturn extends Statment {
    readonly $type: 'Rbreturn';
    returnedExpr?: Expr
}

export const Rbreturn = 'Rbreturn';

export function isRbreturn(item: unknown): item is Rbreturn {
    return reflection.isInstance(item, Rbreturn);
}

export interface RobotInstruction extends Statment {
    readonly $type: 'Forward' | 'RobotInstruction' | 'Rotate';
}

export const RobotInstruction = 'RobotInstruction';

export function isRobotInstruction(item: unknown): item is RobotInstruction {
    return reflection.isInstance(item, RobotInstruction);
}

export interface Say extends Statment {
    readonly $type: 'Say';
    msg: Array<Expr>
}

export const Say = 'Say';

export function isSay(item: unknown): item is Say {
    return reflection.isInstance(item, Say);
}

export interface StatementBlock extends Statment {
    readonly $container: ConditionnalStructure | Function_ | Ifz;
    readonly $type: 'StatementBlock';
    statments: Array<Statment>
}

export const StatementBlock = 'StatementBlock';

export function isStatementBlock(item: unknown): item is StatementBlock {
    return reflection.isInstance(item, StatementBlock);
}

export interface Throw extends Statment {
    readonly $type: 'Throw';
    err: ConstString
}

export const Throw = 'Throw';

export function isThrow(item: unknown): item is Throw {
    return reflection.isInstance(item, Throw);
}

export interface VariableDefinition extends Statment {
    readonly $container: For | FunctionDefinitionParameters;
    readonly $type: 'VariableDefinition';
    left?: Expr
    type: Type
    variable: Variable
}

export const VariableDefinition = 'VariableDefinition';

export function isVariableDefinition(item: unknown): item is VariableDefinition {
    return reflection.isInstance(item, VariableDefinition);
}

export interface Wait extends Statment {
    readonly $type: 'Wait';
    time: Expr
}

export const Wait = 'Wait';

export function isWait(item: unknown): item is Wait {
    return reflection.isInstance(item, Wait);
}

export interface Boolean extends Type {
    readonly $type: 'Boolean';
}

export const Boolean = 'Boolean';

export function isBoolean(item: unknown): item is Boolean {
    return reflection.isInstance(item, Boolean);
}

export interface ListType extends Type {
    readonly $type: 'ListType';
    type: Type
}

export const ListType = 'ListType';

export function isListType(item: unknown): item is ListType {
    return reflection.isInstance(item, ListType);
}

export interface Number_ extends Type {
    readonly $type: 'Number_';
}

export const Number_ = 'Number_';

export function isNumber_(item: unknown): item is Number_ {
    return reflection.isInstance(item, Number_);
}

export interface String_ extends Type {
    readonly $type: 'String_';
}

export const String_ = 'String_';

export function isString_(item: unknown): item is String_ {
    return reflection.isInstance(item, String_);
}

export interface Void extends Type {
    readonly $type: 'Void';
}

export const Void = 'Void';

export function isVoid(item: unknown): item is Void {
    return reflection.isInstance(item, Void);
}

export interface CM extends Unit {
    readonly $type: 'CM';
}

export const CM = 'CM';

export function isCM(item: unknown): item is CM {
    return reflection.isInstance(item, CM);
}

export interface KM extends Unit {
    readonly $type: 'KM';
}

export const KM = 'KM';

export function isKM(item: unknown): item is KM {
    return reflection.isInstance(item, KM);
}

export interface MM extends Unit {
    readonly $type: 'MM';
}

export const MM = 'MM';

export function isMM(item: unknown): item is MM {
    return reflection.isInstance(item, MM);
}

export interface For extends ConditionnalStructure {
    readonly $type: 'For';
    Increment: Affectation | Expr
    Initialization: Variable | VariableDefinition
}

export const For = 'For';

export function isFor(item: unknown): item is For {
    return reflection.isInstance(item, For);
}

export interface Ifz extends ConditionnalStructure {
    readonly $type: 'Ifz';
    Elsez: Array<StatementBlock>
}

export const Ifz = 'Ifz';

export function isIfz(item: unknown): item is Ifz {
    return reflection.isInstance(item, Ifz);
}

export interface RbLoop extends ConditionnalStructure {
    readonly $type: 'RbLoop';
}

export const RbLoop = 'RbLoop';

export function isRbLoop(item: unknown): item is RbLoop {
    return reflection.isInstance(item, RbLoop);
}

export interface BinaryExpr extends Expr {
    readonly $type: 'Addition' | 'And' | 'BinaryExpr' | 'Division' | 'Equals' | 'LessThan' | 'MoreThan' | 'Multiplication' | 'Or' | 'Soustraction';
    Left: Expr
    Right: Expr
}

export const BinaryExpr = 'BinaryExpr';

export function isBinaryExpr(item: unknown): item is BinaryExpr {
    return reflection.isInstance(item, BinaryExpr);
}

export interface ConstantExpr extends Expr {
    readonly $type: 'ConstBoolean' | 'ConstList' | 'ConstNumber' | 'ConstString' | 'ConstVoid' | 'ConstantExpr';
}

export const ConstantExpr = 'ConstantExpr';

export function isConstantExpr(item: unknown): item is ConstantExpr {
    return reflection.isInstance(item, ConstantExpr);
}

export interface FunctionCall extends Expr {
    readonly $type: 'FunctionCall';
    functionName: string
    functionparameters: FunctionCallParameters
}

export const FunctionCall = 'FunctionCall';

export function isFunctionCall(item: unknown): item is FunctionCall {
    return reflection.isInstance(item, FunctionCall);
}

export interface ListAccess extends Expr {
    readonly $container: Affectation;
    readonly $type: 'ListAccess';
    index: Expr
    variable: Variable
}

export const ListAccess = 'ListAccess';

export function isListAccess(item: unknown): item is ListAccess {
    return reflection.isInstance(item, ListAccess);
}

export interface UnaryExpr extends Expr {
    readonly $type: 'Not' | 'UnaryExpr' | 'UnaryRightExpr';
}

export const UnaryExpr = 'UnaryExpr';

export function isUnaryExpr(item: unknown): item is UnaryExpr {
    return reflection.isInstance(item, UnaryExpr);
}

export interface Variable extends Expr {
    readonly $container: Affectation | For | ListAccess | VariableDefinition;
    readonly $type: 'Variable';
    Name: string
}

export const Variable = 'Variable';

export function isVariable(item: unknown): item is Variable {
    return reflection.isInstance(item, Variable);
}

export interface Forward extends RobotInstruction {
    readonly $type: 'Forward';
    unit: Unit
    Value: Expr
}

export const Forward = 'Forward';

export function isForward(item: unknown): item is Forward {
    return reflection.isInstance(item, Forward);
}

export interface Rotate extends RobotInstruction {
    readonly $type: 'Rotate';
    Value: Expr
}

export const Rotate = 'Rotate';

export function isRotate(item: unknown): item is Rotate {
    return reflection.isInstance(item, Rotate);
}

export interface Addition extends BinaryExpr {
    readonly $type: 'Addition';
}

export const Addition = 'Addition';

export function isAddition(item: unknown): item is Addition {
    return reflection.isInstance(item, Addition);
}

export interface And extends BinaryExpr {
    readonly $type: 'And';
}

export const And = 'And';

export function isAnd(item: unknown): item is And {
    return reflection.isInstance(item, And);
}

export interface Division extends BinaryExpr {
    readonly $type: 'Division';
}

export const Division = 'Division';

export function isDivision(item: unknown): item is Division {
    return reflection.isInstance(item, Division);
}

export interface Equals extends BinaryExpr {
    readonly $type: 'Equals';
}

export const Equals = 'Equals';

export function isEquals(item: unknown): item is Equals {
    return reflection.isInstance(item, Equals);
}

export interface LessThan extends BinaryExpr {
    readonly $type: 'LessThan';
}

export const LessThan = 'LessThan';

export function isLessThan(item: unknown): item is LessThan {
    return reflection.isInstance(item, LessThan);
}

export interface MoreThan extends BinaryExpr {
    readonly $type: 'MoreThan';
}

export const MoreThan = 'MoreThan';

export function isMoreThan(item: unknown): item is MoreThan {
    return reflection.isInstance(item, MoreThan);
}

export interface Multiplication extends BinaryExpr {
    readonly $type: 'Multiplication';
}

export const Multiplication = 'Multiplication';

export function isMultiplication(item: unknown): item is Multiplication {
    return reflection.isInstance(item, Multiplication);
}

export interface Or extends BinaryExpr {
    readonly $type: 'Or';
}

export const Or = 'Or';

export function isOr(item: unknown): item is Or {
    return reflection.isInstance(item, Or);
}

export interface Soustraction extends BinaryExpr {
    readonly $type: 'Soustraction';
}

export const Soustraction = 'Soustraction';

export function isSoustraction(item: unknown): item is Soustraction {
    return reflection.isInstance(item, Soustraction);
}

export interface ConstBoolean extends ConstantExpr {
    readonly $type: 'ConstBoolean';
    Value: boolean
}

export const ConstBoolean = 'ConstBoolean';

export function isConstBoolean(item: unknown): item is ConstBoolean {
    return reflection.isInstance(item, ConstBoolean);
}

export interface ConstList extends ConstantExpr {
    readonly $type: 'ConstList';
    Values: Array<Expr>
}

export const ConstList = 'ConstList';

export function isConstList(item: unknown): item is ConstList {
    return reflection.isInstance(item, ConstList);
}

export interface ConstNumber extends ConstantExpr {
    readonly $type: 'ConstNumber';
    Value: number
}

export const ConstNumber = 'ConstNumber';

export function isConstNumber(item: unknown): item is ConstNumber {
    return reflection.isInstance(item, ConstNumber);
}

export interface ConstString extends ConstantExpr {
    readonly $container: Throw;
    readonly $type: 'ConstString';
    Value: string
}

export const ConstString = 'ConstString';

export function isConstString(item: unknown): item is ConstString {
    return reflection.isInstance(item, ConstString);
}

export interface ConstVoid extends ConstantExpr {
    readonly $type: 'ConstVoid';
}

export const ConstVoid = 'ConstVoid';

export function isConstVoid(item: unknown): item is ConstVoid {
    return reflection.isInstance(item, ConstVoid);
}

export interface UnaryRightExpr extends UnaryExpr {
    readonly $type: 'Not' | 'UnaryRightExpr';
    right: Expr
}

export const UnaryRightExpr = 'UnaryRightExpr';

export function isUnaryRightExpr(item: unknown): item is UnaryRightExpr {
    return reflection.isInstance(item, UnaryRightExpr);
}

export interface Not extends UnaryRightExpr {
    readonly $type: 'Not';
}

export const Not = 'Not';

export function isNot(item: unknown): item is Not {
    return reflection.isInstance(item, Not);
}

export type MyDslAstType = {
    Addition: Addition
    Affectation: Affectation
    And: And
    BinaryExpr: BinaryExpr
    Boolean: Boolean
    Break: Break
    CM: CM
    ConditionnalStructure: ConditionnalStructure
    ConstBoolean: ConstBoolean
    ConstList: ConstList
    ConstNumber: ConstNumber
    ConstString: ConstString
    ConstVoid: ConstVoid
    ConstantExpr: ConstantExpr
    Division: Division
    Equals: Equals
    Expr: Expr
    For: For
    Forward: Forward
    FunctionCall: FunctionCall
    FunctionCallParameters: FunctionCallParameters
    FunctionDefinitionParameters: FunctionDefinitionParameters
    Function_: Function_
    Ifz: Ifz
    KM: KM
    LessThan: LessThan
    ListAccess: ListAccess
    ListType: ListType
    MM: MM
    MoreThan: MoreThan
    Multiplication: Multiplication
    Not: Not
    Number_: Number_
    Or: Or
    Program: Program
    RbLoop: RbLoop
    Rbreturn: Rbreturn
    RobotInstruction: RobotInstruction
    Rotate: Rotate
    Say: Say
    Soustraction: Soustraction
    StatementBlock: StatementBlock
    Statment: Statment
    String_: String_
    Throw: Throw
    Type: Type
    UnaryExpr: UnaryExpr
    UnaryRightExpr: UnaryRightExpr
    Unit: Unit
    Variable: Variable
    VariableDefinition: VariableDefinition
    Void: Void
    Wait: Wait
}

export class MyDslAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['Addition', 'Affectation', 'And', 'BinaryExpr', 'Boolean', 'Break', 'CM', 'ConditionnalStructure', 'ConstBoolean', 'ConstList', 'ConstNumber', 'ConstString', 'ConstVoid', 'ConstantExpr', 'Division', 'Equals', 'Expr', 'For', 'Forward', 'FunctionCall', 'FunctionCallParameters', 'FunctionDefinitionParameters', 'Function_', 'Ifz', 'KM', 'LessThan', 'ListAccess', 'ListType', 'MM', 'MoreThan', 'Multiplication', 'Not', 'Number_', 'Or', 'Program', 'RbLoop', 'Rbreturn', 'RobotInstruction', 'Rotate', 'Say', 'Soustraction', 'StatementBlock', 'Statment', 'String_', 'Throw', 'Type', 'UnaryExpr', 'UnaryRightExpr', 'Unit', 'Variable', 'VariableDefinition', 'Void', 'Wait'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            case Addition:
            case And:
            case Division:
            case Equals:
            case LessThan:
            case MoreThan:
            case Multiplication:
            case Or:
            case Soustraction: {
                return this.isSubtype(BinaryExpr, supertype);
            }
            case Affectation:
            case Break:
            case ConditionnalStructure:
            case Expr:
            case Rbreturn:
            case RobotInstruction:
            case Say:
            case StatementBlock:
            case Throw:
            case VariableDefinition:
            case Wait: {
                return this.isSubtype(Statment, supertype);
            }
            case BinaryExpr:
            case ConstantExpr:
            case FunctionCall:
            case ListAccess:
            case UnaryExpr:
            case Variable: {
                return this.isSubtype(Expr, supertype);
            }
            case Boolean:
            case ListType:
            case Number_:
            case String_:
            case Void: {
                return this.isSubtype(Type, supertype);
            }
            case CM:
            case KM:
            case MM: {
                return this.isSubtype(Unit, supertype);
            }
            case ConstBoolean:
            case ConstList:
            case ConstNumber:
            case ConstString:
            case ConstVoid: {
                return this.isSubtype(ConstantExpr, supertype);
            }
            case For:
            case Ifz:
            case RbLoop: {
                return this.isSubtype(ConditionnalStructure, supertype);
            }
            case Forward:
            case Rotate: {
                return this.isSubtype(RobotInstruction, supertype);
            }
            case Not: {
                return this.isSubtype(UnaryRightExpr, supertype);
            }
            case UnaryRightExpr: {
                return this.isSubtype(UnaryExpr, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'FunctionCallParameters': {
                return {
                    name: 'FunctionCallParameters',
                    mandatory: [
                        { name: 'expr', type: 'array' }
                    ]
                };
            }
            case 'FunctionDefinitionParameters': {
                return {
                    name: 'FunctionDefinitionParameters',
                    mandatory: [
                        { name: 'variabledefinition', type: 'array' }
                    ]
                };
            }
            case 'Program': {
                return {
                    name: 'Program',
                    mandatory: [
                        { name: 'function', type: 'array' }
                    ]
                };
            }
            case 'Say': {
                return {
                    name: 'Say',
                    mandatory: [
                        { name: 'msg', type: 'array' }
                    ]
                };
            }
            case 'StatementBlock': {
                return {
                    name: 'StatementBlock',
                    mandatory: [
                        { name: 'statments', type: 'array' }
                    ]
                };
            }
            case 'Ifz': {
                return {
                    name: 'Ifz',
                    mandatory: [
                        { name: 'Elsez', type: 'array' }
                    ]
                };
            }
            case 'ConstBoolean': {
                return {
                    name: 'ConstBoolean',
                    mandatory: [
                        { name: 'Value', type: 'boolean' }
                    ]
                };
            }
            case 'ConstList': {
                return {
                    name: 'ConstList',
                    mandatory: [
                        { name: 'Values', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new MyDslAstReflection();
