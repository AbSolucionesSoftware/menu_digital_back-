const { Router } = require('express');
const router = Router();
const { createCoupon, deleteCoupon, editCoupon, getCoupons, activeCoupon } = require('../controllers/Coupon.controller');
const auth = require('../middleware/auth');


router.route("/actionCoupons/:idCompany")
    .get(getCoupons)
    .post(auth, createCoupon);

router.route("/action/coupon/:idCoupon")
    .put(auth, editCoupon)
    .delete(auth, deleteCoupon);
    
router.route("/actionActive/coupon/:idCoupon")
    .put(auth, activeCoupon)

module.exports = router;

