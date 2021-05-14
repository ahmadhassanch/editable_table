from extract_attributes import findStyles, findSpans

def extract_one_col(objectList, st):
	val_tag_start = st.find("<td")

	# No td tag found, so the non-table text is remaining
	if val_tag_start == -1:      
		return None

	st = st[val_tag_start:]
	val_tag_end = st.find(">")
	remaining_string = st[4:val_tag_end]
	# print("rem", remaining_string)
	# Search the end /td, It should be there
	val_data_end = st.find("</td>")
	if val_data_end == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	data = st[val_tag_end+1: val_data_end].replace("\n", " ").strip()
	styles = findStyles(remaining_string)
	spans = findSpans(remaining_string)
	styles['colspan']= spans

	objectList.append({"data": data, "styles":styles})

	return st[val_data_end+5:]

def extract_cols(st):
	objectList = [];
	# Extract rows.
	while st != None:
		st = extract_one_col(objectList, st)
	
	# DON'T DELETE: FOR DEBUGGING
	# for objs in objectList:
	# 		print("col:", objs)

	return objectList
	
