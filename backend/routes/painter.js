const express = require('express')

const router = express.Router()

const { 
    getPainters, 
    getAdminPainters,
    getAdminPainter,
    getSinglePainter,
    newPainter, 
    updatePainter, 
    deletePainter,
    deleteImage,
    updateImages    
} = require('../controllers/painterController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/painters').get(getPainters)
router.route('/painter/:slug').get(getSinglePainter)
router.route('/admin/painters').get(getAdminPainters)

router.route('/admin/painter/new').post(isAuthenticatedUser, authorizeRoles('admin'), newPainter)
router.route('/admin/painter/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminPainter)
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updatePainter)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deletePainter)

router.route('/painterImage')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateImages)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteImage)

module.exports = router