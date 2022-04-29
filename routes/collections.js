const express = require('express');
const router = express.Router();
const collectionsCtrl = require('../controllers/collections');
const isLoggedIn = require('../config/auth');

router.get('/collections', isLoggedIn, collectionsCtrl.index);

router.get('/collections/all', collectionsCtrl.allCollections);

router.get('/collections/:id', collectionsCtrl.show);

router.post('/collections', isLoggedIn, collectionsCtrl.create);

router.delete('/collections/:id', isLoggedIn, collectionsCtrl.delete);

module.exports = router;