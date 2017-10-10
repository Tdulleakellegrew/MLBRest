const express = require('express');
const app = express();
const fileReader = require('fs');
const jsonQuery = require('json-query');
const objects = require('./team.js')
const teamArr = ["bos", "nyy", "nym", "laa", "lad", "sf", "tb", "tor", "bal", "stl", "kc", "col", "hou", "cle", "det", "mia", "phi", "cin", "atl", "chc", "cws", "wsh", "mil", "ari", "tex", "pit", "oak", "sea", "min", "sd"];
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
	html = "";
	console.log(teams["bos"]);
	for (i = 0; i < teamArr.length; i++) {
		html += "<h2>" + teamArr[i].toUpperCase() + "</h2>";
		html += "<table class='table table-striped table-inverse'>";
		html += "<tr><th>Player</th><th>Position</th></tr>";
		for (j = 0; j < teams[teamArr[i]].Players.length; j++) {
			html += "<tr>";
			html += "<td><a href='/team/" + teamArr[i] + "/player/" + teams[teamArr[i]].Players[j].PlayerName + "'>" + teams[teamArr[i]].Players[j].PlayerName + "</a></td><td>" + teams[teamArr[i]].Players[j].Position + "</td>";
			html += "</tr>";
		}
		html += "</table>";
	}


	res.send(header + html + footer);
})
app.get('/team/:id', function (req, res) {
	//if(req.header("key") == "key"){
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	html = "";
	html += "<h2>" + req.params.id.toUpperCase() + "</h2>";
	html += "<table class='table table-striped table-inverse'>";
	html += "<tr><th>Player</th><th>Position</th></tr>";
	for (j = 0; j < teams[req.params.id].Players.length; j++) {
		html += "<tr>";
		html += "<td><a href='/team/" + req.params.id + "/player/" + teams[req.params.id].Players[j].PlayerName + "'>" + teams[req.params.id].Players[j].PlayerName + "</a></td><td>" + teams[req.params.id].Players[j].Position + "</td>";
		html += "</tr>";
	}
	html += "</table>";
	res.send(header + html + footer);
	/*}
	else {
		res.send("Invalid key. Request denied.");
	}*/
})
app.get('/team/:id/:pos', function (req, res) {
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
})

app.get('/team/:team/player/:i', function (req, res) {
	console.log(req.params.i);
	const header = fileReader.readFileSync('views/app_header.html', 'utf-8');
	const footer = fileReader.readFileSync('views/app_footer.html', 'utf-8');
	html = "<table class='table table-inverse table-striped'>";
	let rawdata = fileReader.readFileSync('teams.json', 'utf8');
	let teams = JSON.parse(rawdata);
	//console.log("\"" + req.params.pos + "\"");
	//console.log(jsonQuery(req.params.id.toLowerCase() + '.Players[*Position='+ req.params.pos.toUpperCase() +'].PlayerName',{data:teams}));
	//team = objects.genTeam(req.params.id.toLowerCase());
	player = jsonQuery(req.params.team.toLowerCase() + '.Players[PlayerName=' + req.params.i.replace("%20", " ") + ']', { data: teams }).value;
	if (player.Position == "P") {
		html += "<tr><th>Player Name</th><th>Position</th><th>W</th><th>L</th><th>ERA</th><th>G</th><th>GS</th><th>SV</th><th>IP</th><th>SO</th><th>WHIP</th></tr>";
		html += "<tr><td>" + player.PlayerName + "</td><td>" + player.Position + "</td><td>" + player.W + "</td><td>" + player.L + "</td><td>" + player.ERA + "</td><td>" + player.G + "</td><td>" +
			player.GS + "</td><td>" + player.SV + "</td><td>" + player.IP + "</td><td>" + player.SO + "</td><td>" + player.WHIP + "</td></tr>";
	} else {
		html += "<tr><th>Player Name</th><th>Position</th><th>AB</th><th>R</th><th>H</th><th>HR</th><th>RBI</th><th>SB</th><th>AVG</th><th>OPS</th></tr>";
		html += "<tr><td>" + player.PlayerName + "</td><td>" + player.Position + "</td><td>" + player.AB + "</td><td>" + player.R + "</td><td>" + player.H + "</td><td>" + player.HR + "</td><td>" +
			player.RBI + "</td><td>" + player.SB + "</td><td>" + player.AVG + "</td><td>" + player.OPS + "</td></tr>";
	}
	html += "</table>"
	console.log(player);
	res.status(200).send(header + html + footer);
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})
