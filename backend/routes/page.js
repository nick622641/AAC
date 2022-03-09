const express = require('express')

const router = express.Router()

const { 
    getPages, 
    getAdminPages,
    getAdminPage,
    getSinglePage,
    newPage, 
    updatePage, 
    deletePage,
    deleteImage,
    updateImages 
} = require('../controllers/pageController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/pages').get(getPages)
router.route('/page/:slug').get(getSinglePage)
router.route('/admin/pages').get(getAdminPages)

router.route('/admin/page/new').post(isAuthenticatedUser, authorizeRoles('admin'), newPage)
router.route('/admin/page/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminPage)
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updatePage)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deletePage)

router.route('/pageImage')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateImages)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteImage)

module.exports = router