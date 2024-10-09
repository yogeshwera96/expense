const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
//login user
//login user
const loginUser = async (req, res) => {
    const {email, password} =  req.body

    try{
        const user = await User.login(email, password)
        //create token
        const token = createToken(user._id)

        // Include username in the response
        res.status(200).json({
            email: user.email,
            username: user.username,  // Add username here
            token
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//sign up user
//sign up user
const signupUser = async (req, res) => {
    const { email, password, username } = req.body

    try{
        const user = await User.signup(email, password, username)
        //create token
        const token = createToken(user._id)

        // Include username in the response
        res.status(200).json({
            email: user.email,
            username: user.username,  // Add username here
            token
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { loginUser, signupUser}