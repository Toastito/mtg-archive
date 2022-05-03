const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');
const rootUrl = 'http://api.scryfall.com';

/* GET home page. */
router.get('/', async (req, res, next) => {
  let recentSets = await fetch(`${rootUrl}/sets?set_type=expansion`);
  recentSets = await recentSets.json();
  recentSets = recentSets.data.filter((set) => {
    console.log(set.name);
    console.log(set.released_at);
    console.log(new Date().getFullYear() - 2);
    return (set.set_type === 'expansion' || set.set_type === 'funny') && ((new Date().getFullYear() - 2).toString() <= set.released_at);
  });
  console.log(recentSets);
  res.render('index', { recentSets });
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
