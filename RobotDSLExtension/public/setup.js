import { MonacoEditorLanguageClientWrapper, vscode } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/syntaxes/my-dsl.monarch.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('my-dsl');       // WARNING Dependent of your project

editorConfig.setMonarchTokensProvider(monarchSyntax);

let code = getCookie("code");
console.log("cookies" + document.cookie)

if(code == ""){
code = 
`Void main() {
    for(Number i = 0;(i < 3);i = (i + 1))
    {
    flocon(5, 1000);
    Rotate -120;
    };
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
}


let replaceCode = `Void main() {
}`

editorConfig.setMainCode(code);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const typecheck = (async () => {
    console.info('typechecking current code...');

    // To implement (Bonus)
    
    if(errors.length > 0){
        const modal = document.getElementById("errorModal");
        modal.style.display = "block";
    } else {
        const modal = document.getElementById("validModal");
        modal.style.display = "block";
    }
});

const reset = (async () => {
    window.p5robot.reset();
    window.resetSimulation();
    stopping = true;
    pausing = false;
    running = false;
    //clear the code
    setSpeedDelay( parseFloat(document.getElementById('speedSlider').value));

});

const parseAndValidate = (async () => {
    console.info('validating current code...');
    client.getLanguageClient().sendNotification('browser/Validate', {
        content: client.getEditor().getModel().getValue(),
        uri: client.getEditor().getModel().uri.toString()
    });
});

const clearData = (async () => {
    client.getEditor().getModel()?.setValue(replaceCode);
    reset();
});
var pausing = false;
var stopping = false;
var running = false;
const execute = (async () => {
    if(!running){
        saveEditorCodeInCookie();
        console.info('running current code...');
        console.log(client.getEditor().getModel()?.getValue());
        client.getLanguageClient().sendNotification('browser/execute', {
            content: client.getEditor().getModel().getValue(),
            uri: client.getEditor().getModel().uri.toString()
        });
    }
});

function saveEditorCodeInCookie(){
    setCookie("code", client.getEditor().getModel().getValue(), 1);
}

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

window.execute = execute;
window.typecheck = typecheck;
window.reset = reset;
window.clearData = clearData;
window.parseAndValidate = parseAndValidate;

window.canvaSizeWidth = 0;
window.canvaSizeHeight = 0;

window.pauseSimu = function(){
    pausing = !pausing;
    if(pausing){
        document.getElementById("pauseSimu").value = "Resume";
        pausing = true;
    } else {
        document.getElementById("pauseSimu").value = "Pause";
        pausing = false;
    }
}


var errorModal = document.getElementById("errorModal");
var validModal = document.getElementById("validModal");
var closeError = document.querySelector("#errorModal .close");
var closeValid = document.querySelector("#validModal .close");
closeError.onclick = function() {
    errorModal.style.display = "none";
}
closeValid.onclick = function() {
    validModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == validModal) {
        validModal.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
}

let zoomSlider = document.getElementById('zoomSlider');
zoomSlider.addEventListener('input', function() {
    let zoomValue = parseFloat(this.value);
    window.cam.zx = zoomValue;
    window.cam.zy = zoomValue;
});


let speedSlider = document.getElementById('speedSlider');
speedSlider.addEventListener('input', function() {
    let speedValue = parseFloat(this.value);
    setSpeedDelay(speedValue);
});

document.getElementById('followRobot').checked = true;
window.followRobot= true;

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

const workerURL = new URL('./my-dsl-server-worker.js', import.meta.url); // WARNING Dependent of your project
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'RoboMl Language Server'
});
client.setWorker(lsWorker);



// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
const startingPromise = client.startEditor(document.getElementById("monaco-editor-root"));


client.getLanguageClient().onNotification('browser/sendStatements', async (params) => {
    running = true;
    stopping = false;
    pausing = false;
    console.log(params);
    runStatments(params);
});

client.getLanguageClient().onNotification('browser/sendValidationResults', async (params) => {
    console.log(params);
    openValidationModal(params);
});

function openValidationModal(params) {
    if(params.errorCount > 0){
        var modal = document.getElementById("errorModal");
        modal.style.display = "block";
        for(let i = 0; i < params.errors.length; i++){
            let errorDiv = document.createElement("div");
            errorDiv.innerHTML = params.errors[i].line + " : " + params.errors[i].message;
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
            console.log("forward " + statement.Value);
            await window.p5robot.move(statement.Value);
        }

        if (statement.type === "Rotate") {
            console.log("Rotate " + statement.Value);
            window.p5robot.turn(statement.Value * 1);
        }
        //await new Promise(r => setTimeout(r, 1000));
    }

}

document.addEventListener("DOMContentLoaded", function() {
    var collapseButton = document.querySelector(".collapse-button");
    var editorContent = document.getElementById("editor");
    collapseButton.addEventListener("click", function() {
        if (editorContent.style.display === "none") {
            editorContent.style.display = "block";
            collapseButton.textContent = "v"; 
            window.canvaSizeWidth = windowWidth/2;
            window.canvaSizeHeight = windowHeight;
            resizeCanvas(windowWidth/2, windowHeight);

        } else {
            editorContent.style.display = "none";
            collapseButton.textContent = ">";
            window.canvaSizeWidth = windowWidth;
            window.canvaSizeHeight = windowHeight;
            resizeCanvas(windowWidth, windowHeight);
        }
    });
});