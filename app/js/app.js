"use strict";

function test() {
    console.log("connected!");
}

function getCurrentGame() {
    var holder = document.getElementById("selected-score");
    console.log(holder);
    var gameInfo = {};
    gameInfo.team1 = holder.getElementsByClassName("mascot")[0].innerText;
    gameInfo.team2 = holder.getElementsByClassName("mascot")[1].innerText;

    
}