const userModel = require('../Models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Access' });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await userModel.findById(decoded._id);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized Access' });
            }
            req.user = user;
            return next();
        } catch (error) {
            res.status(401).json({message:'Error in Auth User' }); 
        }
    } catch (error) {
        res.status(401).json({message:'Error in Auth User Logic' });
    }
}