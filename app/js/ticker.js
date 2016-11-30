"use strict";
//example ajax call using endpoints set up on the server I created
function getGames(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'games?date=01012016');
    xhr.onload = function() {
        if (xhr.status === 200) {
            processGames(xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

function processGames(data) {
    var games = JSON.parse(data);
    for(var i = 0; i < games.teams.length; i++){
        console.log(games.teams[i].homeTeamName);
        getLeaders(games);
    }
}

getGames();

function getLeaders(game){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'leaders?game_id=' + game.id);
    xhr.onload = function() {
        if (xhr.status === 200) {
            processGames(xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

function processLeaders(data, game) {
    var leaders = JSON.parse(data);
    for(var i = 0; i < leaders.length; i++){
        if(leaders[i].teamId === game.home_team_id){
            console.log(leaders[i]);
             break;
        } 
    }
    for(var i = 0; i < leaders.length; i++){
        if(leaders[i].teamId === game.away_team_id){
            console.log(leaders[i]);
             break;
        } 
    }
}
