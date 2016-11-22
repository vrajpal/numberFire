"use strict";

var game1 = {
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
var game2 = {
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
var game3 = {
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

var selectedGame = game1;

function setTickerClicks() {
    var notSelected =  document.getElementsByClassName('not-selected');
    for(var i = 0; i < notSelected.length; i++) {
        notSelected[i].addEventListener('click', swapGame, false);
    }
}

function swapGame() {
    console.log(this);
}

setTickerClicks();