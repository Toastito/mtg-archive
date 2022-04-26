const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Card = require('../models/card');
const rootUrl = 'https://api.scryfall.com/sets/';

router.get('/sets', (req, res, next) => {
  res.render('sets/index');
});

router.get('/sets/:id', (req, res, next) => {
  let cardSet;
  fetch(`${rootUrl}neo/`)
  .then(res => res.json())
  .then(set => {
    cardSet = set;
    return fetch(set.search_uri)
  })
  .then(res => res.json())
  .then(cards => {
    console.log(cards);
    cardSet.cards = cards;
    res.render('/sets/:id', {cardSet, title: 'MTG Archive'}) // Replace id with real variable
  });
});

module.exports = router;