const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary').v2

// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`)
    console.log('Shutting down server due to uncaught exception')
    process.exit(1)
})

// Conecting to Database
 connectDatabase()

// Setting up Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})