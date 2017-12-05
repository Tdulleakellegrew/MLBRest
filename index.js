const express = require('express');
const app = express();
const fileReader = require('fs');
const objects = require('./app_code/team.js');
const utils = require('./app_code/app_util.js');
const api = require('./api/app_api');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

app.get('/', function (req, res) {
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	
	let html = utils.allPlayersTable(teams);

	res.send(header + html + footer);
})
app.get('/team/:id', function (req, res) {
	//if(req.header("key") == "key"){
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	html = utils.teamTable(teams, req.params.id);
	res.send(header + html + footer);
	/*}
	else {
		res.send("Invalid key. Request denied.");
	}*/
})


//TODO: need to build up motivation to implement this api documentation is going to take priorety 
/*app.get('/team/:id/:pos', function (req, res) {
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	//console.log("\"" + req.params.pos + "\"");
	//console.log(jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}));
	team = objects.genTeam(req.params.id.toLowerCase());
	players = jsonQuery(req.params.id.toLowerCase() + '.Players[*Position=' + req.params.pos.toUpperCase() + ']', { data: teams }).value;
	console.log(players.length);
	arrLen = 0;
	console.log(players[1]);
	playersArr = [];
	for (i = 0; i < players.length; i++) {
		console.log(i);
		team.addPlayer(players[i]);
	}

	console.log(team);
	res.status(200).send(team);
})*/

app.get('/players/:pos', function(req, res){
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	html = utils.playerByPositionTable(teams, req.params.pos);
	res.status(200).send(header + html + footer);
})

app.get('/team/:team/player/:id', function (req, res) {
	console.log(req.params.id);
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	//console.log("\"" + req.params.pos + "\"");
	//console.log(jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}));
	//team = objects.genTeam(req.params.id.toLowerCase());
	html = utils.singlePlayer(teams, req.params.team, req.params.id)
	console.log(player);
	res.status(200).send(header + html + footer);
})

//TODO: Implement api doc page - Only Team Position Left
app.get('/api', function(req,res){
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const doc = fileReader.readFileSync('views/app_doc.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	res.status(200).send(header + doc + footer);
})

//Returns all json data
app.get('/api/all', function(req,res){
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	res.status(200).send(rawdata);
})

//Returns all players of a certain position
app.get('/api/:pos', function(req,res){
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	let data = api.playersByPosition(teams, req.params.pos);
	res.status(200).send(JSON.stringify(data));
})

//Returns a full team
app.get('/api/team/:name', function(req,res){
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	
	res.status(200).send(JSON.stringify(teams[req.params.name]));
})

app.get('/api/team/:team/player/:name', function(req,res){
	console.log(req.params.team);
	console.log(req.params.name);
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	let data = api.singlePlayer(teams, req.params.team, req.params.name);
	res.status(200).send(JSON.stringify(data));
})

app.use(function (req, res, next) {
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const doc = fileReader.readFileSync('views/app_error.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	res.status(404).send(header + doc + footer)
})

app.use(function (err, req, res, next) {
	console.error(err.stack)
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const doc = fileReader.readFileSync('views/app_error.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	res.status(500).send(header + doc + footer)
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})
