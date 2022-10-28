const fs = require('fs');
const path = require('path');

const User = require('../models/User');

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const updateUser = async (req, res) => {
    
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findById(req.params.id).select("-password -refreshToken");

    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
    }

    // get list id somehow

    //user.lists.push(list)
    
    //await user.save()

}


module.exports = {
    getUser, 
    updateUser
}