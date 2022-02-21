const Blog = require('../models/blog')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Create new Blog => /api/v1/admin/blog/new
exports.newBlog = catchAsyncErrors(async (req, res, next) => {

    const { title, tags, description } = req.body
    
    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = []

    if(!title)       { return next(new ErrorHandler('Please enter a title',            400)) }
    if(!images)      { return next(new ErrorHandler('Please add an image(s)',          400)) }
    if(!description) { return next(new ErrorHandler('Please provide a description',    400)) }    
    if(!tags)        { return next(new ErrorHandler('Please provide at least one tag', 400)) }    

    for(let i = 0; i < images.length; i++) {
        const thumb = await cloudinary.v2.uploader.upload(images[i], {
            folder: "blogs",            
            width: 240,
            crop: "scale" 
        })
        const image = await cloudinary.v2.uploader.upload(images[i], {
            folder: "blogs",                    
            width: 1080,
            crop: "scale" 
        })
        imagesLinks.push({
            public_id: image.public_id,
            url: image.secure_url,
            thumb_id: thumb.public_id,
            thumbUrl: thumb.secure_url
        })
    }

    req.body.images = imagesLinks    
    req.body.user = req.user.id
    
    const blog = await Blog.create(req.body)

    res.status(201).json({
        success: true,
        blog
    })
})

// Update Blog => /api/v1/admin/blog/:id
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {    

    try {    
        let blog = await Blog.findById(req.params.id)  

        const { title, tags, description } = req.body

        let images = []       
         
        if (typeof req.body.images === 'string') { // if a new image has been added                   
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if(!title)       { return next(new ErrorHandler('Please enter a title',            400)) }
        if(!description) { return next(new ErrorHandler('Please provide a description',    400)) }    
        if(!tags)        { return next(new ErrorHandler('Please provide at least one tag', 400)) }    

        if (images !== undefined) {       
              
            let imagesLinks = blog.images

            for (let i = 0; i < images.length; i++) {
                const thumb = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "blogs",            
                    width: 240,
                    crop: "scale" 
                })
                const image = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "blogs",                    
                    width: 1000,
                    crop: "scale" 
                })
                imagesLinks.push({
                    public_id: image.public_id,
                    url: image.secure_url,
                    thumb_id: thumb.public_id,
                    thumbUrl: thumb.secure_url
                })
            }
            req.body.images = imagesLinks
        }
        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            blog
        })  
    } catch(error) {
        return next(new ErrorHandler('Blog not found', 404))        
    }
})

// Get all Blogs => /api/v1/blogs
exports.getBlogs = async (req, res, next) => {   

    const resPerPage = 12    

    const blogs = await Blog.find({ visible: {$ne: 0}}).sort({ createdAt: -1 })

    let blogsCount = blogs.length

    res.status(200).json({
        success: true,    
        resPerPage,
        blogsCount,   
        blogs
    })      
}

// Get all Blogs (Admin) => /api/v1/admin/blogs
exports.getAdminBlogs = async (req, res, next) => {   
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        blogs
    })      
}

// Get single blog details => /api/v1/blog/:slug
exports.getSingleBlog = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const blog = await Blog.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            blog
        })
    } catch(error) {
        return next(new ErrorHandler('Blog not found', 404))    
    }
})

// Get single blog details (Admin) => /api/v1/admin/blog/:id
exports.getAdminBlog = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const blog = await Blog.findById(req.params.id)
        res.status(200).json({
            success: true,
            blog
        })
    } catch(error) {
        return next(new ErrorHandler('Blog not found', 404))    
    }
})

// Delete Blog => /api/v1/admin/blog/:id
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
    try { 
        const blog = await Blog.findById(req.params.id)   
        // Deleting images
        for(let i = 0; i < blog.images.length; i++) {
            await cloudinary.v2.uploader.destroy(blog.images[i].public_id)
            await cloudinary.v2.uploader.destroy(blog.images[i].thumb_id)
        }        
        await blog.remove() 
        res.status(200).json({
            success: true,
            message: 'Blog was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Blog not found', 404)) 
    }
})

// Delete Blog Image => /api/v1/blogImage
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {

    try { 
        const blog = await Blog.findById(req.query.id)
        const images  = blog.images.filter(image => image._id.toString() !== req.query.imgId.toString())

        await cloudinary.v2.uploader.destroy(blog.images[req.query.imgIndex].public_id)
        await cloudinary.v2.uploader.destroy(blog.images[req.query.imgIndex].thumb_id)               
        
        await Blog.findByIdAndUpdate(req.query.id, {
            images
            
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        return next(new ErrorHandler('Blog not found', 404)) 
    }
})

// Update Blog Images => /api/v1/blogImage
exports.updateImages = catchAsyncErrors(async (req, res, next) => {

    try { 
        const blog = await Blog.findById(req.query.id)
        const init = req.query.initPos
        const img = blog.images[init]
        const final = req.query.finPos
        
        let images  = blog.images.filter( image => blog.images[init] !== image )  
        
        images.splice(final, 0, img)
        
        await Blog.findByIdAndUpdate(req.query.id, {
            images
            
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true            
        })
    } catch (error) {
        return next(new ErrorHandler('Blog not found', 404)) 
    }
})

// Create New Comment => /api/v1/comment
exports.createBlogComment = catchAsyncErrors( async (req, res, next) => {

    const { comment, blogId } = req.body

    if(!comment) { return next(new ErrorHandler('Please enter a comment', 400)) }

    const userComment = {
        user: req.user._id,
        name: req.user.name,
        avatar: {
            public_id: req.user.avatar.public_id,
            url: req.user.avatar.url
        },
        commentCreatedAt: Date.now(),
        comment
    }

    const blog = await Blog.findById(blogId)

    const isCommented = blog.comments.find(
        comment => comment.user.toString() === req.user._id.toString()
    )

    if(isCommented) {
        blog.comments.forEach(c => {
            if(c.user.toString() === req.user._id.toString()) {
                c.comment = comment
            }
        })      
    } else {
        blog.comments.push(userComment)
        blog.numOfComments = blog.comments.length
    }

    await blog.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})

// Get Blog Comments => /api/v1/comments
exports.getBlogComments = catchAsyncErrors( async (req, res, next) => {

    const blog = await Blog.findById(req.query.id)

    res.status(200).json({
        success: true,
        comments: blog.comments
    })

})

// Delete Blog Comment => /api/v1/comments
exports.deleteComment = catchAsyncErrors( async (req, res, next) => {

    const blog = await Blog.findById(req.query.blogId)

    const comments = blog.comments.filter(comment => comment._id.toString() !== req.query.id.toString())

    const numOfComments = comments.length

    await Blog.findByIdAndUpdate(req.query.blogId, {
        comments,
        numOfComments
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})