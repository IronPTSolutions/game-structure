function Ball(ctx, x, y) {
  this.ctx = ctx;


  this.r = 20;
  this.x = x || 600;
  this.y = y || 200;

  this.vx = 1;
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

if(this.y + this.vy > 600 - this.r || this.y + this.vy < this.r) {
    
  this.vy = -this.vy;
} 

if(this.x + this.vx < 100 && this.y + this.vy < 300 && this.y + this.vy > 280) {
  
  this.vx = -this.vx;
  this.vy = -this.vy

}

if (this.x + this.vx > 1100 && this.y + this.vy < 300 && this.y + this.vy > 280) {
  
  this.vx = -this.vx;
  this.vy = -this.vy;
} // solo funciona la primera vez

this.x += this.vx;
this.y += this.vy;

}

Ball.prototype.move = function() {
  this.vy += this.g;
  
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.goal = function () {
  // this.player1Score = document.getElementById('player1').value = '0'
  if (this.x + this.r < 100 && this.y + this.r > 300) {
   document.getElementById('player1').innerHTML++
    
    this.vx = 2;
    this.vy = 0;
    
    this.x = 600;
    this.y = 200;
} else if (this.x + this.r > 1100 && this.y + this.r > 300) {
  document.getElementById('player2').innerHTML++

  this.vx = -2;
  this.vy = 0;
  
  this.x = 600;
  this.y = 200;
}

}

Ball.prototype.checkGameOver = function() {
  if (document.getElementById('player1').innerHTML === 3) {
    console.log('Game Over, Player 1 Wins');
    document.location.reload();
  } else if (document.getElementById('player2').innerHTML === 3) {
    console.log('Game Over, Player 2 Wins');
    document.location.reload();
  }
}




	










