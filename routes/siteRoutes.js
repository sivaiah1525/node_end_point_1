const express = require('express');
const router = express.Router();
const site = require('../models/siteschema')



// Get all sites
router.get('/', async (req, res) => {
  try {
    const users = await site.find();
    res.status(200).json(users); // 200 = OK
  } catch (error) {
    console.error(error); // Optional: log error
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get site 
router.get('/:id', async (req, res) => {
  try {
    const siteid = req.query.id
    const sitedata = await site.findbyId(siteid)
    res.status(200).json(sitedata)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

})

// Create site
router.post('/', async (req, res) => {
  try {
    const newsite = new site(req.body)
    const savesite = await newsite.save()
    res.status(200).json({ message: 'Site created successfully', data: savesite })
  } catch (error) {
    console.error('❌ Error creating site:', error);
    res.status(500).json({ message: 'Error creating site', error: error.message });
  }
})

//update site 

router.post('/:id', async (req, res) => {
  try {
    const siteid = req.params.id
    const sitedata = req.body
    const updatesite = await site.findByIdAndUpdate(
      siteid,
      { $set: sitedata },
      { new: true }
    )
    res.status(200).json({ message: 'Update site data Done ' })
  } catch (error) {
    res.status(500).json({ message: 'update Failed' })
    res.status(400).json({ message: 'Baed Request' })
  }
})


// delete site 

router.delete('/:id', async (req, res) => {
  try {
    const siteid = req.params.id
    const deletesite = await site.findByIdAndDelete(siteid)
    res.status(200).json({message:`Delecting Site ${deletesite}`})
  } catch (error) {
      res.status(500).json({ message: 'update Failed' })
    res.status(400).json({ message: 'Baed Request' })
  }
})




module.exports = router;
