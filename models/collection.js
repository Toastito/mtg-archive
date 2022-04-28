const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  collectionName: {
    type: String,
    required: true
  },
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  cards: [{
    card:{type: Schema.Types.ObjectId, ref: 'Card'},
    quantity: {
      type: Number,
      min: 1,
      default: 1
    }
  }],
  // collectionValue: function () {
  //   this.cards.reduce((sum, card) => {
  //     sum += parseFloat(card.prices.usd || 0);
  //   }, 0)
  // }
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);