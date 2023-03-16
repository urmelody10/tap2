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
const socketio = require("socket.io");
const console = require('console');



mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin_urMelody:wansib@tap.k9pzawb.mongodb.net/test')
        .then(() => console.log('connection successfully!!!!!!!!!!!!!!!!!!!'))
        .catch((err) => console.error(err))

  const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at http://localhost:3000/`);
});


// Initialize socket for the server
const io = socketio(server, { autoConnect: false });
var roomno = Math.random()
io.on("connection", (socket) => {

  console.log(`New user connected ID: ${socket.id}`);

  socket.username = socket.id

  
  });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(overried('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(cookieParser())








app.get("/",(req,res)=>{
  res.render("main")
});
 
app.get("/mood",(req,res) =>{
  res.render("mood")
});




app.get("/add",(req,res) =>{
  res.render("task")
});




app.get("/todo",(req,res) =>{
  res.render("todo")
});

app.get("/assignment",(req,res) =>{
  res.render("assignment")
});

app.post("/mood_history",(req,res) =>{
  var data = req.body
  data = Object.values(data)
  res.render("mood_history",{data:data})  
})

app.post("/sent_mood", async (req,res) =>{
  var data = req.body
  data = Object.values(data)
  
  var user = await products.find({})
  
  arr = user[0].mood
  
  arr.push(data[0])
  console.log(arr)
  await products.findOneAndUpdate({username:"punsib"},{$set:{mood:arr}})
})



app.get("/signupSuccess",(req,res) =>{
  res.render("signupSuccess")
})



app.get("/login",(req,res) =>{
  
  res.render("login")

})

app.post("/login", async function(req, res){
  try {
      // check if the user exists
      const user = await products.findOne({ username: req.body.username });
      console.log(user)
      console.log(req.body.username)
      console.log(req.body.password)
      if (user) {
        //check if password matches
        const result = req.body.password === user.password;
        var data = req.body.username
        if (result) {
          res.render("b_login",{data:data});
        } else {
          res.status(400).json({ error: "password doesn't match" });
        }
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error });
    }
});

 
  



app.get("/register", (req, res) =>{
  res.render("register")
});

app.get("/signup_succes", (req,res) =>{
  res.render("signupSuccess")
})



app.post("/register",async (req,res, next)=>{
  console.log("req: "+req.body.username)
  console.log(req.body.psw)
  let username = req.body.username;
  let psw = req.body.psw;
  let existUsername = await products.find({username: username})
  console.log(username)
  console.log(psw)
  console.log(existUsername)
  console.log("find: "+ existUsername[0])
  if (existUsername[0]) {
    console.log("Username not valid")
    res.render("register", {error:"1"});
  }
  else{
    console.log("Username valid")
    products.insertMany([{
        username: username ,
        psw: psw
      }])
    res.render("signupSuccess")
  }

  console.log(username)
  console.log(psw)
});

