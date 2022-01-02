const express = require('express')

const router = express.Router()

const { 
    getProducts, 
    getAdminProducts,
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    getMedia,
    getMedium,
    newMedium,
    updateMedium,
    deleteMedium,
    getOrientations,
    getOrientation,
    newOrientation,
    updateOrientation,
    deleteOrientation,
    getArtists,
    getArtist,
    newArtist,
    updateArtist,
    deleteArtist
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/mediums').get(getMedia)
router.route('/medium/:id').get(getMedium)
router.route('/admin/medium/new').post(isAuthenticatedUser, authorizeRoles('admin'), newMedium)
router.route('/admin/medium/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateMedium)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteMedium)

router.route('/admin/orientations').get(getOrientations)
router.route('/orientation/:id').get(getOrientation)
router.route('/admin/orientation/new').post(isAuthenticatedUser, authorizeRoles('admin'), newOrientation)
router.route('/admin/orientation/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateOrientation)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrientation)

router.route('/admin/artists').get(getArtists)
router.route('/artist/:id').get(getArtist)
router.route('/admin/artist/new').post(isAuthenticatedUser, authorizeRoles('admin'), newArtist)
router.route('/admin/artist/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateArtist)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteArtist)

router.route('/products').get(getProducts)
router.route('/admin/products').get(getAdminProducts)
router.route('/product/:id').get(getSingleProduct)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/admin/product/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/review' ).put   (isAuthenticatedUser, createProductReview)
router.route('/reviews').get   (isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router