const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})

const Artist = mongoose.model('Artist', artistSchema)
module.exports = Artist