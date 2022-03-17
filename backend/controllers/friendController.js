const Friend = require('../models/friend')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Create new Friend => /api/v1/admin/friend/new
exports.newFriend = catchAsyncErrors(async (req, res, next) => {

    const { title, background, profession, interests, description, avatar } = req.body  

    if(!title)       { return next(new ErrorHandler('Please enter a name',           400)) }
    if(!avatar)      { return next(new ErrorHandler('Please add an avatar',          400)) }
    if(!description) { return next(new ErrorHandler('Please provide a description',  400)) }    
    if(!background)  { return next(new ErrorHandler('Please provide a background',   400)) }    
    if(!profession)  { return next(new ErrorHandler('Please provide a profession',   400)) }    
    if(!interests)   { return next(new ErrorHandler('Please provide some interests', 400)) } 
    
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'friends',
        height: 200,
        scale: 'scale'
    })   
    req.body.avatar = {
        avatar_id: result.public_id,
        url: result.secure_url
    }     
    const friend = await Friend.create(req.body)

    res.status(201).json({
        success: true,
        friend
    })
})

// Update Friend => /api/v1/admin/friend/:id
exports.updateFriend = catchAsyncErrors(async (req, res, next) => {    

    try {    
        const newFriendData = {
            title: req.body.title,
            slug: req.body.slug,
            background: req.body.background,
            profession: req.body.profession,
            interests: req.body.interests,
            description: req.body.description,
        }
        let friend = await Friend.findById(req.params.id)   

        const { title, background, profession, interests, description } = req.body 

        if( !title      ) { return next(new ErrorHandler('Please enter a name',           400)) }
        if( !description) { return next(new ErrorHandler('Please provide a description',  400)) }    
        if( !background ) { return next(new ErrorHandler('Please provide a background',   400)) }    
        if( !profession ) { return next(new ErrorHandler('Please provide a profession',   400)) }    
        if( !interests  ) { return next(new ErrorHandler('Please provide some interests', 400)) }
        
        // Update avatar         
        if(req.body.avatar !== '') {  
            const image_id = friend.avatar.avatar_id             
            await cloudinary.v2.uploader.destroy(image_id)
            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'friends',
                height: 200,
                crop: 'scale'
            })
            newFriendData.avatar = {
                avatar_id: result.public_id,
                url: result.secure_url
            }             
        } 
        await Friend.findByIdAndUpdate(req.params.id, newFriendData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true
        })  
    } catch(error) {
        return next(new ErrorHandler('Friend not found', 404))        
    }
})

// Get all Friends => /api/v1/friends
exports.getFriends = async (req, res, next) => {   

    const resPerPage = 12    

    const friends = await Friend.find({ visible: {$ne: 0}}).sort({ createdAt: -1 })

    let friendCount = friends.length

    res.status(200).json({
        success: true,    
        resPerPage,
        friendCount,   
        friends
    })      
}

// Get all Friends (Admin) => /api/v1/admin/friend
exports.getAdminFriends = async (req, res, next) => {   
    const friends = await Friend.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        friends
    })      
}

// Get single Friend details => /api/v1/friend/:slug
exports.getSingleFriend = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const friend = await Friend.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            friend
        })
    } catch(error) {
        return next(new ErrorHandler('Friend not found', 404))    
    }
})

// Get single Friend details (Admin) => /api/v1/admin/friend/:id
exports.getAdminFriendDetails = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const friend = await Friend.findById(req.params.id)
        res.status(200).json({
            success: true,
            friend
        })
    } catch(error) {
        return next(new ErrorHandler('Friend not found', 404))    
    }
})

// Delete Friend => /api/v1/admin/friend/:id
exports.deleteFriend = catchAsyncErrors(async (req, res, next) => {
    try { 
        const friend = await Friend.findById(req.params.id)           
        // Remove avatar from Cloudinary         
        const id = friend.avatar.avatar_id
        await cloudinary.v2.uploader.destroy(id)        
        await Friend.remove() 
        res.status(200).json({
            success: true,
            message: 'Friend was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Friend not found', 404)) 
    }
})