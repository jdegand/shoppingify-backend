const mongoose = require('mongoose');
const Item = require('../models/Item');
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getAllItems = async (req, res) => {
    try {
    const items = await Item.find().sort({updatedAt: -1});
    if(!items) return res.status(204).json({ 'message': "No Items found" });
    
    res.json(items);
    } catch(err){
        console.log(err)
    }
}

const createItem = async (req,res) => {

    // need to check if req.body has valid properties
    // need to check if category exists
    // need to check if item name already exists
    // need to create Category or get Category ID
    // need to create Item with category ID
    // need to save Item
    // need to update Category with item
    // need to save Category 

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            const { itemName, note, categoryName, picture } = req.body;
            if (!itemName || !categoryName) return res.status(400).json({ 'message': 'Missing name or category for item' });
        
            const duplicate = await Item.findOne({ itemName: itemName }).exec()
        
            if (duplicate) return res.status(409).json({message: "Item name taken"})
        
            try {
                
                const foundCategory = await Category.findOne({categoryName: categoryName}).exec()

                if(!foundCategory){
                    const createdCategory = await Category.create({
                        "categoryName": categoryName
                    })

                    const item = await Item.create({
                        "itemName": itemName,
                        "note": note,
                        "category": createdCategory._id,
                        "picture": picture
                    })

                    createdCategory.items.push(item)
                    await createdCategory.save()

                } else {

                    const item = await Item.create({
                        "itemName": itemName,
                        "note": note,
                        "category": foundCategory._id,
                        "picture": picture
                    })
                    
                    foundCategory.items.push(item)
                    await foundCategory.save()
                }

                res.status(201).json({ 'success': `New Item added!` });
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }
         
        }
    );
}

const getItem = async (req, res) => {

    try {
        if (!req.query.item) return res.status(400).json({ "message": 'Item ID required' });

        const item = await Item.findOne({ _id: req.query.item }).populate('category').exec();
        if (!item) {
            return res.status(204).json({ 'message': `Item ID ${req.query.id} not found` });
        }
        res.json(item);
    } catch(err){
        res.status(500).json({ 'message': err.message });
    }
}

const getItemById = async (req, res) => {

    try {
        if (!req.params.id) return res.status(400).json({ "message": 'Item ID required' });

        const item = await Item.findOne({ _id: req.params.id }).populate('category').exec();
        if (!item) {
            return res.status(204).json({ 'message': `Item ID ${req.params.id} not found` });
        }
        res.json(item);
    } catch(err){
        res.status(500).json({ 'message': err.message });
    }
}

const updateItem = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            // should be able to update name and category ?

            try {
                if (!req?.params?.id) return res.status(400).json({ "message": 'Item ID required' });
                
                const item = await Item.findOne({ _id: req.params.id }).exec();
                if (!Item) {
                    return res.status(204).json({ 'message': `Item ID ${req.params.id} not found` });
                }

                await item.save()
        
                res.json(item);
            } catch(err){
                res.status(500).json({ 'message': err.message });
            }
    });
}

module.exports = {
    getAllItems,
    createItem,
    getItem,
    getItemById,
    updateItem, 
}
