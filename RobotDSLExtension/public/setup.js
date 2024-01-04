import { MonacoEditorLanguageClientWrapper } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/syntaxes/my-dsl.monarch.js";
import {arduinoCode} from "./boilerplateArduinoCode.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);
MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();

const workerURL = new URL('./my-dsl-server-worker.js', import.meta.url); // WARNING Dependent of your project

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'RoboMl Language Server'
});
client.setWorker(lsWorker);

const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('my-dsl');       // WARNING Dependent of your project

editorConfig.setMonarchTokensProvider(monarchSyntax);

var code = 
`Void main() {
    Say "hello world !";
    for(Number i = 0;(i < 3);i = (i + 1))
    {
    Say "step ", i;
    flocon(5, 1000);
    Rotate -120;
    };
    Say "finish <3";
}

Void flocon(Number max, Number size)
{

    if((max == 0)){

    Forward (size/3) CM;
    Rotate 45;
    Forward (size/3) CM;
    Rotate -90;
    Forward (size/3) CM;
    Rotate 45;
    Forward (size/3) CM;
    }
    else
    {

        flocon((max - 1), (size/3));
        Rotate 45;
        flocon((max - 1), (size/3));
        Rotate -90;
        flocon((max - 1), (size/3));
        Rotate 45;
        flocon((max - 1), (size/3));

    };


}`

let replaceCode = `Void main() {
}`

editorConfig.setMainCode(code);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

var pausing = false;
var stopping = false;
var running = false;

//modal setup 
var errorModal = document.getElementById("errorModal");
var validModal = document.getElementById("validModal");
var compileModal = document.getElementById("compileModal");
var closeError = document.querySelector("#errorModal .close");
var closeValid = document.querySelector("#validModal .close");
var closeCompile = document.querySelector("#compileModal .close");

var modalEditorInstance = null;

function setupWindowVar(){
    window.execute = execute;
    window.reset = reset;
    window.clearData = clearData;
    window.parseAndValidate = parseAndValidate;
    window.compile = compile;
    window.copyCompiledCodeToClipboard = copyCompiledCodeToClipboard;
    window.pauseSimu = pauseSimu;
    window.copyErrorsToClipBoard = copyErrorsToClipBoard;
    
    window.canvaSizeWidth = 0;
    window.canvaSizeHeight = 0;
    window.followRobot= true;
    
    document.getElementById('followRobot').checked = true;
}



const reset = (async () => {
    window.p5robot.reset();
    window.resetSimulation();
    stopping = true;
    pausing = false;
    running = false;
    //clear the code
    setSpeedDelay( parseFloat(document.getElementById('speedSlider').value));
    document.getElementById("btplay").innerHTML = '<i class=" text-green-500 fa-solid fa-play"></i>';
    document.getElementById("pauseSimu").innerHTML = '<i class="fa-solid fa-pause"></i>';
    pausing = false;

});

const parseAndValidate = (async () => {
    client.getLanguageClient().sendNotification('browser/Validate', {
        content: client.getEditor().getModel().getValue(),
        uri: client.getEditor().getModel().uri.toString()
    });
});

const compile = (async () => {

    client.getLanguageClient().sendNotification('browser/compile', {
        content: client.getEditor().getModel().getValue(),
        uri: client.getEditor().getModel().uri.toString()
    });
});

const copyCompiledCodeToClipboard = (async () => {

    modalEditorInstance.focus();
    let compiledCode = modalEditorInstance.getValue();
    navigator.clipboard.writeText(compiledCode);
});

const copyErrorsToClipBoard = (async () => {
    let errors = document.getElementById("errorList").innerHTML;
    navigator.clipboard.writeText(errors);
});

const clearData = (async () => {
    client.getEditor().getModel()?.setValue(replaceCode);
    reset();
});

const execute = (async () => {

    if(!running){
        client.getLanguageClient().sendNotification('browser/execute', {
            content: client.getEditor().getModel().getValue(),
            uri: client.getEditor().getModel().uri.toString()
        });
    }
    else{

        reset();
    }
});

const pauseSimu = (async () => {
    pausing = !pausing;
    if(pausing){
        document.getElementById("pauseSimu").innerHTML = '<i class="fa-solid fa-play"></i>';
        pausing = true;
    } else {
        document.getElementById("pauseSimu").innerHTML = '<i class="fa-solid fa-pause"></i>';
        pausing = false;
    }
});

