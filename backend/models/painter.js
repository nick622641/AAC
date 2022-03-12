const mongoose = require('mongoose')

const painterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
        unique: true,
        maxLength: [100, 'Name may not exceed 100 characters']
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
    style: {
        type: String,
        required: [true, 'Please enter a style']
    },
    medium: {
        type: String,
        required: [true, 'Please enter a medium']
    },
    inspiration: {
        type: String,
        required: [true, 'Please enter an inspiration']
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

const Painter = mongoose.model('Painter', painterSchema)
module.exports = Painter