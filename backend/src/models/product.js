const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: {
        type: String,
        required:true
    },
    cost: {
        type: Number,
        required: true
    },
    catiegories:{
        type: Array
    }
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel