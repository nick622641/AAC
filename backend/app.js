const express         = require('express')
const cookieParser    = require('cookie-parser')
const fileUpload      = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors')
const path            = require('path')
const app             = express()
const cors            = require('cors')

app.use(cors())

app.use( express.json      ( { limit: '50mb' } ) )
app.use( express.urlencoded( { limit: '50mb', extended: true } ) )
app.use( cookieParser() )
app.use( fileUpload  () )

// Import all routes
const products = require( './routes/product' )
const auth     = require( './routes/auth'    )
const payment  = require( './routes/payment' )
const order    = require( './routes/order'   )
const blog     = require( './routes/blog'    )
const painter  = require( './routes/painter' )
const staff    = require( './routes/staff'   )
const friend   = require( './routes/friend'  )
const page     = require( './routes/page'    )
const image    = require( './routes/image'   )
const contact  = require( './routes/contact' )

app.use( '/api/v1', auth     )
app.use( '/api/v1', products )
app.use( '/api/v1', payment  )
app.use( '/api/v1', order    )
app.use( '/api/v1', blog     )
app.use( '/api/v1', painter  )
app.use( '/api/v1', staff    )
app.use( '/api/v1', friend   )
app.use( '/api/v1', page     )
app.use( '/api/v1', image    )
app.use( '/api/v1', contact  )

if ( process.env.NODE_ENV === 'PRODUCTION' ) {

    app.use( express.static( path.join( __dirname, '../frontend/build' ) ) )

    app.get( '*', ( req, res ) => {
        res.sendFile( path.resolve( __dirname, '../frontend/build/index.html' ) )
    })

}

// Middleware to handle errors
app.use( errorMiddleware )

module.exports = app