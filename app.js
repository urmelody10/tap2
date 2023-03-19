var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const mongoose = require('mongoose');
const products = require('./models/Product');
const overried = require('method-override');
const bodyParser = require('body-parser');
const { findByUsername, db } = require('./models/Product');
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

//home///

app.get("/", async (req, res) => {
  let username = req.cookies.username
  let user = await products.find({username: username})
  console.log("Check Cookie: "+req.cookies.username)
  if(typeof user[0] !== "undefined"){
    if(user[0].username == req.cookies.username) {
      console.log("Check Cookie result: User exist in DB")
      res.render("welcom", {UserbyCookie: "True"})
    }
  }
  else{
    console.log("Check Cookie result: User not exist")
    res.render("welcom", {UserbyCookie:"False"})
  }
});





app.get("/signupSuccess",(req,res) =>{
  res.render("signupSuccess")
})



app.get("/login",(req,res) =>{
  
  res.render("login")

});

app.get("/login_successfully",(req,res) =>{
  res.render("login_successfull")

})

app.post("/login", async function(req, res){
      // check if the user exists
      const user = await products.findOne({ username: req.body.username });
      var username= req.body.username
      var psw = req.body.psw
      
      console.log(user)
      console.log(username)
      console.log(psw)
      console.log(user.username)
      if(user) {
        console.log("First Condotion Pass")
        if(user.username == username) {
          if (user.psw == psw){
            console.log("Acess granted")
            console.log("Found",user)
            res.cookie(`username`,username, { maxAge: 30*24*60*60*1000})
            // CookieExpiryTime
            //   END_OF_SESSION : 0,
            //   SECOND : 1000,
            //   MINUTE : 1000 * 60,
            //   HOUR : 1000 * 60 * 60,
            //   DAY : 1000 * 60 * 60 * 24,
            //   YEAR : 1000 * 60 * 60 * 24 * 365,
            //   NEVER : 1000 * 60 * 60 * 24 * 365 * 20
            console.log('Cookies: ', req.cookies.username)
          }else{
            console.log("Password incorrect")
            res.render("login", {loginStat: "False"})
          }
        }else{
          console.log("Username incorrect")
          res.render("login", {loginStat: "False"})
        }
      }else{
        console.log("User not found")
        res.render("login", {loginStat: "False"})
        
        
      }
      res.render("login_successfull")
      console.log('Cookies: ', req.cookies.username)

     
      
    })


 
  


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




//mood///////

app.get("/mood",async(req,res) =>{
  let username = req.cookies.username
  let user = await products.find({username: username})
  let mood = req.body.mood

  console.log("new mood :"+mood)
  console.log("Check Cookie: "+req.cookies.username)


  if(typeof user[0] !== "undefined"){
    if(user[0].username == req.cookies.username) {
      console.log("Check Cookie result: User exist in DB")
      res.render("mood", {UserbyCookie: "True"})
    }
  }
  else{
    console.log("Check Cookie result: User not exist")
    res.render("mood", {UserbyCookie:"False"})
  }
  console.log("new mood :"+mood)
});

  app.post("/mood",async(req,res) =>{
    
   
  });
  
  
  app.get("/mood_history",(req,res) =>{
    res.render("mood_history")
  });



  app.post("/mood_history", async function(req, res){
   


  });
  
  
  
  

////task/////////


app.get("/add",(req,res) =>{
  res.render("task")
});





app.get("/todo",(req,res) =>{
  res.render("todo")
});

app.get("/assignment",(req,res) =>{
  res.render("assignment")
});

