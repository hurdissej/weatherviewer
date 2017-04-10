// Set Icon Color //
var skycons = new Skycons({"color": "#F7CE3E"});
var unit = "C"
// Get Location and set APIRequest to current position // 
var basis = "https://crossorigin.me/https://api.darksky.net/forecast/31d317e69d00835e57c9ebdb24640372/"
var apiKey = ''

var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}  

getPosition()
  .then((position) => {
    apiKey = basis + position.coords.latitude + "," + position.coords.longitude;
        $.getJSON(apiKey, function(json){
        var currentTemp = json["currently"]["temperature"];
        if (unit == "C"){
          currentTemp = Math.round((((currentTemp-32)*5)/9)*100)/100;
        }
        var message = json["currently"]["summary"] + " and the temperature is: " + currentTemp + " °" + unit;
        $("#message").html(message);
        skycons.add("icon1", json["currently"]["icon"]);
        skycons.play();
          });
  })
  .catch((err) => {
    console.error(err.message);
  });

// Toggle Unit of Measure //

$(document).ready(function(){
  $("#toggleUnit").on("click", function(){
    if (unit == "F"){
      unit = "C";
      $("#toggleUnit").html("°C");
      $( "#getWeather" ).trigger( "click" );
    } else {
      unit = "F";
      $("#toggleUnit").html("°F");
      $( "#getWeather" ).trigger( "click" );
    }
  })
})

// Send Request and Update UI
$(document).ready(function() {
    $("#getWeather").on("click", function(){
      $.getJSON(apiKey, function(json){
        var currentTemp = json["currently"]["temperature"];
        if (unit == "C"){
          currentTemp = Math.round((((currentTemp-32)*5)/9)*100)/100;
        }
        var message = json["currently"]["summary"] + " and the temperature is: " + currentTemp + " °" + unit;
        $("#message").html(message);
        skycons.add("icon1", json["currently"]["icon"]);
        skycons.play();
      });
    });
  });