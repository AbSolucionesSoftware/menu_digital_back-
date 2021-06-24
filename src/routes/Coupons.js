const { Router } = require('express');
const router = Router();
const { 
    createCoupon, 
    deleteCoupon, 
    editCoupon, 
    getCoupons, 
    activeCoupon,
    createCouponEspecial,
    editCouponEspecial,
    getCouponEspecial,
    deleteCouponEspecial
 } = require('../controllers/Coupon.controller');
const auth = require('../middleware/auth');


router.route("/actionCoupons/:idCompany")
    .get(getCoupons)
    .post(auth, createCoupon);

router.route("/action/coupon/:idCoupon")
    .put(auth, editCoupon)
    .delete(auth, deleteCoupon);
    
router.route("/actionActive/coupon/:idCoupon").put(auth, activeCoupon);



//RUTAS DE CUPONES ESPECIALES
router.route("/action/newCouponLimited/:idCompany")
    .post(createCouponEspecial) // YA QUEDO EN EL FRENTE
    
router.route("/action/CouponEspecial/company/:idCompany/coupon/:idCoupon")
    .delete(deleteCouponEspecial) //YA JALO EN EL FRENTE
    .put(editCouponEspecial);


router.route("/action/verificarCupon/product/:idProducto/coupon/:nameCoupon").post(getCouponEspecial);

module.exports = router;

