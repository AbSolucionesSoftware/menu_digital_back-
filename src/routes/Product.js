const { Router } = require("express");
const router = Router();
const {
  uploadImagen,
  createProduct,
  editProduct,
  getProductCompany,
  deleteProduct,
  agruparCategoriasFiltro,
  filtroBusqueda,
} = require("../controllers/Product.controller");
const auth = require("../middleware/auth");

router.route("/:idCompany")
  .post(auth, uploadImagen, createProduct)
  .get(getProductCompany);

router.route("/edit/:idProducto")
  .put(auth, uploadImagen, editProduct)
  .delete(auth, deleteProduct);

router.route("/categories/:idCompany").get(agruparCategoriasFiltro);

router.route("/search/company/:idCompany").post(filtroBusqueda);

module.exports = router;
