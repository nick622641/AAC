const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
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
    background: {
        type: String,
        required: [true, 'Please enter a background']
    },
    profession: {
        type: String,
        required: [true, 'Please enter a profession']
    },
    interests: {
        type: String,
        required: [true, 'Please enter an interest']
    },
    avatar: {
        avatar_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
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

const Friend = mongoose.model('Friend', friendSchema)
module.exports = Friend