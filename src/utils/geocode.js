const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFsdWNhLWlvbml0YSIsImEiOiJjanllODBtZXQwenR0M3BvMzEwaDAzaGkyIn0.5Dd1HA_nzLuIJP30eWEaOA'

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Cannot connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Cannot find location. Try another search!', undefined)
        } else { 
            // Does not have an error => undefined.     
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode