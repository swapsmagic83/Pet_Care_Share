const express = require("express")
const jsonschema = require("jsonschema")
const router = new express.Router()
const User = require("../models/user")
const { createToken} = require("../token")
const userLoginSchema = require("../schemas/userLogin.json")
const userRegisterSchema = require("../schemas/userRegister.json")
const {BadRequestError} = require("../expressError")

//post auth/token: takes {username,password} gives {token}
router.post('/token', async function(req,res,next) {
    try{
        const validator = jsonschema.validate(req.body, userLoginSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const { username, password } = req.body
        const user = await User.authenticate(username, password)
        const token = createToken(user)
        return res.json({token})
    }catch(err){
        return next(err)
    }
})

//post  auth/register: takes {username,password,first_name,last_name,email,is_admin}
// gives JWT token which will be used to authenticate further requests

router.post('/register', async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body, userRegisterSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }
        const newUser = await User.register({...req.body,is_admin:false})
        const token = createToken(newUser)
        return res.status(201).json({token})
    }catch(err){
        return next(err)
    }
})
module.exports = router