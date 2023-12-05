
interface Program {
	function: Function_[]
}

interface Function_ {
	Body: StatementBlock
	FunctionName: string
	^type: Type
	functiondefinitionparameters: FunctionDefinitionParameters
}

interface StatementBlock extends Statment {
	statments: Statment[]
}

interface Statment {
}

interface Type {
}

interface FunctionDefinitionParameters {
	variabledefinition: VariableDefinition[]
}

interface VariableDefinition extends Statment {
	^type: Type
	left?: Expr
	variable: Variable
}

interface Expr extends Statment {
}

interface Unit {
}

interface And extends BinaryExpr {
}

interface BinaryExpr extends Expr {
	Left: Expr
	Right: Expr
}

interface Or extends BinaryExpr {
}

interface Multiplication extends BinaryExpr {
}

interface Addition extends BinaryExpr {
}

interface Division extends BinaryExpr {
}

interface Soustraction extends BinaryExpr {
}

interface Not extends UnaryRightExpr {
}

interface UnaryRightExpr extends UnaryExpr {
	right: Expr
}

interface UnaryExpr extends Expr {
}

interface ConstNumber extends ConstantExpr {
	Value: number
}

interface ConstantExpr extends Expr {
}

interface ConstBoolean extends ConstantExpr {
	Value: boolean
}

interface Forward extends RobotInstruction {
	Value: Expr
	unit: Unit
}

interface RobotInstruction extends Statment {
}

interface Rotate extends RobotInstruction {
	Value: Expr
}

interface Affectation extends Statment {
	Right: Expr
	variable: Variable
}

interface Variable extends Expr {
	Name: string
}

interface FunctionCall extends Expr {
	functionparameters: FunctionCallParameters
	functionName:string
}

interface FunctionCallParameters {
	expr: Expr[]
}

interface LessThan extends BinaryExpr {
}

interface Equals extends BinaryExpr {
}

interface MoreThan extends BinaryExpr {
}

interface RbLoop extends ConditionnalStructure {
}

interface For extends ConditionnalStructure {
	Increment: Affectation | Expr
	Initialization: VariableDefinition | Variable
}

interface ConditionnalStructure extends Statment {
	Body: StatementBlock
	Condition: Expr
}

interface Ifz extends ConditionnalStructure {
	Elsez: StatementBlock[]
}

interface Rbreturn extends Statment {
	returnedExpr?: Expr
}

interface MM extends Unit {
}

interface CM extends Unit {
}

interface KM extends Unit {
}

interface Number_ extends Type {
}

interface Boolean extends Type {
}

interface Void extends Type {
}

interface Throw extends Statment {
	err: ConstString
}

interface ConstString extends ConstantExpr {
	Value: string
}