
def extract_table(objectList, st):
	val_start = st.find("<table")

	if val_start == -1:
		return objectList, None

	text = st[:val_start].strip()
	if (text !=""):
		objectList.append({"type" : "text", "value" : text})

	val_end = st.find("</table>")
	if val_start == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	tableData = st[val_start: val_end+8].replace("\n", " ")
	objectList.append({"type" : "table", "value" : tableData})

	return objectList, st[val_end+8:]

def main():
	objectList = [];
	f = open("base1.html", "r")
	st = f.read()
	# print(st)
	#for i in range(2):
	while st != None:
		objList, st = extract_table(objectList, st)
		
	for objs in objList:
		if objs["type"] == 'text':
			print("text", objs["value"])
		if objs["type"] == 'table':
			print("TABLE", objs["value"][:20], "...", objs["value"][-20:])
	

main()