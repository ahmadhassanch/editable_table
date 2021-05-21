
# handle edge case, we don't find any tag
def findNextTag(st):

	print("=============================ddddddddddddddddddddddddddddddddddd")
	
	tagStart = st.find("<")	
	tagEnd = st.find(">")		
	fullTag = st[tagStart:tagEnd+1]
	endTag = len(fullTag)-1

	tempOffset = fullTag.find(" ")
	if tempOffset == -1: tempOffset = 1000000
	endTag = min(endTag, tempOffset)

	tempOffset = fullTag.find("\n")
	if tempOffset == -1: tempOffset = 1000000
	endTag = min(endTag, tempOffset)

	tempOffset = fullTag.find("\t")
	if tempOffset == -1: tempOffset = 1000000
	endTag = min(endTag, tempOffset)

	endTag = min(endTag, tempOffset)
	tag =fullTag[1:endTag]
	# print("++++"+tag+"++++")
	# print("==",tag ,tagStart, tagEnd, fullTag," ==== " ,"-"+tag+"-")
	return tag


def extract_root_tag(objectList, st):
	tag = findNextTag(st);

	val_start = st.find("<"+tag)

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
	val_end = st.find("</"+tag+">")
	if val_end == -1:
		print(">>>>>>>>>>>>> Error <<<<<<<<<<<, should get </table>")
		exit()

	data = st[val_start: val_end+8].replace("\n", " ")
	objectList.append({"type" : tag, "data" : data})

	return st[val_end+8:]

def cleanTags(st):
	return st



def extract_tables(st):
	objectList = [];
	# Extract tables.
	while st != None:
		st = extract_root_tag(objectList, st)
	# exit()
	# DON'T DELETE: for debugging/printing
	for objs in objectList:
			print("=====================================", objs["type"])
			print(objs["data"][:20], "...", objs["data"][-20:])

			if objs["type"] == "table":
				pass
			else:
				objs["data"] = cleanTags(objs["data"])
			
			

	
	exit()
	return objectList


	
