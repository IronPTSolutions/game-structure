function Player(ctx, x, src, left, right, up, scoreId) {
  this.ctx = ctx;

  this.x = x;
  this.y = 500;
  this.y0 = this.y;

  this.vx = 0;
  this.vy = 0;

  this.g = 0.5;

  this.img = new Image();
  this.img.src = src;
  this.img.frames = 1;
  this.img.frameIndex = 1;

  this.w = 80;
  this.h = 90;
  this.score = 0;

  this.drawCount = 0;

  this.left = left;
  this.right = right;
  this.up = up;

  this.score = document.getElementById(scoreId);
}

Player.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Player.prototype.draw = function() {
  this.canvas = document.getElementById("my-canvas");
  this.drawCount++;

  this.ctx.drawImage(
    this.img,
    this.img.frameIndex,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  if (this.x > this.canvas.width - this.w || this.x + this.w < this.w) {
    //Colisiones del jugador con los laterales del canvas.

    this.vx = -this.vx;
  }

  if (this.drawCount % 10 === 0) {
    this.drawCount = 0;
    this.animate();
  }
};

Player.prototype.move = function() {
  this.canvas = document.getElementById("my-canvas");
  this.vy += this.g;
  this.y += this.vy;

  this.x += this.vx;

  if (this.y >= this.y0) {
    this.y = this.y0;
    this.vy = 0;
  }
};

Player.prototype.animate = function() {
  if (this.isJumping()) {
    return;
  }

  if (++this.img.frameIndex > 2) {
    this.img.frameIndex = 0;
  }
};

Player.prototype.jump = function() {
  if (this.isJumping()) {
    return;
  }

  this.img.frameIndex = 2;
  this.vy -= 13;
};

Player.prototype.isJumping = function() {
  return this.y < this.y0;
};

Player.prototype.onKeyDown = function(event) {
  switch (event.keyCode) {
    case this.right:
      this.vx = 10;
      break;
    case this.left:
      this.vx = -10;
      break;
    case this.up:
      this.jump();
      break;
  }
};

Player.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case this.right:
    case this.left:
      this.vx = 0;
      break;
  }
};

Player.prototype.checkCollision = function(ball) {
  //Colisiones del jugador con el balón.

  if (
    ball.x + ball.r >= this.x &&
    ball.x - ball.r <= this.x + this.w &&
    ball.y + ball.r >= this.y &&
    ball.y - ball.r <= this.y + this.h
  ) {
    if (ball.x + ball.r <= this.x + this.w / 2) {
      ball.vx = -INITIAL_BALL_SPEED;
    } else if (ball.x + ball.r >= this.x + this.w / 2) {
      ball.vx = +INITIAL_BALL_SPEED;
    }

    if (ball.y + ball.r < this.top) {
      ball.vy = -INITIAL_BALL_SPEED;
    } else if (ball.y + ball.r > this.bottom) {
      ball.vy = -ball.vy;
    }
  }
};

Player.prototype.collideWithPlayer = function(ball) {
  //Colisiones entre los dos jugadores.

  if (
    this.x < ball.x + ball.w &&
    this.x + this.w > ball.x &&
    this.y < ball.y + ball.h &&
    this.h + this.y > ball.y
  ) {
    if (this.x + this.w < ball.x + ball.h) {
      this.x = ball.x - this.w;
    } else if (this.x + this.h < ball.x + ball.w) {
      this.x = ball.x + ball.w + this.w;
    }
  }
};

Player.prototype.getScore = function() {
  return parseInt(this.score.textContent);
};

Player.prototype.setScore = function(score) {
  this.score.textContent = score;
};
