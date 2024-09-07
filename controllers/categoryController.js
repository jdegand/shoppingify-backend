const mongoose = require('mongoose');
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');

const getAllCategories = async (req, res) => {
    try {
        // populate items ?
        const categories = await Category.find({}).populate('items');
        if (!categories) return res.status(204).json({ 'message': "No categories found" });

        res.json(categories);
    } catch (err) {
        console.log(err)
    }
}

const createCategory = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            // used name for category - potential conflict with item model's use of categoryName 
            // changed to categoryName
            const { categoryName } = req.body;
            if (!categoryName) return res.status(400).json({ 'message': 'Missing categoryName' });

            const duplicate = await Category.findOne({ categoryName: categoryName }).exec()

            if (duplicate) return res.status(409).json({ message: "Category categoryName already exists" })

            try {

                await Category.create({
                    "categoryName": categoryName
                });

                res.status(201).json({ 'success': `Category ${categoryName} added!` });
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }

        }
    );
}

module.exports = {
    getAllCategories,
    createCategory
}