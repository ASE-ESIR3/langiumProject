canevasSizeX = 1000;
canevasSizeY = 1000;
function setup() {
  createCanvas(canevasSizeX, canevasSizeY, document.getElementById("simulator"),WEBGL);
  window.entities = [];
  window.p5robot = null;
  window.Robotcamera = null;
  window.time = 0;
  window.lastTimestamp = 0;
  window.scene = null;
  window.p5robot = new Robot(1, width/2, height/2);
  window.cam = new Cam(0, 0);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);

  for (var e = 0; e < window.entities.length; e++) {
    window.entities[e].show();
  }

  if(window.scene !== null && window.scene.timestamps.length > lastTimestamp + 1){
    time += deltaTime
    updateRobot();
  }

  window.cam.x = window.p5robot.x - canevasSizeX/2;
  window.cam.y = window.p5robot.y - canevasSizeY/2;


  if(window.p5robot !== null){

    for (let i = 0; i < window.p5robot.trails.length -1; i++){
      let trail1 = window.p5robot.trails[i];
      let trail2 = window.p5robot.trails[i+1];
      //draw a line
      
      line(trail1.x-window.cam.x ,trail1.y- window.cam.y,trail2.x-window.cam.x,trail2.y-window.cam.y);
      
    }

    window.p5robot.show();
  }
  
}

function updateRobot(){
  const lastKnownState = window.scene.timestamps[window.lastTimestamp];
  const nextKnownState = window.scene.timestamps[window.lastTimestamp+1];

  window.p5robot.x = map(window.time, lastKnownState.time, nextKnownState.time, lastKnownState.pos.x, nextKnownState.pos.x, true)
  window.p5robot.y = map(window.time, lastKnownState.time, nextKnownState.time, lastKnownState.pos.y, nextKnownState.pos.y, true)
  window.p5robot.angle = map(window.time, lastKnownState.time, nextKnownState.time, lastKnownState.rad, nextKnownState.rad, true)
  if(window.time >= nextKnownState.time){
    window.time = nextKnownState.time;
    window.lastTimestamp++;
  }
}

function resetSimulation() {
  window.time = 0;
  window.lastTimestamp = 0;
}

window.setup = setup
window.resetSimulation = resetSimulation