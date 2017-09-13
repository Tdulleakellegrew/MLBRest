const express = require('express');
const app = express();
const rosterData = require('fs');
const jsonQuery = require('json-query');
const objects = require('./team.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', function(req, res){
	let rawdata = rosterData.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	res.send(teams);
})
app.get('/team/:id', function(req, res){
	//if(req.header("key") == "key"){
		let rawdata = rosterData.readFileSync('teams.json', 'utf8');
		let teams = JSON.parse(rawdata);
		let team = objects.genTeam(req.params.id.toLowerCase());
		for(i = 0; i < teams[req.params.id.toLowerCase()].Players.length; i++){
			player = objects.genPlayer(teams[req.params.id.toLowerCase()].Players[i].PlayerName, teams[req.params.id.toLowerCase()].Players[i].Position);
			team.addPlayer(player);
		}
		res.send(team);
	/*}
	else {
		res.send("Invalid key. Request denied.");
	}*/
})
app.get('/team/:id/:pos', function(req, res){
	let rawdata = rosterData.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	//console.log("\"" + req.params.pos + "\"");
	//console.log(jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}));
	team = objects.genTeam(req.params.id.toLowerCase());
	players = jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}).value;
	console.log(players.length);
	arrLen = 0;
	console.log(players[1]);
	playersArr = [];
	for(i =0;i < players.length;i++){
		console.log(i);
		team.addPlayer(objects.genPlayer(players[i], req.params.pos.toUpperCase()));
	}

	console.log(team);
	res.status(200).send(team);
})
app.listen(3000, function(){
	console.log('Example app listening on port 6000!')
})
