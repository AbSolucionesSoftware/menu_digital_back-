const { Router } = require("express");
const router = Router();

const {
  createClassification,
  getClassification,
  // updateClassification,
  deleteClassification,
  agregateSubClassification,
  updateSubClassification,
  deleteSubClassification,
} = require("../controllers/Classification.controller");

const auth = require("../middleware/auth");

router.route("/:idCompany").post(auth,createClassification).get(getClassification);

router
  .route("/action/:idClassification")
  // .put(updateClassification)
  .delete(auth,deleteClassification);

router
  .route("/action/:idClassification/subClassification")
  .post(auth,agregateSubClassification);

router
  .route("/action/:idClassification/subClassification/:idSubClassification/company/:idCompany")
  .put(auth,updateSubClassification)
  .delete(auth,deleteSubClassification);

module.exports = router;
