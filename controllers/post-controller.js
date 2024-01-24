const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.getAllpost = (req,res,next) => {
    res.json({ message : "get all product"})
}
exports.getPostByID = async (req,res,next) => {
    try{
    const { postID } = req.params;
    if(isNaN(Number(postID))){
        return createError(400,"id should be number")
    }
   
    const post = await prisma.post.findFirst({
        where:{
            id: Number(postID)
        }
    })
    if(!post){
        return createError(400,"post not found");
    }

    res.json({ post })
    }
    catch(err){
        next(err)
    }
}

exports.createPost = async (req,res,next) => {
    try{
        const { title , published , authorId } = req.body;

        if(!title || !authorId){
            return createError(400,"Invaild data")
        }
        if(typeof published !== "boolean"){
            return createError(400,"published much be boolean")
        }

        const Createpost = await prisma.post.create({
            data : {
                title,
                published,
                author:{
                    connect:{
                        id:Number(authorId)
                    }
                }
            }
        })
        res.status(201).json({ post: Createpost})
        // if(!author_id){
        //     return createError(500,"error")
        // }
        // res.json({ message : "Create product"})
    }
    catch(err){
        next(err);
    }
    
}
exports.updatePost = (req,res,next) => {
    res.json({ message : "update product"})
}
exports.deletePost = (req,res,next) =>{
    res.json({ message : "delete post"})
}