/*Pseudocode for project
-Pull data from server side API
-use client sisde storage to store persistent data

- weatherbit API key: f397daf28bd64b7e971d4ea10464a542
-googlemaps API key: AIzaSyC0dna1RtVg-AmAwNh_aOtoRUD8V8Z7txs
*/

//variables for important DOM elements

//variables to handle printing data to the page

//

var input = document.querySelector("#input");

var outputStadium = document.getElementById("stadiumName");
var outputAddress = document.getElementById("stadiumAddress");
var outputDesc = document.getElementById("description");
var outputTemp = document.getElementById("temp");
var outputPrecip = document.getElementById("precip");
var outputWind = document.getElementById("wind");
var outputClouds = document.getElementById("clouds");
var outputSnow = document.getElementById("snow");
var outputUV = document.getElementById("uv");
var outputRH = document.getElementById("rh");

var forcastContent = document.getElementById('forcastContent');


outputStadium.innerHTML = 'Stadium Name: ';
outputAddress.innerHTML = 'Stadium Address: ';
outputDesc.innerHTML = 'Weather Description: ';
outputTemp.innerHTML = 'Temperature: ';
outputPrecip.innerHTML = 'Precipitation: ';
outputWind.innerHTML = 'Wind Speed: ';
outputClouds.innerHTML = 'Clouds: ';
outputSnow.innerHTML = 'Snowfall: ';
outputUV.innerHTML = 'UV Index: ';
outputRH.innerHTML = 'Relative Humidity: ';


function initMap() {
    //austin TX center
    var location = {
        lat: 30.2672,
        lng: -97.7431
    }
    //two options needed for the map, there are many more
    var options = {
        center: location,
        zoom: 8
    }
    //if the user has geolocation on it will center on their location
    if (navigator.geolocation) {
        console.log('geolocation on');

        navigator.geolocation.getCurrentPosition(function (userLocation) {
            //updates location lat and long to users lat and long
            location.lat = userLocation.coords.latitude,
                location.lng = userLocation.coords.longitude,

                //this creates the map with the user location
                map = new google.maps.Map(document.getElementById('map'), options);

            //generates error message if user does not want to provide location and defaults to center
        }, function (error) {
            console.log('user said no to provide location');
            map = new google.maps.Map(document.getElementById('map'), options);
        }
        )
    } else {
        //creates the map on the given center
        map = new google.maps.Map(document.getElementById('map'), options);
    }
    //autocomplete takes two arguments first is the html element
    autocomplete = new google.maps.places.Autocomplete(input, {
        //add up to 5 countrys
        componentRestrictions: { 'country': ['us'] },
        //get billed based on the fields you pull from api geometry and names are free
        fields: ['geometry', 'name', 'formatted_address'],
        //options to customize input fields, stadium is a type
        types: ['stadium']
    });
    //add listener takes two arguments, place changed goes when you click
    autocomplete.addListener('place_changed', function () {
        var stadium = autocomplete.getPlace();
        var location = stadium.formatted_address;
        var name = stadium.name;

        //re initialize values
        forcastContent.innerHTML = '';



        getLatLong(location);
        //print name and address
        outputStadium.innerHTML = 'Stadium Name: ' + name;
        outputAddress.innerHTML = 'Stadium Address: ' + location;

        //new function to save location
        saveLocation(name, location);

        new google.maps.Marker({
            position: stadium.geometry.location,
            title: stadium.name,
            map: map
        })
    });
}


function getLatLong(city) {
    //example data
    // var location = 'Mercedez Benz Stadium';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
            address: city,
            key: 'AIzaSyC0dna1RtVg-AmAwNh_aOtoRUD8V8Z7txs'
        }
    })
        .then(function (response) {
            var latitude = response.data.results[0].geometry.location.lat;
            var longitude = response.data.results[0].geometry.location.lng;
            //call weather functions from lat long
            getWeather(latitude, longitude);
            getGameForcast(latitude, longitude);
        })
        .then(function (error) {
            console.log(error);
        });

}


