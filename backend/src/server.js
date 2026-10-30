const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const { clerkMiddleware } = require('@clerk/express');
const User = require('./models/User');
const Enquiry = require('./models/Enquiry');
const Category = require('./models/Category');
const Property = require('./models/Property');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());

Category.hasMany(Property, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Property.belongsTo(Category, { foreignKey: 'categoryId' });

Property.hasMany(Enquiry, { foreignKey: 'propertyId', onDelete: 'CASCADE' });
Enquiry.belongsTo(Property, { foreignKey: 'propertyId' });

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

const enquiryRoutes = require('./routes/enquiryRoutes');
app.use('/api/enquiries', enquiryRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 5000;

// Database Connection Check & Sync
sequelize.sync({ alter: true })
    .then(() => console.log('Database connected and synchronized successfully.'))
    .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});