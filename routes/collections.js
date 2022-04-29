const express = require('express');
const router = express.Router();
const collectionsCtrl = require('../controllers/collections');

router.get('/collections', collectionsCtrl.index);

router.get('/collections/all', collectionsCtrl.allCollections);

router.get('/collections/:id', collectionsCtrl.show);

router.post('/collections', collectionsCtrl.create);

router.delete('/collections/:id', collectionsCtrl.delete);

module.exports = router;