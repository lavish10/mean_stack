const mongoose = require('mongoose')
const postSchema = mongoose.Schema({

  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }

})

var post = mongoose.model('Post', postSchema);
module.exports = post;
