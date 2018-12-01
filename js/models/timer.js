function Timer(ctx) {

this.myVar = setInterval(myTimer, 1000);
this.d = new Date();
document.getElementById("timer").innerHTML = d.toLocaleTimeString();
}


