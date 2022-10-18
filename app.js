const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const request = require('request');

app.use('*/css',express.static('public/css'));


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){
  const query = req.body.cityName;
  const appId = "c59f59231302afb9ee60c85c0ee348a9"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?&q="+query+"&appid="+appId+"&units="+unit+""
  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const weatherConditionIconId = weatherData.weather[0].icon
      const weatherConditionIconLink = "http://openweathermap.org/img/wn/"+weatherConditionIconId+"@2x.png"
      res.write("<h1> The temperature in "+query+" is  "+temp+" degrees Celcius</h1>")
      res.write("<h2> Weather descripton is "+weatherDescription+"</h2>")
      res.write("<img src=" + weatherConditionIconLink + ">")
      res.send();
    });
  });
});





app.listen(3000, function() {
  console.log("Server has started");

})
