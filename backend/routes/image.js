const express = require('express')

const router = express.Router()

const { newImage } = require('../controllers/imageController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/image/new').post(isAuthenticatedUser, authorizeRoles('admin'), newImage)

module.exports = router