const jsonQuery = require('json-query');
const data = require('../app_data/team_data');
module.exports = {

    allPlayersTable : function(teams){
        html = "";
        console.log(teams["bos"]);
        for (i = 0; i < data.teamArr.length; i++) {
            html += "<h2>" + data.teamArr[i].toUpperCase() + "</h2>";
            html += "<table class='table table-striped table-inverse'>";
            html += "<tr><th>Player</th><th>Position</th></tr>";
            for (j = 0; j < teams[data.teamArr[i]].Players.length; j++) {
                html += "<tr>";
                html += "<td><a href='/team/" + data.teamArr[i] + "/player/" + teams[data.teamArr[i]].Players[j].PlayerName + "'>" + 
                        teams[data.teamArr[i]].Players[j].PlayerName + "</a></td><td>" + teams[data.teamArr[i]].Players[j].Position + "</td>";
                html += "</tr>";
            }
            html += "</table>";
        }
        return html;
    },

    teamTable : function(teams, id){
        html = "";
        html += "<h2>" + id.toUpperCase() + "</h2>";
        html += "<table class='table table-striped table-inverse'>";
        html += "<tr><th>Player</th><th>Position</th></tr>";
        for (j = 0; j < teams[id].Players.length; j++) {
            html += "<tr>";
            html += "<td><a href='/team/" + id + "/player/" + teams[id].Players[j].PlayerName + "'>" + teams[id].Players[j].PlayerName + "</a></td><td>" + teams[id].Players[j].Position + "</td>";
            html += "</tr>";
        }
        html += "</table>";
        return html;
    },

    playerByPositionTable : function(teams, pos){
        html = "";
        html += "<table class='table table-striped table-inverse'>";
        html += "<tr><th>Team</th><th>Player</th><th>Position</th></tr>";
        for (i = 0; i < data.teamArr.length; i++) {
            players = jsonQuery(data.teamArr[i] + '.Players[*Position=' + pos.toUpperCase() + ']', { data: teams }).value;
            //html += "<h2>" + teamArr[i].toUpperCase() + "</h2>";
            for (j = 0; j < players.length; j++) {
                html += "<tr>";
                html += "<td>" + data.teamArr[i].toUpperCase() + "</td><td><a href='/team/" + data.teamArr[i] + "/player/" + players[j].PlayerName + "'>" + players[j].PlayerName + "</a></td><td>" + players[j].Position + "</td>";
                html += "</tr>";
            }
        }
        html += "</table>";
        return html;
    },

    singlePlayer : function(teams, team, id){
        html = "";
        html += "<table class='table table-striped table-inverse'>";
        player = jsonQuery(team.toLowerCase() + '.Players[PlayerName=' + id.replace("%20", " ") + ']', { data: teams }).value;
        if (player.Position == "P") {
            html += "<tr><th>Player Name</th><th>Position</th><th>W</th><th>L</th><th>ERA</th><th>G</th><th>GS</th><th>SV</th><th>IP</th><th>SO</th><th>WHIP</th></tr>";
            html += "<tr><td>" + player.PlayerName + "</td><td>" + player.Position + "</td><td>" + player.W + "</td><td>" + player.L + "</td><td>" + player.ERA + "</td><td>" + player.G + "</td><td>" +
                player.GS + "</td><td>" + player.SV + "</td><td>" + player.IP + "</td><td>" + player.SO + "</td><td>" + player.WHIP + "</td></tr>";
        } else {
            html += "<tr><th>Player Name</th><th>Position</th><th>AB</th><th>R</th><th>H</th><th>HR</th><th>RBI</th><th>SB</th><th>AVG</th><th>OBP</th><th>OPS</th></tr>";
            html += "<tr><td>" + player.PlayerName + "</td><td>" + player.Position + "</td><td>" + player.AB + "</td><td>" + player.R + "</td><td>" + player.H + "</td><td>" + player.HR + "</td><td>" +
                player.RBI + "</td><td>" + player.SB + "</td><td>" + player.AVG + "</td><td>" + player.OBP + "</td><td>" + player.OPS + "</td></tr>";
        }
        html += "</table>";
        return html;
    }
}