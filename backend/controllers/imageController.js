const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Upload Image from Richtext => /api/v1/admin/image/new
exports.newImage = catchAsyncErrors(async (req, res, next) => {  

    const image = req.body.image    

    const _image = await cloudinary.v2.uploader.upload(image, {
        folder: "richtext",            
        width: 240,
        crop: "scale" 
    })  
    
    const url = _image.secure_url  
    
    res.status(201).json({
        success: true,
        url              
    })
})