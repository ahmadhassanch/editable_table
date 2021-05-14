
def extract_one_table(objectList, st):
	val_start = st.find("<table")

	# No table tag found, so the non-table text is remaining
	if val_start == -1:      
		if len(st.strip())>0:
			objectList.append({"type" : "text", "value" : st.strip()})

		return None

	# Add text if there is some content
	text = st[:val_start].strip()
	if (text !=""):
		objectList.append({"type" : "text", "value" : text})

	# Search the end table tag, and append. It should be there
	val_end = st.find("</table>")
	if val_start == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	tableData = st[val_start: val_end+8].replace("\n", " ")
	objectList.append({"type" : "table", "value" : tableData})

	return st[val_end+8:]

def extract_tables(st):
	objectList = [];
	# Extract tables.
	while st != None:
		st = extract_one_table(objectList, st)
	
	return objectList
	

def main():
	f = open("base1.html", "r")
	st = f.read()
	objList = extract_tables(st)

	for objs in objList:
		if objs["type"] == 'text':
			print("text", objs["value"])
		if objs["type"] == 'table':
			print("TABLE", objs["value"][:20], "...", objs["value"][-20:])

main()