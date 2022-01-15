const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name Rquired'],
        maxLength: [30, 'Name Max 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email Required'],
        unique: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        minLength: [6, 'Password Min 6 characters'],
        select: false
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
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,        
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expiration
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User', userSchema)
module.exports = User
