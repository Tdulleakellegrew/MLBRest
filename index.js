const express = require('express');
const app = express();
const rosterData = require('fs');
const jsonQuery = require('json-query');

app.get('/', function(req, res){
	let rawdata = rosterData.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	res.send(teams);
})
app.get('/team/:id', function(req, res){
	let rawdata = rosterData.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	res.send(teams[req.params.id.toLowerCase()]);
})
app.get('/team/:id/:pos', function(req, res){
	let rawdata = rosterData.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	console.log("\"" + req.params.pos + "\"");
	console.log(jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}));
	res.status(200).send(jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}).value);
})
app.listen(3000, function(){
	console.log('Example app listening on port 3000!')
})
