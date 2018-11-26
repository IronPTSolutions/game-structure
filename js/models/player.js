function Player(ctx) {
  this.ctx = ctx;

  this.x = 30;
  this.y = 400;
  this.y0 = this.y;

  this.vx = 0;
  this.vy = 0;

  this.g = 0.5;

  this.img = new Image();
  this.img.src = "https://s3-eu-west-1.amazonaws.com/cpm-assets/mario-sprite.png";
  this.img.frames = 3;
  this.img.frameIndex = 0;

  this.w = 50;
  this.h = 70;

  this.drawCount = 0;


  this.setListeners();
}

Player.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};


Player.prototype.draw = function() {
  this.drawCount++;

  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  if (this.drawCount % 10 === 0) {
    this.drawCount = 0;
    this.animate();
  }
};

Player.prototype.move = function() {
  this.vy += this.g;
  this.y += this.vy;

  this.x += this.vx;
  
  if (this.y >= this.y0) {
    this.y = this.y0;
    this.vy = 0;
  }
};

Player.prototype.animate = function() {
  if (this.isJumping()) { return; }

  if (++this.img.frameIndex > 2) {
    this.img.frameIndex = 0;
  }

};

Player.prototype.jump = function() {
  if (this.isJumping()) {
    return;
  }

  this.img.frameIndex = 2;
  this.vy -= 10;
}

Player.prototype.isJumping = function() {
  return this.y < this.y0;
};

Player.prototype.onKeyDown = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
      this.vx = 10;
      break;
    case KEY_LEFT:
      this.vx = -10;
      break;
    case KEY_UP:
      this.jump();
      break;
    case KEY_SPACE:
      this.shoot();
      break;
  }
};

Player.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
    case KEY_LEFT:
      this.vx = 0;
      break;
  }
};

// Player.prototype.collide = function(ball) {
//   return (this.x + this.width === ball.x || ball.x + ball.width === this.x);
// }

Player.prototype.checkCollision = function(ball) {
  
  if (this.x === ball.x) {
    console.log('hi')
  }
    
}





