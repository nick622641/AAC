const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true,
        unique: true,
        maxLength: [100, 'Title may not exceed 100 characters']
    },  
    author: {
        type: String,
        required: [true, 'Please enter an author']
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },  
    description: {
        type: String,
        required: [true, 'Please enter a description']       
    }, 
    video: {
        type: String,
        required: [true, 'Please enter a video URL']       
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    visible: {
        type: Number,
        default: 0
    }
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course