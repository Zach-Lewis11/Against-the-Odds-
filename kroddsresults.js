// var formCard = document.querySelector ('form')


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fd9ae227a5msh7fab780ac9390e9p1b0513jsn65de5f23bffa',
        'X-RapidAPI-Host': 'odds.p.rapidapi.com',
    credentials: 'include'
    }
};

var sport = document.querySelector('#sport-text');
var input = document.querySelector('#team')
//Fetches all sports

function getOdds(event) {
    event.preventDefault();
    console.log(sport.value);
    var oddsUrl ='https://odds.p.rapidapi.com/v4/sports/'+sport.value+'/odds?markets=h2h,spreads,totals&regions=us&bookmakers=fanduel';
    var team = input.value;
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
        if (typeof team !== 'undefined'){
            for (var i = 0; i < data.length; i++) {
                console.log(team == (data[i].home_team || data[i].away_team));
                if (team == (data[i].home_team || data[i].away_team)){
                    var h2h = data[i].bookmakers[0].markets[0];
                    var spreads = data[i].bookmakers[0].markets[1];
                    var totals = data[i].bookmakers[0].markets[2];
                    console.log(h2h);
                    console.log(spreads);
                    console.log(totals);
                }
            }
        }else {
            console.log('No Games');
        }
    });
}
var form = document.getElementById('form');
form.addEventListener('submit', getOdds);
