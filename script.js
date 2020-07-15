
var searchHistory = [];
var forecastData = [];
var weatherToday = {};
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
var today = (moment().format('MMMM DD, YYYY'));

const testURL = "http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5";
const weatherNowQueryURL = "http://api.weatherbit.io/v2.0/current" + "?key=" + API_KEY + "&city=" + cityState;
const forecastQueryURL = "http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5";
const testIcon = "https://www.weatherbit.io/static/img/icons/c01d.png";
const iconHub = "https://www.weatherbit.io/static/img/icons/";

var todayWeatherObj = {};
var forecastWeatherArr = [];

function weatherNow() {
    $.ajax({
        url: weatherNowQueryURL,
        method: "GET"
    }).then(function (response) {
        todayWeatherObj.location = $("#city-state").text(cityState);
        todayWeatherObj.date = $("#date").text(today);
        todayWeatherObj.currentTemp = $("#current-temp").text(response.data[0].app_temp);
        todayWeatherObj.currentHumidity = $("#current-humidity").text(response.data[0].rh);
        todayWeatherObj.currentWindSpeed = $("#current-wind-speed").text(response.data[0].wind_spd);
        todayWeatherObj.currentWindDirection = $("#current-wind-direction").text(response.data[0].wind_cdir_full);
        todayWeatherObj.currentUV = $("#current-uv").text(response.data[0].uv);
        // todayWeatherObj.iconCode = $("#icon").text(response.data[0].weather.icon);
        todayWeatherObj.iconCode = response.data[0].weather.icon;
        todayWeatherObj.description = $("#today-weather-description").text(response.data[0].weather.description);
    });
};

// var icon = appendIcon(response.data[0].weather.icon);

function appendIcon(iconCode) {
    var iconSrc = (iconHub + iconCode + ".png");
    $("#icon").append('<img id="icon" src=iconSrc />');
    console.log(iconHub);
    console.log(iconSrc);
}
// var icon = $("#icon").append('<img src="https://www.weatherbit.io/static/img/icons/c01d.png' />);

function weatherForecast() {
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function (response) {
        var div, date, dateCol, dl, dd;
        let currentData;
        let numOfDays = response.data.length;

        for (var i = 0; i < numOfDays; i++) {
            currentData = response.data[i];
            date = (moment(currentData.datetime).format('MMMM DD'));
            iconSrc = (iconHub + currentData.weather.icon + ".png");

            $("#forecast-div").append(`<div class="col-2"><div class="card" style="width: 100%">
            <div class="card-body"><img src=${iconSrc} class="card-img-top">
            <h4 class="card-title text-center">${date}</h4>
            <div class="text-center">${currentData.min_temp}</div>
            <div class="text-center">${currentData.max_temp}</div>
            <div class="text-center">${currentData.rh}</div>
            </div></div></div>`);
        }
    });
}

//push searched cities to searchHistory
function pushCitiesToArray() {
    searchHistory.push(city1);
    searchHistory.push(city2);
    searchHistory.push(city3);
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
    weatherForecast(5);
    // postData();

});