const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) res.render('decks/index')
  res.render('index')
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
