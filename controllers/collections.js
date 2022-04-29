const Collection = require('../models/collection');
const Card = require('../models/card');

module.exports = {
  index,
  allCollections,
  show,
  create
}

async function index(req, res) {
  console.log(res.locals.user);
  let collections = await Collection.find({ owner: res.locals.user.id }).populate('owner');
  console.log(collections);
  res.render('collections/index', { collections });
}

async function allCollections(req, res) {
  let collections = await Collection.find({}).populate('owner');
  console.log(collections);
  res.render('collections/allCollections', { collections });
}

async function show(req, res) {
  let collection = await Collection.findById(req.params.id).populate('owner').populate('cards.card').exec();
  let owner;
  if (res.locals.user) owner = collection.owner._id.equals(res.locals.user.id);
  res.render('collections/show', { collection, owner }); 
}

async function create(req, res) {
  console.log(req.body);
  req.body.owner = res.locals.user.id;
  let collection = await Collection.create(req.body);
  res.redirect('/collections');
}