const mongoose = require('mongoose');
require('dotenv').config();
const dburl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.1kt5dgi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
