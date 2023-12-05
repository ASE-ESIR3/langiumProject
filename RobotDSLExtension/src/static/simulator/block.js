class Block {
    constructor(_x, _y, _width, _height) {
      this.x = _x;
      this.y = _y;
      this.width = _width;
      this.height = _height;
    }
  
    show() {
      line(this.x               , this.y                , this.x + this.width   , this.y);
      line(this.x               , this.y                , this.x                , this.y + this.height);
      line(this.x + this.width  , this.y                , this.x + this.width   , this.y + this.height);
      line(this.x               , this.y + this.height  , this.x + this.width   , this.y + this.height);
    }
  }