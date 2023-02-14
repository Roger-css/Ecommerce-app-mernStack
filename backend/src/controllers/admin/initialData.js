const Product = require("../../models/product")
const Category = require("../../models/category")

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
            Categories : categoriesOrder(Categories),
            Products
            })
        } catch (error) {
            return res.status(400).json({message: "error happened"})
        }
}