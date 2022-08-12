const Order = require('../models/order.js');
const orderItem = require('../models/order-item.js');
const mongoose = require('mongoose');
const Cart = require('../models/cart.js');

exports.addOrder = async (req, res) =>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async OrderItem=>{
        let newOrderItem = new orderItem({
            quantity: OrderItem.quantity,
            product: OrderItem.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }))

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async orderItemId=>{
        const orderItemm = await orderItem.findById(orderItemId).populate('product','price');
        const totalPrice = orderItemm.product.price * orderItemm.quantity;
        return totalPrice;
    }))
    const totalPrice = totalPrices.reduce((a,b)=>a+b,0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })

    let orderv = await order.save();
    if(orderv){
        Cart.updateOne(
            { 'user': req.body.user }, 
            { $set: { products: [] } }, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
            }
        )
    }

    if(!orderv) 
    return res.status(500).send('The order cannot be created')
    res.send(orderv);
};

exports.getAllOrder = async (req, res) =>{
    const orderList = await Order.find().populate('user');
    if(!orderList){
        res.status(500).send('Error while fetching orders')
    }
    res.status(200).send(orderList);
};

exports.getOrderCount = async (req, res) =>{
    const orderCount = await Order.countDocuments();
    if(!orderCount){
        res.status(500).json({success:false})
    }
    res.send({orderCount:orderCount});
};

exports.getSingleOrder = async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user')
    .populate({path:'orderItems',populate:'product'});
    if(!order){
        res.status(500).json({success:false})
    }
    res.send(order);
};

exports.editOrder = async (req, res) =>{
    let order = await Order.findByIdAndUpdate(req.params.id,{
        status: req.body.status
    },{new:true})
    
    if(!order){
        res.status(500).send('The order status cannot be change')
    }
    res.send(order);
};

exports.deleteOrder = async (req, res) =>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order){
            await order.orderItems.map(async OrderItem=>{
                await orderItem.findByIdAndRemove(OrderItem);
            })
            return res.status(200).json({success:true, message:'order deleted'})
        }else{
            return res.status(404).json({success:false, message:'order not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.getAllOrderUser = async (req, res) =>{
    const orderList = await Order.find({user: req.params.id})
    .populate('user').populate({path:'orderItems',populate:'product'});
    
    if(!orderList){
        res.status(500).send('Error while fetching orders')
    }
    res.status(200).send(orderList);
};