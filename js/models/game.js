function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.pl = undefined;
  this.pl2 = undefined;
  this.bl = new Ball(this.ctx);
  

  this.timer = document.getElementById("timer");

  $(".box img").click(this.onClickPlayerAvatar.bind(this));
  this.$selectPlayerMenu = $("#character-selection");

  this.playerRigthSrc = undefined;
  this.playerLeftImageSrc = undefined;

  this.setListeners();
}

Game.prototype.onClickPlayerAvatar = function(event) {
  var src = event.target.getAttribute("src");
  if (!this.playerLeftImageSrc) {
    this.playerLeftImageSrc = src;
  } else {
    this.playerRigthSrc = src;
  }

  if (this.playerRigthSrc && this.playerLeftImageSrc) {
    this.$selectPlayerMenu.hide();
    this.start();
  }
};

Game.prototype.start = function() {
  if (!this.intervalId) {
    this.init();
    this.playerLeftImageSrc = undefined;
    this.playerRigthSrc = undefined;
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
    // "https://vignette.wikia.nocookie.net/headsoccer/images/c/c7/Character01.png/revision/latest?cb=20150720195707",
    this.playerLeftImageSrc,
    A,
    D,
    W,
    "player1"
  );
  this.pl2 = new Player(
    this.ctx,
    900,
    // "https://vignette.wikia.nocookie.net/headsoccer/images/1/1e/Character03.png/revision/latest?cb=20150720195707",
    this.playerRigthSrc,
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
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
  // if (this.pl.getScore() > 1) {
  if (document.getElementById("player1").innerHTML > 4) {
    alert("Game Over, Player 1 wins ");
    // this.init();
    document.location.reload();
    // } else if (this.pl.getScore() > 1) {
  } else if (document.getElementById("player2").innerHTML > 4) {
    alert("Game Over, Player 2 Wins");
    // this.init();
    document.location.reload();
  }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};




