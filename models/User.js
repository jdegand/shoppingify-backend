const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true 
        // minlength: 6
    },
    lists: [{
        type:Schema.Types.ObjectId, 
        ref: 'List'
    }],
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);