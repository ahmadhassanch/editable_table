
def extract_one_row(objectList, st):
	val_tag_start = st.find("<tr")

	# No tr tag found, so the non-table text is remaining
	if val_tag_start == -1:      
		return None

	st = st[val_tag_start:]
	val_tag_end = st.find(">")
	
	# Search the end /tr, It should be there
	val_data_end = st.find("</tr>")
	if val_data_end == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	data = st[val_tag_end+1: val_data_end].replace("\n", " ").strip()
	objectList.append({"data": data, "styles":[]})

	return st[val_data_end+5:]

def extract_rows(st):
	objectList = [];
	# Extract rows.
	while st != None:
		st = extract_one_row(objectList, st)
	# for objs in objectList:
	# 		print("row:", objs)

	return objectList
	
