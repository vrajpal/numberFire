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
 var players = [];
  for(var d = 0; d < players.Players.length; d++)
  {
    players[d] = players.Players[d].name;
  }

  console.log(leaders);
  for(var j = 0; j < leaders.length; j++){
    // output
    leaders[j].player_id
  }  
  res.send("end it");