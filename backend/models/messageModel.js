const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['sent', 'read'],
    default: 'sent',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  conversationId: {
    type: String, // Use a unique identifier for conversations
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
