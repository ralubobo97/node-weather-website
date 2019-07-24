const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config.
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and vies location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Setup static directory to serve
app.use(express.static(publicDirPath))  

app.get('', (req, res) => {     // Home page = app.com
    res.render('index', {
        title: 'Weather',
        name: 'Raluca Ionita'
    })
})

app.get('/about', (req, res) => {       // app.com/about
    res.render('about', {
        title: 'About Me',
        name: 'Raluca Ionita'
    })
})

app.get('/help', (req, res) => {        // app.com/help
    res.render('help', {
        message: 'Hello, this is the help page.',
        title: 'Help',
        name: 'Raluca Ionita'
    })
})

app.get('/weather', (req, res) => {  // app.com/weather
    if(!req.query.address){
        return res.send({
            error: 'You must specify an address!'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){ 
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){ 
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })  
})

app.get('/products', (req, res) => {
    if(!req.query.search){  // Runs when there is no search term.
        return res.send({   // Return to stop the execution.
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Raluca Ionita',
        error: 'Help article not found!'
    })
})

// The 404 page must be placed last!
app.get('*', (req, res) => {     // Matches any page
    res.render('404page', {
        title: '404',
        name: 'Raluca Ionita',
        error: 'Page not found!'
    })
})


// Start the server up:
app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})




