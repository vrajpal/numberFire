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
  // if date is sent in an invalid format send an error
  if(date.length < 8){
    res.status(400).send("Invalid date.");
  } else {
    var month = date.substring(0,2);
    var day = date.substring(2,4);
    var year = date.substring(4);
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
  if(gameId < 0) {
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

    var playerStatsHolder = [];
    //create lookup table where nerdscore is key and value is corresponding stat object
    for(var idx = 0; idx < playerStats.PlayerStats.length; idx++) {
      var playerId = playerStats.PlayerStats[idx].player_id;
      var nerdScore = playerStats.PlayerStats[idx].nerd;
      playerStatsHolder[nerdScore] = playerStats.PlayerStats[idx];
    }

    // from the sorted leaders array grab the top two performers
    var secondMaxNerdScore = leaders[leaders.length - 2].nerd;
    var maxNerdScore = leaders[leaders.length - 1].nerd;

    //build object and add to JSON
    var leader1 = buildLeaderObject(playerStatsHolder, playersHolder, maxNerdScore);
    returnJson['leaders'].push(leader1);
    var leader2 = buildLeaderObject(playerStatsHolder, playersHolder, secondMaxNerdScore);
    returnJson['leaders'].push(leader2);
    jsonStr = JSON.stringify(returnJson);
    res.send(jsonStr);
  }
  
});

app.listen(3000, function () {
  console.log('numberFire listening on port 3000!');
});

// compare function that sorts on nerdscores and breaks ties with points
function compare(a, b) {
  if(a.nerd > b.nerd) {
    return 1;
  }
  if(a.nerd < b.nerd) {
    return -1;
  }
  if(a.nerd === b.nerd) {
    if(a.points > b.points){
      return 1;
    } else {
      return -1;
    }
  }
}

//takes the two lookup tables and nerd score for a player and compiles relavant
//info and returns object 
function buildLeaderObject(playerStatsHolder, playersHolder, nerdScore){
  var leader = {};
  var playerInfo = playersHolder[playerStatsHolder[nerdScore].player_id];
  var playerStats = playerStatsHolder[nerdScore];
  leader.leaderName = playerInfo.name;
  leader.teamId = playerInfo.team_id;
  leader.nerd = nerdScore;
  leader.points = playerStats.points;
  leader.assists = playerStats.assists;
  leader.rebounds = playerStats.rebounds;
  return leader;
}