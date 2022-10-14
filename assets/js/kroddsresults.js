//Global variables 
var oddsData = document.getElementById('team-info')
var teamTitle = document.querySelector('#info')
var time = document.createElement('p');
var mLine = document.createElement('p');
var overUnder = document.createElement('p');
var points = document.createElement('p')

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fd9ae227a5msh7fab780ac9390e9p1b0513jsn65de5f23bffa',
        'X-RapidAPI-Host': 'odds.p.rapidapi.com',
    credentials: 'include'
    }
};
//Create global variables for input
// var sport = document.querySelector('#sport-text');
// var input = document.querySelector('#team');


//Start function to generate odds for team/game
function getOdds(league,team) {
    // console.log(sport.value);
    // var league ='americanfootball_nfl';
    //var league = sport.value;
    localStorage.setItem("League",JSON.stringify(league));
    localStorage.setItem("Team",JSON.stringify(team));

    console.log('function starts!')

    var oddsUrl ='https://odds.p.rapidapi.com/v4/sports/'+league+'/odds?markets=h2h,spreads,totals&regions=us&bookmakers=fanduel';
    //var team = input.value;
    // var team = 'Atlanta Falcons';
    fetch(oddsUrl, options) 
        .then(function (response){
            // console.log(response)
            // if (response.ok){
        
            return response.json();
        // }
    })
    .then(function (data) {
        // console.log(data);
        // console.log(team);
        // console.log(typeof team !== 'undefined');

        //if team input is defined
        localStorage.setItem("TeamData",JSON.stringify(data));

    });
}

