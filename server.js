var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'thangamananth',
    database: 'thangamananth',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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


function hash(secret,salt){
    
    var hashed = crypto.pbkdf2Sync(secret, salt, 10000, 512, 'sha512');    
    return ['pbkdf','10000',salt,hashed.toString('hex')].join('$');

}

app.get('/hash/:input',function(req,res){
    
    var hashedString = hash(req.params.input,'salt-to-the-string');
    res.send(hashedString);
    
});


var pool = new Pool(config);

app.post('/create_user', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt).toString('hex');
    pool.query('INSERT INTO user_pwd (username,password) VALUES ($1,$2)',[username,dbString], function(err,result){
        
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('user successfully created  '+ username);
        }
    });
    
}); 


app.post('/login', function(req,res){
    
   // var username = req.body.username;
    //var password = req.body.password;
    
    
    pool.query('SELECT * from user_pwd where username = $1', [req.body.username], function(err,result){
        
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                //res.send(JSON.stringify(result.rows));
                res.status(403).send('username/password is invalid... Response length problem');
            } 
            else{
                //var fileName = req.params.fileName;  
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                hashedPassword = hash([req.body.password], salt);
                if(hashedPassword === dbString){
                    res.send('credentials are correct');
                }else{
                    res.status(403).send('username/password is invalid');
                }
                
            }
        }
    });
    
});


app.get('/articles/:articleName', function (req, res) {
    
    pool.query("SELECT * from article WHERE title = $1",[req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(404).send('Articles not found');
            }
            else{
                //var fileName = req.params.fileName;  
                var articledata = result.rows[0];
                res.send(createtemplate(articledata));
            }
        }
    });
    
  
});

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
