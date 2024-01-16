let express = require("express");
let app = express();
let https = require("https");
let cors = require("cors");


app.use(express.static("public"));
app.use(cors());

app.get("/", function(req, res){
  res.send("Hello World");
})

app.get("/weatherData", function (request, response) {
  console.log("Server called");
  const apiUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-12-15T13:00:00?key=8QKZBL4WMDPPKEY3BSBNPPFUV&include=current&contentType=json";

  https.get(apiUrl, (res) => {
    let data = "";
    let JSONData;

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      JSONData = JSON.parse(data);

      response.json({
        temperature: JSONData.currentConditions.temp,
        humidity: JSONData.currentConditions.humidity,
        pressure: JSONData.currentConditions.pressure,
      });
    });
  });
});

let listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is Listening" + listener.address().port);
});
