var express = require('express');
const db = require('./quries');


var bodyParser = require('body-parser');

var app = express(); //creating server
 



var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());


app.set('view engine', 'ejs'); //setting view engine for app


app.use('/assets', express.static('assets'));

// app.get("", function(req, res){
//     res.send('host working..1')
// });

app.get("", function(req, res){
    console.log("server working with empty url get");
    res.render('home');
});


// app.get('/register/submit',function(req,res){
//     console.log('Get Request obtained from Backbone.JS');

//     data = {
//         backend:"NODE.JS and Express"
//     }
//     res.writeHead(200,{'Content-Type':'applicatiresulton/json'});
    
//     res.write(JSON.stringify(data) + ' im from server.js ');
    
//     res.end();
// });


// app.post('/register/submit',urlencodedParser,function(req,res){
//     console.log(req.body);
//     console.log('Post Request Accepted' );
//     res.end();
// });

//app.post('/register/submit',urlencodedParser,db.createUser);






app.post('/submit',  (req, res)=>{
    let result =  db.createUser(req, res, (err, response) => {
        if(err) {
            res.send(err);    
        }
        res.send(response);
    });
        }
    );

app.get('/show', async (request,response)=>{
       let  result  = await db.showUser(request, response);
       await console.log(result)
       await response.send(result);
});

app.listen(3001); // listing the port