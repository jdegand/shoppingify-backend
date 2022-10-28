const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    items: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Item' 
    }]
});

/*
works but - have to remove password field as well

const Populate = require('../util/autoPopulate');
channelSchema
  .pre('findOne', Populate('members'))
  .pre('findById', Populate('members'))
  .pre('find', Populate('members'));
*/

module.exports = mongoose.model('Category', categorySchema);