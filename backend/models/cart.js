const mongoose = require('mongoose');

const Cart = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('cart', Cart);