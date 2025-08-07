const express = require('express');
const router = express.Router();
const User = require('../models/userschema');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log('📦 Sending user list:', users.length);
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get User By ID 

router.get('/:id',async (req,res)=>{
  try {
    const userid=req.query.id
    const userdata=await User.findbyId(userid)
    res.status(200).json(userdata)
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
})

// CREATE user
router.post('/', async (req, res) => {
  try {
    console.log('👉 Creating user with data:', req.body); // debug log
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log('✅ User created:', savedUser);
    res.status(201).json({ message: 'User created successfully', data: savedUser });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});



// Update user
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
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
