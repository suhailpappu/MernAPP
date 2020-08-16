const express = require('express');

const router = express.Router()

const bcryptjs = require('bcryptjs')

const User = require('../../models/User')

const auth = require('../../../middleware/auth')

const {check,validationResult} = require('express-validator')

const jwt = require('jsonwebtoken')
//@route   GET api/auth
//@desc    Test route
//@access  Public

router.get('/',auth,async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error')
    }
})

//@route   POST api/auth
//@desc    Authenticate User and get token
//@access  Public

router.post('/',[
    
    check('email',"Please enter valid email").isEmail(),
    check('password',"Please is required").exists()

],async (req,res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { email,password } = req.body

    try {
        //Check if user exists

        let user = await User.findOne( {email: email} )

        if (!user) {
            return res.status(400).json({errors: [{msg:"Invalid Credentials"}]})
            
        }

        const isMatch = await bcryptjs.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({errors: [{msg:"Invalid Credentials"}]})
        }


    //Return JWT

    const payload = {
        user:{
            id:user.id
        }
    }

    jwt.sign(payload,
        process.env.jwtSecret,
        {expiresIn: 36000} ,
        (err,token) => {
            if (err) {
                throw err
            } 
            res.json({token})
        }
        )


    
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error')
    }

    


})

module.exports = router