objects = require('../app_code/team')
jsonQuery = require('json-query')
data = require('../app_data/team_data');
module.exports = {
    playersByPosition : function(teams, pos){
        league = objects.genLeague();
        for (i = 0; i < data.teamArr.length; i++) {
            team = objects.genTeam(data.teamArr[i]);
            players = jsonQuery(data.teamArr[i] + '.Players[*Position=' + pos.toUpperCase() + ']', { data: teams }).value;
            for (j = 0; j < players.length; j++) {
               team.addPlayer(players[j]);
            }
            league.addTeam(team);
        }
        return league;
    },

    singlePlayer : function(teams, team, id){
        console.log(team);
        console.log(id);
        player = jsonQuery(team.toLowerCase() + '.Players[PlayerName=' + id.replace("%20", " ") + ']', { data: teams }).value;
        console.log(player);
        return player;
    }
}