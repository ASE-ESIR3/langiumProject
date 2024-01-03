# ASE Project - Robot DSL project

Try out the simulator : https://robot.ronantremoureux.fr !

## Description

> based on the subject proposed at https://github.com/selabs-ur1/dsl

In this project, we created a DSL for a robot. To add more context and real-life example, we assumed it is a DSL to program roomba (https://fr.wikipedia.org/wiki/Roomba).

This DSL is here to help with creating programs controlling robots.
The use of a external DSL here is very powerfull, as it allows to create a language that is very close to the problem domain.

First we developped a model thanks to Eclipse Ecore and Xtext. It helped us to develop only the needed component while having a good vision on what are the connection between them.

We then migrate the grammar outputed by Xtext to langium, to move on to the interpretation/compilation part. 

This repository holds the complete code of the langium project. It contains a **compiler**, an **interpretor**, a **web simulator** and a vscode extension.

This readme will explain how to use, and how has been developed the different parts of the project.

As asked during practical session, at the end will be found a section about the problems encountered during development.

## Code examples

You will find in the `CodeExamples` folder at the root of this repository, some code example that can be ran in the simulator to desmonstrate some aspects of the language validation.

# Development

## Ecore modeling

The full ecore project is stored at https://github.com/ASE-ESIR3/RobotML.git.

Here is an overview of the ecore model representing our language. 
![ecore](./ReadmeImg/robotMLClassDiagram.jpg)

We can divide this diagram in subsection that will be explained one by one.

I will keep it simple as possible, and will not explain the meaning of each class as some are repetitive.

### Program

The program is the entry point of our grammar. Not very visual for the user, it represents the entire file that will be interpreted.

Conceptually, it is a list of functions, mandatory to contain a function named main.

### Functions

A function is a block of 'code', with a name and some parameters.It can return things thanks to a return statment. It is as simple as that is our ecore model.


### Statments 
The statment is the basic building block of our language. It can be as simple as a variable declaration, or as complex as a loop. It is a main concept of the language and can hold anything that can be written in the body of a function.

Concepts like break and return are directly extending the statment concept.


### Statment block

A statment block is a statment that is composed of multiple statments.

It is used to represent the body of a function, or the body of a 'if', 'for' or 'while' statment.


### Expressions

Expressions in a language are a main concept. They can be as simple as a value, but can take diferent forms.

- a constant value : a number, a string, a boolean, a null

- a function call : a function name and a list of arguments
- a binary expression : a binary operator and two operands. Note that binary expressions can be nested, and can be of any type. For example, true + 25, at a grammar level is ok
- a unary expression : a unary operator and an operand
- a variable reference : a variable name

the expression can be anything if it can simplify to a single value thanks to operators at the end. 

In our ecore modeling, the expression is called Expr and is extended by all of the previous concepts.

### Robot Instruction

As our language is a DSL for robots, we need to be able to represent the instructions that can be given to the robot to be as close as possible to the probleme space.

There are few robot instruction in our language. It could be extended to more instructions.

- Forward: composed of an expression and a unit. ( MM, CM or KM)
- Rotate: only takes an expression (degrees)
- Say: composed of a list of expressions that will be concatenate and printed.

These instructions extend a main concept called Robot Instruction that is itself a statment.

### Function Call

The function call holds a reference to a function, allowing later in the interpretor to just access the code of the function easily.


# How to use

This section is about how to use the different parts of the project.

## Running in the editor

### Install the extension

1. Clone the repository

2. place yourself in the `RobotDSLExtension` folder. It is the root of all the project. Can be done with a `cd RobotDSLExtension` from the root

2. run `npm install` to install the node dependencies needed.

3. run `sh buildAll.sh` (`./buildAll.bat` if on windows) script to build the editor and web engine. It will also open the development instance of vscode.

4. run `sh interpret` will interpret the code present in the test project at the root of this repository

5. run `sh compile` to try the compiler 

6. run `npm run serve` after building ( point 3 ) to open the web server and try the web simulator at ```localhost:3000```.

## modify the test project

at the root find the myRobotProject folder, it contains the test project.

Inside there is a main file, and a folder with the grammar files.

When opening the new vscode instance, open the folder myRobotProject and you are ready to go.

## Running in the web

![webSimuImage](./ReadmeImg/WebSimu1.png)

The web simulator is oppening on ```localhost:3000``` after running the command ```npm run serve``` after building the project. (the latest verison is also avialable at https://robot.ronantremoureux.fr)

The web simulator is a simple web page that allows to write code in the editor, and see the result of the execution of the code in the simulator. You have some controll on the simulation such as follow the robot, pause the simulation, or change the speed of the simulation.

It includes also some type checking features and error reporting.

Some added feature are the possibility to get the compiled code from the editor with the same logic as the interpretor, relying on the backend with some message calls.

### Features explanation

Most of the important features are located in the menu bar on the top of the application.

#### Simulation
1. The simulation can be paused and restarted thanks to the play/pause button.

2. Delay can be added thanks to the slider 

3. The editor can be folded thanks to the middle button, leading to a better view of the robot scene.

4. Zoom on the scene can be done with the mouse wheel.

5. By default the camera follows the robot. It can be change to free camera mode by unchecking the "follow robot" button. It will allow user to look around the scene with mouse drag&drop.


#### Development

1. Before any action on the simulaton, the code is checked/type-validated.

2. The editor will autocomplete your code and hightlight it with colors.  

3. The compiled code can be retrieved from the editor thanks to the button with a robot head :)

4. The use of the monaco editor offers a realy great experience.


# problems encountered during developpement

### Ecore modeling

We used eclipse as our modeling tool. The problem we encountered in this part was to deal with eclipse crash and bugs. As we were modeling our language, we had some wiered disapearing of some class in the ecore model.

### Languium

Languium is a very powerfull framework as we saw during developpement. Therfore, we had issue with the documentation. As the practical session started just before a new version of langium was released, we had to deal with some changes in the framework that were not documented.

### The weavers

The concept of weaver was not very clear initally. It is used to re-create the open class principle lacking in javascript. We had to understand how to use it, and how to integrate it in the languium project.

### Web simulator

We had to understand what to do with the web simulator. As the languim version had changed, we were not able to follow the tutorial given. So we had to adapt the for the new version of langium. Un exemple concret serait la manière de charger en backend un document donné par URI.


