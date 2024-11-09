const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username Required'],
    min: [6, 'Username minimum lenght is 6'],
    max: [12, 'Username maximum length is 12'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
    min: [6, 'Password  minimum length is 6'],
    max: [16, 'Password maximum length is 12'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt Password Upon Save Event (Used For Creating Accounts)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate(); // Retrieves the update object
  // Check if 'password' is part of the update
  if (update.password) {
    // Hash the new password before applying the update
    update.password = await bcrypt.hash(update.password, 12);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
