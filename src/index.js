const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const {
    geoLocation,
    getForcast
} = require('./geoLocation')

// console.log(process.cwd())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../', './templates/views'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
hbs.registerPartials(path.join(__dirname, '../', './templates/partials'))


app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.status(422).send({ error: 'Provide address!' })
    }
    geoLocation(address, (error, { placeName, latitude, longitude } = {}) => {
        if (error) {
            return res.status(400).send({ error })
        }
        getForcast(latitude, longitude, (error, forcast) => {
            if (error) {
                return res.status(404).send({ error })
            }
            res.send({ forcast,placeName })
        })
    })

})

app.get('/', (req, res) => {
    res.render('index', {
        pageName: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageName: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageName: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        pageName: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        pageName: 'Page not found'
    })
})




app.listen(8081, () => {
    console.log('Server up on port 8081')
})