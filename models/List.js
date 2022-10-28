const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    listName: {
        type: String,
        required: true
    },
    state: {
        type: String, 
        enum : ['active','completed', 'cancelled'],
        default: 'active'
    },
    items: [{
        itemId: {type: Schema.Types.ObjectId, ref: 'Item'},
        itemName:{type: String}, //required not necessary? - can be retrieved with itemId
        quantity:{type:Number, default: 1},
        purchased: {type: Boolean, default: false},
        note: { type: String},
        picture: {type:String},
        editing: {type:Boolean},
        category: {type: Schema.Types.ObjectId, ref: 'Category'}, //was losing this because it was not included
        categoryName: {type:String} // added this to avoid populating category 
    }],
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }

}, {timestamps: true});

// item quantity here versus item model ?

module.exports = mongoose.model('List', listSchema);