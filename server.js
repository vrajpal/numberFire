var express = require('express');
var games = require('./data/games.json');
var teams = require('./data/teams.json');
var gameState = require('./data/game_state.json');
var players = require('./data/players.json');
var playerStats = require('./data/player_stats.json');

var app = express();

//set express to search for static content in dest folder by default
app.use(express.static('dest'));

// games route which returns games and scores on a given date
// date must be given in all numerical fashion *MMDDYEAR* ]
// example date: Jan 1 2016 => 01012016
app.get('/games', function (req, res) {

  var date = req.query.date;
  //if no date is given in query parameter
  if(date === undefined){
    res.status(400).send('No date provided');
    // if date is sent in an invalid format send an error
  } else if (date.length < 8){
    res.status(400).send('Invalid date.');
  } else {
    var month = date.substring(0,2);
    var day = date.substring(2,4);
    var year = date.substring(4);
    var validDate = new Date(year, month, day);
    console.log(validDate);
    if(validDate == 'Invalid Date'){ 
      res.status(400).send('Invalid Date');
      return;
    }
    var conString = month+'/'+day+'/'+year;
    var jsonStr = '{"teams":[]}';
    var returnJson = JSON.parse(jsonStr);
    var teamsHolder = [];
    // loops to form a key to object mapping of team information
    // the key being team id (index of array) and value being corresponding object
    for(var j = 0; j < teams.Teams.length; j++){
      teamsHolder[j+1] = teams.Teams[j];
    }
    var gameStateHolder = [];
    // 
    for(var j = 0; j < gameState.GameState.length; j++){
      gameStateHolder[gameState.GameState[j].game_id] = gameState.GameState[j];
    }
    for (var i = 0; i < games.Games.length; i++){
      // look for the entries with matching dates
      // use look up tables formed about to compile all relavant info 
      if (games.Games[i].date == conString){
        var team = {};
        var game_id = games.Games[i].id;
        var home_team_id = games.Games[i].home_team_id;
        var away_team_id = games.Games[i].away_team_id;
        team.homeTeamName = teamsHolder[home_team_id].full_name;
        team.homeTeamAbbrev = teamsHolder[home_team_id].abbrev;
        team.awayTeamName = teamsHolder[away_team_id].full_name;
        team.awayTeamAbbrev = teamsHolder[away_team_id].abbrev;
        team.homeTeamScore = gameStateHolder[game_id].home_team_score
        team.awayTeamScore = gameStateHolder[game_id].away_team_score
        team.broadCast = gameStateHolder[game_id].broadcast;
        team.time_left = gameStateHolder[game_id].time_left;
        team.game_status = gameStateHolder[game_id].game_status;
        team.quarter = gameStateHolder[game_id].quarter;
        returnJson['teams'].push(team);
      }
    }
    jsonStr = JSON.stringify(returnJson);
    // return JSON
    res.send(jsonStr);
  }
  
});

app.get('/leaders', function(req, res) { 
  var gameId = req.query.game_id;
  if(gameId === undefined){ 
    res.status(400).send('No game_id provided');
    // if date is sent in an invalid format send an error
  } else if(isNaN(parseInt(gameId))) {
    res.status(400).send('Is not a valid number');
  } else if(gameId < 0) {
    res.status(400).send('Invalid ID');
  } else {
    var leaders = [];
    var jsonStr = '{"leaders":[]}';
    var returnJson = JSON.parse(jsonStr);
    // find all players associated with the game id
    for(var i = 0; i < playerStats.PlayerStats.length; i++){
      if(playerStats.PlayerStats[i].game_id == gameId){
        leaders.push(playerStats.PlayerStats[i]);
      }
    }
    // sort by nerd score (see compare function below)
    leaders.sort(compare);
    // create lookup table where index is player id and value is corresponding player object
    var playersHolder = [];
    for(var idx = 0; idx < players.Players.length; idx++) {
      playersHolder[idx + 1] = players.Players[idx];
    }
    for(var j = 0; j < leaders.length; j++){
      var leader = buildLeaderObject(playersHolder, leaders[j]);
      returnJson['leaders'].push(leader);
    }
    jsonStr = JSON.stringify(returnJson);
    res.send(jsonStr);
  }
  
});

app.listen(3000, function () {
  console.log('numberFire listening on port 3000!');
});

// compare function that sorts on nerdscores and breaks ties with points
function compare(a, b) {
  if(a.nerd < b.nerd) {
    return 1;
  }
  if(a.nerd > b.nerd) {
    return -1;
  }
  if(a.nerd === b.nerd) {
    if(a.points < b.points){
      return 1;
    } else {
      return -1;
    }
  }
}

function buildLeaderObject(playersHolder, playerStats){
    var leader = {};
    var playerInfo = playersHolder[playerStats.player_id];
    leader.leaderName = playerInfo.name;
    leader.teamId = playerInfo.team_id;
    leader.nerd = playerStats.nerd;
    leader.points = playerStats.points;
    leader.assists = playerStats.assists;
    leader.rebounds = playerStats.rebounds;
    return leader;
}