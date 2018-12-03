function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.pl = new Player(
    this.ctx,
    200,
    "https://vignette.wikia.nocookie.net/headsoccer/images/c/c7/Character01.png/revision/latest?cb=20150720195707",
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
    "player1"
  );
  this.pl2 = new Player(
    this.ctx,
    900,
    "https://vignette.wikia.nocookie.net/headsoccer/images/1/1e/Character03.png/revision/latest?cb=20150720195707",
    A,
    D,
    W,
    "player2"
  );
  this.bl = new Ball(this.ctx);

  this.timer = document.getElementById("timer");

  this.setListeners();
}

Game.prototype.start = function(playerRigthSrc, playerLeftImageSrc) {
  if (!this.intervalId) {
    this.init(playerRigthSrc, playerLeftImageSrc);
    this.intervalId = setInterval(
      function() {
        this.clear();
        this.drawAll();
        this.checkGameOver();
        this.moveAll();
      }.bind(this),
      DRAW_INTERVAL_MS
    );

    this.cronometherInterval = setInterval(function() {
      this.timer.innerHTML--;
      if (document.getElementById("timer").innerHTML < 0) {
        if (
          document.getElementById("player1").innerHTML >
          document.getElementById("player2").innerHTML
        ) {
          alert("Game Over, Player 1 Wins");
        } else if (
          document.getElementById("player1").innerHTML <
          document.getElementById("player2").innerHTML
        ) {
          alert("Game Over, Player 2 Wins!");
        } else if (
          document.getElementById("player1").innerHTML ===
          document.getElementById("player2").innerHTML
        ) {
          alert("Game Over, It´s a Tie!");
        }
      }
    }, 1000);
  }
};

Game.prototype.init = function() {
  this.pl = new Player(
    this.ctx,
    200,
    "https://vignette.wikia.nocookie.net/headsoccer/images/c/c7/Character01.png/revision/latest?cb=20150720195707",
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
    "player1"
  );
  this.pl2 = new Player(
    this.ctx,
    900,
    "https://vignette.wikia.nocookie.net/headsoccer/images/1/1e/Character03.png/revision/latest?cb=20150720195707",
    A,
    D,
    W,
    "player2"
  );
  this.bl = new Ball(this.ctx);
  this.pl.getScore();
  this.pl2.getScore();
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
  if (this.pl.getScore() > 1) {
    alert("Game Over, Player 1 wins ");
    // this.init();
    document.location.reload();
  } else if (this.pl.getScore() > 1) {
    alert("Game Over, Player 2 Wins");
    // this.init();
    document.location.reload();
  }
};

Game.prototype.characterSelection = function() {
  eve
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
