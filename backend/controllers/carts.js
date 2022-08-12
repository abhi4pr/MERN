const Cart = require('../models/cart.js');

exports.getAllCart = async (req, res) =>{  // for admin only
    const cartList = await Cart.find();
    if(!cartList){
        res.status(500).send('Error while fetching all carts')
    }
    res.status(200).send(cartList);
};

exports.getUserCart = async (req, res) =>{
    const cart = await Cart.findOne({user:req.params.id});
    if(!cart){
        res.status(500).send('Error while fetching user cart')
    }
    res.status(200).send(cart);
};

exports.deleteCart = async (req, res) =>{
    Cart.findByIdAndRemove(req.params.cartid).then(cart =>{
        if(cart){
            return res.status(200).json({success:true, message:'cart deleted'})
        }else{
            return res.status(404).json({success:false, message:'cartt not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.addCart = async (req, res) =>{

    const user = req.body.user;
    try {
        let cart = await Cart.findOne({ user });
    
        if (cart) {
            let itemIndex = cart.products.findIndex(p => p.productId == req.body.productId);

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity = productItem.quantity+req.body.quantity;
                cart.products[itemIndex] = productItem;
            } else {
                cart.products.push({ 
                    productId:req.body.productId, 
                    quantity:req.body.quantity, 
                    name:req.body.name,
                    price:req.body.price
                });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {

          const newCart = new Cart({
            user,
            products: [{ 
                productId:req.body.productId, 
                quantity:req.body.quantity, 
                name:req.body.name,
                price:req.body.price
            }]
          });
          const varv = await newCart.save();
          return res.status(201).send(varv);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.updateCart = async (req, res) =>{

    const user = req.body.user;
    try {
        let cart = await Cart.findOne({ user });
    
        if (cart) {
          let itemIndex = cart.products.findIndex(p => p.productId == req.body.productId);
    
          if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            productItem.quantity = req.body.quantity;
            cart.products[itemIndex] = productItem;
          }
          cart = await cart.save();
          return res.status(201).send(cart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.removeCartItem = async (req, res) =>{
    const cart = await Cart.findOne({user:req.body.user});
    if (cart) {
        // if (Object.keys(cart.products).length == 1) {
        //     Cart.findByIdAndRemove(req.params.cartId).then(cart =>{
        //         return res.status(200).json({success:true, message:'cart deleted'});
        //     })
        // }
        Cart.updateOne(
            { 'user': req.body.user }, 
            { $pull: { products: { productId: req.body.productId } } }, (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'error in deleting address' });
                }else{
                    return res.status(200).json({success:true, message:'cart item deleted'});
                }
            }
        )
    } else {
        res.status(500).send({error:'No cart exist for this user'});
    }
};

exports.getCartCount = async (req, res) =>{
    const cart = await Cart.findOne({user:req.params.id});
    if (cart) {
        var items = Object.keys(cart.products).length;
        res.send({items:items});    
    } else {
        res.status(500).send({error:'No cart exist for this user'});
    }
};