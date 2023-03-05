const pageSchema = require("../../models/page");

module.exports.createPage = async (req, res, next) => {
  const { banners, products } = req.files;
  const { category, type, title, description } = req.body;
  console.log(req.body);
  if (banners) {
    if (banners.length > 0) {
      req.body.banners = banners.map((singleBanner, index) => ({
        img: `${process.env.API}/uploads/${singleBanner.filename}`,
        NavigateTo: `/bannerClicked?categoryId=${category}&type=${type}`,
      }));
    }
  }

  if (products) {
    if (products.length > 0) {
      req.body.products = products.map((singleProduct, index) => ({
        img: `${process.env.API}/uploads/${singleProduct.filename}`,
        NavigateTo: `/productClicked?categoryId=${category}&type=${type}`,
      }));
    }
  }

  const existedPage = await pageSchema.findOne({ category }).exec();
  if (existedPage) {
    const updatedExistedPage = await pageSchema
      .findOneAndUpdate(category, req.body)
      .exec();
    console.log(updatedExistedPage);
    if (updatedExistedPage) {
      return res.status(201).json({ message: "Updated successfully" });
    } else {
      return res.status(400).json({ message: "something happened" });
    }
  } else {
    const page = new pageSchema(req.body);
    page.save((error, page) => {
      if (error) return res.status(400).json({ message: "error here" });
      if (page)
        return res.status(201).json({ message: "created successfully" });
    });
  }
};

module.exports.getPage = async (req, res, next) => {
  try {
    const { category, type } = req.params;
    console.log(type, category);
    if (type == "page") {
      const foundedPage = await pageSchema.findOne({ category }).exec();
      console.log(foundedPage);
      if (foundedPage) {
        return res.status(200).json({ foundedPage });
      } else {
        return res.status(400).json({ message: "Page not Found" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};
