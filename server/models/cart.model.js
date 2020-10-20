const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    productName: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
}, {
    timestamps: true
})
module.exports = mongoose.model('cart', CartSchema);