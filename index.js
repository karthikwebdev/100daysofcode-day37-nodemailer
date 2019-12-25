// declaring the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');
var randomstring = require("randomstring");
// initialise express 
var app = express();
//setting views folder
app.set("views",path.join(__dirname,"/views/"))

//setting view engine
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'main',layoutsDir:__dirname + '/views/layouts/' }));
app.set('view engine','hbs');

//setting bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set static folder
app.use(express.static(path.join(__dirname , '/public' )))

// setting port 
app.listen(5000 , ()=>{
    console.log('server started at localhost:5000')
})


// app router
app.get('/' , (req , res)=>{
    res.render('app')
})
app.post('/mail',(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kartheekenumarthi@gmail.com',
          pass: 'sneha12345'
        }
      });
      var mailOptions = {
        from: "KARTHIK'S OPT APP",
        to: req.body.email,
        subject: "OPT from karthik's app",
        text: `your OTP from node app is given below
                
        
    this OTP is highly confidential hence please don't share with anyone.


                ${randomstring.generate(7)}`
      };      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.render('app', {msg:"email sent to " + req.body.email})
        }
      });
})