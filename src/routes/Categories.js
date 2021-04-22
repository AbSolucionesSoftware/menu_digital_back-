const {Router} = require("express");
const router = Router();

const { createCategories, getCategories } = require("../controllers/Categories.controller");

const auth = require('../middleware/auth');

router.route("/:idCompany")
    .post(createCategories)
    .get(getCategories);

router.route("");

module.exports = router;