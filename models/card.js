const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cardSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  cardDetails: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Card', cardSchema);