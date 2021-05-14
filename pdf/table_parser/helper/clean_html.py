import json
from reportlab.platypus import Paragraph

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
	stx = []
	for style in styles:
		st1 = style.strip()
		if st1 == "": continue
		stx.append(st1)
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

myStr = ""

def writeToOutput(stx, clean_tags = False):
	global myStr
	if(clean_tags == True):
		return
	myStr += stx
	# print(">>"+stx, end="")


def clean_tagsx(st, level):
	content = ""
	val_start = st.find("<")
	if val_start == -1:
		stx = "    " * (level + 2) + st + "\n"
		content = stx
		#writeToOutput(stx)
		return "", content

	content = st[:val_start]
	tag_length = st[val_start:].find(">")
	tag = st[val_start:val_start+tag_length+1]
	# print(tag)
	tag, classes, styles, spans, colors = findClassAndStyles(tag)
	# print(tag)
	if(val_start != -1):
		if(st[val_start+1]=="/"):
			level -= 1
	if(content!=""):
		stx = "    "*(level+2)+content+"\n"
		content = stx
		# writeToOutput(stx)

	stx = "    "*level+tag+"\n"
	remaining_string = st[val_start+tag_length+1:]

	if(val_start != -1):
		if(st[val_start+1]!="/"):
			level += 1
	
	return remaining_string, content

def cleanTDTH(tagfull, level, remaining_string, data_arr, span_arr, spans, color_arr,colors):
	# if(tag == "<thead>"):
	# return remaining_string, True
	# print("====", tagfull)
	tag = tagfull[:3]
	if tag == "<td" or tag == "<th>":
		if tag == "<td": tend = "</td>"
		if tag == "<th": tend = "</th>"

		tag_end = remaining_string.find(tend)
		content = remaining_string[:tag_end]
		while(content != ""):
			content, c = clean_tagsx(content, level)
			writeToOutput(c)
			v = c.strip()
			data_arr[-1].append(v)  #Paragraph(v) TODO
			# print(spans)
			# print("===========================================")
			# if(len(spans)>0):
			span_arr[-1].append(spans)
			color_arr[-1].append(colors.strip())

		remaining_string = remaining_string[tag_end:]
		return remaining_string
	else:
		if tag == '<tr':
			data_arr.append([])
			span_arr.append([])
			color_arr.append([])
		else:
			print("unknown:", tag)

		return remaining_string

	

def clean_func(st, level, clean_table, data_arr, span_arr, color_arr):

	val_start = st.find("<")
	content = st[:val_start]
	tag_length = st[val_start:].find(">")
	tag = st[val_start:val_start+tag_length+1]
	# print("tagx", tag)
	tag, classes, styles, spans, colors = findClassAndStyles(tag)

	if(val_start != -1):
		if(st[val_start+1]=="/"):
			level -= 1
	if(content!=""):
		stx = "    "*(level+1)+content+"\n"
		writeToOutput(stx)

	stx = "    "*level+tag+"\n"
	writeToOutput(stx)
	remaining_string = st[val_start+tag_length+1:]

	if(val_start != -1):
		if(st[val_start+1]!="/"):
			if clean_table == True:
				remaining_string = cleanTDTH(tag, level, remaining_string, data_arr, span_arr, spans, color_arr,colors)

			level += 1
	
	return tag, remaining_string, level, classes, styles


def getwidthsFirstRow(tag, w_arr, styles):
	if(tag == "<td>"):
		for style in styles:
			arr = style.split(":")
			prop = arr[0].strip()
			val = arr[1].strip()
			if(prop == 'width'):
				ind = val.find("px")
				val = int(val[:ind])
				w_arr.append(val)
	return w_arr


def clean_html(nDst, level, st, cleanTDTHflag):
	global myStr
	w_arr = []
	data_arr = []
	span_arr = []
	color_arr = []
	count = 0
	while(st != ""):
		tag, st, level, classes, styles = clean_func(st, level, cleanTDTHflag, data_arr, span_arr, color_arr)

		if tag == "<tr>":
			count+=1
		if count == 1:
			w_arr = getwidthsFirstRow(tag, w_arr, styles)
			

		# if count == 2:
		# 	print(w_arr)	
		# 	print(data_arr)
		# 	print(span_arr)
		# 	# exit()
	return  myStr, w_arr, data_arr, span_arr, color_arr

