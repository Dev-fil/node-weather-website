const request= require('request')

const forecast=( latitude,longitude,callback)=>{
const forecastURL ='http://api.weatherstack.com/current?access_key=52c45df18b46295409ddf3dceb0b9063&query='+ latitude +','+ longitude+'&units=f'

request({url:forecastURL,json:true},(error,response)=>{
    


if(error){
    callback('Unable to connect to weather service',undefined)
}
else if( response.body.error){
    callback('No location found with such coordinates',undefined)

}
else{
callback(undefined,'It is currently '+
    response.body.current.temperature+' degrees outside,but feels like its '+
    response.body.current.feelslike+' degrees.  Pressure is '+
    response.body.current.pressure+' and precipitation is '+
    response.body.current.precip+'\n. Measured humidity is '+
    response.body.current.humidity+' and cloudcover is '+
    response.body.current.cloudcover+ '\n. Visibility will remain around '+
    response.body.current.visibility
    //weather_description:response.body.current.weather_descriptions

)
}
})}

module.exports =forecast