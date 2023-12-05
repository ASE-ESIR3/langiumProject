class Ray {

  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle
    this.v = p5.Vector.fromAngle(this.angle, 1000);
    this.poi = null;
  }

  show() {
    push();
    stroke(10, 255, 10);
    translate(this.x, this.y);
    line(0, 0, this.v.x, this.v.y);
    pop();
  }

  intersect() {
    let pois = [];
    for (var i = 0; i < entities.length; i++) {
      let e = entities[i];
      let entityPOI = e.intersect(this);
      pois = pois.concat(entityPOI);
    }

    this.findClosestPoi(pois);
  }

  findClosestPoi(pois) {
    let idx = 0;
    let minDist = Infinity;
    if (pois.every(ele => ele === null)) {
      this.poi = null;
    } else {
      for (var i = 0; i < pois.length; i++) {
        if (pois[i] != null) {
          let d = dist(this.x, this.y, pois[i][0], pois[i][1]);
          if (d < minDist) {
            minDist = d;
            idx = i;
          }
        }
      }
      this.poi = pois[idx];
    }
    this.setV();
  }

  setV() {
    if (this.poi == null) {
      this.v = p5.Vector.fromAngle(this.angle, 1000);
    } else {
      this.v.x = this.poi[0] - this.x;
      this.v.y = this.poi[1] - this.y;
    }
  }
}