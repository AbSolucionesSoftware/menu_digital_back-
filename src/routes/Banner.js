const { Router } = require('express');
const router = Router();
const {uploadImagen, createBanner,editBanner,deleteBaneer, getBanner } = require('../controllers/Banner.controller');
const auth = require('../middleware/auth');

router.route('/').post(auth,uploadImagen,createBanner);

router.route('/:idBanner').put(auth,editBanner).delete(auth,deleteBaneer);

router.route('/company/:idCompany').get(getBanner);

module.exports = router;