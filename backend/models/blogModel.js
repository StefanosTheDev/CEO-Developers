const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: {
    type: String,
    required: true,
    max: [500, 'Blog Max Lenght Is 500'],
  },
  createdAt: { type: Date, default: Date.now },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Interactions
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      likedAt: { type: Date, default: Date.now },
    },
  ],
  upvotes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      upvotedAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model('BlogPost', blogPostSchema);
