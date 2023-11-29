grammar MyDsl
import 'Terminals'
import 'robotML-types'

entry Program returns Program:
    (function+=Function_ )*
;

Type returns Type:
    Number_ | Boolean | Void 
;

Statment returns Statment:
    (And | Or | Multiplication | Addition | Division | Soustraction | Not | ConstNumber | ConstBoolean | StatementBlock | Forward | Rotate | Affectation | VariableDefinition | FunctionCall | LessThan | Equals | MoreThan | RbLoop | Ifz | Rbreturn | Variable )';'
;

Expr returns Expr:
    And | Or | Multiplication | Addition | Division | Soustraction | Not | ConstNumber | ConstBoolean | FunctionCall | LessThan | Equals | MoreThan | Variable
;


Unit returns Unit:
    MM | CM | KM 
;


StatementBlock returns StatementBlock:
    '{' ( statments+=Statment  )*  '}'  
;

EString returns string:
    STRING | ID 
;

FunctionDefinitionParameters returns FunctionDefinitionParameters:
    ( variabledefinition+=VariableDefinition ","? )*
;

And returns And:
    '(' Left=Expr  'and' Right=Expr  ')'
;

Or returns Or:
    '(' Left=Expr 'or' Right=Expr ')'
;

Multiplication returns Multiplication:
    '(' Left=Expr '*' Right=Expr ')'
;

Addition returns Addition:
    '(' Left=Expr  '+' Right=Expr ')'
;

Division returns Division:
    '(' Left=Expr '/' Right=Expr ')'
;


Soustraction returns Soustraction:
    '(' Left=Expr '-' Right=Expr ')'
;

Not returns Not:
    'not' right=Expr
;

ConstNumber returns ConstNumber:
    Value=EInt  
;

ConstBoolean returns ConstBoolean:
    Value=EBoolean
;

Forward returns Forward:
    'Forward' Value=Expr unit=Unit  
;

Rotate returns Rotate:
    'Rotate' Value=Expr
;

Affectation returns Affectation:
    variable=Variable '=' Right=Expr   
;

VariableDefinition returns VariableDefinition:
    ^type=Type variable = Variable ('='( left=Expr  ))?  
;

Function_ returns Function_:
    ^type=Type FunctionName=EString '('  functiondefinitionparameters=FunctionDefinitionParameters ')' Body=StatementBlock  
;

FunctionCall returns FunctionCall:
    functionName=EString '(' functionparameters=FunctionCallParameters  ')'  
;

LessThan returns LessThan:
    '(' Left=Expr '<' Right=Expr ')'
;

Equals returns Equals:
    '(' Left=Expr '==' Right=Expr  ')'
;

MoreThan returns MoreThan:
    '(' Left=Expr '>' Right=Expr ')'
;

RbLoop returns RbLoop:
    'while(' Condition=Expr ')' Body=StatementBlock  
;

Ifz returns Ifz:
    'if(' Condition=Expr ')' Body=StatementBlock ('else' ( Elsez+=StatementBlock  )* )?
;

Rbreturn returns Rbreturn:
    'return' ( returnedExpr=Expr  )?  
;

EInt returns number:
    '-'? INT  
;

EBoolean returns boolean:
    'true' | 'false' 
;

MM returns MM:
    {MM} 'MM'  
;

CM returns CM:
    {CM} 'CM'  
;

KM returns KM:
    {KM} 'KM'  
;

FunctionCallParameters returns FunctionCallParameters:
    ( expr+=Expr ","? )*  
;

Number_ returns Number_:
    {Number_} 'Number'  
;

Boolean returns Boolean:
    {Boolean} 'Boolean'  
;

Void returns Void:
    {Void} 'Void'  
;

Variable returns Variable:
    Name=EString
;