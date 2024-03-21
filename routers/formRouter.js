const express = require('express');
const router = express.Router();

const formController = require('../controllers/formController')

router.post('/forms', formController.createForm);
router.get('/forms', formController.getAllForms);
router.get('/forms/:id', formController.getFormById);
router.post('/forms/:id/submit', formController.submitForm)
router.get('/listSubmittedForms', formController.listSubmittedForms);

module.exports = router