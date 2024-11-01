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
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interaction' }], // Array of references to interactions
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
