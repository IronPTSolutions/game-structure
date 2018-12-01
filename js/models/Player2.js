function Player2(ctx) {
  this.ctx = ctx;

  this.x = 400;
  this.y = 500;
  this.y0 = this.y;

  this.vx = 0;
  this.vy = 0;

  this.g = 0.5;

  this.img = new Image();
  this.img.src = "https://vignette.wikia.nocookie.net/headsoccer/images/1/1e/Character03.png/revision/latest?cb=20150720195707";
  this.img.frames = 1;
  this.img.frameIndex = 1;

  this.w = 70;
  this.h = 90;
  this.score = 0;

  this.drawCount = 0;
}


Player2.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};


Player2.prototype.onKeyDown = function(event) {
  switch (event.keyCode) {
    case D:
      this.vx = 10;
      break;
    case A:
      this.vx = -10;
      break;
    case W:
      this.jump();
      break;
    case KEY_SPACE:
      this.shoot();
      break;
  }
};

Player2.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case D:
    case A:
      this.vx = 0;
      break;
  }
};






Player2.prototype.draw = function() {
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

  if (this.drawCount % 10 === 0) {
    this.drawCount = 0;
    this.animate();
  }
};

Player2.prototype.move = function() {
  this.vy += this.g;
  this.y += this.vy;

  this.x += this.vx;
  
  if (this.y >= this.y0) {
    this.y = this.y0;
    this.vy = 0;
  }
};


;

Player2.prototype.jump = function() {
  if (this.isJumping()) {
    return;
  }

  this.img.frameIndex = 2;
  this.vy -= 13;
}

Player2.prototype.isJumping = function() {
  return this.y < this.y0;
};



Player2.prototype.animate = function() {
  if (this.isJumping()) { return; }


  if (++this.img.frameIndex > 2) {
    this.img.frameIndex = 0;
  }
}


Player2.prototype.checkCollision = function(ball) {
  

    if(ball.x + ball.r >= this.x &&
      ball.x - ball.r <= (this.x + this.w) &&
      ball.y + ball.r >=  this.y &&
      ball.y - ball.r <= (this.y + this.h)) 
    {   
      if (ball.x + ball.r > this.x + (this.w / 2)) {
        ball.vy = -ball.vy
      } else if (ball.x + ball.r < this.x + (this.w / 2)) {
        ball.vy = -ball.vy
        ball.vx = -ball.vx
      }
  }
  
}

Player2.prototype.collideWithPlayer = function (player) {
  if (this.x < player.x + player.w &&
    this.x + this.w > player.x &&
    this.y < player.y + player.h &&
    this.h + this.y > player.y){
     
      if (this.x + this.w < player.x + player.h) {
        this.x = player.x - this.w;
       } else if (this.x + this.h < player.x + player.w) {
         this.x = player.x + player.w + this.w;
       }
      
       
      
      
}
    

    
}




