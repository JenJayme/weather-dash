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
var fiveDayData = [];
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
        todayWeatherObj.description = $("#today-description").text(response.data[0].weather.description);
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
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);

            // console.log(response.data[i].datetime)
            date = (moment(response.data[i].datetime).format('MMMM DD'));        

            div = $("#forecast-div").append("<div>");
            // div = $('<div></div>');
            div.addClass("col-2");
            div.append("<dl>");

            div = $("#forecast-div").append("<div>").addClass("col-2");
            dateCol = $("dl").append("<dt>"+ date +"</dt>")
            // date = $("#date-my").text(moment().format('MM DD')
            
            $("dl").append("<dd>"+response.data[i].rh+"</dd>");
            $("dl").append("<dd>"+response.data[i].weather.description+"</dd>");
            
            // $("dd").append("<dd>").text(response.data[i].rh)
            $("#fore-date").text(response.data[i].datetime);
            $("#fore-icon").text(response.data[i].weather.icon);
            // dl = $("dl").append("<dd>list item</dd>");
            // .text(response.data[i].datetime);
        }
    });
}

        // Create Question div
        // div = $('<div></div>');
        // div.addClass('question');
        // div.text(QNAObject.question);
        // questionsContainer.append(div);

//==============================================================

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