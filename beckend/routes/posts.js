const express = require("express")
const jsonschema = require("jsonschema")
const router = express.Router()
const {ensureLoggedIn, authenticateJWT} = require("../middleware/auth")
const Post = require("../models/post")
const User = require("../models/user")
const Comment = require("../models/comment")
const postNewSchema = require("../schemas/postNew.json")
const commentNewSchema = require("../schemas/commentNew.json")
const {ExpressError, NotFoundError,UnauthorizedError,BadRequestError,ForbiddenError} =
        require("../expressError")

router.post("/new", async function(req,res,next) {
    console.log("this is req.body before",req.body)
    try{
        const validator = jsonschema.validate(req.body,postNewSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
       let {username, description,date_to,date_from}=req.body
       let user_response = await User.getUserId(username)
       let user_id = user_response.id

       let post = await Post.createPost(user_id,description,date_to,date_from)
        return res.status(201).json({post})
    }catch(err){
        return next(err)
    }
})

router.get('/', async function(req,res,next){
    try{
        const posts = await Post.getAllPosts()
        return res.json({posts})
    }catch(err){
        return next(err)
    }    
})

router.get('/:id', async function(req,res,next){
    try{
        const post = await Post.getSinglePost(req.params.id)
        return res.json({post})
    }catch(err){
        return next(err)
    }
})
router.get('/:id/comments',async function(req,res,next){
    try{
        const comments = await Comment.getAllComments(req.params.id)
        return res.json([comments])
    }catch(err){
        return next(err)
    }
})
router.post('/:id/newcomment', async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body,commentNewSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
         } 
        const {content} = req.body
       
        let user_response = await User.getUserId(res.locals.user.username)
        let user_id = user_response.id
        const comment = await Comment.createComment(user_id,req.params.id,content)
        return res.status(201).json({comment})
    } catch(err){
        return next(err)
    }
})

module.exports = router