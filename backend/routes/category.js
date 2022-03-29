const express = require('express')

const router = express.Router()

const { 
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
} = require('../controllers/categoryController')

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

module.exports = router