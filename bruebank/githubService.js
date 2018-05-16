var token = 'a8f68b8632cda696dbae1cd266f6d845cb9ec167';

function getRepos(name, callback){
   console.log("Buscando repos de : " + name);
  
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
     callback(error, null);
    }
  })  
}

function getUserInfo(name, callback){
  console.log("Buscando usuario: " + name);
  var req =  {
    'url': 'https://api.github.com/users/'+name,
    'headers':{
    'User-Agent': 'Mozilla/5.0',
    'Accept':'application/json',
    'Authorization': token
  }};
  request.get(req, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(response);
          callback(null, JSON.parse(body));
       }else{
         console.error("error: "+ response.statusCode)
         callback(error, null);
       }
  })  
}
module.exports = {
  getRepos : getRepos,
  getUserInfo:getUserInfo
}