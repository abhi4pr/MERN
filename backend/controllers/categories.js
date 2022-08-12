const Category = require('../models/category.js');

exports.getAllCategory = async (req, res) =>{
    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).send('Error while fetching categories')
    }
    res.status(200).send(categoryList);
};

exports.getSingleCategory = async (req, res) =>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).send('Error while fetching categories')
    }
    res.status(200).send(category);
};

exports.addCategory = async (req, res) =>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    let categoryv = await category.save();
    if(!categoryv){
        res.status(500).send('The category cannot be created')
    }
    res.send(categoryv);
};

exports.editCategory = async (req, res) =>{
    let category = await Category.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    },{new:true})
    
    if(!category){
        res.status(500).send('The category cannot be edited')
    }
    res.send(category);
};

exports.deleteCategory = async (req, res) =>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success:true, message:'category deleted'})
        }else{
            return res.status(404).json({success:false, message:'category not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};