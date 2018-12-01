function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.pl = new Player(this.ctx,200, "https://vignette.wikia.nocookie.net/headsoccer/images/c/c7/Character01.png/revision/latest?cb=20150720195707", KEY_LEFT, KEY_RIGHT, KEY_UP);
  this.pl2 = new Player(this.ctx, 900, "https://vignette.wikia.nocookie.net/headsoccer/images/1/1e/Character03.png/revision/latest?cb=20150720195707", A,D,W);
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
  if (document.getElementById('player1').innerHTML > 2) {
    alert('Game Over, Player 1 wins ');
    
    document.location.reload();
  } else if (document.getElementById('player2').innerHTML > 2) {
    alert('Game Over, Player 2 Wins')
    document.location.reload()
  }
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
