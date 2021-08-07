const bcrypt = require('bcryptjs');
const {User} = require('../models/user.model');

const findUserByEmail = async(email) => {
    const user = await User.findOne({email})
    return user;
}

const saveNewUserDetails = async({email, name, password}) => {
    const newUser = new User({
        email, name, password
    })
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;
    const savedUser = await newUser.save()
    return savedUser; 
}


const findUserById = async(userid)=> {
    const user = await User.findById(userid)

    return user;
}
module.exports = {findUserByEmail, saveNewUserDetails, findUserById}