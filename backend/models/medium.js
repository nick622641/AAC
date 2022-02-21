const mongoose = require('mongoose')

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
module.exports = Medium