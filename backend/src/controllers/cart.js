const { isValidObjectId } = require("mongoose");
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.addToCart = async (req, res, next) => {
  const payload = { ...req.body };
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
          const doc = await cartModel.updateOne(
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
              existCart.cartItems.push({ cartItems: payload[0]._id });
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
        const addCartToUser = new cartModel({
          userId: req.id,
          cartItems: cartItems,
        });
        addCartToUser.save((err, result) => {
          if (err) return res.status(400).json({ message: `error ${err}` });
          console.log(result);
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
  //const { user } = req.body.payload;
  //if(user){

  const FoundedCart = await cartModel.findOne({ userId: req.id });
  console.log(FoundedCart);
  console.log(`that is id ${req.id}`);

  cartModel
    .findOne({ useIdr: req.id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item) => {
          cartItems[item.product._id] = {
            _id: item.product._id,
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        console.log(cartItems);
        return res.status(200).json({ cartItems });
      } else {
        return res.status(204).json({ message: "Not Cart Items" });
      }
    });
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
