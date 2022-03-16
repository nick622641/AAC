const express = require('express')

const router = express.Router()

const { 
    getStaff, 
    getAdminStaff,
    getAdminStaffDetails,
    getSingleStaff,
    newStaff, 
    updateStaff, 
    deleteStaff,
    deleteImage,
    updateImages    
} = require('../controllers/staffController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/staff').get(getStaff)
router.route('/staff/:slug').get(getSingleStaff)
router.route('/admin/staff').get(getAdminStaff)

router.route('/admin/staff/new').post(isAuthenticatedUser, authorizeRoles('admin'), newStaff)
router.route('/admin/staff/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminStaffDetails)
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateStaff)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteStaff)

router.route('/staffImage')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateImages)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteImage)

module.exports = router