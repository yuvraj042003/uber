const userModel = require('../Models/user.model')

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !lastname || !email || !password) {
        throw new Error('Please fill in all fields')
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password
    })
    return user
}