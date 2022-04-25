const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
  author: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  title: {
    type: String, 
    required: true
  },
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
}, {
  timestamps: true
});