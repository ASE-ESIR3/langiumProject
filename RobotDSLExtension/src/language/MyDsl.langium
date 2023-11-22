grammar MyDsl
import 'Terminals'
import 'robotML-types'

entry Addition returns Addition:
    'Addition' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Expr returns Expr:
    And | Or | Multiplication | Addition | Division | Soustraction | Not | ConstNumber | ConstBoolean | FunctionCall | LessThan | Equals | MoreThan 
;

Type returns Type:
    Number_ | Boolean | Void 
;

Statment returns Statment:
    And | Or | Multiplication | Addition | Division | Soustraction | Not | ConstNumber | ConstBoolean | StatementBlock | Forward | Rotate | Affectation | VariableDefinition | FunctionCall | LessThan | Equals | MoreThan | RbLoop | Ifz | Rbreturn 
;

Unit returns Unit:
    MM | CM | KM 
;

And returns And:
    'And' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Or returns Or:
    'Or' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Multiplication returns Multiplication:
    'Multiplication' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Division returns Division:
    'Division' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Soustraction returns Soustraction:
    'Soustraction' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Not returns Not:
    'Not' '{' 'right' right=Expr  '}'  
;

ConstNumber returns ConstNumber:
    'ConstNumber' '{' 'Value' Value=EInt  '}'  
;

ConstBoolean returns ConstBoolean:
    Value?='Value'  'ConstBoolean'  
;

FunctionCall returns FunctionCall:
    'FunctionCall' '{' 'FunctionName' FunctionName=EString  ('function' function=[Function_:EString ] )? 'functionparameters' functionparameters=FunctionCallParameters  '}'  
;

LessThan returns LessThan:
    'LessThan' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

Equals returns Equals:
    'Equals' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

MoreThan returns MoreThan:
    'MoreThan' '{' 'Left' Left=Expr  'Right' Right=Expr  '}'  
;

EInt returns number:
    '-'? INT  
;

EBoolean returns boolean:
    'true' | 'false' 
;

FunctionCallParameters returns FunctionCallParameters:
    {FunctionCallParameters} 'FunctionCallParameters' '{' ('expr' '{' expr+=Expr  ("," expr+=Expr  )* '}' )? '}'  
;

EString returns string:
    STRING | ID 
;

Function_ returns Function_:
    'Function_' '{' 'FunctionName' FunctionName=EString  'Body' Body=StatementBlock  'type' ^type=Type  'functiondefinitionparameters' functiondefinitionparameters=FunctionDefinitionParameters  '}'  
;

StatementBlock returns StatementBlock:
    {StatementBlock} 'StatementBlock' '{' ('statments' '{' statments+=Statment  ("," statments+=Statment  )* '}' )? '}'  
;

FunctionDefinitionParameters returns FunctionDefinitionParameters:
    {FunctionDefinitionParameters} 'FunctionDefinitionParameters' '{' ('variabledefinition' '{' variabledefinition+=VariableDefinition  ("," variabledefinition+=VariableDefinition  )* '}' )? '}'  
;

Forward returns Forward:
    'Forward' '{' 'Value' Value=Expr  'unit' unit=Unit  '}'  
;

Rotate returns Rotate:
    'Rotate' '{' 'Value' Value=Expr  '}'  
;

Affectation returns Affectation:
    'Affectation' '{' 'VariableName' VariableName=EString  'Right' Right=Expr  '}'  
;

VariableDefinition returns VariableDefinition:
    'VariableDefinition' '{' 'VariableName' VariableName=EString  'type' ^type=Type  ('left' left=Expr  )? '}'  
;

RbLoop returns RbLoop:
    'RbLoop' '{' 'Body' Body=StatementBlock  'Condition' Condition=Expr  '}'  
;

Ifz returns Ifz:
    'Ifz' '{' 'Body' Body=StatementBlock  'Condition' Condition=Expr  ('Elsez' '{' Elsez+=StatementBlock  ("," Elsez+=StatementBlock  )* '}' )? '}'  
;

Rbreturn returns Rbreturn:
    {Rbreturn} 'Rbreturn' '{' ('returnedExpr' returnedExpr=Expr  )? '}'  
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

Number_ returns Number_:
    {Number_} 'Number_'  
;

Boolean returns Boolean:
    {Boolean} 'Boolean'  
;

Void returns Void:
    {Void} 'Void'  
;

