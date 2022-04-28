const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

router.get('/collections', async (req, res) => {
  console.log(res.locals.user);
  let collections = await Collection.find({owner: res.locals.user.id});
  console.log(collections);
  res.render('collections/index', { collections });
});

router.get('/collections/:id', async (req, res) => {
  console.log(req.params.id);
  let collection = await Collection.findById(req.params.id);
  res.render('collections/show', { collection });
});

router.post('/collections', async (req, res) => {
  console.log(req.body);
  req.body.owner = res.locals.user.id;
  let collection = await Collection.create(req.body);
  res.redirect('/collections');
});

router.put('/collections/:id', async (req, res) => {
  let collection = await Collection.findOne({owner: res.locals.user.id});
  if (!collection) res.redirect('/cards/search');
  console.log(req.body);
  // let card = await Card.findOne({cardDetails: req.body.cardId});
  // console.log(card);
  res.status(204).send();
});

module.exports = router;