function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.pl = new Player(this.ctx);
  this.pl2 = new Player2(this.ctx)
  this.bl = new Ball(this.ctx);
  

  this.setListeners();
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();
    this.drawAll();
    this.checkGameOver();
    this.moveAll();    
  }.bind(this), DRAW_INTERVAL_MS);
};

Game.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    this.pl.onKeyDown(event);
    this.pl2.onKeyDown(event);
  }.bind(this);

  document.onkeyup = function() {
    this.pl.onKeyUp(event);
    this.pl2.onKeyUp(event);
  }.bind(this);
};

Game.prototype.drawAll = function(action) {
  this.bg.draw();
  this.pl.draw();
  this.pl2.draw();
  this.bl.draw();
  

};



Game.prototype.moveAll = function(action) {  
  this.pl.checkCollision(this.bl);
  this.pl2.checkCollision(this.bl);
  this.pl.collideWithPlayer(this.pl2);
  this.pl2.collideWithPlayer(this.pl);

  this.bl.move();
  this.pl.move();
  this.pl2.move();  

  this.bl.goal();
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
