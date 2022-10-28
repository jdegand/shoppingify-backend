const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        unique: true 
    },
    note: {
        type: String, 
        required: false
    },
    picture: {
        type: String,
        required: false,
        default: 'https://via.placeholder.com/300x200'
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    }
    /*
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
    */
});


module.exports = mongoose.model('Item', itemSchema);