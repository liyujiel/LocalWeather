$(document).ready(function(){
    getLocation();
    function getLocation() {
        $.get("http://ipinfo.io",function(location){
            $('.location')
              .append(location.city + ",")
              .append(location.region);
            
            var units = getUnits(location.country);
            getWeather(location.loc, units);
        },"jsonp");
    }

    function getWeather(loc,units){
        lat = loc.split(",")[0]
        lon = loc.split(",")[1]

        var weatherApiURL ='http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + '&appid=e2db5b0453a25a492e87ad8b03046a7c';


        $.get(weatherApiURL,function(weather){
            var temperature = weather.main.temp;
            var unitLabel;

            if(units === "metric"){
                unitLabel = "C";
            }
            else{
                unitLabel = "F";
            }

            temperature = parseFloat((temperature).toFixed(1));

            $("#icon").append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

            $('#temp').append(temperature + " " + unitLabel);

            $('#conditions').append(weather.weather[0].discription);
        }, "jsonp");
    };

    function getUnits(country) {
        var imperialCountries = ['US', 'BS', 'BZ'];

        if (imperialCountries.indexOf(country) === -1){
            var units = "metric";
        }
        else{
            var units = "imperial";
        }
        return units;
    }
});