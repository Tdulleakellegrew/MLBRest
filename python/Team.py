class Team:

	def __init__(self, teamAbr):
		self.players = []
		self.teamName = teamAbr
	def addPlayer(self, player):
		self.players.append(player)