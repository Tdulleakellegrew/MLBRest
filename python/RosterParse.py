import Player
import Team
class RosterParse:

	def __init__(self, newHTML, teamName):
		self.html = newHTML
		self.teamN = teamName

	def getPlayers(self, key):
		counter = 0
		endI = 0
		begin = b"<" + key
		beginI = self.html.find(begin)
		end = key + b">"
		while counter < 5:					
			endI = self.html.find(end, endI + len(str(key)))
			counter = counter + 1
		return self.grabPlayers(b"a", self.html[beginI:endI + len(end)])

	def grabPlayers(self, key, parsedString):


		newString = ""

		#tells find what the beginning and end of the player looks like
		begin = b"<" + key + b" "
		end = key + b">" 

		#find indexes in order to determine what  a player's position is
		pitchI = parsedString.find(b"<h4>Pitchers</h4>")
		catchI = parsedString.find(b"<h4>Catchers</h4>")
		inI = parsedString.find(b"<h4>Infield</h4>")
		outI = parsedString.find(b"<h4>Outfield</h4>")
		dhI = parsedString.find(b"<h4>Designated Hitters</h4>")

		#beginning index
		beginI = pitchI
		#ending index
		endI = beginI;
		counter = 0
		position = ""
		newI = 0
		team = Team.Team(self.teamN)
		if dhI > -1:
			while counter < 40 and newI > -1:
				counter = counter + 1
				beginI = parsedString.find(begin, endI)
				endI = parsedString.find(end, beginI)
				if beginI < catchI:
					position = "P"
				elif beginI < inI:
					position = "C"
				elif beginI < outI:
					position = "IF"
				elif beginI < dhI:
					position = "OF"
				else:
					position = "DH"
				newI = parsedString.find(begin, endI)
				p = Player.Player(self.cleanPlayer(str(parsedString[beginI:endI+len(end)])), position)
				team.addPlayer(p)
		else:
			while counter < 40 and newI > -1:
				counter = counter + 1
				beginI = parsedString.find(begin, endI)
				endI = parsedString.find(end, beginI)
				if beginI < catchI:
					position = "P" 
				elif beginI < inI:
					position = "C"
				elif beginI < outI:
					position = "IF"
				elif beginI > outI:
					position = "OF"
				newI = parsedString.find(begin, endI)
				p = Player.Player(self.cleanPlayer(str(parsedString[beginI:endI+len(end)])), position)
				team.addPlayer(p)
				#newString = newString + position + self.cleanPlayer(str(parsedString[beginI:endI+len(end)])) + "\r\n"
		return team

	#after a player's a tag has been filtered out of the entire page I clean it up with this in order to only be left with the name
	def cleanPlayer(self, players):
		counter = 0
		openEnd = ">"
		endTag = "</a>"
		beginI = 0
		endI = 0
		cleanedPlayer = ""
		counter = counter + 1
		beginI = players.find(openEnd, endI + len(str(endTag)))
		endI = players.find(endTag, beginI)
		cleanedPlayer = str(players[beginI + 1:endI]).replace('''\'''', "") + ""
		return cleanedPlayer



