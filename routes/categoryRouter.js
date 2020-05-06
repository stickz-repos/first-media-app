const router = require("express").Router();

//category model
const Category = require("../models/model");

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

router.delete("/remove/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

module.exports = router;
