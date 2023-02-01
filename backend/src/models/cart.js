const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref:"User", required: true},
    cartItems: [
        {
            quantity: {type: Number, default: 1},
            product: {type: mongoose.Types.ObjectId, ref:"Product"},
            price: {type: Number}
        }
    ]
},{timestamps: true})

const cartModel = mongoose.model("Cart", categorySchema)


module.exports = cartModel