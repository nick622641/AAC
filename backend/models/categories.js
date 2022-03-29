const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})

const Artist = mongoose.model('Artist', artistSchema)

const orientationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})

const Orientation = mongoose.model('Orientation', orientationSchema)

const mediumSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})

const Medium = mongoose.model('Medium', mediumSchema)
module.exports = { Artist, Medium, Orientation }