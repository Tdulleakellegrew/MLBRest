module.exports = {
  genPlayer: function (playerName, position){
    player = {};
    player.name = playerName;
    player.position = position;
    return player;
  },

  genLeague: function (teams){
    league = {};
    league.teams = teams;
    return league;
  },

  genTeam: function (teamName){
    team = {
      name : teamName,
      players : [],
      addPlayer: function (player){
        this.players.push(player);
      }
    }
    return team;
  },


}
