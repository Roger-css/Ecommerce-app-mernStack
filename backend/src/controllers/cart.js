const { isValidObjectId } = require('mongoose');
const cartModel = require('../models/cart');
const productModel = require("../models/product")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.addToCart = async (req, res, next) => {
    
    const {cartItems, price} = req.body
    try {
            const existCart =  await cartModel.findOne({userId: req.id}).exec()
            if(existCart){
                const isProductExsist = existCart.cartItems.find(e => e.product == cartItems.product)
                if(isProductExsist){
                    const doc = await cartModel.updateOne(
                        {
                            userId: req.id,
                            "cartItems.product": cartItems.product
                        },{
                            $inc:{
                                'cartItems.$.quantity':1
                            }
                        })
                    return res.status(200).json({message: "quantity added "})
                } else {
                    const isValidObjectId = ObjectId.isValid(cartItems.product)
                    if(isValidObjectId){
                        const isProductId = await productModel.findOne({_id: cartItems.product})
                        if(isProductId){
                            cartModel.updateOne({userId: req.id},
                                {
                                    $push: {
                                        cartItems: {
                                            product: cartItems.product,
                                            price: price
                                        }
                                    }
                                })
                            existCart.cartItems.push({cartItems})
                            await existCart.save()
                            return res.status(201).json({existCart})
                    } else {
                        res.status(400).json({message: " no such product"})
                        }
                    } else {
                        res.status(400).json({message: " no such product"})
                    }
                }
            } else {
                const addCartToUser =  new cartModel({
                    userId: req.id,
                    cartItems: cartItems
            })
            addCartToUser.save((err, result)=> {
                if (err) return res.status(400).json({message: `error ${err}`})
                if (result) return res.status(201).json({message: result})
            })
            }
    } catch (error) {
        return res.status(400).json({message: "error happened"})
    }
}