const setupSimulator = (scene) => {
    const wideSide = max(scene.size.x, scene.size.y);
    let factor = 1000 / wideSide;

    window.scene = scene;

    scene.entities.forEach((entity) => {
        if (entity.type === "Wall") {
            window.entities.push(new Wall(
                (entity.pos.x)*factor,
                (entity.pos.y)*factor,
                (entity.size.x)*factor,
                (entity.size.y)*factor
                ));
        }
        if (entity.type === "Block") {
            window.entities.push(new Wall(
                (entity.pos.x)*factor,
                (entity.pos.y)*factor,
                (entity.size.x)*factor,
                (entity.size.y)*factor
                ));
        }
    });

    window.p5robot = new Robot(
        factor,
        scene.robot.pos.x,
        scene.robot.pos.y,
        scene.robot.size.x,
        scene.robot.size.y,
        scene.robot.rad
    );
}

setupWindowVar();

closeError.onclick = function() {
    errorModal.style.display = "none";
}
closeValid.onclick = function() {
    validModal.style.display = "none";
}
closeCompile.onclick = function() {
    compileModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == validModal) {
        validModal.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
    if (event.target == compileModal) {
        compileModal.style.display = "none";
    }

}


let speedSlider = document.getElementById('speedSlider');
speedSlider.addEventListener('input', function() {
    let speedValue = parseFloat(this.value);
    setSpeedDelay(speedValue);
});

document.getElementById('followRobot').addEventListener('change', function() {
    if (this.checked) {
        window.followRobot= true;
    } else {
        window.followRobot = false;
    }
});

function setSpeedDelay(speedValue){
    window.p5robot.speed = speedValue;
    speedValue = parseInt(speedValue);
}


function openCompileModal(params) {
    var val = arduinoCode.boilerplate + params;
    var modal = document.getElementById("compileModal");
    modal.style.display = "block";
    var editorDiv = document.getElementById("compiledCodeEditor");
    editorDiv.style.height = '400px'; 
    editorDiv.style.width = '100%';

    if (!modalEditorInstance) {
        modalEditorInstance = monaco.editor.create(editorDiv, {
            value: val,
            language: 'c', 
            readOnly: true 
        });
    } else {

        modalEditorInstance.setValue(val);

        modalEditorInstance.layout();
    }
}


function openValidationModal(params) {
    document.getElementById("errorList").innerHTML = "";
    if(params.errorCount > 0){
        var modal = document.getElementById("errorModal");
        modal.style.display = "block";
        for(let i = 0; i < params.errors.length; i++){
            let errorDiv = document.createElement("div");
            errorDiv.innerHTML = "Line "+params.errors[i].line + " : " + params.errors[i].message;
            document.getElementById("errorList").appendChild(errorDiv);
        }

    }
    if(params.errorCount == 0){
        var modal = document.getElementById("validModal");
        modal.style.display = "block";
        modal.getAttribute
    }

}


async function runStatments(params){
    for (let i = 0; i < params.length; i++) {
        
        while(pausing){
            await new Promise(r => setTimeout(r, 100));
        }
        if (stopping){
            break;
        }
        const statement = params[i];
        if (statement.type === "Forward") {
            await window.p5robot.move(statement.Value);
        }

        if (statement.type === "Rotate") {
            window.p5robot.turn(statement.Value * 1);
        }
        if(statement.type === "Say"){
            await window.p5robot.say(statement.Value);
        }
        if (statement.type === "Wait") {
            for (let i = 0; i < statement.Value/10; i++) {
                await new Promise(r => setTimeout(r, 10));
                if (stopping){
                    break;
                }
            }
            

        }
    }
}




document.addEventListener("DOMContentLoaded", function() {
    var collapseButton = document.querySelector(".collapse-button");
    var editorContent = document.getElementById("editor");
    collapseButton.addEventListener("click", function() {
        if (editorContent.style.display === "none") {
            editorContent.style.display = "block";


            collapseButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
            window.canvaSizeWidth = windowWidth/2;
            window.canvaSizeHeight = windowHeight;
            resizeCanvas(windowWidth/2, windowHeight);

        } else {
            editorContent.style.display = "none";

            collapseButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';


            window.canvaSizeWidth = windowWidth;
            window.canvaSizeHeight = windowHeight;
            resizeCanvas(windowWidth, windowHeight);
        }
    });
});

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
const startingPromise = client.startEditor(document.getElementById("monaco-editor-root"));


client.getLanguageClient().onNotification('browser/sendStatements', async (params) => {
    running = true;
    stopping = false;
    pausing = false;
    document.getElementById("btplay").innerHTML = '<i class="text-orange-300 fa-solid fa-rotate-right hover:animate-spin"></i>';
    runStatments(params);
});

client.getLanguageClient().onNotification('browser/sendValidationResults', async (params) => {
    openValidationModal(params);
});

client.getLanguageClient().onNotification('browser/sendCompiledCode', async (params) => {
    openCompileModal(params);
});
