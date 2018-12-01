function Background(ctx) {

  this.ctx = ctx;

  this.x = 0;
  this.y = 0;

  this.vx = -2;
  this.vy = 0;

  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.img = new Image();
  this.img.src = "/Users/Mario/Documents/IronHack/game-structure/img/game-backgound (1).jpg";
}


Background.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
  this.ctx.drawImage(
    this.img,
    this.x + this.w,
    this.y,
    this.w,
    this.h
  );

};

Background.prototype.move = function() {
};



  