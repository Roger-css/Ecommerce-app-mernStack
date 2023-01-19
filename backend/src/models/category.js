const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: String
    }
})

const categoryModel = mongoose.model("category", categorySchema)


module.exports = categoryModel