const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    id: Number,
    title: String,
    price: String,
    special_price: String,
    image: String,
    category: String,
    subcategory: String,
    remark: String,
    brand: String,
    shop: String,
    shop_name: String,
    star: String,
    product_code: String,
    stock: String

}, { versionKey: false })

const Products = mongoose.model("products", productSchema);
module.exports = Products;