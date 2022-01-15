const mongoose = require('mongoose')

const connectDatabase = () => {

    const db = process.env.NODE_ENV === 'PRODUCTION' 
        ? process.env.DB_URI 
        : process.env.DB_LOCAL_URI

    mongoose.connect(db)
        .then(con => {

            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)

        }).catch(con => {

            console.log("Error Connecting to the Mongodb Database")            

        })    
}

module.exports = connectDatabase