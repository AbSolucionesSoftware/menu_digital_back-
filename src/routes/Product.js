const { Router } = require("express");
const router = Router();
const {
  uploadImagen,
  createProduct,
  editProduct,
  getProductCompany,
  deleteProduct,
  agruparCategoriasFiltro,
  filterSubCategorie,
  filtroBusqueda,
  getProductCompanyCategory,
  aggregateClassification,
  updateClassification,
  deleteClassification,
  getOneProduct,
  publicProduct
} = require("../controllers/Product.controller");
const auth = require("../middleware/auth");

router.route("/:idCompany")
  .post(auth, uploadImagen, createProduct)
  .get(getProductCompany);

router.route("/edit/:idProducto")
  .put(auth, uploadImagen, editProduct)
  .delete(auth, deleteProduct)
  .get(auth, getOneProduct);

router.route("/categories/:idCompany").get(agruparCategoriasFiltro);

router.route("/search/subCategory/").post(filterSubCategorie);

router.route("/filter/search/:idCompany").post(filtroBusqueda);

router.route("/search/company/category/").post(getProductCompanyCategory);//RUAT QUE TRAE PRODUCTOS AGRUPADOS POR SUBCATES

router.route("/public/action/:idProduct").put(publicProduct); //RUTA PARA PUBLICAR LOS PRODUCTOS

router.route("/aggregate/classification/:idProduct").post(aggregateClassification);

router.route("/action/classification/:idProduct/subClassification/:idClassification").put(updateClassification).delete(deleteClassification);



module.exports = router;
