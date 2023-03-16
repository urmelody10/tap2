const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    unane: {type:String},
    psw:{type:String},
})

module.exports = mongoose.model('users', ProductSchema)