var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'thangamananth',
    database: 'thangamananth',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

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

var pool = new Pool(config);

app.get('/test-db', function (req, res) {
    
    pool.query('SELECT * from test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/ProfilePage', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ProfilePage.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
}); 

var names =[];
app.get('/submit-name',function (req, res) {
  var name = req.query.name; 
  names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
    
    pool.query("SELECT * from article where title = '"+ req.params.articleName + "'", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(404).send('Articles not found');
            }
            else{
                //var fileName = req.params.fileName;  
                var fileName = result.rows[0];
                res.send(createtemplate(files[fileName]));
            }
        }
    });
    
  
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

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names =[];
app.get('/submit-name',function (req, res) {
  var name = req.query.name; 
  names.push(name);
  res.send(JSON.stringify(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
