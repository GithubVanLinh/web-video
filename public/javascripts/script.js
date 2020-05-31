

var v = document.getElementById("video");
var cs = document.getElementById("cs");
const img = document.getElementById("image");

var canvas = document.createElement("canvas");
const frame = document.getElementById("frame");
const socket = io.connect('http://localhost:3000');
frame.number = 0;
const width = 640;
const height = 360;
v.style.width = width+"px";
v.style.height = height+"px";

var csctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;
const FPS = 12;
var i;
socket.on('image-after', function(image) {
     // load image from data url
     
     img.src = 'data:image/jpeg;base64,'+image;
})
v.addEventListener('play',function() {
    i=window.setInterval(function() {
        csctx.drawImage(v,0,0,width,height);
        data =canvas.toDataURL('image/jpeg');
        socket.emit('image', data);
    },1000/FPS);
},false);
v.addEventListener('pause',function() {window.clearInterval(i);},false);
v.addEventListener('ended',function() {clearInterval(i);},false);