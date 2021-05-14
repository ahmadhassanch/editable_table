
def extract_one_table(objectList, st):
	val_start = st.find("<table")

	# No table tag found, so the non-table text is remaining
	if val_start == -1:      
		text = st.strip()
		if (text != ""):
			objectList.append({"type" : "text", "data" : text})
		return None
	else:
		text = st[:val_start].strip()
		if (text != ""):
			objectList.append({"type" : "text", "data" : text})

	# Search the end table tag, and append. It should be there
	val_end = st.find("</table>")
	if val_end == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	data = st[val_start: val_end+8].replace("\n", " ")
	objectList.append({"type" : "table", "data" : data})

	return st[val_end+8:]

def extract_tables(st):
	objectList = [];
	# Extract tables.
	while st != None:
		st = extract_one_table(objectList, st)
	
	# DON'T DELETE: for debugging/printing
	# for objs in objectList:
	# 	if objs["type"] == 'text':
	# 		print("text", objs["data"])
	# 	if objs["type"] == 'table':
	# 		print("TABLE", objs["data"][:20], "...", objs["data"][-20:])

	return objectList
	
