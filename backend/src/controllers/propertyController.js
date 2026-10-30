const Property = require('../models/Property');
const Category = require('../models/Category');

// 1. Sabhi properties fetch karne ke liye
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll({
            include: [{ model: Category, attributes: ['name'] }]
        });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Single property ID se fetch karne ke liye
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id, {
            include: [{ model: Category, attributes: ['name'] }]
        });
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Nayi property add karne ke liye
exports.createProperty = async (req, res) => {
    try {
        const { title, description, price, city, address, type, categoryId, images } = req.body;
        const newProperty = await Property.create({
            title, description, price, city, address, type, categoryId, images
        });
        res.status(201).json({
            message: 'Property created successfully!',
            property: newProperty
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Property update karne ke liye
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });

        await property.update(req.body);
        res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Property delete karne ke liye
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });

        await property.destroy();
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};