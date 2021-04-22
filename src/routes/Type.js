const { Router } = require("express");
const router = Router();
const { createType, getType, updateType, deleteType } = require("../controllers/typeClassification.controller");
// const auth = require("../middleware/auth");

router.route("/")
  .post(createType)
  .get(getType);

router.route("/:idType")
    .put(updateType)
    .delete(deleteType);

module.exports = router;
