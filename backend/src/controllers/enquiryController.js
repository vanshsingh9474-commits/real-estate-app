const Enquiry = require('../models/Enquiry');
const Property = require('../models/Property');

// 1. Create a new enquiry (Public / Logged-in user)
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !propertyId) {
      return res.status(400).json({ error: 'Please provide all required fields (name, email, phone, propertyId).' });
    }

    // Check if property exists
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found.' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      propertyId,
      userId: req.user ? req.user.id : null // Optional: if user is logged in
    });

    res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all enquiries (Admin only)
exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(enquiries);
    } catch (error) {
        console.error("Error in getEnquiries:", error);
        res.status(500).json({ error: error.message });
    }
};

// 3. Delete an enquiry (Admin only)
exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    await enquiry.destroy();
    res.status(200).json({ message: 'Enquiry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};