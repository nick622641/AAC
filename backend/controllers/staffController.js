const Staff = require('../models/staff')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Create new Staff => /api/v1/admin/staff/new
exports.newStaff = catchAsyncErrors(async (req, res, next) => {

    const { title, background, profession, interests, description, avatar } = req.body
    
    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = []

    if(!title)       { return next(new ErrorHandler('Please enter a name',           400)) }
    if(!avatar)      { return next(new ErrorHandler('Please add an avatar',          400)) }
    if(!description) { return next(new ErrorHandler('Please provide a description',  400)) }    
    if(!background)  { return next(new ErrorHandler('Please provide a background',   400)) }    
    if(!profession)  { return next(new ErrorHandler('Please provide a profession',   400)) }    
    if(!interests)   { return next(new ErrorHandler('Please provide some interests', 400)) }    

    if (images !== undefined) { 
        for(let i = 0; i < images.length; i++) {
            const thumb = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'staff',            
                height: 350,
                crop: 'scale' 
            })    
            imagesLinks.push({              
                public_id: thumb.public_id,
                thumbUrl: thumb.secure_url
            })
        }
    }
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'staff',
        height: 200,
        scale: 'scale'
    })   

    req.body.images = imagesLinks   
    req.body.avatar = {
        avatar_id: result.public_id,
        url: result.secure_url
    } 
    
    const staff = await Staff.create(req.body)

    res.status(201).json({
        success: true,
        staff
    })
})

// Update Staff => /api/v1/admin/staff/:id
exports.updateStaff = catchAsyncErrors(async (req, res, next) => {    

    try {    
        const newStaffData = {
            title: req.body.title,
            slug: req.body.slug,
            background: req.body.background,
            profession: req.body.profession,
            interests: req.body.interests,
            description: req.body.description,
        }
        let staff = await Staff.findById(req.params.id)   

        const { title, background, profession, interests, description } = req.body

        let images = []       
         
        if (typeof req.body.images === 'string') { // if a new image has been added                   
            images.push(req.body.images)
        } else {
            images = req.body.images
        }        

        if( !title      ) { return next(new ErrorHandler('Please enter a name',           400)) }
        if( !description) { return next(new ErrorHandler('Please provide a description',  400)) }    
        if( !background ) { return next(new ErrorHandler('Please provide a background',   400)) }    
        if( !profession ) { return next(new ErrorHandler('Please provide a profession',   400)) }    
        if( !interests  ) { return next(new ErrorHandler('Please provide some interests', 400)) }

        if (images !== undefined) {                        
            let imagesLinks = staff.images
            for (let i = 0; i < images.length; i++) {
                const thumb = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'staff',            
                    height: 350,
                    crop: 'scale' 
                })                
                imagesLinks.push({                 
                    public_id: thumb.public_id,
                    thumbUrl: thumb.secure_url
                })
            }
            newStaffData.images = imagesLinks
        }   
        // Update avatar         
        if(req.body.avatar !== '') {  
            const image_id = staff.avatar.avatar_id             
            await cloudinary.v2.uploader.destroy(image_id)
            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'staff',
                height: 200,
                crop: 'scale'
            })
            newStaffData.avatar = {
                avatar_id: result.public_id,
                url: result.secure_url
            }             
        } 
        await Staff.findByIdAndUpdate(req.params.id, newStaffData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true
        })  
    } catch(error) {
        return next(new ErrorHandler('Staff member not found', 404))        
    }
})

// Get all Staff => /api/v1/staff
exports.getStaff = async (req, res, next) => {   

    const resPerPage = 12    

    const staff = await Staff.find({ visible: {$ne: 0}}).sort({ createdAt: -1 })

    let staffCount = staff.length

    res.status(200).json({
        success: true,    
        resPerPage,
        staffCount,   
        staff
    })      
}

// Get all Staff (Admin) => /api/v1/admin/staff
exports.getAdminStaff = async (req, res, next) => {   
    const staff = await Staff.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        staff
    })      
}

// Get single staff details => /api/v1/staff/:slug
exports.getSingleStaff = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const staff = await Staff.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            staff
        })
    } catch(error) {
        return next(new ErrorHandler('Staff member not found', 404))    
    }
})

// Get single Staff details (Admin) => /api/v1/admin/staff/:id
exports.getAdminStaffDetails = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const staff = await Staff.findById(req.params.id)
        res.status(200).json({
            success: true,
            staff
        })
    } catch(error) {
        return next(new ErrorHandler('Staff member not found', 404))    
    }
})

// Delete Staff => /api/v1/admin/staff/:id
exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {
    try { 
        const staff = await Staff.findById(req.params.id)   
        // Deleting images
        for(let i = 0; i < staff.images.length; i++) {
            await cloudinary.v2.uploader.destroy(staff.images[i].public_id)
        }  
        // Remove avatar from Cloudinary         
        const id = staff.avatar.avatar_id
        await cloudinary.v2.uploader.destroy(id)        
        await staff.remove() 
        res.status(200).json({
            success: true,
            message: 'Staff member was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Staff member not found', 404)) 
    }
})

// Delete Staff Image => /api/v1/staffImage
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {

    try { 
        const staff = await Staff.findById(req.query.id)
        const images = staff.images.filter(image => image._id.toString() !== req.query.imgId.toString())

        await cloudinary.v2.uploader.destroy(staff.images[req.query.imgIndex].public_id)               
        
        await Staff.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Staff member not found', 404)) 
    }
})

// Update Staff Images => /api/v1/staffImage
exports.updateImages = catchAsyncErrors(async (req, res, next) => {

    try { 
        const staff = await Staff.findById(req.query.id)
        const init = req.query.initPos
        const img = staff.images[init]
        const final = req.query.finPos
        
        let images  = staff.images.filter( image => staff.images[init] !== image )  
        
        images.splice(final, 0, img)
        
        await Staff.findByIdAndUpdate(req.query.id, {
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
        return next(new ErrorHandler('Staff member not found', 404)) 
    }
})