const Painter = require('../models/painter')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Create new Painter => /api/v1/admin/painter/new
exports.newPainter = catchAsyncErrors(async (req, res, next) => {

    const { title, style, medium, inspiration, description } = req.body
    
    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = []

    if(!title)       { return next(new ErrorHandler('Please enter a name',            400)) }
    if(!images)      { return next(new ErrorHandler('Please add an image(s)',          400)) }
    if(!description) { return next(new ErrorHandler('Please provide a description',    400)) }    
    if(!style)       { return next(new ErrorHandler('Please provide at least one style', 400)) }    
    if(!inspiration) { return next(new ErrorHandler('Please provide at least one inspiration', 400)) }    
    if(!medium)      { return next(new ErrorHandler('Please provide at least one medium'     , 400)) }    

    for(let i = 0; i < images.length; i++) {
        const thumb = await cloudinary.v2.uploader.upload(images[i], {
            folder: "painters",            
            width: 240,
            crop: "scale" 
        })
        const image = await cloudinary.v2.uploader.upload(images[i], {
            folder: "painters",                    
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
    
    const painter = await Painter.create(req.body)

    res.status(201).json({
        success: true,
        painter
    })
})

// Update Painter => /api/v1/admin/painter/:id
exports.updatePainter = catchAsyncErrors(async (req, res, next) => {    

    try {    
        let painter = await Painter.findById(req.params.id)  

        const { title, style, medium, inspiration, description } = req.body

        let images = []       
         
        if (typeof req.body.images === 'string') { // if a new image has been added                   
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if(!title)       { return next(new ErrorHandler('Please enter a name',            400)) }
        if(!description) { return next(new ErrorHandler('Please provide a description',    400)) }    
        if(!style)       { return next(new ErrorHandler('Please provide at least one style', 400)) }    
        if(!inspiration) { return next(new ErrorHandler('Please provide at least one inspiration', 400)) }    
        if(!medium)      { return next(new ErrorHandler('Please provide at least one medium'     , 400)) }

        if (images !== undefined) {       
              
            let imagesLinks = painter.images

            for (let i = 0; i < images.length; i++) {
                const thumb = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "painters",            
                    width: 240,
                    crop: "scale" 
                })
                const image = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "painters",                    
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
        painter = await Painter.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            painter
        })  
    } catch(error) {
        return next(new ErrorHandler('Artist not found', 404))        
    }
})

// Get all Painters => /api/v1/painters
exports.getPainters = async (req, res, next) => {   

    const resPerPage = 12    

    const painters = await Painter.find({ visible: {$ne: 0}}).sort({ createdAt: -1 })

    let paintersCount = painters.length

    res.status(200).json({
        success: true,    
        resPerPage,
        paintersCount,   
        painters
    })      
}

// Get all Painters (Admin) => /api/v1/admin/painters
exports.getAdminPainters = async (req, res, next) => {   
    const painters = await Painter.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        painters
    })      
}

// Get single painter details => /api/v1/painter/:slug
exports.getSinglePainter = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const painter = await Painter.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            painter
        })
    } catch(error) {
        return next(new ErrorHandler('Artist not found', 404))    
    }
})

// Get single painter details (Admin) => /api/v1/admin/painter/:id
exports.getAdminPainter = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const painter = await Painter.findById(req.params.id)
        res.status(200).json({
            success: true,
            painter
        })
    } catch(error) {
        return next(new ErrorHandler('Artist not found', 404))    
    }
})

// Delete Painter => /api/v1/admin/painter/:id
exports.deletePainter = catchAsyncErrors(async (req, res, next) => {
    try { 
        const painter = await Painter.findById(req.params.id)   
        // Deleting images
        for(let i = 0; i < painter.images.length; i++) {
            await cloudinary.v2.uploader.destroy(painter.images[i].public_id)
            await cloudinary.v2.uploader.destroy(painter.images[i].thumb_id)
        }        
        await painter.remove() 
        res.status(200).json({
            success: true,
            message: 'Artist was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Artist not found', 404)) 
    }
})

// Delete Painter Image => /api/v1/painterImage
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {

    try { 
        const painter = await Painter.findById(req.query.id)
        const images  = painter.images.filter(image => image._id.toString() !== req.query.imgId.toString())

        await cloudinary.v2.uploader.destroy(painter.images[req.query.imgIndex].public_id)
        await cloudinary.v2.uploader.destroy(painter.images[req.query.imgIndex].thumb_id)               
        
        await Painter.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Artist not found', 404)) 
    }
})

// Update Painter Images => /api/v1/painterImage
exports.updateImages = catchAsyncErrors(async (req, res, next) => {

    try { 
        const painter = await Painter.findById(req.query.id)
        const init = req.query.initPos
        const img = painter.images[init]
        const final = req.query.finPos
        
        let images  = painter.images.filter( image => painter.images[init] !== image )  
        
        images.splice(final, 0, img)
        
        await Painter.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Artist not found', 404)) 
    }
})