const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true,
        unique: true,
        maxLength: [100, 'Title may not exceed 100 characters']
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
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            thumb_id: {
                type: String,
                required: true
            },
            thumbUrl: {
                type: String,
                required: true
            }
        }
    ],   
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
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

const Page = mongoose.model('Page', pageSchema)
module.exports = Page