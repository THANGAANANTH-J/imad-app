console.log('Loaded!');
 // code for counter

var button = document.getElementById('counter');

button.onclick = function(){
   // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
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


var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                
                //capture the list of names and render it as a list
                
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                       
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
    
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    // make the request
    request.open('GET','http://thangamananth.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    
    
    
   
};


var submit1 = document.getElementById('submit_button');
submit1.onclick = function(){
    
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                
                alert("logged successfully");
                
            }else if(request.status === 403){
                
                alert("username/ password is incorrect");
               
            }else if(request.status === 500){
                
               alert("something went wrong in the server");
            }
        }
    };
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    console.log(username);
    console.log(password);
    console.log(JSON.stringify({username: username, password: password}));
    // make the request
    request.open('POST','http://thangamananth.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
    

   
};