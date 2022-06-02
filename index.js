const express = require("express")
const cors = require('cors');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const Parser = require('rss-parser');

let app = express()
let parser = new Parser();
let allowedOrigins = ['http://localhost:3000'];

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));



app.use(express.static(__filename))
app.listen(90)

// GET method route
app.get('/', function (req, res) {
    res.send('This is Simple API ,create for prevent CORS :)');
});
  
  // POST method route
app.post("/podcast",function(req,res){
    console.log(req.body)
    let xmlURL = req.body.podcast

    parser.parseURL(xmlURL).then(resp=>{
        console.log(resp)

        res.send(resp)
    })
})

app.post("/episode",function(req,res){
    let episode = req.body.episode

    fetch(episode).then(resp=>{
        console.log(resp)
        res.send(resp)
    })
})