function Player(ctx) {
  this.ctx = ctx;

  this.x = 100;
  this.y = 500;
  this.y0 = this.y;

  this.vx = 0;
  this.vy = 0;

  this.g = 0.5;

  this.img = new Image();
  this.img.src = "https://vignette.wikia.nocookie.net/headsoccer/images/c/c7/Character01.png/revision/latest?cb=20150720195707";
  this.img.frames = 1;
  this.img.frameIndex = 1;

  this.w = 70;
  this.h = 90;
  this.score = 0;

  this.drawCount = 0;

  this.left = this.x;
  this.right = this.left + this.w;
  this.top = this.y;
  this.bottom = this.top + this.h;
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
    this.img.frameIndex ,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  if(this.x > this.canvas.width - this.w || this.x < this.w) {
   
    this.vx = -this.vx
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
  this.vy -= 13;
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

Player.prototype.checkCollision = function(ball) {
  
  if(ball.x + ball.r >= this.x &&
      ball.x - ball.r <= (this.x + this.w) &&
      ball.y + ball.r >=  this.y &&
      ball.y - ball.r <= (this.y + this.h)) 
    {
      // if (ball.x + ball.r > this.x + (this.w / 2)) {
      //   ball.vy = -ball.vy
      // } else if (ball.x + ball.r < this.x + (this.w / 2)) {
      //   ball.vy = -ball.vy
      //   ball.vx = -ball.vx }  Para ver con que mitad de la cabeza le da
  

     if (ball.x + ball.r > this.left) {
       ball.vx = -ball.vx
     }
     if (ball.x - ball.r < this.right) {
       ball.vx = +3
     }
     if (ball.y + ball.r < this.top) {
       ball.vy = -3
     }
     if (ball.y + ball.r > this.bottom) {
       ball.vy = -ball.vy
     }
    }}
  

Player.prototype.collideWithPlayer = function (ball) {
  
  if (this.x < ball.x + ball.w &&
    this.x + this.w > ball.x &&
    this.y < ball.y + ball.h &&
    this.h + this.y > ball.y){

     if (this.x + this.w < ball.x + ball.h) {
      this.x = ball.x - this.w;
     } else if (this.x + this.h < ball.x + ball.w) {
       this.x = ball.x + ball.w + this.w;
     } 
      
      

      }
  
}







