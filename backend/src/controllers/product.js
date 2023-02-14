const slugify = require("slugify")
const categoryModel = require("../models/category")
const productModel = require("../models/product")



module.exports.createProduct = async (req, res , next) => {
        try {
            const {
                name,
                price,
                quantity,
                category,
                description,
                reviews,
                } = req.body
                let productPictures = []
                if(req.files){
                    if(req.files.length > 0){
                        productPictures = req.files.map(file => {
                            return {img : file.filename}
                        })
                    }
                }
                console.log(`###############################`);
                console.log(req.id)
                // this  peace of code should be modified later
            let categoryId = await categoryModel.findOne({name: category})
            const product = new productModel ({
                name,
                slug: slugify(name),
                price,
                quantity,
                category: categoryId,
                description,
                productPictures,
                reviews,
                createdBy: req.id
            })
                product.save((err, result) => {
                    console.log(err);
                    if (err) return res.status(400).json({err})
                    if (result) return res.status(201).json(result)
                })
            
        } catch (error) {
                console.log(error)
                console.log("its from product")
                res.status(400).json({error})
        }

}

module.exports.getProducts = async (req ,res ,next ) => {
    try {
        const products =  await productModel.find({}).exec()
        if (products){
            return res.status(200).json({products})
        } else {
            return res.status(400).json({message: "error you nab"})
        }
        
    } catch (error) {
        console.log(err);
        return res.status(400).json({message: "error you nab"})
    }
}


// start of public routes 
module.exports.getProductsByCategory = async (req , res, next) => {
    try {
        const {categoryName} = req.params
        const category = await categoryModel.findOne({name: categoryName})
        if(category){
            const products = await productModel.find({category})
            console.log(products);
            return res.status(200).json({products})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : error})
    }
}
// end of public routes 
