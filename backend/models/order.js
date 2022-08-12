const mongoose = require('mongoose');

const Order = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItem',
        required:true
    }],
    shippingAddress: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('order', Order);

// {
//     "orderItems" : [
//         {
//             "quantity": 2,
//             "product" : "62d637642ca234d1d0bbb5af"
//         }
//     ],
//     "shippingAddress" : "Flowers Street , 45",
//     "city": "jupiter",
//     "zip": "00004",
//     "country": "Czech Republic",
//     "phone": "+420702241333",
//     "user": "62d6583ef5777644b58119b6"
// }