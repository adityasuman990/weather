const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
// app.use(bodyParser)
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/assets/bootstrap/css"));
app.use(express.static(__dirname+"/assets/bootstrap/js"));
app.use(express.static(__dirname+"/assets/css"));
app.use(express.static(__dirname+"/assets/img"));
app.use(express.static(__dirname+"/assets/js"));
app.use(express.static(__dirname+"/assets/fonts"));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
    });
    
    app.post("/",function(req,res){
        // console.log(req.body.cityName);
        const query = req.body.cityName;
    //     const metric="metric";
    // const key ="2356b0f9ddf334980776eddb1b5d26ca#"
//   const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units="+metric;/
const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=2356b0f9ddf334980776eddb1b5d26ca&units=metric#";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
    //   temp=Number(temp)-273;
      
    //   temp=temp-273.0;
      // const weatherDescription = weatherData.weather[0].description;
      // const icon = weatherData.weather[0].icon;
      // const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const lat = weatherData.coord.lat;
      const lon = weatherData.coord.lon;
      const humid = weatherData.main.humidity;
      const pres = weatherData.main.pressure;
      const speed = weatherData.wind.speed;
      const deg = weatherData.wind.deg;
      const country = weatherData.sys.country;
      const sealev = weatherData.main.sea_level;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.send(`<center><img src="`+imageURL+`"><br><h1>Weather<sup>+</sup></h1><br>
    <p>Hey!!! the Weather in `+query+` is `+weatherDescription+`.<br>the city on global map has 
        longitude of `+lon+` and lattitude of `+lat+`.<br>the tempreature is `+temp+` while the humidity is `+humid+ `% and atmospheric pressure `+pres+`<br>
        with wind speed of `+speed+` knots with degree `+deg+`.<br>The place is situated in "`+country+`". 
        
        </p></center>`);
  // res.send();
    });
  });
});
    
    
app.listen(3000, () => console.log('Weather+ app is listening on port 3000.'));
