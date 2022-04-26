const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
  value: () => {
    this.cards.reduce((sum, card) => {
      sum += parseFloat(card.prices.usd || 0);
    }, 0)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);