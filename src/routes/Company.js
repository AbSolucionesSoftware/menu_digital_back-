const { Router } = require('express');
const router = Router();
const { createCompany } = require('../controllers/Company.controller');

router.route('/').post(createCompany);

module.exports = router;