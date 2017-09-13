function genPlayer(playerName, position){
  player = {};
  player.name = playerName;
  player.position = position;
  return player;
}

function genLeague(teams){
  league = {};
  league.teams = teams;
  return league;
}

function genTeam(teamName){
  team = {};
  team.name = teamName;
  team.players = [];
  return team;
}

function addPlayer(team, player){
  team.players.push(player);
}
