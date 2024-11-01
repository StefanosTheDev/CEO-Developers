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
    min: [6, 'Password  minimum length is 12'],
    max: [16, 'Password maximum length is 12'],
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
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interaction' }], // Array of references to interactions
});

// Document Middleware // (Pre.Save) // between getting the data and the db.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // if thepassword has not been modified then just exit
  // otherwise do this bcrypt or hash
  this.password = await bcrypt.hash(this.password, 12); // this is the salt. (12)  computer have been more successful so use this. Later in time though use something else. Higher Number > Encryption
  this.passwordConfirm = undefined; //  After the validation was successful. ????  // delete password confirm field.
  next();
});

// instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword); // return true if same . False if not
};
module.exports = mongoose.model('User', userSchema);
