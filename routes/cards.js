const express = require('express');
const router = express.Router();

router.get('/cards/search', (req, res, next) => {
  res.render('cards/index');
});

module.exports = router;