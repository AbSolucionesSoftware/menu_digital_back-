const { Router } = require("express");
const router = Router();
const {
  uploadImagen,
  createCompany,
  inicioSesion,
  createCompanyAdmin,
  getCompanys,
  getCompany,
  editCompany,
  resetPassCompany,
  deleteCompany,
  resetPassCompanyUser,
  PublicCompany,
  getCompanySlug
} = require("../controllers/Company.controller");
const auth = require("../middleware/auth");

router.route("/").post(auth, createCompany).get(auth, getCompanys);

router.route("/fullCompanys").get(getCompanys);

router.route("/admin").post(auth, createCompanyAdmin);

router.route("/logIn").post(inicioSesion);

router.route("/:idCompany")
  .get(getCompany)
  .put(uploadImagen,auth, editCompany)
  .delete(deleteCompany);

router.route("/resetPass/:idCompany").put(auth, resetPassCompany);

router.route("/resetPass/user/:idCompany").put(auth, resetPassCompanyUser);

router.route("/public/action/:idCompany").put(PublicCompany);

router.route("/slug/company/:idSlug").get(getCompanySlug)

module.exports = router;
