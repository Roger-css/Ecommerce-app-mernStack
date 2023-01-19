const slugify = require('slugify')
const categoryModel = require("../models/category")

const categoryList = (cat, parentId=null)=> {

}
module.exports.addCtaegory = (req, res, next)=> {
    try {
        if(req.role === "admin"){
            const {name, parentId} = req.body
            const categoryObj = {
            name,
            slug: slugify(name)
            }
            if(parentId) {
            categoryObj.parentId = parentId
            }
            const category = new categoryModel(categoryObj)
            category.save((err, category)=> {
                if(err) return res.status(400).json({message: err})
                if(category) return res.status(201).json({category}) 
            }) 
        } else {
            res.status(400)
        }
        
    } catch (error) {
        res.status(400).json({error})
        console.log(error);
    }
}

module.exports.getCategories = async (req, res, next)=> {
        const categoryList = await categoryModel.find({}).exec()
        res.status(200).json({categoryList})
}