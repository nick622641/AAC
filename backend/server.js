const cloudinary = require('cloudinary').v2
const mongoose   = require('mongoose')
const app        = require('./app')
const dotenv     = require('dotenv')

// Setting up config file
// if (process.env.NODE_ENV !== 'PRODUCTION') {
//     require('dotenv').config({ path: 'backend/config/config.env' })
// }
dotenv.config({ path: 'backend/config.env' })

// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`)
    console.log('Shutting down server due to uncaught exception')
    process.exit(1)
})

// Conecting to Database
const db = process.env.NODE_ENV === 'PRODUCTION' 
        ? process.env.DB_URI 
        : process.env.DB_LOCAL_URI

    mongoose.connect(db)
        .then(con => {

            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)

        }).catch(con => {

            console.log("Error Connecting to the Mongodb Database")            

        }) 

// Setting up Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

app.listen(process.env.PORT, () => {
    console.log(`CORS enabled server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})