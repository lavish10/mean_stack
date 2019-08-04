const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  next()
})

app.use("/api/posts", postsRouter);

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
