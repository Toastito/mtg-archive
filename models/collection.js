const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
  cost: () => {} 
}, {
  timestamps: true
});