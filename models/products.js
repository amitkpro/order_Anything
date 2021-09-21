const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    categoryName: { type: String, required: true },
    adresses: { type: Array,  required: true},
    quantity: { type: Number, required: true}
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
