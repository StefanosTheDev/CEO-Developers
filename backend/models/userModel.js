const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username Required'],
    unique: true,
  },
  email: { type: String, required: [true, 'Email Required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password Required'],
    min: [8, 'Password Must Be Minimum 8 Charachters'],
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interaction' }], // Array of references to interactions
});

module.exports = mongoose.model('User', userSchema);
