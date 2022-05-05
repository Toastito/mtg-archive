const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');
const rootUrl = 'http://api.scryfall.com';
const Collection = require('../models/collection');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let recentSets = await fetch(`${rootUrl}/sets?set_type=expansion`);
  let recentCollections = await Collection.find().sort({_id: -1}).limit(10);
  recentSets = await recentSets.json();
  recentSets = recentSets.data.filter((set) => {
    return (set.set_type === 'expansion' || set.set_type === 'funny' || set.set_type === 'masters') && ((new Date().getFullYear() - 1).toString() <= set.released_at && !set.name.includes('Minigames'));
  });
  console.log(recentSets);
  console.log(recentCollections);
  res.render('index', { recentSets, recentCollections });
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
