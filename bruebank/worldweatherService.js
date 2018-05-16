var apiKey = 'aac8d1525b6244a5aba173828181605';
async function getTemperature(location, date,oldTemps){
    console.log("Buscando temperatura para la fecha: " +typeof(date)+"-"+ date);
    var req =  {
      'url': 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?q='+location+'&date='+date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate()+'&key='+apiKey+'&format=json',
      'headers':{
      'User-Agent': 'Mozilla/5.0',
      'Accept':'application/json'
    }};
    console.log("llamando a: " + req.url);
    return new Promise(resolve=>request.get(req, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(JSON.parse(body));
         }else{
             
         }
    }));
}
  module.exports = {
    getTemperature : getTemperature
  }