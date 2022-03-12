const Page = require('../models/page')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Create new Page => /api/v1/admin/page/new
exports.newPage = catchAsyncErrors(async (req, res, next) => {

    const { title, description } = req.body
    
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

    for(let i = 0; i < images.length; i++) {
        const thumb = await cloudinary.v2.uploader.upload(images[i], {
            folder: "pages",            
            width: 240,
            crop: "scale" 
        })
        const image = await cloudinary.v2.uploader.upload(images[i], {
            folder: "pages",                    
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
    
    const page = await Page.create(req.body)

    res.status(201).json({
        success: true,
        page
    })
})

// Update Page => /api/v1/admin/page/:id
exports.updatePage = catchAsyncErrors(async (req, res, next) => {    

    try {    
        let page = await Page.findById(req.params.id)  

        const { title, description } = req.body

        let images = []       
         
        if (typeof req.body.images === 'string') { // if a new image has been added                   
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if(!title)       { return next(new ErrorHandler('Please enter a title',            400)) }
        if(!description) { return next(new ErrorHandler('Please provide a description',    400)) }    

        if (images !== undefined) {       
              
            let imagesLinks = page.images

            for (let i = 0; i < images.length; i++) {
                const thumb = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "pages",            
                    width: 240,
                    crop: "scale" 
                })
                const image = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "pages",                    
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
        page = await Page.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            page
        })  
    } catch(error) {
        return next(new ErrorHandler('Page not found', 404))        
    }
})

// Get all Pages => /api/v1/pages
exports.getPages = async (req, res, next) => {

    const pages = await Page.find({ visible: {$ne: 0}}).sort({ createdAt: -1 })

    let pageCount = pages.length

    res.status(200).json({
        success: true,    
        pageCount,   
        pages
    })      
}

// Get all Pages (Admin) => /api/v1/admin/pages
exports.getAdminPages = async (req, res, next) => {   
    const pages = await Page.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        pages
    })      
}

// Get single page details => /api/v1/page/:slug
exports.getSinglePage = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const page = await Page.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            page
        })
    } catch(error) {
        return next(new ErrorHandler('Page not found', 404))    
    }
})

// Get single page details (Admin) => /api/v1/admin/page/:id
exports.getAdminPage = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const page = await Page.findById(req.params.id)
        res.status(200).json({
            success: true,
            page
        })
    } catch(error) {
        return next(new ErrorHandler('Page not found', 404))    
    }
})

// Delete Page => /api/v1/admin/page/:id
exports.deletePage = catchAsyncErrors(async (req, res, next) => {
    try { 
        const page = await Page.findById(req.params.id)   
        // Deleting images
        for(let i = 0; i < page.images.length; i++) {
            await cloudinary.v2.uploader.destroy(page.images[i].public_id)
            await cloudinary.v2.uploader.destroy(page.images[i].thumb_id)
        }        
        await page.remove() 
        res.status(200).json({
            success: true,
            message: 'Page was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Page not found', 404)) 
    }
})

// Delete Page Image => /api/v1/pageImage
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {

    try { 
        const page = await Page.findById(req.query.id)
        const images  = page.images.filter(image => image._id.toString() !== req.query.imgId.toString())

        await cloudinary.v2.uploader.destroy(page.images[req.query.imgIndex].public_id)
        await cloudinary.v2.uploader.destroy(page.images[req.query.imgIndex].thumb_id)               
        
        await Page.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Page not found', 404)) 
    }
})

// Update Page Images => /api/v1/pageImage]
exports.updateImages = catchAsyncErrors(async (req, res, next) => {

    try { 
        const page = await Page.findById(req.query.id)
        const init = req.query.initPos
        const img = page.images[init]
        const final = req.query.finPos
        
        let images  = page.images.filter( image => page.images[init] !== image )  
        
        images.splice(final, 0, img)
        
        await Page.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Page not found', 404)) 
    }
})