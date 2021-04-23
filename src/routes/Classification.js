const {Router} = require("express");
const router = Router();

const { createClassification, getClassification, updateClassification, deleteClassification, agregateSubClassification, updateSubClassification, deleteSubClassification,  } = require("../controllers/Classification.controller");

const auth = require('../middleware/auth');

router.route("/:idCompany")
    .post(createClassification)
    .get(getClassification);

router.route("/action/:idClassification")
    // .put(updateClassification)
    .delete(deleteClassification);
 
router.route("/action/:idClassification/subClassification")
    .post(agregateSubClassification);

router.route("/action/:idClassification/subClassification/:idSubClassification")
    .put(updateSubClassification)
    .delete(deleteSubClassification);

module.exports = router;