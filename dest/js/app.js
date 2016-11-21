"use strict";

function test() {
    console.log("connected!");
}

var selected_game;
var game1 = {
    team1: {
        mascot: "Warriors",
        initials: "GSW",
        score: "96",
        leader: {
            name: "S. Curry, PG",
            line: "23 points, 6 assists"
        }
    },
    team2: {
        mascot: "Thunder",
        initials: "OKC",
        score: "81",
        leader: {
            name: "K. Durant, SF",
            line: "30 points, 9 rebounds"
        }
    },
    state: "7:34 4th &middot; TV: ESPN"
};
var game2 = {
    team1: {
        mascot: "Bulls",
        initials: "CHI",
        score: "56",
        leader: {
            name: "D. Wayde, SG",
            line: "15 points, 3 assists"
        }
    },
    team2: {
        mascot: "Celtics",
        initials: "BOS",
        score: "54",
        leader: {
            name: "I. Thomas, PG",
            line: "30 points, 10 assists"
        }
    },
    state: "6:33 3rd &middot; TV: ESPN"
};
var game3 = {
    team1: {
        mascot: "Hawks",
        initials: "ATL",
        score: "26",
        leader: {
            name: "K. Korver, SG",
            line: "10 points, 2 assists"
        }
    },
    team2: {
        mascot: "Grizzlies",
        initials: "MEM",
        score: "24",
        leader: {
            name: "Z. Randolph, PF",
            line: "10 points, 3 rebounds"
        }
    },
    state: "12:00 2nd"
};





function getCurrentGame() {
    var holder = document.getElementById("selected-score");
    console.log(holder);
    var gameInfo = {
        team1: {},
        team2: {}
    };
    gameInfo.team1.mascot = holder.getElementsByClassName("mascot")[0].innerText;
    gameInfo.team1.score = holder.getElementsByClassName("score")[0].innerHTML;
    gameInfo.team2.mascot = holder.getElementsByClassName("mascot")[1].innerText;
    gameInfo.team2.score = holder.getElementsByClassName("score")[1].innerHTML;
    console.log(gameInfo);        
}