import urllib
import RosterParse
import League
import json
import JSONSerializer
teams = ["bos", "nyy", "nym", "laa", "lad", "sf", "tb", "tor", "bal", "stl", "col", "hou", "cle", "det", "mia", "phi", "cin", "atl", "chc", "cws", "wsh", "mil", "ari", "tex", "pit", "oak", "sea"]
index = 0
l = League.League()
while index < len(teams):

	mlb = "http://m.mlb.com/"+ teams[index] +"/roster/" #set url to the current team
	
	page = urllib.urlopen(mlb) # grabs page html
	soup = page.read() #read in page data

	parser = RosterParse.RosterParse(soup, teams[index]) #set the html in RosterPasrse
	l.addTeam(parser.getPlayers(b"section"))#retrieves the cleaned html from RosterParse and replaces all \\n line endings with windows line endings
	#print(str(teams[index])) #prints team name for debugginh purposes
	#print(html)#prints players for debugging purposes 
	
	page.close() #close file
	index = index + 1 #rinse and repeat
#from django.forms.models import model_to_dict
print(JSONSerializer.serialize(l))
#oi_serialized = json.dumps(oi_dict)
f = open("teams/teams.json", 'w') #opens or creates new team text file
f.write(JSONSerializer.serialize(l)) #writes roster to text file
f.close() #close file