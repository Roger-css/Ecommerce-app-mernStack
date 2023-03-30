const { isValidObjectId } = require("mongoose");
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.addToCart = async (req, res, next) => {
  const { cartItems, price } = req.body;
  try {
    const existCart = await cartModel.findOne({ userId: req.id }).exec();
    if (existCart) {
      const isProductExsist = existCart.cartItems.find(
        (e) => e.product == cartItems.product
      );
      if (isProductExsist) {
        const doc = await cartModel.updateOne(
          {
            userId: req.id,
            "cartItems.product": cartItems.product,
          },
          {
            $inc: {
              "cartItems.$.quantity": 1,
            },
          }
        );
        return res.status(200).json({ message: "quantity added " });
      } else {
        const isValidObjectId = ObjectId.isValid(cartItems.product);
        if (isValidObjectId) {
          const isProductId = await productModel.findOne({
            _id: cartItems.product,
          });
          if (isProductId) {
            cartModel.updateOne(
              { userId: req.id },
              {
                $push: {
                  cartItems: {
                    product: cartItems.product,
                    price: price,
                  },
                },
              }
            );
            existCart.cartItems.push({ cartItems });
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
        if (result) return res.status(201).json({ message: result });
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "error happened" });
  }
};

exports.getCartItems = async (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  console.log("it worked 1?");

  const FoundedCart = await cartModel.findOne({ user: req.id });
  console.log(req.id);

  cartModel
    .findOne({ user: req.id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      console.log("it worked 2?");
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          console.log(`product id  = ${item.product._id}`);
          console.log(`product name  = ${item.product.name}`);
          console.log(`product pic  = ${item.product.productPictures[0].img}`);
          console.log(`product id  = ${item.product.price}`);
          console.log(`product qty  = ${item.quantity}`);
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
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
