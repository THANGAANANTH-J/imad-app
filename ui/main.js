console.log('Loaded!');

function aboutme()
 {
    document.write ("This is Thanga Ananth... I have finished ME in Embedded Systems.... ");
 }
         
var element = document.getElementById('main-text');

element.innerHTML = 'New Value';

var img = document.getElementById('madi');

var marginLeft = 0;

function moveRight(){
    
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}

function moveLeft(){
    
    marginLeft = marginLeft - 10;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
    var interval1 = setInterval(moveRight,100);
    var interval2 = setInterval(moveLeft,100);
}