from extract_attributes import findClasses, findStyles, findSpans, findColors

def extract_one_col(objectList, st):
	val_tag_start = st.find("<td")

	# No td tag found, so the non-table text is remaining
	if val_tag_start == -1:      
		return None

	st = st[val_tag_start:]
	val_tag_end = st.find(">")
	remaining_string = st[val_tag_start+4:val_tag_end]
	
	# Search the end /td, It should be there
	val_data_end = st.find("</td>")
	if val_data_end == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	data = st[val_tag_end+1: val_data_end].replace("\n", " ").strip()
	classes = findClasses(remaining_string)
	styles = findStyles(remaining_string)
	spans = findSpans(remaining_string)
	# print("spans",spans)
	# exit()
	styles['span']= spans
	# colors = findColors(remaining_string, tag)
	# return tag, classes, styles, spans, colors


	objectList.append({"data": data, "styles":styles})

	return st[val_data_end+5:]

def extract_cols(st):
	objectList = [];
	# Extract rows.
	while st != None:
		st = extract_one_col(objectList, st)
	
	# DON'T DELETE: FOR DEBUGGING
	for objs in objectList:
			print("col:", objs)

	return objectList
	
