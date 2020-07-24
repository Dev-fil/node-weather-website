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
callback(undefined,'Weather : '+response.body.current.weather_descriptions +' over there. It is currently '+
    response.body.current.temperature+' degrees F outside,but feels like its '+
    response.body.current.feelslike+' degrees.  Pressure is '+
    response.body.current.pressure+' MB(millibar) and precipitation is '+
    response.body.current.precip+'\n.MM(millimeters) Measured humidity is '+
    response.body.current.humidity+' % and cloudcover is '+
    response.body.current.cloudcover+ ' % . Visibility will remain around '+
    response.body.current.visibility+' km(killometers).'
    //weather_description:response.body.current.weather_descriptions

)
}
})}

module.exports =forecast