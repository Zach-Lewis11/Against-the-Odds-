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
        console.log(location);
        console.log(name);
        getLatLong(location);
        
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
            //for loop through entire hourly data
            //if datetime === gameDate && gameTime
                //then pull weather data
                //print weather data to card
                //create an object from data
            //print object to local storage if user denotes as a favorite



            // console.log(dat);
            // console.log(dat.data[0].datetime);
            // console.log(dat.data[0].wind_spd);
            // console.log(dat.data[0].precip);
            // console.log(dat.data[0].clouds);
            // console.log(dat.data[0].snow);
            // console.log(dat.data[0].uv);
            // console.log(dat.data[0].temp);
            // //relative humidity
            // console.log(dat.data[0].rh);
            // console.log(dat.data[0].weather.icon);
            // console.log(dat.data[0].weather.description);
            // //call function here to render html to display data
        });
}


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

// }


// function renderForcast(data) {
//     var counter = 1;
//     var obj = {};


//     //loop to pull data in 24 hour increments, data is in 3s so index is at 8
//     for (var i = 0; i < data.list.length; i += 8) {
//         //add header to the forcast section
//         fiveDay.textContent = "5 Day Forecast: ";
//         //assigned variables for data required
//         var forcastDate = data.list[i].dt_txt
//         var forcastTemp = data.list[i].main.temp;
//         var forcastWind = data.list[i].wind.speed;
//         var forcastHumid = data.list[i].main.humidity;
//         //created a string from the counter to push data to each element sequentially
//         var string = counter.toString()
//         var doc = document.getElementById(string);
//         //created the necessary elements
//         var header = document.createElement("h3");
//         var pOne = document.createElement("p");
//         var pTwo = document.createElement("p");
//         var pThree = document.createElement("p");
//         //print data to page
//         header.textContent = forcastDate;
//         pOne.textContent = "Temp: " + forcastTemp + 'F';
//         pTwo.textContent = "Wind: " + forcastWind + 'mph';
//         pThree.textContent = "Humidity: " + forcastHumid + "%";
//         //append the element to the parent doc
//         doc.appendChild(header);
//         doc.appendChild(pOne);
//         doc.appendChild(pTwo);
//         doc.appendChild(pThree);
//         //add data to the object
//         obj.Day = forcastDate;
//         obj.Temp = forcastTemp;
//         obj.Wind = forcastWind;
//         obj.Humidity = forcastHumid;
//         counter++;
//         //push data to the array
//         arr.push(obj);
//     }
//     console.log(arr);
// }
