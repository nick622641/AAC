const Product = require('../models/product')
const Medium = require('../models/medium')
const Orientation = require('../models/orientation')
const Artist = require('../models/artist')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Get all Artists => /api/v1/admin/artists
exports.getArtists = catchAsyncErrors(async (req, res, next) => {
    const artists = await Artist.find().sort({ name: 1 })
    res.status(200).json({
        success: true,
        artists
    })
})
// Get single artist => /api/v1/artist/:id
exports.getArtist = catchAsyncErrors(async (req, res, next) => {    
    try {
        const artist = await Artist.findById(req.params.id)
        res.status(200).json({
            success: true,
            artist
        })
    } catch (error) {
        return next (new ErrorHandler('Artist not found', 404) )  
    }
})
// Create new Artist => /api/v1/admin/artist/new
exports.newArtist = catchAsyncErrors(async (req, res, next) => {    
    const artist = await Artist.create(req.body)
    res.status(201).json({
        success: true,
        artist
    })
})
// Update Artist => /api/v1/admin/artist/:id
exports.updateArtist = catchAsyncErrors(async (req, res, next) => {
    try {    
            let artist = await Artist.findById(req.params.id)  
            artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            artist
        })  
    } catch(error) {
        return next (new ErrorHandler('Artist not found', 404) )        
    }
})
// Delete Artist => /api/v1/admin/artist/:id
exports.deleteArtist = catchAsyncErrors(async (req, res, next) => {
    try {  
        const artist = await Artist.findById(req.params.id)             
        await artist.remove()  
        res.status(200).json({
            success: true,
            message: 'Artist was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Artist not found', 404)) 
    }
})

// Get all Orientation types => /api/v1/admin/orientations
exports.getOrientations = catchAsyncErrors(async (req, res, next) => {
    const orientations = await Orientation.find().sort({ name: 1 })
    res.status(200).json({
        success: true,
        orientations
    })
})
// Get single Orientation => /api/v1/orientation/:id
exports.getOrientation = catchAsyncErrors(async (req, res, next) => {    
    try {
        const orientation = await Orientation.findById(req.params.id)
        res.status(200).json({
            success: true,
            orientation
        })
    } catch (error) {
        return next (new ErrorHandler('Orientation not found not found', 404) )  
    }
})
// Create new Orientation => /api/v1/admin/orientation/new
exports.newOrientation = catchAsyncErrors(async (req, res, next) => {    
    const orientation = await Orientation.create(req.body)
    res.status(201).json({
        success: true,
        orientation
    })
})
// Update Orientation => /api/v1/admin/orientation/:id
exports.updateOrientation = catchAsyncErrors(async (req, res, next) => {
    try {    
            let orientation = await Orientation.findById(req.params.id)  
            orientation = await Orientation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            orientation
        })  
    } catch(error) {
        return next(new ErrorHandler('Orientation not found', 404))        
    }
})
// Delete Orientation => /api/v1/admin/orientation/:id
exports.deleteOrientation = catchAsyncErrors(async (req, res, next) => {
    try {  
        const orientation = await Orientation.findById(req.params.id)             
        await orientation.remove()  
        res.status(200).json({
            success: true,
            message: 'Orientation was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Orientation not found', 404)) 
    }
})

// Get all Media types => /api/v1/admin/mediums
exports.getMedia = catchAsyncErrors(async (req, res, next) => {
    const media = await Medium.find().sort({ name: 1 })
    res.status(200).json({
        success: true,
        media
    })
})
// Get single Media => /api/v1/medium/:id
exports.getMedium = catchAsyncErrors(async (req, res, next) => {    
    try {
        const medium = await Medium.findById(req.params.id)
        res.status(200).json({
            success: true,
            medium
        })
    } catch (error) {
        return next (new ErrorHandler('Media not found', 404) )  
    }
})
// Create new Media => /api/v1/admin/medium/new
exports.newMedium = catchAsyncErrors(async (req, res, next) => {    
    const medium = await Medium.create(req.body)
    res.status(201).json({
        success: true,
        medium
    })
})

