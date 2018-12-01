function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = "/Users/Mario/Documents/IronHack/game-structure/img/UEFA Champions League - Theme Song (Short Version).mp3";
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }
}