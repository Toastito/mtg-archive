require('dotenv').config();
require('./config/database');

const Card = require('./models/card');
const User = require('./models/user');
const Collection = require('./models/collection');
// const cards = require('./data.json');

// Use JSON file to update card database
async function updateCardDatabase(cards) {
  for (const [idx, card] of cards.entries()) {
    console.log(`Card ID: ${card.id}`);
    let cardDb = await Card.findOne({ 'cardDetails.id': card.id });
    if (cardDb) continue;
    console.log('Creating Card');
    await Card.create({ cardDetails: card });
    console.log(`Created Card: ${idx}`);
  }
}

function deleteCards() {
  Card.deleteMany({}).then(results => console.log(results));
}

function deleteUsers() {
  User.deleteMany({}).then(results => console.log(results));
}

function deleteCollection() {
  Collection.deleteMany({}).then(results => console.log(results));
}

async function resetUsersInCard(id) {
  let card = await Card.findOne({ 'cardDetails.id': id });
  console.log(card);
  card.user = [];
  await card.save();
}