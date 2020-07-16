//========================================================

var searchHistory = [];
var todayWeatherObj = {};
var forecastWeatherArr = [];
var city = "Novato";
var state = "CA";
var cityState = city + "," + state;
var today = (moment().format('dddd, MMMM Do, YYYY'));
var d = moment().day()
console.log("Day = "+d);

//========================================================

function getUserInputs() {
    var locationObj;
    searchCity = $('#city').val()
    searchState = $('#startNum').val();

    locationObj = {
        searchCity: searchCity,
        searchState: searchState,
    };

    searchHistory.push(locationObj);
    return locationObj;
}

//push searched cities to searchHistory
// function pushCitiesToArray(searchHistory) {
//     searchHistory.push(city1);
//     searchHistory.push(city2);
//     searchHistory.push(city3);
// };

//saves the search history to local storage
function saveToLocalStorage(item) {
    localStorage.setItem(LS_KEY, JSON.stringify(item));
};

//reads the search history from local storage
function loadFromLocalStorage(item) {
    item = JSON.parse(localStorage.getItem(LS_KEY))
};


// console.log(locationObj);

//========================================================

//API requests
//sample forecast 16-day https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
//sample current http://api.weatherbit.io/v2.0/current?key=314f8e60676745089873728b30174cc3&units=i&city=Novato,CA
//sample forecast 5-day http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5

const API_KEY = "314f8e60676745089873728b30174cc3";
const LS_KEY = "sunnyday";
const wbEndPt = "http://api.weatherbit.io/v2.0/";
const paramsCurrent = "current" + "?key=" + API_KEY + "&city=" + cityState;
const paramsForecast = "forecast/daily" + "?key=" + API_KEY + "&units=i&city=" + cityState + "&days=5";

const testURL = "http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5";
const weatherNowQueryURL = "http://api.weatherbit.io/v2.0/current" + "?key=" + API_KEY + "&city=" + cityState;
const forecastQueryURL = "http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5";
const testIcon = "https://www.weatherbit.io/static/img/icons/c01d.png";
const iconHub = "https://www.weatherbit.io/static/img/icons/";
var iconSrc;
var iconCode;

//========================================================

function weatherNow() {
    $.ajax({
        url: weatherNowQueryURL,
        method: "GET"
    }).then(function (response) {
        todayWeatherObj.location = $("#city-state").text(cityState);
        todayWeatherObj.date = $("#date").text(today);
        todayWeatherObj.currentTemp = $("#current-temp").text(response.data[0].app_temp+'°F');
        todayWeatherObj.currentHumidity = $("#current-humidity").text(response.data[0].rh+'%');
        todayWeatherObj.currentWindSpeed = $("#current-wind-speed").text(response.data[0].wind_spd+'mph');
        todayWeatherObj.currentWindDirection = $("#current-wind-direction").text(response.data[0].wind_cdir_full);
        todayWeatherObj.currentUV = $("#current-uv").text(response.data[0].uv);
        todayWeatherObj.iconCode = $("#icon").append(`<img src=`+iconHub+response.data[0].weather.icon+`.png/>`);
        todayWeatherObj.description = $("#today-weather-description").text(response.data[0].weather.description);
        iconCode = todayWeatherObj.iconCode;
        uvColor(todayWeatherObj.currentUV);
    });
};

//========================================================

function uvColor(uv) {
    console.log("uv is "+uv)
    if (uv < 3) {
        $('#current-uv').addClass('uv-low') //green
    } else if (uv > 2 && uv < 6) {
        $('#current-uv').addClass('uv-mod-lo') //yellow
    } else if (uv > 5 && uv < 8) {
        $('#current-uv').addClass('uv-mod-hi') //orange   
    } else if (uv >7 && uv < 10) {
        $('#current-uv').addClass('uv-severe-lo') //red
    } else {
        $('#current-uv').addClass('uv-severe-hi') //red
    }
}

//========================================================

function weatherForecast() {
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function (response) {
        var date;
        let currentData;
        let numOfDays = response.data.length;

        for (var i = 0; i < numOfDays; i++) {
            currentData = response.data[i];
            date = (moment(currentData.datetime).format('MMMM DD'));
            // day = (moment().day('DD'));
            iconSrc = (iconHub + currentData.weather.icon + ".png");

            $("#forecast-div").append(`<div class="col-2"><div class="card" style="width: 100%">
            <div class="card-body"><img src=${iconSrc} class="card-img-top" />
            <h4 class="card-title text-center">${date}</h4>
            <div class="text-center">Low: ${currentData.min_temp}</div>
            <div class="text-center">High: ${currentData.max_temp}</div>
            <div class="text-center">Humidity: ${currentData.rh}</div>
            </div></div></div>`);
        }
    });
}

//========================================================

$(document).ready(function () {

    weatherNow();
    weatherForecast(5);

});