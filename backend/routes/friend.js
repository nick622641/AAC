const express = require('express')

const router = express.Router()

const { 
    getFriends, 
    getAdminFriends,
    getAdminFriendDetails,
    getSingleFriend,
    newFriend, 
    updateFriend, 
    deleteFriend
} = require('../controllers/friendController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/friends').get(getFriends)
router.route('/friend/:slug').get(getSingleFriend)
router.route('/admin/friends').get(getAdminFriends)

router.route('/admin/friend/new').post(isAuthenticatedUser, authorizeRoles('admin'), newFriend)
router.route('/admin/friend/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminFriendDetails)
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateFriend)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteFriend)

module.exports = router