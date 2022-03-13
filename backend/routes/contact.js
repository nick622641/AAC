const express = require('express')

const router = express.Router()

const { contactEmail } = require('../controllers/contactController')

router.route('/contact').post(contactEmail)

module.exports = router