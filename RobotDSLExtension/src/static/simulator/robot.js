class Robot {

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    constructor(factor, _x = 0, _y = 0, _width = 10, _height = 40, _angle = 0) {
        this.factor = factor;
        // x and y represent the center of the robot
        this.x = _x;
        this.y = _y;
        this.angle = _angle;
        this.width = _width;
        this.height = _height;
        this.trails = [];
        this.speed = 10;
    }
  
    reset(){
        this.x = window.width/2;
        this.y = window.height/2;
        this.angle = 0;
        this.trails = [];
    }

    show() {
        push();
        const canvasX = this.x ;
        const canvasY = this.y ;
        translate((canvasX - window.cam.x)* window.cam.zx, (canvasY-window.cam.y)* window.cam.zy);
        rotate(this.angle);
        stroke(255, 0, 0);
        fill(255, 0, 0);
        
        const h = (Math.sqrt(3) / 2) * (this.width / 3) * window.cam.zx;
        const heightZoomed = this.height * window.cam.zy;

        triangle(
        -0.5 * h, -heightZoomed / 6, 
        -0.5 * h, heightZoomed / 6, 
        0.5 * h, 0
        );
        pop();
    }
  

    turn(angle){
        angle = angle * Math.PI / 180;
        this.angle += angle;
        if(this.angle > Math.PI*2){
            this.angle -= Math.PI*2;
        }

        /*if(this.angle<0){
            this.angle += 360;
        } else if (this.angle >= 360){
            this.angle -= 360;
        }*/
    }

    async move(dist){
        //make the robot move slowly with delay towards the target
        this.trails.push( {x: this.x, y: this.y}); 
        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        for (let i = 0; i < dist; i++){
            this.x += anglecos;
            this.y += anglesin;
            if(this.speed != 0){
                await new Promise(r => setTimeout(r, this.speed));
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