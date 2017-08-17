var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var files = {

'file1': {
    title:`Article One | thanga ananth`,
    links:`<a href="/">HomePage </a> <br/>
            <a href="/ProfilePage">LinktoProfilePage </a>`,
    content:
    `<p> 
        
        This is article one written by thanga ananth
        This is article one written by thanga ananth
        This is article one written by thanga ananth
    </p>
    <p> 
        This is article one written by thanga ananth
        This is article one written by thanga ananth
        This is article one written by thanga ananth
    </p>
    <p> 
        This is article one written by thanga ananth
        This is article one written by thanga ananth
        This is article one written by thanga ananth
    </p>`
},

'file2': {
    title:`Article Two | thanga ananth`,
    links:`<a href="/">HomePage </a> <br/>
            <a href="/ProfilePage">LinktoProfilePage </a>`,
    content:
    `<p> 
            This is article two written by thanga ananth
            This is article two written by thanga ananth
            This is article two written by thanga ananth
    </p>`
},

'file3': {
    title:`Article Three | thanga ananth`,
    links:`<a href="/">HomePage </a> <br/>
            <a href="/ProfilePage">LinktoProfilePage </a>`,
    content:
    `<p> 
            This is Article Three written by thanga ananth
            This is Article Three written by thanga ananth
            This is Article Three written by thanga ananth
            This is Article Three written by thanga ananth
    </p>`
}
};
    

function createtemplate(data){
    var title = data.title;
    var links = data.links;
    var content = data.content;
    var htmltemplate=
    `<html>
    <head>
        <title>
          ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div>
            ${links}
        </div>
        <hr />
        <div class="container">
            ${content}
        </div>
    </body>
    </html>`
    ;

    return htmltemplate; 

}


 

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
});


app.get('/:fileName', function (req, res) {
  var fileName = req.params.fileName;    
  res.send(createtemplate(files[fileName]));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ProfilePage', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ProfilePage.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
