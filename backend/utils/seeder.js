const Product = require('../models/product')
const Medium = require('../models/medium')
const Orientation = require('../models/orientation')
const Artist = require('../models/artist')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')
const products = require('../data/products')
const mediums = require('../data/media')
const orientations = require('../data/orientations')
const artists = require('../data/artists')

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase()

const seedProducts = async () => {

    try {

        await Product.deleteMany()
        console.log('Products are deleted')

        await Product.insertMany(products)
        console.log('All products have been added')
        
        process.exit()

    } catch(error) {

        console.log(error.message)
        process.exit()

    }

}

const seedMedia = async () => {

    try {

        await Medium.deleteMany()
        console.log('Media deleted')

        await Medium.insertMany(mediums)
        console.log('All mediums have been added')
        
        process.exit()

    } catch(error) {

        console.log(error.message)
        process.exit()

    }

}

const seedOrientations = async () => {

    try {

        await Orientation.deleteMany()
        console.log('orientations deleted')

        await Orientation.insertMany(orientations)
        console.log('All orientations have been added')
        
        process.exit()

    } catch(error) {

        console.log(error.message)
        process.exit()

    }

}

const seedArtists = async () => {

    try {

        await Artist.deleteMany()
        console.log('Artist deleted')

        await Artist.insertMany(artists)
        console.log('All artists have been added')
        
        process.exit()

    } catch(error) {

        console.log(error.message)
        process.exit()

    }

}

seedProducts()
// seedMedia()
// seedOrientations()
// seedArtists()