const express = require('express');
const router = express.Router();
const cardsCtrl = require('../controllers/cards');
const isLoggedIn = require('../config/auth');

router.get('/cards/search', cardsCtrl.index);

router.post('/cards', isLoggedIn, cardsCtrl.create);

router.put('/cards/:id', isLoggedIn, cardsCtrl.update);

router.delete('/cards/:id', isLoggedIn, cardsCtrl.delete);

module.exports = router;