const mongoose = require('mongoose');

const dburl = 'mongodb+srv://sivaiahdeveloper821:LDfL4HR4RMwzRB6m@cluster0.1kt5dgi.mongodb.net/yourdbname?retryWrites=true&w=majority';

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
