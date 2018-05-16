var express = require("express")
    http = require("http"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    request = require('request');
    githubService = require('./githubService'),
    worldweatherService = require('./worldweatherService');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());



app.get('/metric', function(req, res) {
  var temps = [];
  var i=0;
  var name = req.query.name;
  if(!name){
    res.jsonp(400, {msj:"nombre requerido"});
  }
  // busco la info del usuario
  githubService.getUserInfo(name, (err,user)=>{
    if(!err){
      console.log(user);
      let location = user.location;
      // busco los repos
      githubService.getRepos(name, async (err, repos)=>{
        var index;
        for (index = 0; index < repos.length; index++) { 
          repo = repos[index];
          // busco la temperatura de cada repo
          console.log("fecha de creacion: " + repo);
          var temp = await worldweatherService.getTemperature("CABA", new Date(repo.created_at));
          temp = temp.data.weather[0];
          var avgDay = (parseFloat(temp.maxtempC) + parseFloat(temp.mintempC))/2;
          //acumulo todas las temperaturas en un array
          temps.push(avgDay);
        }  
        res.jsonp(getResponseAvgTemp(temps));
      });
    }
  });
});

function getResponseAvgTemp(temps){
  var avg = temps.reduce(function(acc, val) { return acc + val; });
  return {"temp":avg/temps.length, "repos": temps.length}
}

var server = app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
module.exports = server;
