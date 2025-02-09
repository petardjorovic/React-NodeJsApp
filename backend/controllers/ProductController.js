const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean().select("-_id");
    res.send(products);
  } catch (error) {
    console.error(error);
  }
};
const getSingleProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    const [product] = await Product.find({ id }).lean().select("-_id");
    res.send(product);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
};
