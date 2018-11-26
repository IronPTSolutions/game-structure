function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.pl = new Player(this.ctx);
  this.pl2= new Player2(this.ctx)
  this.bl = new Ball(this.ctx);
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();
    this.drawAll();
    this.checkGameOver();
    this.moveAll();
  
    
  }.bind(this), DRAW_INTERVAL_MS);
};

Game.prototype.drawAll = function(action) {
  this.bg.draw();
  this.pl.draw();
  this.pl2.draw();
  this.bl.draw();
  

};



Game.prototype.moveAll = function(action) {  
  this.bl.move();
  this.pl.move();
  this.pl2.move();
  this.pl.checkCollision(this.bl);
  this.pl2.checkCollision(this.bl)
  
};




Game.prototype.checkGameOver = function() {
};

Game.prototype.gameOver = function() {
  clearInterval(this.intervalId);

  if (confirm("GAME OVER! Play again?")) {
    location.reload();
  }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
