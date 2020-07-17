//========================================================

var searchHistory = [];
var searchInput = '';
var todayWeatherObj = {};
var forecastWeatherArr = [];
var cityState;
var today = (moment().format('ddd, MMMM DD, YYYY'));

//========================================================

function setup() {
    //event listener for search button
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        console.log("You clicked a button!");
        getWeatherData();
    });
}

function getUserInputs() {
    let city = $('#searchBarCity').val() || 'Novato';
    let state = $('#searchBarState').val() || 'CA';
    cityState = city + ", " + state;
    console.log("You're searching for weather in " + cityState);
    saveSearchHistory(cityState);
    return cityState;
}

//saves the search history to local storage
function saveSearchHistory(searchInput) {
    searchHistory.push(searchInput);
    localStorage.setItem(LS_KEY, JSON.stringify(searchHistory));
}

// console.log(locationObj);

//========================================================
// REWRITE
// function getUserInputs(searchInput) {
//     let cityInput = $('#searchBarCity').val() || 'Novato';
//     let stateInput = $('#searchBarState').val() || 'CA';
//     let searchInput;
//     searchInput = cityInput + "," + stateInput;
//     saveSearchHistory(searchInput);
//     return searchInput;
// }

//========================================================

//API requests
//sample forecast 16-day https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
//sample current http://api.weatherbit.io/v2.0/current?key=314f8e60676745089873728b30174cc3&units=i&city=Novato,CA
//sample forecast 5-day http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5

const API_KEY = "314f8e60676745089873728b30174cc3";
const LS_KEY = "sunnyday";
const wbEndPt = "http://api.weatherbit.io/v2.0/";
const iconHub = "https://www.weatherbit.io/static/img/icons/";
var iconSrc;
var iconCode;

//========================================================

function weatherNow(endpturl, loc) {
    var cityHead = loc;
    $.ajax({
        url: endpturl,
        method: "GET"
    }).then(function (response) {
        var weatherData = response.data[0];
        // If there's no wweather data returns, exit
        if (!weatherData) {
            return;
        }

        $("#icon img").remove(); // Need to remove the image of the weather all the time
        todayWeatherObj.location = $("#cityState").text(cityHead);
        todayWeatherObj.date = $("#date").text(today);
        todayWeatherObj.currentTemp = $("#current-temp").text(weatherData.app_temp + '°F');
        todayWeatherObj.currentHumidity = $("#current-humidity").text(weatherData.rh + '%');
        todayWeatherObj.currentWindSpeed = $("#current-wind-speed").text(weatherData.wind_spd + 'mph');
        todayWeatherObj.currentWindDirection = $("#current-wind-direction").text(weatherData.wind_cdir_full);
        todayWeatherObj.currentUV = $("#current-uv").text(weatherData.uv);
        todayWeatherObj.iconCode = $("#icon").append(`<img src=` + iconHub + weatherData.weather.icon + `.png/>`);
        todayWeatherObj.description = $("#today-weather-description").text(weatherData.weather.description);
        iconCode = todayWeatherObj.iconCode;
        uvColor(todayWeatherObj.currentUV);
    });
}

//====================================================================

async function getWeatherData() {
    var paramsCurrent = "current" + "?key=" + API_KEY + "&units=i&city=";
    var url = wbEndPt;
    cityState = getUserInputs();
    paramsCurrent += cityState;
    url += paramsCurrent;
    await weatherNow(url, cityState);
    getForecastData();
}

function getForecastData() {
    var paramsCurrent = "forecast/daily" + "?key=" + API_KEY + "&units=i&city="+ cityState + "&days=5";
    var url = wbEndPt;
    url += paramsCurrent;
    weatherForecast(url);
    // const forecastQueryURL = "http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5";
}

//====================================================================

//get search history from local storage and add items to list group

//reads the search history from local storage
// function loadFromLocalStorage() {
//     searchHistory = JSON.parse(localStorage.getItem(LS_KEY));
//     return searchHistory;
// }

function addToCityList () {
    searchHistory = JSON.parse(localStorage.getItem(LS_KEY));   
    $('#searchedCityList').append('<li>');
    $('#searchedCityList').text(searchHistory).addClass('list-group-item')
    console.log(searchHistory);
}

//====================================================================


function uvColor(uv) {
    console.log("uv is " + uv)
    if (uv < 3) {
        $('#current-uv').addClass('uv-low') //green
    } else if (uv > 2 && uv < 6) {
        $('#current-uv').addClass('uv-mod-lo') //yellow
    } else if (uv > 5 && uv < 8) {
        $('#current-uv').addClass('uv-mod-hi') //orange   
    } else if (uv > 7 && uv < 10) {
        $('#current-uv').addClass('uv-severe-lo') //red
    } else if (uv > 9) {
        $('#current-uv').addClass('uv-severe-hi') //purple
    } else {
        $('#current-uv').addClass('uv-low') //green
    }
}

//========================================================

function weatherForecast(endpturl) {
    $.ajax({
        url: endpturl,
        method: "GET"
    }).then(function (response) {
        var date;
        let currentData;
        let numOfDays = response.data.length;

        // Clear the content of the forecast div for every API call
        $("#forecastDiv").html('');

        for (var i = 0; i < numOfDays; i++) {
            currentData = response.data[i];
            date = (moment(currentData.datetime).format('ddd MMMM Do'));
            // day = (moment().day('DD'));
            iconSrc = (iconHub + currentData.weather.icon + ".png");

            $("#forecastDiv").append(`<div class="col-2"><div class="card" style="width: 100%">
            <div class="card-body"><img src=${iconSrc} class="card-img-top" />
            <h4 class="card-title text-center">${date}</h4>
            <div class="text-center">Low: ${currentData.min_temp}&deg;F</div>
            <div class="text-center">High: ${currentData.max_temp}&deg;F</div>
            <div class="text-center">Humidity: ${currentData.rh}%</div>
            </div></div></div>`);
        }
    });
}

//========================================================

// $(document).ready(function () {
    setup();
    getWeatherData();
    addToCityList();
// })