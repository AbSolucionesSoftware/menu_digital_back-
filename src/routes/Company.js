const { Router } = require('express');
const router = Router();
const { createCompany, inicioSesion, createCompanyAdmin, getCompanys, getCompany, editCompany , resetPassCompany } = require('../controllers/Company.controller');
const auth = require('../middleware/auth');

router.route('/').post(auth,createCompany).get(auth,getCompanys);

router.route('/admin').post(auth,createCompanyAdmin);

router.route('/logIn').post(inicioSesion);

router.route('/:idCompany').get(auth,getCompany).put(auth,editCompany);

router.route('/resetPass/:idCompany').put(auth,resetPassCompany);



module.exports = router;