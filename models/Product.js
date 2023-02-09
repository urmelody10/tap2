const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    mood: String,
    assessment: String,
    priority: String,

    
})

module.exports = mongoose.model('Product', ProductSchema)