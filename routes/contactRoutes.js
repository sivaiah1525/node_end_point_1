const express =require ('express')

const router =express.Router()

const contact =require('../models/contactschema')


// GET all contacts
router.get('/', async (req, res) => {
  try {
    const users = await contact.find();
    console.log('📦 Sending contact list:', contacts.length);
    res.status(200).json(contacts);
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Get contact By ID 

router.get('/:id',async (req,res)=>{
  try {
    const contactid=req.query.id
    const contactdata=await contact.findbyId(contactid)
    res.status(200).json(contactdata)
  } catch (error) {
    console.error('❌ Error fetching contact:', error);
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
})

// CREATE contact
router.post('/', async (req, res) => {
  try {
    console.log('👉 Creating contact with data:', req.body); // debug log
    const newcontact = new contact(req.body);
    const savedcontact = await newcontact.save();
    console.log('✅ contact created:', savedcontact);
    res.status(201).json({ message: 'contact created successfully', data: savedcontact });
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    res.status(400).json({ message: 'Error creating contact', error: error.message });
  }
});



// Update contact
router.put('/:id', async (req, res) => {
  try {
    const contactId = req.params.id;  // get ID from route parameter
    const updatedData = req.body;  // get update fields from request body

    const updatedcontact = await contact.findByIdAndUpdate(
      contactId,
      { $set: updatedData },  // use $set to apply update correctly
      { new: true }           // return updated document
    );

    if (!updatedcontact) {
      return res.status(404).json({ message: 'contact not found' });
    }

    res.status(200).json({ message: 'contact updated successfully', updatedcontact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});


// deletecontact 
router.delete('/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    console.log(`🗑️ Deleting contact with ID: ${contactId}`);
    const deletedcontact = await contact.findByIdAndDelete(contactId);
    if (!deletedcontact) {
      console.warn(`⚠️ contact with ID ${contactId} not found`);
      return res.status(404).json({ message: 'contact not found' });
    }
    console.log('✅ contact deleted:', deletedcontact);
    res.status(200).json({ message: 'contact deleted successfully', data: deletedcontact });
  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});





module.exports=router