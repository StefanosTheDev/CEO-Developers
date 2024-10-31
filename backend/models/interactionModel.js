const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true,
  }, // Reference to BlogPost
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  type: { type: String, enum: ['like', 'comment', 'upvote'], required: true }, // Type of interaction
  content: { type: String }, // Optional field, used only for comments
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Interaction', interactionSchema);
