const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    username: String,
    mood: Array,
    assessment: String,
    priority: String,
    psw:String,

    
})

module.exports = mongoose.model('users', ProductSchema)