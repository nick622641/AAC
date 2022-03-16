const nodemailer = require('nodemailer')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmail = require('../utils/sendEmail')

// Send email from contact form => /api/v1/contact
exports.contactEmail = catchAsyncErrors( async (req, res, next) => {  

    try {
        await sendEmail({
            type: 'contact',
            name: req.body.name,
            email: req.body.email,
            subject: 'AAC Contact form',
            message: req.body.message
        })
        res.status(200).json({
            success: true            
        })        
    } catch (error) { 

        return next(new ErrorHandler(error.message, 500))
        
    }

})