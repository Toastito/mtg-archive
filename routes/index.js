const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const passport = require('passport');

const rootUrl = 'https://api.scryfall.com/sets/'
/* GET home page. */
router.get('/', function(req, res, next) {
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
    res.render('index', {cardSet, title: 'MTG Archive'})
  });
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/oauth2callback', passport.authenticate('google',{
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
