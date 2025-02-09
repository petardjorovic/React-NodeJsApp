const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DimensionsSchema = new Schema(
  {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  {
    _id: false,
  }
);

const ReviewsSchema = new Schema(
  {
    rating: { type: Number },
    comment: { type: String },
    date: { type: Date },
    reviewerName: { type: String },
    reviewerEmail: { type: String },
  },
  {
    _id: false,
  }
);

const MetaSchema = new Schema(
  {
    barcode: { type: String },
    qrCode: { type: String },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    category: { type: String },
    price: { type: Number },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number },
    tags: { type: Array },
    brand: { type: String },
    sku: { type: String },
    weight: { type: String },
    dimensions: { type: { DimensionsSchema } },
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String },
    reviews: { type: [ReviewsSchema] },
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number },
    meta: { type: { MetaSchema } },
    images: { type: Array },
    thumbnail: { type: String },
  },
  {
    _id: false,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
