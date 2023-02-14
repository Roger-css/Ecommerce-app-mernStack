const Product = require("../../models/product")
const Category = require("../../models/category")



module.exports.getInitialData =  async (req, res, next)=> {
        try {
            const Categories = await Category.find({}).exec()
            const Products = await Product.find(
                                    {}, 
                                    "_id name price quantity slug description productPictures category")
                                    .exec()
                                    
        console.log("worked");
        console.log(req.username)
            return res.status(200).json({
            Categories,
            Products
            })
        } catch (error) {
            return res.status(400).json({message: "error happened"})
        }
}