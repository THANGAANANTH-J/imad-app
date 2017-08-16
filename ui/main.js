console.log('Loaded!');

function aboutme()
 {
    document.write ("This is Thanga Ananth... I have finished ME in Embedded Systems.... ");
 }
         
var element = document.getElementById('main-text');

element.innerHTML = 'New Value';

var img1 = document.getElementById('madi');
var img2 = document.getElementById('thanga');
var marginLeft = 0;

function moveRight(){
    
    marginLeft = marginLeft + 10;
    img1.style.marginLeft = marginLeft + 'px';
}

function moveRight(){
    
    marginLeft = marginLeft + 10;
    img2.style.marginLeft = marginLeft + 'px';
}

img1.onclick = function fn1(){
    var interval1 = setInterval(moveRight,100);
    
}

img2.onclick = function fn2(){
    var interval2 = setInterval(moveRight,100);
    
}