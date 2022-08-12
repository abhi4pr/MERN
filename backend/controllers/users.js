const User = require('../models/user.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('PASS_SALT_KEY');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.getAllUsers = async (req, res) =>{
    const userList = await User.find().select('name email phone address isAdmin');
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
};

exports.getSingleUser = async (req, res) =>{
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
        res.status(500).send('Error while fetching user')
    }
    res.status(200).send(user);
};

exports.addUser = async (req, res) =>{
    try{
        let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: cryptr.encrypt(req.body.password),
        phone: req.body.phone,
        address: req.body.address
        })
        let userv = await user.save();
        res.send({userv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This user cannot be created'})
    }
};

exports.editUser = async (req, res) =>{
    const userExist = User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = cryptr.encrypt(req.body.password);
    }else{
        newPassword = userExist.password;
    }

    let user = await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        phone: req.body.phone,
        address: req.body.address
    },{new:true})
    
    if(!user){
        res.status(500).send('This user cannot be edited')
    }
    res.send(user);
};

exports.loginUser = async (req, res) =>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send('user not found');
    }
    const hashpass = cryptr.decrypt(user.password);

    if(hashpass == req.body.password){
        const token = jwt.sign({ userId:user._id, isAdmin:user.isAdmin },process.env.JWT_TOKEN);
        res.status(200).send({user:user,token:token})
    }else{
        res.status(400).send({success:false,status:400})
    }
};

exports.getUserCount = async (req, res) =>{
    const userCount = await User.countDocuments();
    if(!userCount){
        res.status(500).json({success:false})
    }
    res.send({userCount:userCount});
};

exports.deleteUser = async (req, res) =>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user){
            return res.status(200).json({success:true, message:'user deleted'})
        }else{
            return res.status(404).json({success:false, message:'user not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};