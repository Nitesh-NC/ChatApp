const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async(token)=>{
    if(!token){
        return {
            message : "session out",
            logout : true,
        }
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decode.id).select('-password');
        return user;
    } catch (err) {
        return {
            message: "Invalid or expired token",
            logout: true,
        };
    }
}

module.exports = getUserDetailsFromToken