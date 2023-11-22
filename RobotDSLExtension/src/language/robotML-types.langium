
interface Addition extends BinaryExpr {
}

interface BinaryExpr extends Expr {
	Left: Expr
	Right: Expr
}

interface Expr extends Statment {
}

interface Statment {
}

interface Type {
}

interface Unit {
}

interface And extends BinaryExpr {
}

interface Or extends BinaryExpr {
}

interface Multiplication extends BinaryExpr {
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

interface FunctionCall extends Expr {
	functionparameters: FunctionCallParameters
	FunctionName: string
	function?: @Function_
}

interface FunctionCallParameters {
	expr: Expr[]
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

interface FunctionDefinitionParameters {
	variabledefinition: VariableDefinition[]
}

interface VariableDefinition extends Statment {
	^type: Type
	left?: Expr
	VariableName: string
}

interface LessThan extends BinaryExpr {
}

interface Equals extends BinaryExpr {
}

interface MoreThan extends BinaryExpr {
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
	VariableName: string
}

interface RbLoop extends ConditionnalStructure {
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

