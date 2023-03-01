const pageSchema = require('../../models/page');

module.exports.createPage = async (req, res, next) => {
    const { banners, products, category, type, createdBy} = req.files
    if (banners.length > 0){
        req.body.banners = banners.map((singleBanner, index) => ({
            img: `${process.env.API}/public/uploads/${singleBanner.filename}`,
            NavigateTo:`/bannerClicked?categoryId=${category}&type=${type}`
        }))
        
    }

    if (products.length > 0){
        req.body.products = products.map((singleProduct, index) => ({
            img: `${process.env.API}/public/uploads/${singleProduct.filename}`,
            NavigateTo:`/productClicked?categoryId=${category}&type=${type}`
        }))
    }
    req.body.createdBy = req.id

    const existedPage =  await pageSchema.findOne(category).exec()
    console.log(existedPage);
    if(existedPage){
        const updatedExistedPage = await existedPage.findOneAndUpdate(category, req.body).exec()
        if(updatedExistedPage){
            console.log(updatedExistedPage);
            return res.status(201).json({updatedExistedPage})
        } else {
            return res.status(400).json({message: "something happened"})
        }
    } else {
        const page = new pageSchema(req.body)
        page.save((error, page)=> {
        if(error) return res.status(400).json({message: error})
        if(page) return res.status(201).json({message: "created successfully"})
    })
    }

}

module.exports.getPage = async (req, res, next) => {
    try {
        const {category, type} = req.params
        if (type == "page"){
            const foundedPage = pageSchema.findOne({category}).exec()
            if (foundedPage){
            return res.status(200).json({foundedPage})
            } else {
            return res.status(400).json({message : "Page not Found"})
            }
    }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "someThing happened"})
    }
}
