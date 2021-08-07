const jwt = require('jsonwebtoken');
const { findUserById } = require('../controllers/user.controllers');
const userTokenKey = process.env.TOKEN_KEY ;




const authVerify = async(req, res, next) => {
    const token = req.headers.authorization;

    try {
        let {userId} = jwt.verify(token, userTokenKey)
        const user = await findUserById(userId)
        if(user){
            req.user = user;
            return next();
        }
        throw new error("UnAuthorized request")
        
    }catch(error){
        res.json(401).json({success: false, message: "UnAuthorized request"})
    }

}

module.exports = {authVerify}