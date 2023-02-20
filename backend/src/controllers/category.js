const slugify = require('slugify')
const categoryModel = require("../models/category")

function categoriesOrder(categories,  parentId = null) {
    const catList = []
    let filtredCategories; 
    if(parentId == null){ 
        filtredCategories = categories.filter((singleCat) => singleCat.parentId == undefined);
    } else {
        filtredCategories =  categories.filter((singleCat) => singleCat.parentId == parentId);
    }

    for(let cat of filtredCategories) {
        catList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: categoriesOrder(categories, cat._id)
        });
    }
    return catList;
}


// get category
module.exports.getCategories = async (req, res, next)=> {

    try {
        const categories = await categoryModel.find({}).exec()
        if(categories){
                const ordeCtegories = categoriesOrder(categories)
                return res.status(200).json({ordeCtegories})
        } else {
            res.status(400).json({message:"something went wrong"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
        
}


module.exports.addCategory = async (req, res, next)=> {
    try {
        console.log(req.role);
        // if(req.role === "admin"){
            const {name, parentId} = req.body
            const categoryObj = {
            name,
            slug: slugify(name)
            }
            if(parentId) {
                const theIdNum =   await categoryModel.findOne({name: parentId})
                categoryObj.parentId = theIdNum._id
            }
            if(req.file){
                categoryObj.categoryPic = process.env.API + '/uploads/' + req.file.filename
            }

            const category = new categoryModel(categoryObj)

            category.save((err, category)=> {
                if(err) return res.status(400).json({message: err})
                if(category) return res.status(201).json(category) 
            }) 

        // } 
        // else {
        //     res.status(400).json({message: "access denaied"})
        // }        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

// update Category
module.exports.updateCategory = async (req, res , next ) => {
    const {_id, name, parentId, type} =  req.body
    try {
    let updatedCategoryList = []
    if (name.length > 0){
        for(let i=0 ; i<name.length; i ++){
            const updatedCategoryObject = {
                name : name[i],
                type: type [i]
            }
            if (parentId !== ""){
                updatedCategoryObject.parentId = parentId[i]
            }
            const updatedCategory = await categoryModel.findOneAndUpdate({_id: _id[0]}, updatedCategoryObject)
            updatedCategoryList.push(updatedCategory)
        }
        return res.status(200).json({message: updatedCategoryList})
    } else {
        const updatedCategoryObject = {
            name: name,
            type: type,
            parentId: parentId
        }
        const updatedCategory = await categoryModel.findOneAndUpdate({_id: _id[0]},  updatedCategoryObject)
        return res.status(200).json({message: updatedCategory})
    }
    
    } catch (error) {
        console.log(error);
        return res.status(400).json({error})
    }
}

module.exports.deleteCategory = async (req, res ,next) => {
    try {
        const {ids} = req.body.payload
        const deletedCategories = [];
        for (let i = 0; i < deletedCategories.length; i++) {
            const deletedSingleCategory = await categoryModel.findOneAndDelete({_id: ids[i]._id})
            deletedCategories.push(deletedSingleCategory)
        }
        res.status(200).json({deletedCategories})
    } catch (error) {
        console.log(error);
        res.status(400).json({error})

    }
}