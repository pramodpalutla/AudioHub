const User = require('../models/user');
const { validationResult }= require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, 12).then(hashedPassword =>{
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message:"User created", userId: result._id});
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            const error = new Error('User email address not found');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Incorrect Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
        'somesecretkey', { expiresIn: '1h'}
        );
        res.status(200).json({token: token, userId: loadedUser._id.toString()});
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};