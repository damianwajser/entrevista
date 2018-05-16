var token = '9ce107f40ab82b8c50d86c9dc1a86320165e31f8';

function getRepos(name, callback){
   console.log("Buscando repos");
  
  var req =  {
    'url': 'https://api.github.com/users/'+name+'/repos',
    'headers':{
    'Authorization': token,
    'User-Agent': 'Mozilla/5.0',
    'Accept':'application/json'
  }};

  request.get(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body));
    }else{
     console.error(error);
     callback(error, null);
    }
  })  
}

function getUserInfo(name, callback){
  console.log("Buscando usuario");
  var req =  {
    'url': 'https://api.github.com/users/'+name,
    'headers':{
    'User-Agent': 'Mozilla/5.0',
    'Accept':'application/json',
    'Authorization': token
  }};
  request.get(req, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          callback(null, JSON.parse(body));
       }else{
         console.error(error);
         callback(error, null);
       }
  })  
}
module.exports = {
  getRepos : getRepos,
  getUserInfo:getUserInfo
}