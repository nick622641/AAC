const Course = require('../models/course')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Create new Course => /api/v1/admin/course/new
exports.newCourse = catchAsyncErrors(async (req, res, next) => {

    const { title, description, author, video } = req.body

    if(!title)       { return next(new ErrorHandler('Please enter a title',         400)) }
    if(!author)      { return next(new ErrorHandler('Please enter a author',        400)) }
    if(!video)       { return next(new ErrorHandler('Please enter a video URL',     400)) }
    if(!description) { return next(new ErrorHandler('Please provide a description', 400)) }    

    const course = await Course.create(req.body)

    res.status(201).json({
        success: true,
        course
    })
})

// Update Course => /api/v1/admin/course/:id
exports.updateCourse = catchAsyncErrors(async (req, res, next) => {    

    try {    
        let course = await Course.findById(req.params.id)  

        const { title, description, author, video } = req.body       

        if(!title)       { return next(new ErrorHandler('Please enter a title',         400)) }
        if(!author)      { return next(new ErrorHandler('Please enter a author',        400)) }
        if(!video)       { return next(new ErrorHandler('Please enter a video URL',     400)) }
        if(!description) { return next(new ErrorHandler('Please provide a description', 400)) }  
 
        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            course
        })  
    } catch(error) {
        return next(new ErrorHandler('Course not found', 404))        
    }
})

// Get all Courses => /api/v1/courses
exports.getCourses = async (req, res, next) => {

    const courses = await Course.find({ visible: {$ne: 0}}).sort({ createdAt: -1 })

    const resPerPage = 12

    let courseCount = courses.length

    res.status(200).json({
        success: true,    
        courseCount, 
        resPerPage,  
        courses
    })      
}

// Get all Courses (Admin) => /api/v1/admin/courses
exports.getAdminCourses = async (req, res, next) => {   
    const courses = await Course.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,       
        courses
    })      
}

// Get single course details => /api/v1/course/:slug
exports.getSingleCourse = catchAsyncErrors(async (req, res, next) => {   
    try {     
        const course = await Course.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            course
        })
    } catch(error) {
        return next(new ErrorHandler('Course not found', 404))    
    }
})

// Get single course details (Admin) => /api/v1/admin/course/:id
exports.getAdminCourse = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const course = await Course.findById(req.params.id)
        res.status(200).json({
            success: true,
            course
        })
    } catch(error) {
        return next(new ErrorHandler('Course not found', 404))    
    }
})

// Delete Course => /api/v1/admin/course/:id
exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
    try { 
        const course = await Course.findById(req.params.id)   
            
        await course.remove() 
        res.status(200).json({
            success: true,
            message: 'Course was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Course not found', 404)) 
    }
})