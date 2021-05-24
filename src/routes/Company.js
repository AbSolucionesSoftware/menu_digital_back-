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
  getCompanySlug,
  sendEmail,
  getCompanysPage,
  createSucursal,
  editSucursal,
  deleteSucursal,
  publicSucursales
} = require("../controllers/Company.controller");
const auth = require("../middleware/auth");
//AGREGAR EL auth, 
router.route("/").post(auth,createCompany).get(auth,getCompanys);

router.route("/fullCompanys").get(getCompanysPage);

router.route("/admin").post(auth, createCompanyAdmin);

router.route("/logIn").post(inicioSesion);

router.route("/:idCompany")
  .get(getCompany)
  .put(uploadImagen, auth, editCompany)
  .delete(deleteCompany);


router.route("/sucursal/:idCompany")
  .post(createSucursal)//LISTA SOLO AGREGAR TOKEN
  .put(publicSucursales);

router.route("/action/company/:idCompany/sucursal/:idSucursal")
  .put(editSucursal) //LISTO SOLO AGREGAR EL TOKEN
  .delete(deleteSucursal);//LISTA SOLO AGREGAR TOKEN


router.route("/resetPass/:idCompany").put(auth, resetPassCompany);

router.route("/resetPass/user/:idCompany").put(auth, resetPassCompanyUser);

router.route("/public/action/:idCompany").put(PublicCompany);

router.route("/slug/company/:idSlug").get(getCompanySlug);

router.route("/contact/send/email").post(sendEmail);

module.exports = router;
