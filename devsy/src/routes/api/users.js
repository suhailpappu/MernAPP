const express = require('express');

const jwt = require('jsonwebtoken')

const {check,validationResult} = require('express-validator')

const gravatar = require('gravatar');

const bcryptjs = require('bcryptjs');

const router = express.Router()

const config = require('config')

require('dotenv').config()

const User = require('../../models/User');

//@route   GET api/users
//@desc    Register User
//@access  Public

router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email',"Please enter valid email").isEmail(),
    check('password',"Please enter password of minimum length of 6 charaters").isLength( {min:6} )

],async (req,res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {name,email,password} = req.body

    try {
        //Check if user exists

        let user = await User.findOne( {email: email} )

        if (user) {
            return res.status(400).json({errors: [{msg:"User already exists"}]})
            
        }

    //Get user's gravatar

    const avatar = gravatar.url(email, {
        s:'200',
        r:'pg',
        d:'mm'
    })

    user = new User({
        name,email,avatar,password
    })


    //Encrypt the password

    const salt = await bcryptjs.genSalt(10)

    user.password = await bcryptjs.hash(password,salt)

    await user.save()

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