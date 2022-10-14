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


function initMap(){
    //austin TX center
    var location ={
        lat: 30.2672,
        lng: -97.7431
    }
    //two options needed for the map, there are many more
    var options = {
        center: location,
        zoom: 8
    }
    //if the user has geolocation on it will center on their location
    if(navigator.geolocation){
        console.log('geolocation on');

        navigator.geolocation.getCurrentPosition( function(userLocation){
            //updates location lat and long to users lat and long
            location.lat = userLocation.coords.latitude,
            location.lng = userLocation.coords.longitude,

            //this creates the map with the user location
            map = new google.maps.Map(document.getElementById('map'),options);
            
            //generates error message if user does not want to provide location and defaults to center
        },function (error){
            console.log('user said no to provide location');
            map = new google.maps.Map(document.getElementById('map'),options);
        }
        )
    } else{
        //creates the map on the given center
        map = new google.maps.Map(document.getElementById('map'),options);
    }
    //autocomplete takes two arguments first is the html element
    autocomplete = new google.maps.places.Autocomplete(input,{
        //add up to 5 countrys
        componentRestrictions: {'country': ['us']},
        //get billed based on the fields you pull from api geometry and names are free
        fields :['geometry', 'name','formatted_address'],
        //options to customize input fields, stadium is a type
        types: ['stadium']
    });
    //add listener takes two arguments, place changed goes when you click
    autocomplete.addListener( 'place_changed', function(){
        var stadium = autocomplete.getPlace();
        var location = stadium.formatted_address;
        var name  = stadium.name;

        //re initialize values
        forcastContent.innerHTML = '';



        getLatLong(location);
<<<<<<< Updated upstream
        //print name and address
        outputStadium.innerHTML = 'Stadium Name: ' + name;
        outputAddress.innerHTML = 'Stadium Address: ' + location;
=======
>>>>>>> Stashed changes
        //print name and address
        outputStadium.innerHTML = 'Stadium Name: ' + name;
        outputAddress.innerHTML = 'Stadium Address: ' + location;
        
        //new function to save location
        saveLocation(name,location);

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
            getWeather(latitude,longitude);
            getGameForcast(latitude,longitude);
        })
        .then(function (error){
            console.log(error);
        });

}


//get the weather from the latitude and longitude from the google api 
function getWeather(lat,lon) {

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
        outputPrecip.innerHTML ='Precipitation: ' + dat.data[0].precip + ' inches of rainfall';
        outputWind.innerHTML = 'Wind Speed: ' + dat.data[0].wind_spd + 'mph';
        outputClouds.innerHTML = 'Clouds: ' + dat.data[0].clouds + "%";
        outputSnow.innerHTML = 'Snowfall: ' + dat.data[0].snow + ' inches of depth';
        //uv index
        outputUV.innerHTML ='UV Index: ' + dat.data[0].uv;
        //relative humidity
        outputRH.innerHTML ='Relative Humidity: '+ dat.data[0].rh+'%';
<<<<<<< Updated upstream
        //print data to card
        outputDesc.innerHTML = 'Weather Description: ' + dat.data[0].weather.description;
        outputTemp.innerHTML = 'Temperature: ' + dat.data[0].temp + ' degrees F';
        outputPrecip.innerHTML ='Precipitation: ' + dat.data[0].precip + ' inches of rainfall';
        outputWind.innerHTML = 'Wind Speed: ' + dat.data[0].wind_spd + 'mph';
        outputClouds.innerHTML = 'Clouds: ' + dat.data[0].clouds + "%";
        outputSnow.innerHTML = 'Snowfall: ' + dat.data[0].snow + ' inches of depth';
        //uv index
        outputUV.innerHTML ='UV Index: ' + dat.data[0].uv;
        //relative humidity
        outputRH.innerHTML ='Relative Humidity: '+ dat.data[0].rh+'%';

=======
            console.log(dat);
            console.log(dat.data[0].wind_spd);
            console.log(dat.data[0].precip);
            console.log(dat.data[0].clouds);
            console.log(dat.data[0].snow);
            console.log(dat.data[0].uv);
            console.log(dat.data[0].temp);
            //relative humidity
            console.log(dat.data[0].rh);
            console.log(dat.data[0].weather.icon);
            console.log(dat.data[0].weather.description);
            // call function here to render html to display data
>>>>>>> Stashed changes
        })

}

function getGameForcast(lat,lon){
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

            for(var i = 0;i<dat.data.length;i++){
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
                pWind.innerHTML = 'Wind Speed: ' + forcastWindSpeed+ 'mph';
                pClouds.innerHTML = 'Clouds: ' + forcastClouds + "%";
                pSnow.innerHTML = 'Snowfall: ' + forcastSnow + ' inches of depth';
                pUV.innerHTML = 'UV Index: ' + forcastUV;
                pRH.innerHTML = 'Relative Humidity: '+ forcastRH+'%';

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

<<<<<<< Updated upstream
=======

function saveLocation(stadiumName,loc){
    //initialize or pull json object in local storage
    var savedStadium = JSON.parse(localStorage.getItem("Stadium")) || [];
    //boolean value to see if something is present
    var alreadyExists = false;
    for(var i=0; i < savedStadium.length;i++){
        //searches the array for all values of name
        if(savedStadium[i].name == stadiumName){
            //if it exists we change the value to true
            alreadyExists = true;
        }
    }
    if(alreadyExists){
        console.log('exists');
    }else{
        //adding to existing object the location and name
        savedStadium.push({
            name: stadiumName,
            location: loc,
        })
        //saves it to storage and converts back to a string for JSON 
        localStorage.setItem("Stadium",JSON.stringify(savedStadium));
    }


}




// function renderHTML(){
>>>>>>> Stashed changes

function saveLocation(stadiumName,loc){
    //initialize or pull json object in local storage
    var savedStadium = JSON.parse(localStorage.getItem("Stadium")) || [];
    //boolean value to see if something is present
    var alreadyExists = false;
    for(var i=0; i < savedStadium.length;i++){
        //searches the array for all values of name
        if(savedStadium[i].name == stadiumName){
            //if it exists we change the value to true
            alreadyExists = true;
        }
    }
    if(alreadyExists){
        console.log('exists');
    }else{
        //adding to existing object the location and name
        savedStadium.push({
            name: stadiumName,
            location: loc,
        })
        //saves it to storage and converts back to a string for JSON 
        localStorage.setItem("Stadium",JSON.stringify(savedStadium));
    }


}







