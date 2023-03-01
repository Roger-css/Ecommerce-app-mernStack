const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    banners: [
        {
                img:{type:String},
                navigateTo: {type: String}
        }
    ],
    products:[
        {
                img:{type:String},
                navigateTo: {type: String}
        }
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        unique: true,
        required:true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required:true
    }

},{timestamps: true})

const categoryModel = mongoose.model("Page", pageSchema)


module.exports = categoryModel