const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, 'Title Must Be Unique'],
    min: [5, 'Title Length Must Be 5'],
    max: [15, 'TItle Length Max Is 15'],
  },
  content: {
    type: String,
    required: true,
    min: [20, 'Content Length Must Be 20'],
    max: [500, 'Blog Length Max Is 500'],
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
      message: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model('BlogPost', blogPostSchema);
