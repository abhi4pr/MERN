const Product = require('../models/product.js');
const Category = require('../models/category.js');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require("nodemailer");
require("dotenv").config();

const FILE_TYPE_MAP = { 'image/png': 'png', 'image/jpg': 'jpg', 'image/jpeg': 'jpeg' };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});
const uploadOptions = multer({ storage: storage });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailid739@gmail.com',
      pass: ''
    }
  });

exports.getAllProducts = async (req, res) =>{
    const productList = await Product.find().populate('category');
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
}

exports.getSingleProduct = async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');
    if(!product){
        res.status(500).json({success:false})
    }
    res.send(product);
}

exports.addProduct = [uploadOptions.single('image'), async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const fileName = req.file.filename;
    const basePath = `${process.env.API_URL}public/uploads/`;

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    })

    let productv = await product.save();

    if(!productv) 
    return res.status(500).send('The product cannot be created')
    res.send(productv);
}];

exports.editProduct = [uploadOptions.single('image'), async (req, res) =>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product ID')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid Product!');

    let imagepath;

    if (req.file) {
        const fileName = req.file.filename;
        const basePath = `${process.env.API_URL}public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }

    let updateProduct = await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        description: req.body.description,
        image: imagepath,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    },{new:true})
    
    if(!updateProduct){
        res.status(500).send('The product cannot be edited')
    }
    res.send(updateProduct);
}];

exports.deleteProduct = async (req, res) =>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success:true, message:'product deleted'})
        }else{
            return res.status(404).json({success:false, message:'product not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.getProductCount = async (req, res) =>{
    const productCount = await Product.countDocuments();
    if(!productCount){
        res.status(500).json({success:false})
    }
    res.send({productCount:productCount});
}

exports.getProductsByCategory = async (req, res) =>{
    let filter = [];
    if (req.query.categories) {
        filter = req.query.categories.split(',')
    }
    const productList = await Product.find({category:filter}).populate('category');
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
};

exports.uploadGalleryImages = [uploadOptions.array('images', 5), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${process.env.API_URL}public/uploads/`;

    if (files) {
        files.map((file) => { imagesPaths.push(`${basePath}${file.filename}`) });
    }

    const product = await Product.findByIdAndUpdate(req.params.id,{
            images: imagesPaths
        },{ new: true });

    if (!product) return res.status(500).send('the gallery cannot be updated!');
    res.send(product);
}];

exports.sendMail = async (req, res) => {
    var mailOptions = {
      from: req.body.email,
      to: 'ascs739@gmail.com',
      subject: 'Testing mail from node/mongo',
      text: req.body.purpose
    };
      if(mailOptions){
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.status(400).send('Mail not sent !');
          }
        });
      }else{
        res.status(404).send({ status: 0, message: "Something is not right" });
      }
};

exports.findProduct = async (req, res) => {
    try{
      const regex = new RegExp(req.query.name,'i');
      const findp = await Product.find({name:regex}).populate('category');

      if(findp.length == 0){
        res.status(404).send({ status: 0, message: "No post with keywords" });
      }else{
        //res.send({ status: 1, data: findp, message: "Posts found" }); bcoz of redux
        res.send(findp);
      }
    }catch{
      res.status(404).send({ status: 0, message: "Something is not right" });
    }
};