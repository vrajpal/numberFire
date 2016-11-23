var express = require('express');
var games = require('./data/games.json');
var teams = require('./data/teams.json');
var gameState = require('./data/game_state.json');
var players = require('./data/players.json');
var playerStats = require('./data/player_stats.json');

var app = express();

app.use(express.static('dest'));


app.get('/games', function (req, res) {
   var date = req.query.date;
  console.log(date);
  var month = date.substring(0,2);
  var day = date.substring(2,4);
  var year = date.substring(4);
  var conString = month+'/'+day+'/'+year;
  var jsonStr = '{"teams":[]}';
  var returnJson = JSON.parse(jsonStr);
  var teamsHolder = [];
  for(var j = 0; j < teams.Teams.length; j++){
    var obj = {};
    obj.abbrev = teams.Teams[j].abbrev;
    obj.full_name = teams.Teams[j].full_name;
    teamsHolder[j+1] = obj;
  }
  console.log(teamsHolder);
  var gameStateHolder = [];
  for(var j = 0; j < gameState.GameState.length; j++){
    var obj = {};
    obj.home_team_score = gameState.GameState[j].home_team_score;
    obj.away_team_score = gameState.GameState[j].away_team_score;
    obj.broadcast = gameState.GameState[j].broadcast;
    obj.quarter = gameState.GameState[j].quarter;
    obj.time_left = gameState.GameState[j].time_left_in_quarter;
    obj.game_status = gameState.GameState[j].game_status;
    gameStateHolder[gameState.GameState[j].game_id] = obj;
  }
  console.log(gameStateHolder);
  console.log(conString);
  for (var i = 0; i < games.Games.length; i++){
    // look for the entry with a matching `code` value
    if (games.Games[i].date == conString){
      var team = {};
      var game_id = games.Games[i].id;
      var home_team_id = games.Games[i].home_team_id;
      var away_team_id = games.Games[i].away_team_id;
      // console.log(home_team_id);
      // console.log(teamsHolder[home_team_id].full_name);
      var homeTeamName = teamsHolder[home_team_id].full_name;
      var homeTeamAbbrev = teamsHolder[home_team_id].abbrev;
      var awayTeamName = teamsHolder[away_team_id].full_name;
      var awayTeamAbbrev = teamsHolder[away_team_id].abbrev;
      var homeTeamScore = gameStateHolder[game_id].home_team_score
      var awayTeamScore = gameStateHolder[game_id].away_team_score
      var broadCast = gameStateHolder[game_id].broadcast;
      var time_left = gameStateHolder[game_id].time_left;
      var game_status = gameStateHolder[game_id].game_status;
      var quarter = gameStateHolder[game_id].quarter;
      team.homeTeamName = homeTeamName;
      team.homeTeamAbbrev = homeTeamAbbrev;
      team.homeTeamScore = homeTeamScore;
      team.awayTeamName = awayTeamName;
      team.awayTeamAbbrev = awayTeamAbbrev;
      team.awayTeamScore = awayTeamScore;
      team.broadCast = broadCast;
      team.time_left = time_left;
      team.game_status = game_status;
      team.quarter = quarter;

      returnJson['teams'].push(team);
    }
  }
  jsonStr = JSON.stringify(returnJson);
  console.log(jsonStr);
  res.send(jsonStr);
  //res.send('Hello World!');
});

app.get('/leaders', function(req, res) { 
  var leaders = [];
  var gameId = req.query.game_id;
  var jsonStr = '{"leaders":[]}';
  var obj = JSON.parse(jsonStr);
  for(var i = 0; i < playerStats.PlayerStats.length; i++){
    //console.log(playerStats.PlayerStats[i].nerd);
    if(playerStats.PlayerStats[i].game_id == gameId){
      leaders.push(playerStats.PlayerStats[i]);
    }
  }
  leaders.sort(compare);

  var playersHolder = [];
  for(var idx = 0; idx < players.Players.length; idx++) {
    playersHolder[idx + 1] = players.Players[idx].name;
  }

  var playerStatsHolder = [];
  for(var idx = 0; idx < playerStats.PlayerStats.length; idx++) {
    var playerId = playerStats.PlayerStats[idx].player_id;
    var nerdScore = playerStats.PlayerStats[idx].nerd;
    playerStatsHolder[nerdScore] = playerId;
  }
  
  var secondMaxNerdScore = leaders[leaders.length - 2].nerd;
  var maxNerdScore = leaders[leaders.length - 1].nerd;
  console.log(leaders);
  
  var maxScorePlayerLookup = playerStatsHolder[maxNerdScore];
  var maxScoreName = playersHolder[maxScorePlayerLookup];

  console.log("Max Score: " + maxScoreName);

  var secondMaxScorePlayerLookup = playerStatsHolder[secondMaxNerdScore];
  var secondMaxScoreName = playersHolder[secondMaxScorePlayerLookup];

  console.log("Second Max Score: " + secondMaxScoreName);

  res.send("end it");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


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