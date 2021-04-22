const { Router } = require("express");
const router = Router();
const { createType, getType } = require("../controllers/typeClassification.controller");
const auth = require("../middleware/auth");

router.route("/:idCompany")
  .post(createType)
  .get(getType);

module.exports = router;
