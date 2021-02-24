const { Router } = require('express');
const router = Router();
const { createCompany, inicioSesion, createCompanyAdmin, getCompanys, getCompany, editCompany } = require('../controllers/Company.controller');
const auth = require('../middleware/auth');

router.route('/').post(createCompany).get(getCompanys);

router.route('/admin').post(createCompanyAdmin);

router.route('/logIn').post(inicioSesion);

router.route('/:idCompany').post(getCompany).put(editCompany);



module.exports = router;