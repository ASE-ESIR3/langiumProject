import { MonacoEditorLanguageClientWrapper, vscode } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/my-dsl.monarch.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('my-dsl');       // WARNING Dependent of your project

editorConfig.setMonarchTokensProvider(monarchSyntax);

let code = `Void main() {
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
    //clear the code

});

const parseAndValidate = (async () => {
    console.info('validating current code...');
    // To implement
});

const clearData = (async () => {
    client.getEditor().getModel()?.setValue(replaceCode);
    reset();
});

var stopping = false;
const execute = (async () => {
    stopping = false;
    console.info('running current code...');
    console.log(client.getEditor().getModel()?.getValue());
    client.getLanguageClient().sendNotification('browser/execute', {
        content: client.getEditor().getModel().getValue(),
        uri: client.getEditor().getModel().uri.toString()
    });
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
        scene.robot.size.x * factor,
        scene.robot.size.y * factor,
        scene.robot.rad
    );
}

window.execute = execute;
window.typecheck = typecheck;

window.reset = reset;
window.clearData = clearData;

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
    window.p5robot.speed = speedValue;
   
});

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
    console.log(params);
    for (let i = 0; i < params.length; i++) {
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

});

document.addEventListener("DOMContentLoaded", function() {
    var collapseButton = document.querySelector(".collapse-button");
    var editorContent = document.getElementById("monaco-editor-root");
    collapseButton.addEventListener("click", function() {
        if (editorContent.style.display === "none") {
            editorContent.style.display = "block";
            collapseButton.textContent = "v"; // Icon for 'expand'
        } else {
            editorContent.style.display = "none";
            collapseButton.textContent = ">"; // Icon for 'collapse'
        }
    });
});