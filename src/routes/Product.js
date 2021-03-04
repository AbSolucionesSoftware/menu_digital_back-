const { Router } = require('express');
const router = Router();
const { uploadImagen, createProduct, editProduct, getProductCompany, deleteProduct } = require('../controllers/Product.controller');
const auth = require('../middleware/auth');

router.route('/:idCompany').post(auth,createProduct);

router.route('/edit/:idProducto').put(editProduct);

module.exports = router;