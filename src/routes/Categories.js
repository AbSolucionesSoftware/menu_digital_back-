const { Router } = require("express");
const router = Router();

const {
  createCategories,
  getCategories,
  updateCategorie,
  deleteCategorie,
  agregateSubCategorie,
  updateSubCategorie,
  deleteSubCategorie,
} = require("../controllers/Categories.controller");

const auth = require("../middleware/auth");

router.route("/:idCompany").post(auth,createCategories).get(getCategories);

router
  .route("/action/:idCategory")
  .put(auth,updateCategorie)
  .delete(auth,deleteCategorie);

router.route("/action/:idCategory/subCategory").post(auth,agregateSubCategorie);

router
  .route("/action/:idCategory/subCategory/:idSubCategory/company/:idCompany")
  .put(auth,updateSubCategorie)
  .delete(auth,deleteSubCategorie);

module.exports = router;
