var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const mongoose = require('mongoose');
const products = require('./models/Product');
const overried = require('method-override');
const bodyParser = require('body-parser');
const { findByUsername } = require('./models/Product');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin_urMelody:wansib@tap.k9pzawb.mongodb.net/test')
        .then(() => console.log('connection successfully!!!!!!!!!!!!!!!!!!!'))
        .catch((err) => console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(overried('_method'));
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/in",(req,res)=>{
  res.render("index")
});
app.get("/",(req,res)=>{
  res.render("main")
});

app.get("/mood",(req,res) =>{
  res.render("mood")
});

app.get("/task",(req,res) =>{
  res.render("task")
});

app.get("/todo",(req,res) =>{
  res.render("todo")
});

app.get("/assessment",(req,res) =>{
  res.render("assessment")
});

app.post("/mood_history",(req,res) =>{
  var data = req.body
  data = Object.values(data)
  res.render("mood_history",{data:data})  
})

app.get("/login",(req,res) =>{
  res.render("loggin")
})

app.post("/login", async (req, res)=>{
  let uname = req.body.uname;
  let psw = req.body.psw;
  let user = await products.find({username: uname})
  console.log(user)
  console.log(user.psw)
  console.log(psw)
  console.log(uname)

  if(user){
    if(user[0].psw == psw){
      res.render("b_login",{data:user[0]})
    }
    else{
      console.log("Password incocorect")

    }
  }

})





app.listen(3000);


