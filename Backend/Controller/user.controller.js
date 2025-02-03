const userModel = require('../Models/user.model')
const user = require('../Models/user.model')
const userService = require('../Services/user.service')
const {validationResult} = require('express-validator')
module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
  
        const {fullname, email, password} = req.body;

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname, 
            lastname:fullname.lastname, 
            email, 
            password: hashedPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    }
    catch(error){
        console.error('Error in Register User:', error);
    }
}
module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
  
        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const token = user.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({ user, token });
    }
    catch(error){
        console.error('Error in Login User:', error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        
        const user = req.user;
        res.status(201).json({ user });
        
    }
    catch(error){
        console.error('Error in Login User:', error);
    }
}