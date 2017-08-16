console.log('Loaded!');

function aboutme()
         {
            document.write ("This is Thanga Ananth... I have finished ME in Embedded Systems.... ");
         }
         
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

var img = document.getElementById('madi');
img.onclick = function(){
    img.style.marginLeft = '100px';
}