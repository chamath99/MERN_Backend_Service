const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

const Post = require('./models/post.js');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const req = require('express/lib/request.js');


app.use(bodyParser.json());

//connection with mongoose
mongoose.connect("mongodb+srv://chamathnirmal99:YhzS2Q0kjzfl8HOg@cluster0.xw15awt.mongodb.net/crudappdb?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database connected successfully.....");
})
.catch(()=>{
    console.log("Error in database connection");
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

//POST API
app.post("/api/posts",(req,res,next)=>{
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
app.get('/api/posts',(req,res,next)=>{
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
app.get('/api/post/:id',(req,res,next)=>{
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

// GET API SERVER CHECKING
app.get("/healthCheck",(req,res,next)=>{
    console.log(">>/healthCheck");
    res.status(200).json({
        message:"server running....."
    })
    next();
});

//PUT API 
app.put('/api/post/:id', async (req,res,next) =>{
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
    // res.status(200).json({
    //     message: "success"
    // });
    
});

// //DELETE BY-ID - DELETE API
// app.delete('/api/post/:id',(req,res,next)=>{
//     console.log("DELETE>>/api/post/:id");
//     const _id = req.params.id;
//     const filter = {_id:new ObjectId(_id)};
    
//     Post.deleteOne(filter).then((result) => {
//         console.log(result);

//         res.status(200).json({
//             message:"Post Deleted"
//         });
        
//     });

// });

// app.use((req,res,next) =>{
//     console.log('this is from express');
// });


module.exports = app;

