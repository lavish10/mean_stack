const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext= MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
})
router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  // const post = req.body;
  const url = req.protocol + '://' + req.get("host");

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });

  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: "Post added",
      // postId: createdPost._id
      post: {
        ...createdPost,
        id: createdPost._id,
      }
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

router.get("/:id", (req, res, next) => {

  Post.findById(req.params.id).then((fetchedPost) => {
    if (fetchedPost) {
      res.status(200).json(fetchedPost)
    } else {
      res.status(404).json({ message: "Post not found!" })
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

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) => {

  let imagePath= req.body.imagePath;
  if(req.file){
    const url= req.protocol + '://' + req.get("host");
    imagePath=url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "updated post" });

  })
})

module.exports = router;
