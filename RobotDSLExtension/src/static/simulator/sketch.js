function setup() {
  window.canvaSizeWidth = windowWidth/2;
  window.canvaSizeHeight = windowHeight;
  createCanvas(window.canvaSizeWidth, window.canvaSizeHeight, document.getElementById("simulator"),WEBGL);
  window.canva = document.getElementById("simulator");
  window.entities = [];
  window.p5robot = null;
  window.Robotcamera = null;
  window.time = 0;
  window.lastTimestamp = 0;
  window.scene = null;
  window.p5robot = new Robot(1, width/2, height/2);
  window.cam = new Cam(0, 0);
  window.reset();

}

//detect drag of the mouse to move the camera based on current position and last position if clicked

function draw() {
  background(58,97,18);
  stroke(255);
  strokeWeight(1);

  for (var e = 0; e < window.entities.length; e++) {
    window.entities[e].show();
  }

  if(window.scene !== null && window.scene.timestamps.length > lastTimestamp + 1){
    time += deltaTime
    updateRobot();
  }

  if(window.followRobot){
    window.cam.x = (window.p5robot.x - window.canvaSizeWidth/(2*window.cam.zx) );
    window.cam.y = (window.p5robot.y - window.canvaSizeHeight/(2*window.cam.zy) );
  } else {
  
    window.cam.x = (window.canvaSizeWidth/2 - window.canvaSizeWidth/(2*window.cam.zx) );
    window.cam.y = (window.canvaSizeHeight/2 - window.canvaSizeHeight/(2*window.cam.zy) );
    
  }

  if(window.p5robot !== null){

    for (let i = 0; i < window.p5robot.trails.length -1; i++){
      let trail1 = window.p5robot.trails[i];
      let trail2 = window.p5robot.trails[i+1];
      //draw a line
      line(
        (trail1.x - window.cam.x) * window.cam.zx,
        (trail1.y - window.cam.y) * window.cam.zy,
        (trail2.x - window.cam.x) * window.cam.zx,
        (trail2.y - window.cam.y) * window.cam.zy
      );
    }
    if(window.p5robot.trails.length > 0){
      let trail11 = window.p5robot.trails[window.p5robot.trails.length -1 ];
      let trail21 = {x: window.p5robot.x, y: window.p5robot.y};
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