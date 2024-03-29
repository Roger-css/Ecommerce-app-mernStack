const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: { type: Number },
    productPictures: [
      {
        img: { type: String },
      },
    ],
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: { Date },

    // catiegories:{
    //     type: Array
    // }
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
