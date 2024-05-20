const express= require("express")
const router = express.Router()
const jsonschema = require("jsonschema")
const userRegisterSchema = require("../schemas/userRegister.json")
const userLoginSchema =require("../schemas/userLogin.json")
const { ensureLoggedIn,ensureAdmin} = require("../middleware/auth")
const {createToken}= require("../token")
const User = require("../models/user")
const { BadRequestError } = require("../expressError");


router.post('/',ensureAdmin, async function (req,res,next) {
    try{
        const validator = jsonschema.validate(req.body, userRegisterSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.register(req.body)
        const token = createToken(user)
        return res.status(201).json({user,token})
    }catch (err){
        return next(err)
    }
})

router.get('/users/:username',async function(req,res,next){
    try{
        const user_id = await User.getUserId(req.params.username)
        return res.json({user_id})
    }catch(err){
        return next(err)
    }
})
module.exports = router