const mongoose = require('mongoose')

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
module.exports = Orientation