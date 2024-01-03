class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(1, 2);
        this.initialLife = random(100,200);
        this.lifespan = this.initialLife; 

    }

    update() {
        this.lifespan -= 1;
        if (this.size > 10){
            this.size += 0.05;
        }
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    show() {
        
        noStroke();
        fill(255, this.lifespan); 
        //take in account the camera zoom in the size of the particle
        
        ellipse((this.x - window.cam.x) * window.cam.zx, (this.y - window.cam.y) * window.cam.zy, this.size*window.cam.zx);
        
    }

    isDead() {
        return this.lifespan < 0;
    }
}

class Robot {

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    constructor(factor, _x = 0, _y = 0, _width = 40, _height = 40, _angle = 0) {
        this.factor = factor;
        // x and y represent the center of the robot
        this.x = _x;
        this.y = _y;
        this.angle = _angle;
        this.width = _width;
        this.height = _height;
        this.trails = [];
        this.particle = [];
        this.speed = 10;
        this.sprite = loadImage("./Roomba.png");
        this.scale = 1;
        this.particleCreationRate = 10;
        this.curentText = "";
        
    }
  
    reset(){
        this.x = window.width/2;
        this.y = window.height/2;
        this.angle = 0;
        this.trails = [];
    }

    show() {
        push();
        for (let i = this.particle.length - 1; i >= 0; i--) {
            this.particle[i].update();
            this.particle[i].show();
            if (this.particle[i].isDead()) {
                this.particle.splice(i, 1);
            }
        }
        pop();

        push();
        const canvasX = this.x ;
        const canvasY = this.y ;
        translate((canvasX - window.cam.x)* window.cam.zx, (canvasY-window.cam.y)* window.cam.zy);
                
        textSize(20);
        text(this.curentText, -this.width/2 * window.cam.zx, -this.height/2 * window.cam.zy - 10);

        rotate(this.angle + Math.PI/2);

        image(this.sprite, -this.width/2 * window.cam.zx, -this.height/2 * window.cam.zy, this.width * window.cam.zx, this.height * window.cam.zy);

        pop();
        

    }
  

    turn(angle){
        angle = angle * Math.PI / 180;
        this.angle += angle;
        if(this.angle > Math.PI*2){
            this.angle -= Math.PI*2;
        }
    }

    say(text){
        this.curentText = text;
    }

    async move(dist){
        this.trails.push( {x: this.x, y: this.y}); 
        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        for (let i = 0; i < dist; i++){
            this.x += anglecos;
            this.y += anglesin;
            if(this.speed != 0){
                await new Promise(r => setTimeout(r, this.speed));
                if(i % this.particleCreationRate == 0){
                    this.particle.push(new Particle(this.x, this.y));
                }
            }

            
        }

    }

    side(dist){
        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        this.x += -anglesin*dist;
        this.y += anglecos*dist;
    }

  }