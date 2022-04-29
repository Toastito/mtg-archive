const Collection = require('../models/collection');

module.exports = {
  index,
  allCollections,
  show,
  create
}

async function index(req, res) {
  let collections = await Collection.find({ owner: res.locals.user.id }).populate('owner');
  res.render('collections/index', { collections });
}

async function allCollections(req, res) {
  let collections = await Collection.find({}).populate('owner');
  res.render('collections/allCollections', { collections });
}

async function show(req, res) {
  let collection = await Collection.findById(req.params.id).populate('owner').populate('cards.card').exec();
  let owner;
  if (res.locals.user) owner = collection.owner._id.equals(res.locals.user.id);
  res.render('collections/show', { collection, owner });
}

async function create(req, res) {
  req.body.owner = res.locals.user.id;
  let collection = await Collection.create(req.body);
  res.redirect('/collections');
}