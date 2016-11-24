"use strict";

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
    }
}

getGames();