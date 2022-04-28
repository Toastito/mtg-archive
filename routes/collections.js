const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');
const Card = require('../models/card');

router.get('/collections', async (req, res) => {
  console.log(res.locals.user);
  let collections = await Collection.find({owner: res.locals.user.id});
  console.log(collections);
  res.render('collections/index', { collections });
});

router.get('/collections/all', async (req, res) => {
  let collections = await Collection.find({}).populate('owner');
  console.log(collections);
  res.render('collections/allCollections', { collections });
});

router.get('/collections/:id', async (req, res) => {
  console.log(req.params.id);
  let collection = await Collection.findById(req.params.id).populate('owner');
  res.render('collections/show', { collection }); 
});

router.post('/collections', async (req, res) => {
  console.log(req.body);
  req.body.owner = res.locals.user.id;
  let collection = await Collection.create(req.body);
  res.redirect('/collections');
});

router.put('/collections', async (req, res) => {
  let collection = await Collection.findById(req.body.collection);
  console.log(collection);
  console.log(req.body);
  if (!collection) res.redirect('/cards/search');
  collection.cards.forEach(async (card, idx) => {
    await collection.populate(`cards.${idx}.card`);
  });
  await collection.save();
  let cardIdx = collection.cards.findIndex((card) => card.card.cardDetails.id === req.body.cardId);
  console.log(cardIdx);
  // Ternary for collection if card exists
  let collectionCard = await Card.findOne({'cardDetails.id': req.body.cardId});
  console.log(collectionCard);
  let cardInCollections = collectionCard.user.some((user) => user.equals(res.locals.user.id)); 
  if (cardIdx === -1) {
    collection.cards.push({quantity: parseInt(req.body.quantity), card: collectionCard});
    await collection.save();
  } else if(cardIdx >= 0) {
    console.log(`The card was found in index : ${cardIdx}`);
    console.log('Updating the Card Quantity');
    collection.cards[cardIdx].quantity += parseInt(req.body.quantity);
    await collection.save();
  }
  // if (!cardIdx) {

    // collectionCard.user.push(res.locals.user.id);
    // await collectionCard.save();

  // }
  // console.log(req.body);
  // let card = await Card.findOne({cardDetails: req.body.cardId});
  // console.log(card);
  res.redirect('cards/search');
  // res.status(204).send();
});

module.exports = router;