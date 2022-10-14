var selectedTeam = "";
var mainButton = document.querySelector('#main-button');
var modal = document.querySelector('.modal');
var modalBackground = document.querySelector('.modal-background');

var MLB = document.querySelector('.MLB');
var NFL = document.querySelector('.NFL');
var NBA = document.querySelector('.NBA');
var MLS = document.querySelector('.MLS');

var baseball = document.querySelector('.field-1');
var football = document.querySelector('.field-2');
var basketball = document.querySelector('.field-3');
var soccer = document.querySelector('.field-4');

var league = document.getElementById('league');

var MLBteams = document.getElementById('MLBteams');
var NFLteams = document.getElementById('NFLteams');
var NBAteams = document.getElementById('NBAteams');
var MLSteams = document.getElementById('MLSteams');

//Event listeners for teams
MLBteams.addEventListener('change', (e) => {
    selectedTeam = e.target.value;
    //code from keshons JS
    var league = 'baseball_mlb'
    console.log(league + selectedTeam);
    getOdds(league, selectedTeam);
});

NFLteams.addEventListener('change', (e) => {
    selectedTeam = e.target.value;
    var league = 'americanfootball_nfl';
    //code from keshons JS
    getOdds(league, selectedTeam);
});

NBAteams.addEventListener('change', (e) => {
    selectedTeam = e.target.value;
    //code from keshons JS
    var league = 'basketball_nba';
    getOdds(league, selectedTeam);
});

MLSteams.addEventListener('change', (e) => {
    selectedTeam = e.target.value;
    //code from keshons JS
    var league = 'soccer_usa_mls';
    getOdds(league, selectedTeam);
});

//Event listeners for opening and closing the modal
mainButton.addEventListener('click', () => {
    modal.classList.add('is-active');
    football.classList.add('is-hidden');
    basketball.classList.add('is-hidden');
    soccer.classList.add('is-hidden');
    baseball.classList.add('is-hidden');
});

modalBackground.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

//Event listener for options within the modal
league.addEventListener('change', (e) => {
    var choice = e.target.value;
    // console.log(choice);
    baseball.classList.add('is-hidden');
    football.classList.add('is-hidden');
    basketball.classList.add('is-hidden');
    soccer.classList.add('is-hidden');

    if (choice === "MLB") {
        baseball.classList.remove('is-hidden');
    } else if (choice === "NFL") {
        football.classList.remove('is-hidden');
    } else if (choice === "NBA") {
        basketball.classList.remove('is-hidden');
    } else if (choice === "MLS") {
        soccer.classList.remove('is-hidden');
    } 

});

//do {
 //   console.log(selectedTeam);
//} while (typeof selectedTeam == "undefined")

