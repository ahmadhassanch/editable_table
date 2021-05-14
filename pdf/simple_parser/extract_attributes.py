
def findClasses(st):
	classes = "classes"
	posTag = st.find("class=")
	remaining_string = st[posTag+7:]
	posTag2 = st[posTag+7:].find('"')
	classes = st[posTag+7:posTag+7+posTag2]
	# print("--"+classes+"--")
	classes = classes.split(" ")
	clx = []
	for cl in classes:
		st1 = cl.strip()
		if st1 == "": continue
		clx.append(st1)
	return clx

def findStyles(st):
	posTag = st.find("style=")
	remaining_string = st[posTag+7:]
	posTag2 = st[posTag+7:].find('"')
	styles = st[posTag+7:posTag+7+posTag2]
	styles = styles.split(";")
	stx = {}
	for style in styles:
		st1 = style.strip()
		if st1 == "": continue
		starr = st1.split(":");
		stx[starr[0].strip()] = starr[1].strip()
		# print(stx)
		# exit()
	return stx

def findSpans(st):
	# print("...........................")
	posTag = st.find("colspan=")
	if(posTag == -1):
		return 1  #no colspan
	# remaining_string = st[posTag+9:]
	posTag2 = st[posTag+9:].find('"')
	spans = st[posTag+9:posTag+9+posTag2]
	# spans = spans.split("")
	stx = int(spans)
	return stx


def findColors(st, tag):
	# print("...........................")
	if tag == "<td>" or tag == "<th>":
		posTag = st.find("background-color")
		if (posTag == -1):
			return "white"  # no colspan
		# remaining_string = st[posTag+9:]
		posTag2 = st[posTag + 17:].find('"')
		colors = st[posTag + 17:posTag + 17 + posTag2]
		colors = colors.split(";")
		stx = colors[0]

		return stx

def findClassAndStyles(st):
	posTag = st.find(" ")
	tag = st[:posTag] + st[-1] #st[-1] should be ">"
	remaining_string = st[posTag+1:-1]
	classes = findClasses(remaining_string)
	styles = findStyles(remaining_string)
	spans = findSpans(remaining_string)
	colors = findColors(remaining_string, tag)
	return tag, classes, styles, spans, colors
