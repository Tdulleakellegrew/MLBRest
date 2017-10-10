module.exports = {
  genPlayer: function (playerName, position){
    player = {};
    player.name = playerName;
    player.position = position;
    player.AB = AB
		player.R = R
		player.H = H
		player.HR = HR
		player.RBI = RBI
		player.SB = SB
		player.AVG = AVG
		player.OBP = OBP
		player.OPS = OPS
		player.ERA = ERA
		player.W = W
		player.L = L
		player.IP = IP
		player.SV = SV
		player.SO = SO
		player.WHIP = WHIP
		player.G = G
		player.GS = GS
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
