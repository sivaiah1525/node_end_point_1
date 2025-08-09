const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  role: { type: String },
  phonumber: { type: String },
  username:{type:String},
  password:{type:String}
}, {
  timestamps: true
});
 

module.exports = mongoose.model('User', userSchema);
