const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post("", (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: "Post added",
      postId: createdPost._id
    })
  })

})
router.get("", (req, res, next) => {

  Post.find().then((fetchedPosts) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: fetchedPosts
    });
  })
})

router.get("/:id", (req, res, next)=>{

  Post.findById(req.params.id).then((fetchedPost) =>{
    if(fetchedPost){
      res.status(200).json(fetchedPost)
    } else {
      res.status(404).json({message: "Post not found!"})
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
    res.status(200).json({
      message: "Post deleted!"
    })
  })
})

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "updated post" });

  })
})

module.exports = router;
