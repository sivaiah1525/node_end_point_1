const express = require('express');
const router = express.Router();
const Product = require('../models/productschema')



// Get all Products
router.get('/', async (req, res) => {
  try {
    const users = await Product.find();
    res.status(200).json(users); // 200 = OK
  } catch (error) {
    console.error(error); // Optional: log error
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get Product 
router.get('/:id', async (req, res) => {
  try {
    const Productid = req.query.id
    const Productdata = await Product.findbyId(Productid)
    res.status(200).json(Productdata)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

})

// Create Product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const saveProduct = await newProduct.save()
    res.status(200).json({ message: 'Product created successfully', data: saveProduct })
  } catch (error) {
    console.error('❌ Error creating Product:', error);
    res.status(500).json({ message: 'Error creating Product', error: error.message });
  }
})

//update Product 

router.post('/:id', async (req, res) => {
  try {
    const Productid = req.params.id
    const Productdata = req.body
    const updateProduct = await Product.findByIdAndUpdate(
      Productid,
      { $set: Productdata },
      { new: true }
    )
    res.status(200).json({ message: 'Update Product data Done ' })
  } catch (error) {
    res.status(500).json({ message: 'update Failed' })
    res.status(400).json({ message: 'Baed Request' })
  }
})


// delete Product 

router.delete('/:id', async (req, res) => {
  try {
    const Productid = req.params.id
    const deleteProduct = await Product.findByIdAndDelete(Productid)
    res.status(200).json({message:`Delecting Product ${deleteProduct}`})
  } catch (error) {
      res.status(500).json({ message: 'update Failed' })
    res.status(400).json({ message: 'Baed Request' })
  }
})




module.exports = router;
