const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast') 

const app= express()

const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        footer: "Home footer"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: "Tejas T",
        footer: "About footer"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        para:"This is to help",
        footer: "Help footer"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error:'Provide a valid address'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, place}={})=>{
            if(error){
                res.send({
                    error: error
                })
            }
            else{
                forecast(latitude, longitude, (error, data)=>{
                    if(error){
                        res.send({
                            error: error
                        })
                    }
                    else{
                        res.send({
                            Location: place,
                            Forecast: data
                        })
                    }
                })
            }
        })
    }

})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: "Error",
        error: "Help option not found",
        footer: "Help footer"
    })
})



app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Provide search term'
        })
    }
    else{
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: "Error",
        error: "Page not found",
        footer: "Error Footer"
    })
})

app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})