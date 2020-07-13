// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var searchHistory = [];

//API requests
//sample forecast 16-day https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

//sample current http://api.weatherbit.io/v2.0/current?key=314f8e60676745089873728b30174cc3&units=i&city=Novato,CA

//sample forecast 5-day http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5

//endpt for daily "HTTP: http://api.weatherbit.io/v2.0/forecast/daily"
//endput for curret "HTTP: http://api.weatherbit.io/v2.0/current"


const API_KEY = "314f8e60676745089873728b30174cc3";
const LS_KEY = "sunnyday";
const wbEndPt = "http://api.weatherbit.io/v2.0/";
const paramsCurrent = "current" + "?key=" + API_KEY + "&city=" + cityState;
const paramsForecast = "forecast/daily" + "?key=" + API_KEY + "&units=i&city=" + cityState + "&days=5";
var city = "Novato";
var state = "CA";
var cityState = city + "," + state;
const testURL = "http://api.weatherbit.io/v2.0/current?key=314f8e60676745089873728b30174cc3&units=i&city=Novato,CA";
const icons = "https://www.weatherbit.io/static/img/icons/"

var forecastQueryURL = "http://api.weatherbit.io/v2.0/forecast/daily" + "?key=" + API_KEY + "&units=i&city=" + cityState + "&days=5";

var weatherNowQueryURL = "http://api.weatherbit.io/v2.0/current" + "?key=" + API_KEY + "&city=" + cityState;

function weatherNow () {
    $.ajax({
        url: weatherNowQueryURL,
        method: "GET"
    }).then(function (response) {
        var location = $("#city-state").text(cityState);
        var date = $("#date").text(response.data[0].ob_time);
        var icon = $("#icon").text(response.data[0].weather.icon);
        var currentTemp = $("#current-temp").text(response.data[0].app_temp);
        var currentHumidity = $("#current-humidity").text(response.data[0].rh);
        var currentWindSpeed = $("#current-wind-speed").text(response.data[0].wind_spd);
        var currentWindDirection = $("#current-wind-direction").text(response.data[0].wind_cdir_full);
        var currentUV = $("#current-uv").text(response.data[0].uv);
        console.log(response);
    });
};

function weatherForecast () {
    $.ajax({
        url: weatherNowQueryURL,
        method: "GET"
    }).then(function (response) {
        var location = $("#city-state").text(cityState);
        var date = $("#date").text(response.data[0].ob_time);
        var icon = $("#icon").text(response.data[0].weather.icon);
        var currentTemp = $("#current-temp").text(response.data[0].app_temp);
        var currentHumidity = $("#current-humidity").text(response.data[0].rh);
        var currentWindSpeed = $("#current-wind-speed").text(response.data[0].wind_spd);
        var currentWindDirection = $("#current-wind-direction").text(response.data[0].wind_cdir_full);
        var currentUV = $("#current-uv").text(response.data[0].uv);
        console.log(response);
    });
};

//fields from current
// data.
//     "app_temp" current temperature 
// min_temp
// max_temp
// city_name
// state_code
// Weather.description
//ob_time date -  use moment.js for date format conversion
//weather.icon - to show icon, append weather.icon + .png, to "https://www.weatherbit.io/static/img/icons/" e.g., 
//https://www.weatherbit.io/static/img/icons/r01d.png
// wind_spd
// wind_cdir_full
// uv
// rh

//==============================================================

//push searched cities to searchHistory
function pushCitiesToArray() {
    searchHistory.push(food1);
    searchHistory.push(food2);
    searchHistory.push(food3);
};

//saves the search history to local storage
function saveToLocalStorage() {
    localStorage.setItem(LS_KEY, JSON.stringify(searchHistory));
};

//reads the search history from local storage
function loadFromLocalStorage() {
    searchHistory = JSON.parse(localStorage.getItem(LS_KEY))
};

//========================================================

//UV INDEX INFO from EPA:
//low 0-2 green
// moderate 3-7 yellow or orange
// severe 8+ red or purple

//========================================================

// FORECAST DATA
// data.city_name
// state_code
// data.
//     min_temp
// max_temp
// city_name
// state_code
// Weather.description
//ob_time date, use moment.js for date format conversion
//weather.icon to show icon, append weather.icon + .png, to "https://www.weatherbit.io/static/img/icons/" e.g.,
//https://www.weatherbit.io/static/img/icons/r01d.png
// wind_spd
// wind_cdir_full
// uv
// rh

$(document).ready(function () {

    weatherNow();
    // postData();

});