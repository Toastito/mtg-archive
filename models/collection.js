const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionCardSchema = new Schema({
  quantity: {
    type: Number,
    min: 1,
    default: 1
  },
  card: {type: Schema.Types.ObjectId, ref: 'Card'}
});

const collectionSchema = new Schema({
  collectionName: {
    type: String,
    required: true
  },
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  cards: [collectionCardSchema],
  // collectionValue: function () {
  //   this.cards.reduce((sum, card) => {
  //     sum += parseFloat(card.prices.usd || 0);
  //   }, 0)
  // }
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);