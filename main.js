window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();


var progressbar = document.getElementById("progress");
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var lose = false;
var blue = false;
var blurry = false;
var timer = 0;
var speed = 3;
var gametime = 0;
var running = true;
var you = 50;
var progress = you;
var keypram = 0.5;
var imagedata = ctx.getImageData(0, 0, c.width, c.height);
var timer2 = 0;
var timeo, timeo2, timeo3;
//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";


//making the canvas full screen
c.height = window.innerHeight;
c.width = document.body.clientWidth;


//converting the string into an array of single characters
chinese = chinese.split("");


var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++){
    drops[x] = 1;
}

//drawing the characters

function draw() {
    c.height = window.innerHeight;
    c.width = document.body.clientWidth;
    //ctx.clearRect(0, 0, c.width, c.height);

    ctx.putImageData(imagedata, 0, 0);
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
    imagedata = ctx.getImageData(0, 0, c.width, c.height);
    if (running === true) {
        ctx.beginPath();
        ctx.globalCompositeOperation = "color";
        ctx.fillStyle = "red";
        ctx.fillRect(c.width * (progress / 100), 0, c.width * (1 - progress / 100), c.height);
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
    }else{
        
    }
}
window.onblur = function() {
    blurry = true;
    running = false;
    if(blue === true){
    ctx.beginPath();
    ctx.globalCompositeOperation = "color";
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";}
    var fontsize = 10;
    var text = pauses;
    ctx.fillStyle = "#ff0";
    ctx.font = "800 " + fontsize + "px 'Andale Mono'";
    for (var i = 0; i < text.length; i++) {
        var measured = ctx.measureText(text[i]);
        ctx.fillText(text[i], (c.width - measured.width) / 2, (c.height - fontsize * text.length) / 2 + fontsize * i);
    }
    ctx.font = "300 " + fontsize*2 + "px 'Andale Mono'";
    ctx.fillText("Press space to unpause",(c.width - ctx.measureText("Press space to unpause").width) / 2, (c.height + fontsize * text.length + 10 + fontsize*2) / 2);
};
window.onkeyup = keypr;

function keypr(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (running === true) {
        if (keyCode == 32) {
            you += keypram;
        }
    }else{
        if(keyCode == 82){
            running = true;
            you = 50;
            gametime = 0;
            lose = false;
            clearInterval(timeo2);
            clearInterval(timeo3);
            timer = 0;
            timer2 = 0;
            progressbar.style.visibility = "visible";
        }
    }
    if(blurry === true){
        if(keyCode == 32){
            blurry = false;
            running = true;
        }
    }
}

function drawwin(){
    c.height = window.innerHeight;
    c.width = document.body.clientWidth;
    ctx.putImageData(imagedata, 0, 0);
    progressbar.style.visibility = "hidden";
    var hup = 200;
    if(blue === true){
    ctx.beginPath();
    ctx.globalCompositeOperation = "color";
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";}
    var fontsize = 10;
    var text = wins;
    text=epicWin.concat(text);
    ctx.fillStyle = "#ff0";
    ctx.font = "800 " + fontsize + "px 'Andale Mono'";
    for (var i = 0; i < text.length; i++) {
        var measured = ctx.measureText(text[i]);
        ctx.fillText(text[i], (c.width - measured.width) / 2, (c.height - fontsize * text.length - hup) / 2 + fontsize * i);
    }
     ctx.font = "300 " + fontsize*2 + "px 'Andale Mono'";
    ctx.fillText("Press r to play again",(c.width - ctx.measureText("Press r to play again").width) / 2, (c.height + fontsize * text.length - (hup-10)) / 2);
    ctx.fillText("Your score: " + gametime,(c.width - ctx.measureText("Your score: " + gametime).width) / 2, (c.height + fontsize * text.length - (hup-30) + fontsize*2) / 2);
    timeo2 = setTimeout(clear, 1000);
}
function drawlose(){
    c.height = window.innerHeight;
    c.width = document.body.clientWidth;
    ctx.putImageData(imagedata, 0, 0);
    progressbar.style.visibility = "hidden";
    var hup = 200;
    ctx.beginPath();
    ctx.globalCompositeOperation = "color";
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    
    if(blue === true){
        ctx.beginPath();
        ctx.globalCompositeOperation = "color";
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
    }
    var fontsize = 10;
    
    var text = loses;
    text=epicWin.concat(text);
    ctx.fillStyle = "#ff0";
    ctx.font = "800 " + fontsize + "px 'Andale Mono'";
    for (var i = 0; i < text.length; i++) {
        var measured = ctx.measureText(text[i]);
        ctx.fillText(text[i], (c.width - measured.width) / 2, (c.height - fontsize * text.length - hup) / 2 + fontsize * i);
    }
     ctx.font = "300 " + fontsize*2 + "px 'Andale Mono'";
    ctx.fillText("Press r to play again",(c.width - ctx.measureText("Press r to play again").width) / 2, (c.height + fontsize * text.length - (hup-10)) / 2);
    timeo2 = setTimeout(clear, 1000);
}
function clear(){
    c.height = window.innerHeight;
    c.width = document.body.clientWidth;
    ctx.putImageData(imagedata, 0, 0);
    
    if(lose === true){
        ctx.beginPath();
        ctx.globalCompositeOperation = "color";
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
    }
    if(blue === true){
        ctx.beginPath();
        ctx.globalCompositeOperation = "color";
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
    }
    if(lose === false){
        timeo3 = setTimeout(drawwin, 1000);
    }else {
        timeo3 = setTimeout(drawlose, 1000);
    }
    
}

(function animloop() {
    requestAnimFrame(animloop);
    timer++;
    timer2++;
    var random = Math.floor(Math.random() * (30 + 20) + 20);
    if (timer == speed) {
        timer = 0;
        progress = you;
        if (running === true) {
            draw();
            gametime++;
        }
        progressbar.value = progress;
    }
    
        if (you >= 100) {
            if (running === true) {
                running = false;
                drawwin();
            }
        }
        if(you <= 0){
            if (running === true) {
                running = false;
                lose = true;
                drawlose();
            }    
        }
    if (running === true) {
        if (timer2 >= random) {
            you -= keypram;
            timer2 = 0;
        }
    }
})();