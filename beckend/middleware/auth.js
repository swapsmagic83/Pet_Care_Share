const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const {UnauthorizedError} = require("../expressError")

//authenticate user. If token provided, verify it and store that token in paylaod

function authenticateJWT(req,res,next){
    try{
        const authHeader = req.headers && req.headers.authorization
        if(authHeader){
            console.log(authHeader)
            const token = authHeader.replace(/^[Bb]earer/,"").trim()
            res.locals.user =jwt.verify(token,SECRET_KEY)
        }
        return next()
    }catch(err){
        return next(err)
    }
}

function ensureLoggedIn(req, res, next){
    try{
        if(!res.locals.user){
            throw new UnauthorizedError()
        }
        return next()
    }catch(err){
        return next(err)
    }
}

function ensureAdmin(req, res, next) {
    try{
        if(!res.locals.user || res.locals.user.is_admin === false){
            throw new UnauthorizedError()
        }
        return next()
    } catch(err){
        return next(err)
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin
}