const slugify = require("slugify")
const productModel = require("../models/product")



module.exports.createProduct = (req, res , next) => {
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
            const product = new productModel ({
                name,
                slug: slugify(name),
                price,
                quantity,
                category,
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