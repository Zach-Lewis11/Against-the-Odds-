const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fd9ae227a5msh7fab780ac9390e9p1b0513jsn65de5f23bffa',
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
};
//Fetches all sports
fetch('https://odds.p.rapidapi.com/v4/sports?all=true', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

//Fetches odds (can choose only one region per time)
fetch('https://odds.p.rapidapi.com/v4/sports/upcoming/odds?regions=us', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
//Fetches scores (must choose a sport, can choose from up to three days ago)
fetch('https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/scores?daysFrom=3', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

//console.log('Remaining requests',response.headers['x-requests-remaining'])
//console.log('Used requests',response.headers['x-requests-used'])





