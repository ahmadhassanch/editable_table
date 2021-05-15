
def splitColor(v):
	pos1 = v.find("(")
	pos2 = v.find(")")
	vv = v[pos1+1:pos2]
	colors = vv.split(",")
	cArr = []
	for color in colors:
		cArr.append(float(color)/255.0)
	return cArr

def findStyles(st):
	# print("=====================================")
	# print("st--", st)
	posTag = st.find("style=")
	if(posTag == -1):
		# print("style not found")
		return {}

	remaining_string = st[posTag+7:]
	posTag2 = st[posTag+7:].find('"')
	styles = st[posTag+7:posTag+7+posTag2]
	styles = styles.split(";")
	stx = {}
	# print("styles::", styles)
	for style in styles:
		st1 = style.strip()
		if st1 == "": continue
		# print(st1)
		starr = st1.split(":")
		if len(starr)<2:
			print("Error found, should not happen")
			exit()
		v1 = starr[0].strip()
		v2 = starr[1].strip()
		# both foreground and background
		if v1.find('color') != -1:
			v2 = splitColor(v2)
		# print("v1, v2 = ", v1, v2)
		stx[v1] = v2 
	return stx

def findSpans(st):
	# print("...........................")
	posTag = st.find("colspan=")
	if(posTag == -1):
		return 1

	posTag2 = st[posTag+9:].find('"')
	spans = st[posTag+9:posTag+9+posTag2]
	stx = int(spans)
	return stx

