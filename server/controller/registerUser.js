const { response } = require("express");
const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')

async function registerUser(request, response) {
  try {
    const { name, email, password} = request.body;
    const checkemail = await UserModel.findOne({ email });
    if (checkemail)
      return response.status(400).json({
        message: "already user exist",
        error: true,
      });

      //password into hashpassword
       const salt = await bcryptjs.genSalt(10)
       const hashpassword = await bcryptjs.hash(password, salt)

       const payload = {
        name,
        email,
        password : hashpassword,
    }
    const user = new UserModel(payload)
    const userSave = await user.save()

    return response.status(201).json({
        message: "user created sucessfully",
        data : userSave,
        success : true
    })
  } catch (error) {
    return response.status(500).json({
      message: "something wrong",
      error: true,
    });
  }
}

module.exports = registerUser;