//get the weather from the latitude and longitude from the google api 
function getWeather(lat, lon) {

    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=f397daf28bd64b7e971d4ea10464a542&include=minutely&units=I`, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (dat) {
            //print data to card
            outputDesc.innerHTML = 'Weather Description: ' + dat.data[0].weather.description;
            outputTemp.innerHTML = 'Temperature: ' + dat.data[0].temp + ' degrees F';
            outputPrecip.innerHTML = 'Precipitation: ' + dat.data[0].precip + ' inches of rainfall';
            outputWind.innerHTML = 'Wind Speed: ' + dat.data[0].wind_spd + 'mph';
            outputClouds.innerHTML = 'Clouds: ' + dat.data[0].clouds + "%";
            outputSnow.innerHTML = 'Snowfall: ' + dat.data[0].snow + ' inches of depth';
            //uv index
            outputUV.innerHTML = 'UV Index: ' + dat.data[0].uv;
            //relative humidity
            outputRH.innerHTML = 'Relative Humidity: ' + dat.data[0].rh + '%';

        })

}

function getGameForcast(lat, lon) {
    fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=f397daf28bd64b7e971d4ea10464a542&units=I&hours=240`, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (dat) {
            console.log(dat.data[0]);

            for (var i = 0; i < dat.data.length; i+=12) {
                // add conditional here if timestamplocal === gameDate && gameTime

                //then pull weather data
                var forcastTimestamp = dat.data[i].timestamp_local;
                var forcastDescription = dat.data[i].weather.description;
                var forcastTemp = dat.data[i].temp;
                var forcastPrecip = dat.data[i].precip;
                var forcastWindSpeed = dat.data[i].wind_spd;
                var forcastClouds = dat.data[i].clouds;
                var forcastSnow = dat.data[i].snow;
                var forcastUV = dat.data[i].uv;
                //relative humidity
                var forcastRH = dat.data[i].rh;

                //create elements
                var header = document.createElement('h3');
                var pTime = document.createElement('h4');
                var pDes = document.createElement('p');
                var pTemp = document.createElement('p');
                var pPrecip = document.createElement('p');
                var pWind = document.createElement('p');
                var pClouds = document.createElement('p');
                var pSnow = document.createElement('p');
                var pUV = document.createElement('p');
                var pRH = document.createElement('p');



                //print weather data to card
                header.innerHTML = "Forcast Weather: ";
                pTime.innerHTML = 'Local Date and Time: ' + forcastTimestamp;
                pDes.innerHTML = 'Weather Description: ' + forcastDescription;
                pTemp.innerHTML = 'Temperature: ' + forcastTemp + ' degrees F';
                pPrecip.innerHTML = 'Precipitation: ' + forcastPrecip + ' inches of rainfall';
                pWind.innerHTML = 'Wind Speed: ' + forcastWindSpeed + 'mph';
                pClouds.innerHTML = 'Clouds: ' + forcastClouds + "%";
                pSnow.innerHTML = 'Snowfall: ' + forcastSnow + ' inches of depth';
                pUV.innerHTML = 'UV Index: ' + forcastUV;
                pRH.innerHTML = 'Relative Humidity: ' + forcastRH + '%';

                //append elements
                forcastContent.appendChild(header);
                forcastContent.appendChild(pTime);
                forcastContent.appendChild(pDes);
                forcastContent.appendChild(pTemp);
                forcastContent.appendChild(pPrecip);
                forcastContent.appendChild(pWind);
                forcastContent.appendChild(pClouds);
                forcastContent.appendChild(pSnow);
                forcastContent.appendChild(pUV);
                forcastContent.appendChild(pRH);


                //create an object from data


            }





            // -----------------------------------------

            //                 var obj = {};

            //                     obj.Day = forcastDate;
            //                     obj.Temp = forcastTemp;
            //                     obj.Wind = forcastWind;
            //                     obj.Humidity = forcastHumid;

            //                     //push data to the array
            //                     arr.push(obj);
            //                 }
            //                 console.log(arr);
            //             }
            // ----------------------------------


        });
}


// function renderHTML(){

