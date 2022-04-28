const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Collection = require('../models/collection');

router.get('/cards/search', async (req, res, next) => {
  let results = await fetch(`https://api.scryfall.com/cards/search?q=${req.query.q}`);
  results = await results.json();
  if (res.locals.user) {
    let collections = await Collection.find({owner: req.locals.user.id});
    console.log(collections);
  }
  res.render('cards/index', { cards: results.data });
});

module.exports = router;