const express = require('express')

const router = express.Router()

const { 
    getCourses, 
    getAdminCourses,
    getAdminCourse,
    getSingleCourse,
    newCourse, 
    updateCourse, 
    deleteCourse    
} = require('../controllers/courseController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/courses').get(isAuthenticatedUser, getCourses)
router.route('/course/:slug').get(isAuthenticatedUser, getSingleCourse)
router.route('/admin/courses').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminCourses)

router.route('/admin/course/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCourse)
router.route('/admin/course/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminCourse)
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateCourse)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCourse)

module.exports = router