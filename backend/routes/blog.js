const express = require('express')

const router = express.Router()

const { 
    getBlogs, 
    getAdminBlogs,
    getSingleBlog,
    newBlog, 
    updateBlog, 
    deleteBlog,
    deleteImage,
    updateImages,
    createBlogComment,
    getBlogComments,
    deleteComment   
} = require('../controllers/blogController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/blogs').get(getBlogs)
router.route('/admin/blogs').get(getAdminBlogs)
router.route('/blog/:id').get(getSingleBlog)

router.route('/admin/blog/new').post(isAuthenticatedUser, authorizeRoles('admin'), newBlog)
router.route('/admin/blog/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateBlog)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog)

router.route('/blogImage')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateImages)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteImage)

router.route('/comment' ).put(isAuthenticatedUser, createBlogComment)
router.route('/comments').get(isAuthenticatedUser, getBlogComments)
router.route('/comments').delete(isAuthenticatedUser, deleteComment)

module.exports = router