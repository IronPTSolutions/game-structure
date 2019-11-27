function Ball(ctx, x, y) {
  this.ctx = ctx;

  this.r = 20;
  this.x = x || 600;
  this.y = y || 200;

  this.vx = 0;
  this.vy = 0;

  this.g = 0.1;

  this.drawCount = 0;
}

Ball.prototype.draw = function() {
  this.ctx.fillStyle = "white";
  this.canvas = document.getElementById("my-canvas");

  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  this.ctx.fill();
  this.ctx.closePath();

  if (
    this.x + this.vx > this.canvas.width - this.r ||
    this.x + this.vx < this.r
  ) {
    //Colisiones con los laterales del canvas.

    this.vx = -this.vx;
  }

  if (this.y + this.vy > 600 - this.r || this.y + this.vy < this.r) {
    //Colisiones con las partes de arriba y abajo del canvas.

    this.vy = -this.vy;
  }

  if (
    this.x + this.vx < 100 &&
    this.y + this.vy < 300 &&
    this.y + this.vy > 280
  ) {
    //Colision con el larguero izquierdo.

    this.vx = -this.vx;
    this.vy = -this.vy;
  }

  if (
    this.x + this.vx > 1100 &&
    this.y + this.vy < 300 &&
    this.y + this.vy > 280
  ) {
    // Colision con el larguero derecho.

    this.vx = -this.vx;
    this.vy = -this.vy;
  }

  this.x += this.vx;
  this.y += this.vy;

  this.drawCount++;
};

Ball.prototype.move = function() {
  if (this.drawCount % 10 === 0 && this.vx !== 0 && this.vy !== 0) {
    this.vx = (this.vx > 0) ? BALL_SPEED : -BALL_SPEED;
  
    this.drawCount = 0;
  }

  this.vy += this.g;

  this.x += this.vx;
  this.y += this.vy;
};

Ball.prototype.goal = function() {
  if (this.x + this.r < 100 && this.y + this.r > 300) {
    //Marcador del player1.
    document.getElementById("player2").innerHTML++;

    this.vx = -2; //Reinicio de la posicion de la bola tras el gol.
    this.vy = 0;

    this.x = 600;
    this.y = 200;
  } else if (this.x + this.r > 1100 && this.y + this.r > 300) {
    //Marcador del player2.
    document.getElementById("player1").innerHTML++;

    this.vx = 2;
    this.vy = 0;

    this.x = 600;
    this.y = 200;
  }
};
