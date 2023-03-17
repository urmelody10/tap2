const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    username: {type:String},
    psw:{type:String},
    mood:{type:Array}
})

module.exports = mongoose.model('users', ProductSchema)