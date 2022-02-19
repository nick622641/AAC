const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true,
        unique: true,
        maxLength: [100, 'Title may not exceed 100 characters']
    },    
    description: {
        type: String,
        required: [true, 'Please enter a description']       
    },
    tags: {
        type: String,
        required: true
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
    numOfComments: {
        type: Number,
        default: 0
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            },
            comment: {
                type: String,
                required: true
            },
            commentCreatedAt: {
                type: Date,
                default: Date.now
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

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog