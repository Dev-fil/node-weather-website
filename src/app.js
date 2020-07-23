const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Connect',
        name: 'Dev Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dev Kumar'
    })
})

app.get('/techstack', (req, res) => {
    res.render('techstack', {
        helpText: 'This is some helpful text.',
        title: 'TECHNOLOGIES',
        name: 'Dev Kumar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return  res.send({
          error:'please enter some location'
        })
    }

geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

if(error){
   return res.send({error})
}
forecast(latitude,longitude,(error,forecastdata)=>{
    if(error){
      return  res.send({error})
    }

    res.send({
        forecast:forecastdata,
        Location:location,
        address:req.query.address
    })
})

})


    // res.send({
    // address : req.query.address 
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dev Kumar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dev Kumar',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})