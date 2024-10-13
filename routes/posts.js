const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Post = require('../models/post.js');

//POST API
///api/posts if i need add more /add like this we can add here 
router.post("/",(req,res,next)=>{
    console.log(">>/api/post");
    const reqBody = req.body;
    console.log(reqBody);

    //mongoose using
    const post = new Post({
        title:req.body.title,
        content:req.body.content
    });
    
    console.log(post);
    post.save();

    res.status(200).json({
      message:"post added successfully"
    })
    next(); 
});

//GET ALL Posts - GET API
router.get('/',(req,res,next)=>{
    console.log("GET>>/api/posts");

    Post.find().then((document)=>{
        console.log(document);
        res.status(200).json({
            message:"list all posts",
            posts:document
        });
        
    }); 
});

//GET Post BY-ID - GET API
router.get('/:id',(req,res,next)=>{
    console.log("GET>>/api/post/:id");
    const _id = req.params.id;
    console.log(_id);

    const objId = new ObjectId(_id);
    Post.findById(objId).then( doc => {
        console.log("found"+doc);
        res.status(200).json(doc);
    })
    .catch( err => {
        console.log(err);
    })
});

//PUT API 
router.put('/:id', async (req,res,next) =>{
    console.log("put>>/api/post/:id");

    const postId = req.params.id;
    console.log(postId);
    
    const { title,content } = req.body;
    console.log("content: "+content);
    console.log("title: "+title);
    
    const filter = { _id: new ObjectId(postId)};
    const updateDoc = { title:title,content:content }

    try {
        const updatedDocument = await Post.findByIdAndUpdate(
            filter,
            updateDoc,
            {new:true}
        );

        res.status(200).json(updatedDocument);

    } catch (err) {
        console.log('Error in update record' + err);
        return res.status(500).json({
            error:"Internal server error occur"
        })

    }
});

//DELETE BY-ID - DELETE API
router.delete('/:id',(req,res,next)=>{
    console.log("DELETE>>/api/post/:id");
    const _id = req.params.id;
    const filter = {_id:new ObjectId(_id)};
    
    Post.deleteOne(filter).then((result) => {
        console.log(result);

        res.status(200).json({
            message:"Post Deleted"
        });
        
    });

});

module.exports = router;