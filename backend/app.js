const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
mongoose.connect("mongodb+srv://lavish:odMlyq0qumuNlvBd@meanstack-ws5pl.gcp.mongodb.net/", { dbName: "node-angular", useNewUrlParser: true })
  .then(() => {
    console.log("Connected successfully!")
  })
  .catch(() => {
    console.log("Connection failed!")
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next()
})

app.post("/api/posts", (req, res, next) => {
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
app.get("/api/posts", (req, res, next) => {

  Post.find().then((fetchedPosts) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: fetchedPosts
    });
  })
})

app.delete("/api/post/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
    res.status(200).json({
      message: "Post deleted!"
    })
  })
})

module.exports = app;
//usernamce= lavish
//pass= odMlyq0qumuNlvBd
/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://lavish:<password>@meanstack-ws5pl.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/
