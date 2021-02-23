const { Router } = require('express');
const router = Router();
const { createCompany, inicioSesion } = require('../controllers/Company.controller');

router.route('/').post(createCompany);

router.route('/logIn').post(inicioSesion);

module.exports = router;