// Update Media => /api/v1/admin/medium/:id
exports.updateMedium = catchAsyncErrors(async (req, res, next) => {
    try {    
        let medium = await Medium.findById(req.params.id)  
        medium = await Medium.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            medium
        })  
    } catch(error) {
        return next(new ErrorHandler('Medium not found', 404))        
    }
})
// Delete Medium => /api/v1/admin/medium/:id
exports.deleteMedium = catchAsyncErrors(async (req, res, next) => {
    try {  
        const medium = await Medium.findById(req.params.id)             
        await medium.remove()  
        res.status(200).json({
            success: true,
            message: 'Medium was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Medium not found', 404)) 
    }
})

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const { name, stock, price, width, height, datePublished, artist, orientation, media, description } = req.body
    
    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = []

    if(!name)  { return next(new ErrorHandler('Please enter a title',    400)) }
    if(!images) { return next(new ErrorHandler('Please add an image(s)', 400)) }
    if(price === '0') { return next(new ErrorHandler('Price must be over 0', 400)) }
    if(!datePublished) { return next(new ErrorHandler('Please enter a date', 400)) }
    if(width === '0') { return next(new ErrorHandler('Width must be over 0', 400)) }
    if(height === '0') { return next(new ErrorHandler('Height must be over 0', 400)) }    
    if(!artist)  { return next(new ErrorHandler('Please select an artist', 400)) }
    if(!orientation)  { return next(new ErrorHandler('Please select a orientation', 400)) }
    if(!media)  { return next(new ErrorHandler('Please select a media type', 400)) }    
    if(!description)  { return next(new ErrorHandler('Please provide a description', 400)) }    

    for(let i = 0; i < images.length; i++) {
        const thumb = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",            
            width: 240,
            crop: "scale" 
        })
        const image = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",                    
            height: 1080,
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
    
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

// Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {    

    try {    
        let product = await Product.findById(req.params.id)  

        const { name, stock, price, width, height, datePublished, artist, orientation, media, description } = req.body

        let images = []        
        if (typeof req.body.images === 'string') {   // if a new image has been added          
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if(!name)  { return next(new ErrorHandler('Please enter a title',    400)) }
        if(price === '0') { return next(new ErrorHandler('Price must be over 0', 400)) }
        if(!datePublished) { return next(new ErrorHandler('Please enter a date', 400)) }
        if(width === '0') { return next(new ErrorHandler('Width must be over 0', 400)) }
        if(height === '0') { return next(new ErrorHandler('Height must be over 0', 400)) }    
        if(!artist)  { return next(new ErrorHandler('Please select an artist', 400)) }
        if(!orientation)  { return next(new ErrorHandler('Please select a orientation', 400)) }
        if(!media)  { return next(new ErrorHandler('Please select a media type', 400)) }    
        if(!description)  { return next(new ErrorHandler('Please provide a description', 400)) }

        if (images !== undefined) {         
            let imagesLinks = product.images
            for (let i = 0; i < images.length; i++) {
                const thumb = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",            
                    width: 240,
                    crop: "scale" 
                })
                const image = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",                    
                    height: 1080,
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
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            product
        })  
    } catch(error) {

        return next(new ErrorHandler('Product not found', 404))        
    }
})

// Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {       

    const resPerPage = 12
    
    const productsCount = await Product.countDocuments()
    const apiFeatures = new APIFeatures(Product.find().sort({ createdAt: -1 }), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query
    let filteredProductsCount = products.length

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query.clone()
   
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,        
        products  
    })  
    
})

// Get products related to a particular artist => /api/v1/products/related
exports.getRelatedProducts = async (req, res, next) => {   

    const apiFeatures = new APIFeatures(
        Product
            .find()
            .sort({ numOfReviews: -1 })
            .limit(3), req.query
    )
        .filter()

    const relatedProducts = await apiFeatures.query

    res.status(200).json({
        success: true,       
        relatedProducts
    })    

}

// Get all products (Admin) => /api/v1/admin/products
exports.getAdminProducts = async (req, res, next) => {   
    const products = await Product.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        products
    })      
}

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const product = await Product.findById(req.params.id)  
        res.status(200).json({
            success: true,
            product
        })
    } catch(error) {
        return next(new ErrorHandler('Product not found', 404))    
    }
})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try { 
        const product = await Product.findById(req.params.id)   
        // Deleting images
        for(let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            await cloudinary.v2.uploader.destroy(product.images[i].thumb_id)
        }        
        await product.remove() 
        res.status(200).json({
            success: true,
            message: 'Product was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Product not found', 404)) 
    }
})

// Delete Image => /api/v1/image
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {

    try { 
        const product = await Product.findById(req.query.id)
        const images  = product.images.filter(image => image._id.toString() !== req.query.imgId.toString())

        await cloudinary.v2.uploader.destroy(product.images[req.query.imgIndex].public_id)
        await cloudinary.v2.uploader.destroy(product.images[req.query.imgIndex].thumb_id)               
        
        await Product.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Product not found', 404)) 
    }
})

// Update images => /api/v1/image
exports.updateImages = catchAsyncErrors(async (req, res, next) => {

    try { 
        const product = await Product.findById(req.query.id)
        const init = req.query.initPos
        const img = product.images[init]
        const final = req.query.finPos
        
        let images  = product.images.filter( image => product.images[init] !== image )  
        
        images.splice(final, 0, img)
        
        await Product.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Product not found', 404)) 
    }
})

// Create New Review => /api/v1/review
exports.createProductReview = catchAsyncErrors( async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating           
            }
        })      
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})

// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})

// Delete Product Review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})