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
  let collection = await Collection.findById(req.params.id).populate('owner').populate('cards.card').exec();
  let owner;
  if (res.locals.user) owner = collection.owner._id.equals(res.locals.user.id);
  res.render('collections/show', { collection, owner }); 
});

router.post('/collections', async (req, res) => {
  console.log(req.body);
  req.body.owner = res.locals.user.id;
  let collection = await Collection.create(req.body);
  res.redirect('/collections');
});

router.post('/cards', async (req, res) => {
  // let collection = await Collection.findById(req.body.collection);
  let collection = await Collection.findById(req.body.collection).populate('owner').populate('cards.card').exec();
  if (!collection) res.redirect('/cards/search');
  let cardIdx = collection.cards.findIndex((card) => card.card.cardDetails.id === req.body.cardId);
  // Ternary for collection if card exists
  let collectionCard = await Card.findOne({'cardDetails.id': req.body.cardId});
  let cardInCollections = collectionCard.user.some((user) => user.equals(res.locals.user.id)); 
  if (cardIdx === -1) {
    collection.cards.push({quantity: parseInt(req.body.quantity), card: collectionCard});
    await collection.save();
  } else if(cardIdx >= 0) {
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

router.put('/cards/:id', async(req, res) => {
  let collection = await Collection.findOne({'cards._id' : req.params.id});
  await collection.cards.id(req.params.id).set({quantity: req.body.quantity});
  await collection.save();
  res.redirect(`/collections/${collection._id}`);
});

router.delete('/cards/:id', async (req, res) => {
  let collection = await Collection.findOne({'cards._id' : req.params.id});
  await collection.cards.remove(req.params.id);
  await collection.save();
  res.redirect(`/collections/${collection._id}`);
});

router.delete('/collections/:id', async (req, res) => {

});

module.exports = router;