const express = require('express');
const router = express.Router();
const products = require('./controllers/products.js');
const users = require('./controllers/users.js');
const categories = require('./controllers/categories.js');
const orders = require('./controllers/orders.js');
const carts = require('./controllers/carts.js');
const VerifyToken = require('./helpers/VerifyToken.js');

  router.get("/", (req, res) => {
    res.send({ message: "Welcome to my application." });
  });
  
  router.get("/getallcategory", categories.getAllCategory);
  router.post("/addcategory", VerifyToken.verifyToken, categories.addCategory);
  router.delete("/deletecategory/:id", VerifyToken.verifyToken, categories.deleteCategory);
  router.get("/getsinglecategory/:id", categories.getSingleCategory);
  router.put("/editcategory/:id", VerifyToken.verifyToken, categories.editCategory);
  router.post("/addproduct", VerifyToken.verifyToken, products.addProduct);
  router.put("/uploadgalleryimages/:id", products.uploadGalleryImages);
  router.get("/getallproduct", products.getAllProducts);
  router.get("/getsingleproduct/:id", products.getSingleProduct);
  router.put("/editproduct/:id", VerifyToken.verifyToken, products.editProduct);
  router.delete("/deleteproduct/:id", VerifyToken.verifyToken, products.deleteProduct);
  router.get("/getproductcount", products.getProductCount);
  router.get("/getproductsbycategory", products.getProductsByCategory); //?categories=11,2
  router.get("/getallusers", VerifyToken.verifyToken, users.getAllUsers);
  router.get("/getsingleuser/:id", VerifyToken.verifyTokenAnduser, users.getSingleUser);
  router.post("/registeruser", users.addUser);
  router.put("/edituser/:id", VerifyToken.verifyTokenAnduser, users.editUser);
  router.post("/loginuser", users.loginUser);
  router.get("/getusercount", VerifyToken.verifyToken, users.getUserCount);
  router.delete("/deleteuser/:id", VerifyToken.verifyToken, users.deleteUser);
  router.get("/getordercount", VerifyToken.verifyToken, orders.getOrderCount);
  router.get("/getallorder", VerifyToken.verifyToken, orders.getAllOrder);
  router.post("/addorder", orders.addOrder);
  router.get("/getsingleorder/:id", VerifyToken.verifyToken, orders.getSingleOrder);
  router.put("/editorder/:id", VerifyToken.verifyToken, orders.editOrder);
  router.delete("/deleteorder/:id", VerifyToken.verifyToken, orders.deleteOrder);
  router.get("/getallorderuser/:id", VerifyToken.verifyTokenAnduser, orders.getAllOrderUser);
  router.post("/sendmail", products.sendMail);
  router.get("/search", products.findProduct); //?name=product
  router.get("/getallcart", carts.getAllCart); 
  router.get("/getusercart/:id", VerifyToken.verifyTokenAnduser, carts.getUserCart); 
  router.delete("/deletecart/:cartid", carts.deleteCart);
  router.post("/addcart", carts.addCart);
  router.put("/updatecart/:id", carts.updateCart);
  router.post("/removecartitem/:cartId", carts.removeCartItem);
  router.get("/getcartcount/:id", VerifyToken.verifyTokenAnduser, carts.getCartCount);

module.exports = router;