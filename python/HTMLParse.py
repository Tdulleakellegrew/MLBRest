class HTMLParse:

	def __init__(self, newHTML):
		self.html = newHTML

	def parse(self, key):
		counter = 0
		endI = 0
		begin = b"<" + key
		beginI = self.html.find(begin)
		end = key + b">"
		while counter < 5:					
			endI = self.html.find(end, endI + len(str(key)))
			counter = counter + 1
			print("\r\nCOUNTER!!!!-------------------" + str(counter) + "ENDI: " + str(endI) + "\r\n")
		return self.html[beginI:endI + len(end)]

	
