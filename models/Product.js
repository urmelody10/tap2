const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    username: {type:String},
    psw:{type:String},
    mood:{type:Array},
    assignment:{type:Array},
 
})

// ------Noscript
// duedate  :{type:Date} ,
// priority :{type:String}

module.exports = mongoose.model('users', ProductSchema)