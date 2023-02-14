//======login  register=============
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose"),
    User = require("./models/user");
 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");
 
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const mongoose = require('mongoose');
const products = require('./models/Product');
const overried = require('method-override');
const bodyParser = require('body-parser')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin_urMelody:wansib@tap.k9pzawb.mongodb.net/?retryWrites=true&w=majority')
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






app.listen(3000);


