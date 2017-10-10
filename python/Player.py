import urllib
class Player:
	def __init__(self, playerName, position, link):
		self.playerName = playerName
		self.position = position
		self.link = link
		self.AB = ""
		self.R = ""
		self.H = ""
		self.HR = ""
		self.RBI = ""
		self.SB = ""
		self.AVG = ""
		self.OBP = ""
		self.OPS = ""
		self.ERA = ""
		self.W = ""
		self.L = ""
		self.IP = ""
		self.SV = ""
		self.SO = ""
		self.WHIP = ""
		self.G = ""
		self.GS = ""

	def getDetails(self):
		href = "http://m.mlb.com" + self.link
		page = urllib.urlopen(href) # grabs page html
		soup = page.read() #read in page data
		page.close()
		if self.position == "P":
			self.getPitcher(soup)
		else:
			self.getPlayerDetails(soup)




	def getPitcher(self, html):
		div = '''class="player-stats-summary-large"'''
		body = "<tbody>"
		td = "<td>"
		endTd = "<"
		counter = 0
		beginI = html.find(div, 0)
		beginI = html.find(td + "2017 Stats", beginI)
		endI = beginI + len(td)
		while counter < 9 :
			stat = ""
			beginI = html.find(td, endI + len(str(endTd)))
			endI = html.find(endTd, beginI + len(td))
			stat = str(html[(beginI + (len(td) - 1)) + 1:endI])
			print(stat)
			if(counter == 0):
				self.W = stat
			elif(counter == 1):
				self.L = stat
			elif(counter == 2):
				self.ERA = stat
			elif(counter == 3):
				self.G = stat
			elif(counter == 4):
				self.GS = stat
			elif(counter == 5):
				self.SV = stat
			elif(counter == 6):
				self.IP = stat
			elif(counter == 7):
				self.SO = stat
			elif(counter == 8):
				self.WHIP = stat
			counter = counter + 1
		return 0
	def getPlayerDetails(self, html):
		div = '''class="player-stats-summary-large"'''
		body = "<tbody>"
		td = "<td>"
		endTd = "<"
		counter = 0
		beginI = html.find(div)
		beginI = html.find(td + "2017 Stats", beginI)
		endI = beginI
		while counter < 9 :
			stat = ""
			beginI = html.find(td, endI + len(str(endTd)))
			endI = html.find(endTd, beginI + len(td))
			stat = str(html[(beginI + (len(td) - 1)) + 1:endI])
			print(stat)
			if(counter == 0):
				self.AB = stat
			elif(counter == 1):
				self.R = stat
			elif(counter == 2):
				self.H = stat
			elif(counter == 3):
				self.HR = stat
			elif(counter == 4):
				self.RBI = stat
			elif(counter == 5):
				self.SB = stat
			elif(counter == 6):
				self.AVG = stat
			elif(counter == 7):
				self.OBP = stat
			elif(counter == 8):
				self.OPS = stat
			counter = counter + 1
		return 0
