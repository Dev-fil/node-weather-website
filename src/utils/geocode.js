const request = require('request');

const geocode=(address,callback)=>{
    const geocodeurl='http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGV2ZGsiLCJhIjoiY2tjNjNiNGszMDc2aDJ4cGg4eHB6M2N0MyJ9.OEbPANHNzj9eRe1yYL6osQ&limit=1'

    request({url:geocodeurl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
       
        else if(response.body.features.length===0){
           callback('Unable to find location.Try another search!',undefined)
        }
        else{
            callback(undefined,{
      latitude:response.body.features[0].center[1],
      longitude:response.body.features[0].center[0],
      location:response.body.features[0].place_name
            })
     
        }
    })

}
module.exports=geocode
