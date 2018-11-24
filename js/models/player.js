function Player(ctx) {
  this.img = new Image();
  this.img.src = "img/mario.png";
  this.img.frames = 3;
  this.img.frameIndex = 0;
}

Player.prototype.draw = function() {
};

Player.prototype.move = function() {
};

Player.prototype.animate = function() {
};

Player.prototype.jump = function() {
};

Player.prototype.isJumping = function() {
};

Player.prototype.onKeyDown = function(event) {
};

Player.prototype.onKeyUp = function(event) {
};
