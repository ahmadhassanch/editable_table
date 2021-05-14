# f = open("testcase.html", "r")
# f = open("tables/target1.html", "r")
# st = f.read()


def extract_table1(st):

	strtList=[]
	endList=[]
	tableList = []

	for i in range(len(st)):

		if st.startswith("<table", i):
			strtList.append(i)
			# print(i,"--------------")

		if st.startswith("</table>", i):
			endList.append(i+9)
	# print(strtList,endList)

	for x in range(len(strtList)):
		tableList.append(st[strtList[x]:endList[x]])
		# print(tableList[x])

	return tableList

def extract_table(st):
	objectList = [];


	content = ""
	val_start = st.find("<table")
	if val_start == -1:
		stx = "    " * (level + 2) + st + "\n"
		content = stx
		#writeToOutput(stx)
		return "", content

	print(val_start)
	exit()
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

