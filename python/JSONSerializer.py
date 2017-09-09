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
				jsonString = jsonString + '''\r\n\t\t{\r\n\t\t\t"PlayerName" : "''' + object.teams[t].players[i].playerName + '''"''' + ",\r\n" + '''\t\t\t"Position" :  "'''+ object.teams[t].players[i].position + '''"''' + "\r\n\t\t},\r\n"
			else:
				jsonString = jsonString + '''\r\n\t\t{\r\n\t\t\t"PlayerName" : "''' + object.teams[t].players[i].playerName + '''"''' + ",\r\n" + '''\t\t\t"Position" :  "'''+ object.teams[t].players[i].position + '''"''' + "\r\n\t\t}\r\n"
			i = i + 1
		if t < len(object.teams) - 1:
			jsonString = jsonString + "\t\t]\r\n\t},\r\n"
		else:
			jsonString = jsonString + "\t\t]\r\n\t}"
		t = t + 1
	jsonString = jsonString + "\r\n}"
	return jsonString