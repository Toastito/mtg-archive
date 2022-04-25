require('dotenv').config();
require('./config/database');
const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const Card = require('./models/card');
const User = require('./models/user');
const cards = require('./data.json');

// const rootUrl = 'https://api.scryfall.com/';

// const readStream = fs.createReadStream('./data.json', 'utf8');
// const outStream = new stream();

// const rl = readline.createInterface(readStream, outStream);
// let lineCount = 0;
// rl.on('line', async (line) => {
//   line = line.replace(/,\s*$/, '');
//   console.log();
//   lineCount++;
//   console.log(lineCount);
//   rl.pause();
//   await Card.create({cardDetails: JSON.parse(JSON.stringify(line))})
//   if (lineCount === 50) process.exit();
// });

// User.deleteMany({}).then(results => console.log(results));


// fetch(`${rootUrl}neo/`)
// .then(res => res.json())
// .then(set => {
//   return fetch(set.search_uri)
// })
// .then(res => res.json())
// .then(cards => {
//   cards.data.forEach(async card => {
//     let cardDb = await Card.findOne({'cardDetails.id': card.id});
//     if (cardDb) return;
//     await Card.create({cardDetails: card});
//   });
// });
// console.log(data.length);

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
