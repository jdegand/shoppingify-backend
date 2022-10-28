const mongoose = require('mongoose');
const Message = require('../models/Message');
const Channel = require('../models/Channel');
const jwt = require('jsonwebtoken');

const getAllMessages = async (req, res) => {

    // what if no messages?

    // need to populate channel to display the name in the jsx
    // doesnt work if no messages 

    try {
    const messages = await Message.find({channel: req.params.channelId}).populate('user').populate('channel').exec();

    if(messages.length === 0) {
        // could make request here to get channel info and pass name back

        const channelInfo = await Channel.find({_id: req.params.channelId});

        return res.send({messages:messages, channelInfo:channelInfo}); 
    } 
    
        return res.json({messages: messages});
    } catch(err){
        console.log(err)
    }
}

const createMessage = async (req,res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            const { text } = req.body;
            if (!text) return res.status(400).json({ 'message': 'text required.' });
            if(!req.params.channelId) return res.status(400).json({'message': 'channel id required.'})

            try {
                const result = await Message.create({ 
                    "text": text,
                    "user": decoded.UserInfo._id,
                    "channel": req.params.channelId
                });

                // grab channel and update members array here ???

                const updateChannel =  await Channel.findOne({_id: req.params.channelId}).populate('messages').exec();

                await updateChannel.save();
        
                res.status(201).json({ 'success': `${result._id} added!` }); // pass the id back to the frontend to add to channel object
                // switched gears - don't think this wasn't used or necessary
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }
         
        }
    );
}

module.exports = {
    getAllMessages,
    createMessage,
}