function initCanvas(){
    var canvas = document.getElementById("display");
    canvas.height = window.innerHeight - 50;
    canvas.width = canvas.height;
}

document.body.onload = initCanvas();