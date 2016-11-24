"use strict";
// array of games and their leaders
var games = [];
 var game1  = {
            team1: {
                mascot: 'Warriors',
                initials: 'GSW',
                score: '96',
                leader: {
                    name: 'S. Curry, PG',
                    line: '23 points, 6 assists'
                }
            },
            team2: {
                mascot: 'Thunder',
                initials: 'OKC',
                score: '81',
                leader: {
                    name: 'K. Durant, SF',
                    line: '30 points, 9 rebounds'
                }
            },
            state: '7:34 4th ',
            network: ' &middot; TV: ESPN'
        };
   var game2 =  {
            team1: {
                mascot: 'Bulls',
                initials: 'CHI',
                score: '56',
                leader: {
                    name: 'D. Wayde, SG',
                    line: '15 points, 3 assists'
                }
            },
            team2: {
                mascot: 'Celtics',
                initials: 'BOS',
                score: '54',
                leader: {
                    name: 'I. Thomas, PG',
                    line: '30 points, 10 assists'
                }
            },
            state: '6:33 3rd ',
            network: ' &middot; TV: ESPN'
        };
    var game3 =  {
            team1: {
                mascot: 'Hawks',
                initials: 'ATL',
                score: '26',
                leader: {
                    name: 'K. Korver, SG',
                    line: '10 points, 2 assists'
                }
            },
            team2: {
                mascot: 'Grizzlies',
                initials: 'MEM',
                score: '24',
                leader: {
                    name: 'Z. Randolph, PF',
                    line: '10 points, 3 rebounds'
                }
            },
            state: '12:00 2nd',
            network: ' &middot; TV: ESPN'
        }; 

    games.push(game1, game2, game3); 

var selectedGame = games.game1;

//add on click events to ticker not selected ticker games
function setTickerClicks() {
    var notSelected =  document.getElementsByClassName('not-selected');
    for(var i = 0; i < notSelected.length; i++) {
        notSelected[i].addEventListener('click', swapGame, false);
    }
}

// finds appropriate games to swap
function swapGame() {
    var newTeam = this.getElementsByClassName('team-initial')[0].innerText;
    console.log(newTeam);
    var selected = document.getElementById('selected');
    var oldTeam = selected.getElementsByClassName('team-initials')[0].innerText;
    console.log(oldTeam);
    for(var i = 0; i < games.length; i++){
        if(games[i].team1.initials === newTeam) {
            setSelectedProperties(games[i]);
        }
        if(games[i].team1.initials === oldTeam) {
            setNotSelectedProperties(this, games[i]);
        }
    }
}

//injects correct data into 'selected game' div
function setSelectedProperties(game) {
    var selected = document.getElementById('selected');
    selected.getElementsByClassName('mascot')[0].innerHTML = game.team1.mascot;
    selected.getElementsByClassName('mascot')[1].innerHTML = game.team2.mascot;
    selected.getElementsByClassName('score')[0].innerHTML = game.team1.score;
    selected.getElementsByClassName('score')[1].innerHTML = game.team2.score;
    selected.getElementsByClassName('team-initials')[0].innerHTML = game.team1.initials;
    selected.getElementsByClassName('team-initials')[1].innerHTML = game.team2.initials;
    selected.getElementsByClassName('player-name')[0].innerHTML = game.team1.leader.name;
    selected.getElementsByClassName('player-name')[1].innerHTML = game.team2.leader.name;
    selected.getElementsByClassName('player-stats')[0].innerHTML = game.team1.leader.line;
    selected.getElementsByClassName('player-stats')[1].innerHTML = game.team2.leader.line;

    document.getElementById('game-info').innerHTML = game.state + game.network;

}

// replaces the non selected div with info from former selected game
function setNotSelectedProperties(el, game) {
    el.getElementsByClassName('team-initial')[0].innerHTML = game.team1.initials;
    el.getElementsByClassName('team-initial')[1].innerHTML = game.team2.initials;
    el.getElementsByClassName('team-score')[0].innerHTML = game.team1.score;
    el.getElementsByClassName('team-score')[1].innerHTML = game.team2.score;

    el.getElementsByClassName('game-info')[0].innerHTML = game.state;
}

setTickerClicks();