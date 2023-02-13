const Product = require("../../models/product")
const Category = require("../../models/category")



module.exports.getInitialData =  async (req, res, next)=> {
        try {
            const Categories = await Category.find({}).exec()

            const Products = await Product.find(
                                    {}, 
                                    "_id name price quantity slug description productPictures category")
                                    .populate("category")
                                    .exec()
            return res.status(200).json({
            Categories,
            Products
            })
        } catch (error) {
            res.status(400).json({message: "error happened"})
        }
}