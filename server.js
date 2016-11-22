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
  var obj = JSON.parse(jsonStr);

  console.log(conString);
  for (var i = 0; i < games.Games.length; i++){
    // look for the entry with a matching `code` value
    if (games.Games[i].date == conString){
      // we found it
      // obj[i].name is the matched result
      var team = {};
      var game_id = games.Games[i].id;
      var home_team_id = games.Games[i].home_team_id;
      var away_team_id = games.Games[i].away_team_id;
      console.log(home_team_id);
      console.log(away_team_id);
      for (var j = 0; j < teams.Teams.length; j++){
        if(teams.Teams[j].id == home_team_id){
          team.home_team_id = teams.Teams[j].full_name;
        }
        if(teams.Teams[j].id == away_team_id){
          team.away_team_id = teams.Teams[j].full_name;
        }
      }
      console.log(gameState);
      for (var k = 0; k < gameState.GameState.length; k++){
        if(gameState.GameState[k].game_id == game_id){
          team.home_team_score = gameState.GameState[k].home_team_score;
          team.away_team_score = gameState.GameState[k].away_team_score;
        }
      }
      obj['teams'].push(team);
    }
  }
  jsonStr = JSON.stringify(obj);
  console.log(jsonStr);
  res.send(jsonStr);
  //res.send('Hello World!');
});

app.get('/leaders', function(req, res) { 
  var gameId = req.query.game_id;
  console.log(gameId);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
