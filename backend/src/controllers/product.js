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
                console.log(req.body)
                let productPictures = []
                if(req.files){
                    if(req.files.length > 0){
                        productPictures = req.files.map(file => {
                            return {img : file.filename}
                        })
                    }
                }
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
        console.log(categoryName);
        const category = await categoryModel.findOne({name: categoryName})
        if(category){
            const products = await productModel.find({category})
                return res.status(200).json({
                products,
                productsByPrice:{
                    under5k: products.filter(singleProduct => singleProduct.price < 5000),
                    under10k: products.filter(singleProduct => 5000 <= singleProduct < 10000),
                    under15k: products.filter(singleProduct => 10000 <= singleProduct < 15000),
                    under20k: products.filter(singleProduct => 15000 <= singleProduct < 20000),
                    under25k: products.filter(singleProduct => 20000 <= singleProduct < 25000),
                    under30k: products.filter(singleProduct => 25000 <= singleProduct < 30000)
                }
            })
        } else {
            return res.status(404).json({message : " no such category"})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : error})
    }
}


module.exports.getProductsById = async (req , res, next) => {
    try {
        const {productId} = req.params
        const product = productModel.findById({_id: productId}).exec()
        if(product){
            return res.status(200).json({product})
        } else {
            return res.status(400).json({message: "something went wrong"})
        }
    } catch (error) {
            console.log(error);
            return res.status(400).json({message: "something went wrong"})
    }
}

// end of public routes 
