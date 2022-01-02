const mongoose = require('mongoose')

const connectDatabase = () => {

    mongoose.connect(process.env.DB_LOCAL_URI)
    // mongoose.connect(process.env.DB_URI)
        .then(con => {

            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)

        }).catch(con => {

            console.log("Error Connecting to the Mongodb Database")            

        })
    
}

module.exports = connectDatabase