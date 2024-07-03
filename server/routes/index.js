const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const searchUser = require('../controller/searchUser')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const authenticateUser = require('../controller/authController')

const router = express.Router()

//create user api
router.post('/register', registerUser)

//check user email
router.post('/email',checkEmail),

//check password
router.post('/password', checkPassword)

//login user details
router.get('/user-details', userDetails)

//logout user
router.post('/logout', logout)

//update user detials
router.post('/update-user', updateUserDetails)

//search user
router.post('/searchuser', searchUser)

// combine for login
router.post('/login', authenticateUser)

module.exports = router