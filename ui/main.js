 // code for counter

var button = document.getElementById('counter');

var counter = 0;

button.onclick = function() {
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 //console.log('Loaded!');
 /*// code for counter

var button = document.getElementById('counter');

button.onclick = function(){
   // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.onreadystate === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    // make the request
    request.open('GET','http://thangamananth.imad.hasura-app.io/counter',true);
    request.send(null);
};
*/