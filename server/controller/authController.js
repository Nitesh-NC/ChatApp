const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function authenticateUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                error: true
            });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Incorrect password",
                error: true
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email 
        };

        const secretKey = req.app.get('jwt-secret-key');

        const token = jwt.sign(tokenData, secretKey, { expiresIn: '1d' });

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successful",
            token: token,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = authenticateUser;
