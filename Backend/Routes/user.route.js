const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const UserController = require('../Controller/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
router.post('/register', [
    body('fullname.firstname').isLength({min: 3}).withMessage('First Name must be at least 3 chars long'),
    body('fullname.lastname').isLength({min: 3}).withMessage('Last Name must be at least 3 chars long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 digit long'),
],
UserController.registerUser);
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 digit long'),
],
UserController.loginUser);

router.get('/profile', authMiddleware.authMiddleware, UserController.getUserProfile);


module.exports = router;