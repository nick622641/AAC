const express = require('express')

const router = express.Router()

const { 
    getProducts, 
    getCalloutProducts,
    getRandomProduct,
    getRandomProducts,
    getRandomProductsDetails,
    getLatestProduct,
    getAdminProducts,
    newProduct, 
    newProductUser,
    getSingleProduct, 
    getAdminProduct,
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    deleteImage,
    updateImages
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts)
router.route('/products/callout').get(getCalloutProducts)
router.route('/new').post(isAuthenticatedUser, newProductUser)
router.route('/products/random/:quantity').get(getRandomProducts)
router.route('/product/random/:quantity').get(getRandomProduct)
router.route('/products/random/details/:quantity').get(getRandomProductsDetails)
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
router.route('/product/:slug').get(getSingleProduct)
router.route('/latest').get(getLatestProduct)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/admin/product/:id')
    .get   (isAuthenticatedUser, authorizeRoles('admin'), getAdminProduct)
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/review' ).put   (isAuthenticatedUser, createProductReview)
router.route('/reviews').get   (isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

router.route('/image')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateImages)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteImage)

module.exports = router