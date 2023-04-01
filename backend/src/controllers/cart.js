const { isValidObjectId } = require("mongoose");
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.addToCart = async (req, res, next) => {
  const payload = { ...req.body };
  console.log(payload);
  try {
    if (!req.body) {
      return res.status(401).json({ message: "Nothing to add" });
    }
    if (req.body.length > 0) {
      const existCart = await cartModel.findOne({ userId: req.id }).exec();
      if (existCart) {
        const isProductExsist = existCart.cartItems.find(
          (e) => e.product == payload[0]._id
        );
        if (isProductExsist) {
          cartModel.updateOne(
            {
              userId: req.id,
              "cartItems.product": payload[0]._id,
            },
            {
              $inc: {
                "cartItems.$.quantity": 1,
              },
            }
          );
          return res.status(200).json({ message: "quantity added " });
        } else {
          const isValidObjectId = ObjectId.isValid(payload[0]._id);
          if (isValidObjectId) {
            const isProductId = await productModel.findOne({
              _id: payload[0]._id,
            });
            if (isProductId) {
              cartModel.updateOne(
                { userId: req.id },
                {
                  $push: {
                    cartItems: {
                      product: req.body[0]._id,
                    },
                  },
                }
              );
              existCart.cartItems.push({ product: payload[0]._id });
              await existCart.save();
              return res.status(201).json({ existCart });
            } else {
              res.status(400).json({ message: " no such product" });
            }
          } else {
            res.status(400).json({ message: " no such product" });
          }
        }
      } else {
        const newItem = {
          product: payload[0]._id,
          price: payload[0].price,
        };
        const addCartToUser = new cartModel({
          userId: req.id,
          cartItems: [newItem],
        });
        addCartToUser.save((err, result) => {
          if (err) return res.status(400).json({ message: `error ${err}` });
          if (result) return res.status(201).json({ message: result });
        });
      }
    } else {
      return res.status(204).json({ message: "there is no item to add" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error happened" });
  }
};

exports.getCartItems = async (req, res) => {
  console.log(req.id);
  if (isValidObjectId(req.id)) {
    try {
      const foundedCart = await cartModel
        .findOne({ userId: req.id })
        .populate("cartItems.product", "_id name price productPictures");
      if (foundedCart) {
        let cartItems = {};
        foundedCart.cartItems.forEach((item) => {
          console.log(item.quantity);
          cartItems[item._id] = {
            _id: item.product._id,
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        return res.status(200).json({ cartItems });
      } else {
        return res.status(204).json({ message: "Not Cart Items" });
      }
    } catch (error) {
      return res.status(204).json({ message: "invalid auth " });
    }
  }
};

// new update remove cart items
// exports.removeCartItems = (req, res) => {
//   const { productId } = req.body.payload;
//   if (productId) {
//     cartModel
//       .update(
//         { user: req.id },
//         {
//           $pull: {
//             cartItems: {
//               product: productId,
//             },
//           },
//         }
//       )
//       .exec((error, result) => {
//         if (error) return res.status(400).json({ error });
//         if (result) {
//           res.status(202).json({ result });
//         }
//       });
//   }
// };
