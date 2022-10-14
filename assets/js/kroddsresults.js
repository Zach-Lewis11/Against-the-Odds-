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

        if (typeof team !== 'undefined'){
            for (var i = 0; i < data.length; i++) {
                // Team is equal to the home or away team
                //console.log(team == (data[i].home_team || data[i].away_team));
                // Team is equal to the home or away team
                // console.log(team);
                // console.log(data[i].home_team);
                // console.log(data[i].away_team);

                // console.log(team === data[i].home_team || team === data[i].away_team);
                if (team === data[i].home_team || team === data[i].away_team){
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
                    // teamTitle.textContent = team + ' Game  Odds';

                    time.textContent = gameTime;
                    // oddsData.appendChild(time);

                    var geth2h = Object.keys(h2h.outcomes[0]);
                    mLine.innerHTML = h2h.key + ': ' + h2h.outcomes[0].name + '-' + geth2h[1] + h2h.outcomes[0].price + 
                    '<br>' +  h2h.outcomes[1].name + geth2h[1] + '-' + h2h.outcomes [1].price + '</br>';
                    // oddsData.appendChild(mLine);
                    
                    var getPoints = Object.keys(spreads.outcomes[0]);
                    points.innerHTML = spreads.key + ': ' + '<br>' + spreads.outcomes[0].name + '<br>' + getPoints[2] + spreads.outcomes[0].point + '<br>' +  spreads.outcomes[1].name + getPoints[2] + '-' + spreads.outcomes[1].point + '</br>';
                    // oddsData.appendChild(points);

                    var getTotals = Object.keys(totals.outcomes[0]);
                    overUnder.innerHTML = totals.key + ': ' + totals.outcomes[0].name + '<br>' + getTotals[2] + totals.outcomes[0].point + getTotals[1]  + totals.outcomes[1].price + '</br>';
                    
                    // oddsData.appendChild(overUnder);  

                    //consolelogs to prove its working!
                    console.log(h2h.key + ': ' + h2h.outcomes[0].name + '-' + geth2h[1] + h2h.outcomes[0].price + 
                    '<br>' +  h2h.outcomes[1].name + geth2h[1] + '-' + h2h.outcomes [1].price + '</br>');

                    console.log(spreads.key + ': ' + '<br>' + spreads.outcomes[0].name + '<br>' + getPoints[2] + spreads.outcomes[0].point + '<br>' +  spreads.outcomes[1].name + getPoints[2] + '-' + spreads.outcomes[1].point + '</br>')

                    console.log(totals.key + ': ' + totals.outcomes[0].name + '<br>' + getTotals[2] + totals.outcomes[0].point + getTotals[1]  + totals.outcomes[1].price + '</br>');
                }
            }
        }else {
            return('No Games');
        }

    });
}
