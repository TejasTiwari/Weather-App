const request= require('request')

const forecast= (lat, long, callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=7f010d43e4ce1328588fe98b28b65408&query='+encodeURIComponent(long)+','+encodeURIComponent(lat)+'&units=m'
    request({
        url,
        json: true
    },
    (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error){
            callback('Weather data not available', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0]+'. Currently its '+ body.current.temperature+' and the probability of rain is: '+ body.current.precip)
        }
    })
}

module.exports= forecast