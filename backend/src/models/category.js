const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    categoryPic: {type: String},
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    parentId: {
        type: String
    }
},{timestamps: true})

const categoryModel = mongoose.model("Category", categorySchema)


module.exports = categoryModel