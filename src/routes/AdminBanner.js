const { Router } = require('express');
const router = Router();
const {uploadImagen, createBanner,editBanner,deleteBaneer, getBanner } = require('../controllers/AdminBanner.controller');
const auth = require('../middleware/auth');

router.route('/newBanner').post(uploadImagen,createBanner);

router.route('/:idBanner').put(uploadImagen,editBanner).delete(deleteBaneer);

router.route('/banner-company').get(getBanner);

module.exports = router;