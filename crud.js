require('dotenv').config();
require('./config/database');
const fetch = require('node-fetch');
const Card = require('./models/card');
const User = require('./models/user');
const cards = require('./data.json');

// Use JSON file to update card database
async function updateCardDatabase(cards) {
  for (const [idx, card] of cards.entries()) {
    if (idx === 50) return;
    console.log(`Card ID: ${card.id}`);
    let cardDb = await Card.findOne({'cardDetails.id': card.id});
    if (cardDb) continue;
    console.log('Creating Card');
    await Card.create({cardDetails: card});
    console.log(`Created Card: ${idx}`);
  }
}

function deleteCards() {
  Card.deleteMany({}).then(results => console.log(results));
}

function deleteUsers() {
  User.deleteMany({}).then(results => console.log(results));
}