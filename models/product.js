const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    engine: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
});

module.exports=mongoose.model("Product",productSchema);