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



// function categoriesOrder(categories,  parentId = null) {
//     const catList = [];
//     let filtredCats;
//     if (parentId == null) {
//         filtredCats = categories.filter((singleCat) => singleCat.parentId == undefined)
//     } else {
//         filtredCats = categories.filter((singleCat) => singleCat.parentId == parentId)
//     }
//     for (let cat of filtredCats) {
//         catList.push({
//             _id: cat._id,
//             name: cat.name,
//             slug: cat.slug,
//             parentId: cat.parentId,
//             children: categoriesOrder(categories, cat._id)
//         });
//     }
//     return catList
// }






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


module.exports.addCategory = (req, res, next)=> {
    try {
        console.log(req.role);
        // if(req.role === "admin"){
            const {name, parentId} = req.body
            const categoryObj = {
            name,
            slug: slugify(name)
            }
            if(parentId) {
                categoryObj.parentId = parentId
            }
            if(req.file){
                categoryObj.categoryPic = process.env.API + '/uploads/' + req.file.filename
            }

            const category = new categoryModel(categoryObj)

            category.save((err, category)=> {
                if(err) return res.status(400).json({message: err})
                if(category) return res.status(201).json({category}) 
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
