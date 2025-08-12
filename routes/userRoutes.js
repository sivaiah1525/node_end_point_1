const express = require('express');
const router = express.Router();
const { User, Register } = require('../models/userschema');

const verifyToken=require('../middleware/authmiddleware')

// Apply to all routes in verifyToken
router.use(verifyToken)

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().lean();
    const responseuserslist = users.map((user)=>{
      const {password,...rest}=user
      return rest;
    })
    console.log('📦 Sending user list:', responseuserslist.length);
    res.status(200).json(responseuserslist);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get User By ID 

router.get('/id', async (req, res) => {
  try {
    console.log(req.query)
    const userid = req.query.id
    const userdata = await User.findById(userid)
    const responseuser = {
      name: userdata.name,
      age: userdata.age,
      role: userdata.role,
      phonumber: userdata.phonumber,
      username: userdata.username,
    }
    res.status(200).json(responseuser)
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
})

// CREATE user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', data: savedUser });
  } catch (error) {
    if(error.name === 'ValidationError') {
      console.error('❌ Validation error:', error.message);
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    if(error.code===11000){
      console.error('❌ Duplicate key error:', error.message);
      return res.status(400).json({ message: 'email already use' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });

  }
});



// Update user
router.put('/id', async (req, res) => {
  try {
    const userId = req.params.id;  // get ID from route parameter
    const updatedData = req.body;  // get update fields from request body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },  // use $set to apply update correctly
      { new: true }           // return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});


// deleteuser 
router.delete('/id', async (req, res) => {
  try {
    console.log(req.query)
    const userId = req.query.id;
    console.log(`🗑️ Deleting user with ID: ${userId}`);
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.warn(`⚠️ User with ID ${userId} not found`);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('✅ User deleted:', deletedUser);
    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
