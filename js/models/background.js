function Background(ctx) {

  this.ctx = ctx;

  this.x = 0;
  this.y = 0;

  this.vx = -2;
  this.vy = 0;

  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.img = new Image();
  this.img.src = "https://chupacdn.s3.amazonaws.com/catalog/product/cache/5/thumbnail/1280x/17f82f742ffe127f42dca9de82fb58b1/6/-/6-vector-game-backgrounds-8003_imgs_8003_2.png";
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



  