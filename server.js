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
  for (var i = 0; i < games.Games.length; i++){
    // look for the entry with a matching `code` value
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
  res.send(jsonStr);
});

app.get('/leaders', function(req, res) { 
  var leaders = [];
  var gameId = req.query.game_id;
  var jsonStr = '{"leaders":[]}';
  var returnJson = JSON.parse(jsonStr);
  for(var i = 0; i < playerStats.PlayerStats.length; i++){
    //console.log(playerStats.PlayerStats[i].nerd);
    if(playerStats.PlayerStats[i].game_id == gameId){
      leaders.push(playerStats.PlayerStats[i]);
    }
  }
  leaders.sort(compare);

  var playersHolder = [];
  for(var idx = 0; idx < players.Players.length; idx++) {
    playersHolder[idx + 1] = players.Players[idx];
  }

  var playerStatsHolder = [];
  for(var idx = 0; idx < playerStats.PlayerStats.length; idx++) {
    var playerId = playerStats.PlayerStats[idx].player_id;
    var nerdScore = playerStats.PlayerStats[idx].nerd;
    playerStatsHolder[nerdScore] = playerStats.PlayerStats[idx];
  }

  
  var secondMaxNerdScore = leaders[leaders.length - 2].nerd;
  var maxNerdScore = leaders[leaders.length - 1].nerd;

  var leader1 = buildLeaderObject(playerStatsHolder, playersHolder, maxNerdScore);
  returnJson['leaders'].push(leader1);
  var leader2 = buildLeaderObject(playerStatsHolder, playersHolder, secondMaxNerdScore);
  returnJson['leaders'].push(leader2);
  jsonStr = JSON.stringify(returnJson);
  res.send(jsonStr);
});

app.listen(3000, function () {
  console.log('numberFire listening on port 3000!');
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
  console.log(leader);
  return leader;
}