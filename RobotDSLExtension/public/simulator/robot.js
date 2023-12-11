class Robot {

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    constructor(factor, _x = 0, _y = 0, _width = 50, _height = 75, _angle = 0) {
        this.factor = factor;
        // x and y represent the center of the robot
        this.x = _x;
        this.y = _y;
        this.angle = _angle;
        this.width = _width;
        this.height = _height;
        this.trails = [];
    }
  
    reset(){
        this.x = window.width/2;
        this.y = window.height/2;
        this.angle = 0;
        this.trails = [];
    }

    show() {
        push();
        const canvasX = this.x * this.factor;
        const canvasY = this.y * this.factor;
        translate(canvasX- window.cam.x , canvasY-window.cam.y);
        rotate(this.angle);
        stroke(255, 0, 0);
        fill(255, 0, 0);
        const h = (Math.sqrt(3)/2) * (this.width/3)
        triangle(-0.5*h, -(this.height/6), -0.5*h, this.height/6, 0.5*h, 0);
        pop();
    }
  

    turn(angle){
        angle = angle * Math.PI / 180;
        this.angle += angle;

        if(this.angle<0){
            this.angle += 360;
        } else if (this.angle >= 360){
            this.angle -= 360;
        }
    }

    async move(dist){
        //make the robot move slowly with delay towards the target

        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        for (let i = 0; i < dist; i++){
            this.x += anglecos;
            this.y += anglesin;
            await new Promise(r => setTimeout(r, 0.1));
        }
        this.trails.push( {x: this.x, y: this.y}); 
    }

    side(dist){
        let anglecos = cos(this.angle);
        let anglesin = sin(this.angle);
        this.x += -anglesin*dist;
        this.y += anglecos*dist;
    }

  }