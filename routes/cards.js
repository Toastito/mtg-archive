const express = require('express');
const router = express.Router();
const cardsCtrl = require('../controllers/cards');

router.get('/cards/search', cardsCtrl.index);

router.post('/cards', cardsCtrl.create);

router.put('/cards/:id', cardsCtrl.update);

router.delete('/cards/:id', cardsCtrl.delete);

module.exports = router;