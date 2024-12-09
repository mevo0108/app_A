const postModel = require("../models/posts_model");

const getAllPosts = async (req, res)=>{
    const ownerFilter = req.query.owner;
    try {
        if (ownerFilter) {
            const posts = await postModel.find({owner:ownerFilter});
            res.status(200).send(posts);
        } else {
            const posts = await postModel.find();
            res.status(200).send(posts);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};



const getPostById = async (req, res)=>{
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId);
        if(post == null) {
            return res.status(404).send("Post not found");
        } else {
            return res.status(200).send(post);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const createPost = async (req, res) => {
    const post =req.body;
    try{
        newPost = await postModel.create(post);
        res.status(201).send(newPost);
    } catch(error){
        res.status(400).send(error);
    }
};

const deletePost = async (req, res)=>{
    const postId = req.params.id;
    try{
        const post = await postModel.findByIdAndDelete(postId);
        res.status(200).send(post);
    }catch(error){
        res.status(400).send(error);
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
}; 