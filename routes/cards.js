const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/cards/search', async (req, res, next) => {
  let results = await fetch(`https://api.scryfall.com/cards/search?q=${req.query.q}`);
  results = await results.json();
  res.render('cards/index', { cards: results.data });
});

module.exports = router;