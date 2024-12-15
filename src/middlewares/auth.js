const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const dotenv = require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try{
            // Get token from headers
            token = req.headers.authorization.split(" ")[1]

            // Verify the token
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password");

            next() // <-- To call the next piece of middleware
        } catch (error){
            console.error(error)
            res.status(401)
            throw new Error("Unauthorized");
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized --> No token provided");
    }
})

module.exports = { protect };