const Collection = require('../models/collection');
const Card = require('../models/card');
const fetch = require('node-fetch');

module.exports = {
  index,
  create,
  update,
  delete: deleteCard
}

async function index(req, res) {
  let results = await fetch(`https://api.scryfall.com/cards/search?q=${req.query.q}`);
  results = await results.json();
  
  let collections;
  if (res.locals.user) {
    collections = await Collection.find({ owner: req.user._id });
  }
  res.render('cards/index', { cards: results.data, collections });
}

async function create(req, res) {
  let collection = await Collection.findOne({ _id: req.body.collection, owner: req.user._id }).populate('owner').populate('cards.card').exec();
  if (!collection) res.redirect('/cards/search');

  let cardIdx = collection.cards.findIndex((card) => card.card.cardDetails.id === req.body.cardId);
  let collectionCard = await Card.findOne({ 'cardDetails.id': req.body.cardId });

  if (cardIdx === -1) {
    collection.cards.push({ quantity: parseInt(req.body.quantity), card: collectionCard });
    await collection.save();
  } else if (cardIdx >= 0) {
    collection.cards[cardIdx].quantity += parseInt(req.body.quantity);
    await collection.save();
  }
  res.redirect('cards/search');
}

async function update(req, res) {
  let collection = await Collection.findOne({ owner: req.user._id, 'cards._id': req.params.id });
  await collection.cards.id(req.params.id).set({ quantity: req.body.quantity });
  await collection.save();
  res.redirect(`/collections/${collection._id}`);
}

async function deleteCard(req, res) {

  let collection = await Collection.findOne({ owner: req.user._id, 'cards._id': req.params.id });
  await collection.cards.remove(req.params.id);
  await collection.save();
  res.redirect(`/collections/${collection._id}`);
}