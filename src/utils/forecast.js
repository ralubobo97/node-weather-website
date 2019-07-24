const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c52ac16ceca683e6ee885feb7d015c36/'+ latitude + ',' + longitude + '?units=si&lang=ro'

    // Destructure 'response' object => { body }
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Cannot connect to forecast services!', undefined)
        } else if(body.error){
            callback('Cannot find location!', undefined)
        } else { 
            // Does not have an error => undefined.     
            callback(undefined, {
                longitude: body.longitude,
                latitude: body.latitude,
                location: body.timezone,
                summary: body.currently.summary,
                degrees: body.currently.temperature
            })
        }
    })
}

module.exports = forecast