const express = require('express');
const cors = require('cors');
const app = express();
// DB connection
require('./DB'); 
require('dotenv').config();
const port = process.env.PORT||6000;


app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/AuthRoutes');
const contactRoutes = require('./routes/contactRoutes');
const siteRoutes = require('./routes/siteRoutes');
const productRoutes = require('./routes/productRoutes');
// list 
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/contact', contactRoutes);
app.use('/site', siteRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
