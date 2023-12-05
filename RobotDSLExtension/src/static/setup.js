import { MonacoEditorLanguageClientWrapper, vscode } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/robo-ml.monarch.js";

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('my-ml');       // WARNING Dependent of your project

editorConfig.setMonarchTokensProvider(monarchSyntax);

let code = `let void entry () {
    var number count = 0
    loop count < 5
    {	
        setSpeed(500 * (count + 1))
        count = count + 1
        square(count)
    }
}

let void square(number factor){
    Forward 500 * factor
    Clock 90
    Forward 500 * factor
    Clock 90
    Forward 500 * factor
    Clock 90
    Forward 500 * factor
    Clock 90
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

const parseAndValidate = (async () => {
    console.info('validating current code...');
    // To implement
});

const execute = (async () => {
    console.info('running current code...');
    // To implement
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

const workerURL = new URL('./my-dsl-server-worker.js', import.meta.url); // WARNING Dependent of your project
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'RoboMl Language Server'
});
client.setWorker(lsWorker);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
const startingPromise = client.startEditor(document.getElementById("monaco-editor-root"));


