const router = require("express").Router();

//category + joke model
const Category = require("../models/model").category;
const Joke = require("../models/model").joke;

//GET /api/category : Gets all categories
router.get("/", (req, res) => {
  Category.find()
    .sort()
    .then((categories) => res.json(categories))
    .catch((err) => console.log(err));
});

// POST /api/category/new : Creates a new cartgory
router.post("/new", (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
    likes: 0,
    jokes: [],
  });
  newCategory
    .save()
    .then((category) => res.json(category))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  Category.findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => console.log(err));
});

router.delete("/:id/remove", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => console.log(err));
});

router.post("/:id/joke/new", (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    { $push: { jokes: { user: req.body.user, text: req.body.text } } },
    { safe: true, new: true },
    (err, model) => {
      if (err) {
        console.log(err);
      } else {
        res.json(model);
      }
    }
  );
});

module.exports = router;
