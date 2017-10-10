def serialize(object):
	#I'm not commenting this shit, figure it out yourself
	jsonString = ""
	jsonString = jsonString + "{\r\n"
	t = 0
	while t < len(object.teams):
		jsonString = jsonString + ''' \t"'''+ object.teams[t].teamName + '''"'''+ ''': {\r\n \t\t"Players" : ['''
		i = 0
		while i < len(object.teams[t].players):
			if i < len(object.teams[t].players) - 1:
				if object.teams[t].players[i].position == "P":
					jsonString = jsonString + '''\r\n\t\t{\r\n\t\t\t"PlayerName" : "''' + object.teams[t].players[i].playerName + '''"''' + ",\r\n" + '''\t\t\t"Position" :  "'''+ object.teams[t].players[i].position + '''"''' + ",\r\n" + '''\t\t\t"Link" :  "''' + object.teams[t].players[i].link + '''"''' + ",\r\n" + '''\t\t\t"W" :  "''' + object.teams[t].players[i].W + '''"''' + ",\r\n" + '''\t\t\t"L" :  "''' + object.teams[t].players[i].L + '''"''' + ",\r\n" + '''\t\t\t"ERA" :  "''' + object.teams[t].players[i].ERA + '''"''' + ",\r\n" + '''\t\t\t"G" :  "''' + object.teams[t].players[i].G + '''"''' +  ",\r\n" + '''\t\t\t"GS" :  "''' + object.teams[t].players[i].GS + '''"''' + ",\r\n" + '''\t\t\t"SV" :  "''' + object.teams[t].players[i].SV + '''"''' + ",\r\n" + '''\t\t\t"IP" :  "''' + object.teams[t].players[i].IP + '''"''' + ",\r\n" + '''\t\t\t"SO" :  "''' + object.teams[t].players[i].SO + '''"''' + ",\r\n" + '''\t\t\t"WHIP" :  "''' + object.teams[t].players[i].WHIP + '''"''' + "\r\n\t\t},\r\n"
				else:
					jsonString = jsonString + '''\r\n\t\t{\r\n\t\t\t"PlayerName" : "''' + object.teams[t].players[i].playerName + '''"''' + ",\r\n" + '''\t\t\t"Position" :  "'''+ object.teams[t].players[i].position + '''"''' + ",\r\n" + '''\t\t\t"Link" :  "''' + object.teams[t].players[i].link + '''"''' + ",\r\n" + '''\t\t\t"AB" :  "''' + object.teams[t].players[i].AB + '''"''' + ",\r\n" + '''\t\t\t"R" :  "''' + object.teams[t].players[i].R + '''"''' + ",\r\n" + '''\t\t\t"H" :  "''' + object.teams[t].players[i].H + '''"''' + ",\r\n" + '''\t\t\t"HR" :  "''' + object.teams[t].players[i].HR + '''"''' +  ",\r\n" + '''\t\t\t"RBI" :  "''' + object.teams[t].players[i].RBI + '''"''' + ",\r\n" + '''\t\t\t"SB" :  "''' + object.teams[t].players[i].SB + '''"''' + ",\r\n" + '''\t\t\t"AVG" :  "''' + object.teams[t].players[i].OBP + '''"''' + ",\r\n" + '''\t\t\t"OPS" :  "''' + object.teams[t].players[i].OPS + '''"''' + "\r\n\t\t},\r\n"
			else:
				jsonString = jsonString + '''\r\n\t\t{\r\n\t\t\t"PlayerName" : "''' + object.teams[t].players[i].playerName + '''"''' + ",\r\n" + '''\t\t\t"Position" :  "'''+ object.teams[t].players[i].position + '''"''' + ",\r\n" + '''\t\t\t"Link" :  "''' + object.teams[t].players[i].link + '''"''' + ",\r\n" + '''\t\t\t"AB" :  "''' + object.teams[t].players[i].AB + '''"''' + ",\r\n" + '''\t\t\t"R" :  "''' + object.teams[t].players[i].R + '''"''' + ",\r\n" + '''\t\t\t"H" :  "''' + object.teams[t].players[i].H + '''"''' + ",\r\n" + '''\t\t\t"HR" :  "''' + object.teams[t].players[i].HR + '''"''' +  ",\r\n" + '''\t\t\t"RBI" :  "''' + object.teams[t].players[i].RBI + '''"''' + ",\r\n" + '''\t\t\t"SB" :  "''' + object.teams[t].players[i].SB + '''"''' + ",\r\n" + '''\t\t\t"AVG" :  "''' + object.teams[t].players[i].OBP + '''"''' + ",\r\n" + '''\t\t\t"OPS" :  "''' + object.teams[t].players[i].OPS + '''"''' + "\r\n\t\t}\r\n"
			i = i + 1
		if t < len(object.teams) - 1:
			jsonString = jsonString + "\t\t]\r\n\t},\r\n"
		else:
			jsonString = jsonString + "\t\t]\r\n\t}"
		t = t + 1
	jsonString = jsonString + "\r\n}"
	return jsonString
