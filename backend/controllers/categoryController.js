const { Medium } = require('../models/categories')
const { Orientation } = require('../models/categories')
const { Artist } = require('../models/categories')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

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
