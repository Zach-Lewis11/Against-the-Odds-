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
var team = document.querySelector('#team')
//Fetches all sports

function getOdds(event) {
    event.preventDefault();
    var oddsUrl ='https://odds.p.rapidapi.com/v4/sports/'+sport.value+'/odds?markets=h2h,spreads,totals&regions=us&bookmakers=fanduel';
    
    fetch(oddsUrl, options) 
        .then(function (response){
            console.log(response)
            if (response.ok){
        
            return response.json();
        }})
    .then(function (data) {
        console.log(data);
        console.log(typeof team !== 'undefined');
        if (typeof team !== 'undefined'){
            // console.log(data[0].bookmakers[0].markets[0]);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].bookmakers[0].markets[0]);
                // console.log(team === (data[i].home_team || data[i].away_team));
            // if (team === (data[i].home_team || data[i].away_team)){
            //     console.log (document.location.data[i].key);
            //     console.log(document.location.data[i].outcomes);
            }
                
        }
});
}

var submitBtn = document.querySelector('#submitbtn')
submitBtn.addEventListener('click', getOdds);
