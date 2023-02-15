const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    mood: Array,
    assessment: String,
    priority: String,

    
})

module.exports = mongoose.model('Product', ProductSchema)