function saveLocation(stadiumName, loc) {
    //initialize or pull json object in local storage
    var savedStadium = JSON.parse(localStorage.getItem("Stadium")) || [];
    //boolean value to see if something is present
    var alreadyExists = false;
    for (var i = 0; i < savedStadium.length; i++) {
        //searches the array for all values of name
        if (savedStadium[i].name == stadiumName) {
            //if it exists we change the value to true
            alreadyExists = true;
        }
    }
    if (alreadyExists) {
        console.log('exists');
    } else {
        //adding to existing object the location and name
        savedStadium.push({
            name: stadiumName,
            location: loc,
        })
        //saves it to storage and converts back to a string for JSON 
        localStorage.setItem("Stadium", JSON.stringify(savedStadium));
    }


}
//-----------------------------------------------------------------------------------------------------------------------
//Global variables 
var oddsData = document.getElementById('team-info')
var teamTitle = document.querySelector('#info')
var time = document.createElement('p');
var mLine = document.createElement('p');
var overUnder = document.createElement('p');
var points = document.createElement('p')


function getResults() {

    var data = JSON.parse(localStorage.getItem("TeamData")) || [];
    // var league = JSON.parse(localStorage.getItem("League")) || [];
    var team = JSON.parse(localStorage.getItem("Team")) || "";



    if (typeof team !== 'undefined') {
        for (var i = 0; i < data.length; i++) {
            // Team is equal to the home or away team
            //console.log(team == (data[i].home_team || data[i].away_team));
            // Team is equal to the home or away team
            // console.log(team);
            // console.log(data[i].home_team);
            // console.log(data[i].away_team);

            // console.log(team === data[i].home_team || team === data[i].away_team);
            if (team === data[i].home_team || team === data[i].away_team) {
                //assigning the 
                var h2h = data[i].bookmakers[0].markets[0];
                var spreads = data[i].bookmakers[0].markets[1];
                var totals = data[i].bookmakers[0].markets[2];
                var gameTime = data[i].commence_time;
                // console.log(gameTime);
                // console.log(h2h);
                // console.log(spreads);
                // console.log(totals);

                //
                teamTitle.textContent = team + ' Game  Odds';

                time.textContent = gameTime;
                oddsData.appendChild(time);

                var geth2h = Object.keys(h2h.outcomes[0]);
                mLine.innerHTML = h2h.key + ': ' + h2h.outcomes[0].name + '-' + geth2h[1] + h2h.outcomes[0].price +
                    '<br>' + h2h.outcomes[1].name + geth2h[1] + '-' + h2h.outcomes[1].price + '</br>';
                oddsData.appendChild(mLine);

                var getPoints = Object.keys(spreads.outcomes[0]);
                points.innerHTML = spreads.key + ': ' + '<br>' + spreads.outcomes[0].name + '<br>' + getPoints[2] + spreads.outcomes[0].point + '<br>' + spreads.outcomes[1].name + getPoints[2] + '-' + spreads.outcomes[1].point + '</br>';
                oddsData.appendChild(points);

                var getTotals = Object.keys(totals.outcomes[0]);
                overUnder.innerHTML = totals.key + ': ' + totals.outcomes[0].name + '<br>' + getTotals[2] + totals.outcomes[0].point + getTotals[1] + totals.outcomes[1].price + '</br>';

                oddsData.appendChild(overUnder);  

                //consolelogs to prove its working!
                // console.log(h2h.key + ': ' + h2h.outcomes[0].name + '-' + geth2h[1] + h2h.outcomes[0].price +
                //     '<br>' + h2h.outcomes[1].name + geth2h[1] + '-' + h2h.outcomes[1].price + '</br>');

                // console.log(spreads.key + ': ' + '<br>' + spreads.outcomes[0].name + '<br>' + getPoints[2] + spreads.outcomes[0].point + '<br>' + spreads.outcomes[1].name + getPoints[2] + '-' + spreads.outcomes[1].point + '</br>')

                // console.log(totals.key + ': ' + totals.outcomes[0].name + '<br>' + getTotals[2] + totals.outcomes[0].point + getTotals[1] + totals.outcomes[1].price + '</br>');
            }
        }
    } else {
        return ('No Games');
    }

}
getResults();