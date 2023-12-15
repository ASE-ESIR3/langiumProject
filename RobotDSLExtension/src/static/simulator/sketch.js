// Add global variables for dragging
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

function setup() {
  window.canvaSizeWidth = windowWidth / 2;
  window.canvaSizeHeight = windowHeight;
  createCanvas(window.canvaSizeWidth, window.canvaSizeHeight, document.getElementById("simulator"), WEBGL);
  
  window.addEventListener('resize', updateCanvasBounds); // Update bounds on window resize

  window.canva = document.getElementById("simulator");
  window.entities = [];
  window.p5robot = null;
  window.Robotcamera = null;
  window.time = 0;
  window.lastTimestamp = 0;
  window.scene = null;
  window.p5robot = new Robot(1, width / 2, width / 2);
  window.cam = new Cam(0, 0);
  window.resetSimulation = resetSimulation;
  window.DraggingObject = { x: 0, y: 0 };
  updateCanvasBounds();

  //if the event of the mouse over the canva, change value of mousOverCanva to true
  window.mouseOverCanva = false;
  window.canva.addEventListener('mouseover', function () {
    window.mouseOverCanva = true;
  }
  );
  window.canva.addEventListener('mouseout', function () {
    window.mouseOverCanva = false;
  }
  );


}

function updateCanvasBounds() {
  const rect = window.canva.getBoundingClientRect();
  window.canvasBounds = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
}

function draw() {
  background(20, 20, 20);
  drawBackgroundGrid();
  stroke(255);
  strokeWeight(1);


  for (let e = 0; e < window.entities.length; e++) {
    window.entities[e].show();
  }

  if (window.scene !== null && window.scene.timestamps.length > lastTimestamp + 1) {
    time += deltaTime;
    updateRobot();
  }

  if (window.followRobot) {
    window.cam.x = (window.p5robot.x - window.canvaSizeWidth / (2 * window.cam.zx));
    window.cam.y = (window.p5robot.y - window.canvaSizeHeight / (2 * window.cam.zy));
    window.DraggingObject.x = window.p5robot.x;
    window.DraggingObject.y = window.p5robot.y;
    isDragging = false;
  } else {
    window.cam.x = (window.DraggingObject.x - window.canvaSizeWidth / (2 * window.cam.zx));
    window.cam.y = (window.DraggingObject.y - window.canvaSizeHeight / (2 * window.cam.zy));
    isDragging = true;
  }


  if (window.p5robot !== null) {
    for (let i = 0; i < window.p5robot.trails.length - 1; i++) {
      let trail1 = window.p5robot.trails[i];
      let trail2 = window.p5robot.trails[i + 1];
      line(
        (trail1.x - window.cam.x) * window.cam.zx,
        (trail1.y - window.cam.y) * window.cam.zy,
        (trail2.x - window.cam.x) * window.cam.zx,
        (trail2.y - window.cam.y) * window.cam.zy
      );
    }
    if (window.p5robot.trails.length > 0) {
      let trail11 = window.p5robot.trails[window.p5robot.trails.length - 1];
      let trail21 = { x: window.p5robot.x, y: window.p5robot.y };
      line(
        (trail11.x - window.cam.x) * window.cam.zx,
        (trail11.y - window.cam.y) * window.cam.zy,
        (trail21.x - window.cam.x) * window.cam.zx,
        (trail21.y - window.cam.y) * window.cam.zy
      );
    }
    window.p5robot.show();
  }
}

function updateRobot() {
  const lastKnownState = window.scene.timestamps[window.lastTimestamp];
  const nextKnownState = window.scene.timestamps[window.lastTimestamp + 1];

  window.p5robot.x = map(window.time, lastKnownState.time, nextKnownState.time, lastKnownState.pos.x, nextKnownState.pos.x, true);
  window.p5robot.y = map(window.time, lastKnownState.time, nextKnownState.time, lastKnownState.pos.y, nextKnownState.pos.y, true);
  window.p5robot.angle = map(window.time, lastKnownState.time, nextKnownState.time, lastKnownState.rad, nextKnownState.rad, true);
  if (window.time >= nextKnownState.time) {
    window.time = nextKnownState.time;
    window.lastTimestamp++;
  }
}

function resetSimulation() {
  window.time = 0;
  window.lastTimestamp = 0;
}

function mousePressed() {
  if (window.mouseOverCanva) {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    isDragging = true;
  }
}

function mouseDragged() {
  if (window.mouseOverCanva && isDragging) {
    window.DraggingObject.x -= (mouseX - lastMouseX) / window.cam.zx;
    window.DraggingObject.y -= (mouseY - lastMouseY) / window.cam.zy;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

function mouseReleased() {

  isDragging = false;
}


function mouseWheel(event) {
  if (window.mouseOverCanva) {

    let zoomSensitivity = 0.003;
    let minZoom = 0.1;
    let maxZoom = 10;


    let zoomChange = event.delta * zoomSensitivity;
    let newZoomX = window.cam.zx - zoomChange;
    let newZoomY = window.cam.zy - zoomChange;


    newZoomX = constrain(newZoomX, minZoom, maxZoom);
    newZoomY = constrain(newZoomY, minZoom, maxZoom);


    window.cam.zx = newZoomX;
    window.cam.zy = newZoomY;

  }
}

function drawBackgroundGrid() {

}
