function Ball(ctx, x, y) {
  this.ctx = ctx;


  this.r = 10;
  this.x = x || 200;
  this.y = y || 200;

  this.vx = 0;
  this.vy = 0;

  this.g = 0.1;
}


Ball.prototype.draw = function() {
  this.ctx.fillStyle = "white";
  this.canvas = document.getElementById("my-canvas");

  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r,0, 2 * Math.PI);
  this.ctx.fill();
  this.ctx.closePath();

  if(this.x + this.vx > this.canvas.width - this.r || this.x + this.vx < this.r) {
    this.vx = -this.vx;
}
if(this.y + this.vy > this.canvas.height - this.r || this.y + this.vy < this.r) {
    this.vy = -this.vy;
} 



this.x += this.vx;
this.y += this.vy;

}

Ball.prototype.move = function() {
  this.vy += this.g;
  

  

  this.x += this.vx;
  this.y += this.vy;
}


	










