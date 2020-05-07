const request= require('request')

const geocode= (address, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZjIwMTgwMjgwIiwiYSI6ImNrOXV4eWxlZTA2cjczZW9sdjNpenI4ZW4ifQ.UC_8ZcnHDoQogF739FVk8A'
    request({
        url,
        json: true
    },
    (error, {body}={})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.features.length===0){
            callback('Location not found', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode