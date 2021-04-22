const {Router} = require("express");
const router = Router();

const { createCategories, getCategories, updateCategorie, deleteCategorie, agregateSubCategorie, updateSubCategorie, deleteSubCategorie } = require("../controllers/Categories.controller");

const auth = require('../middleware/auth');

router.route("/:idCompany")
    .post(createCategories)
    .get(getCategories);

router.route("/action/:idCategory")
    .put(updateCategorie)
    .delete(deleteCategorie);

router.route("/action/:idCategory/subCategory")
    .post(agregateSubCategorie);

router.route("/action/:idCategory/subCategory/:idSubCategory")
    .put(updateSubCategorie)
    .delete(deleteSubCategorie);

module.exports = router;