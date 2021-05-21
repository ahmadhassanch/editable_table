
def removeHtmlStylesOld(st):
	# st = st.replace("<br>", "")
	# st = st.replace("</br>", "")
	# st = st.replace("<div>", "")
	# st = st.replace("</div>", "")
	return st
	if '<div' in st:
		startPos = st.find("<div")
		tagEnd = ">"
		endPos = st[startPos:-1].find(tagEnd) + startPos
		leftString = st[:startPos]
		uTag = st[startPos:endPos + 1]
		rightString = st[endPos + 1:]
		# outString = leftString + '<br/>' + uTag + rightString
		outString = leftString + uTag + rightString
		st = outString

	styles = [
		{"tag": "<br ", "replaceWith": "<br>"},
		{"tag": "<span ", "replaceWith": "<span>"},
		{"tag": "<u ", "replaceWith": "<u>"},
		{"tag": "<i ", "replaceWith": "<i>"},
		{"tag": "<b ", "replaceWith": "<b>"},
		{"tag": "<para ", "replaceWith": "<para>"},
		{"tag": "<p ", "replaceWith": "<p>"},
		{"tag": "<div ", "replaceWith": "<div>"},
		{"tag": "<font ", "replaceWith": ""},
	]

	for style in styles:
		if style["tag"] in st:
			startPos = 0
			while 1:
				startPos = st.find(style["tag"])
				if startPos == -1: break
				tagEnd = ">"
				endPos = st[startPos:-1].find(tagEnd) + startPos
				leftString = st[:startPos]
				uTag = st[startPos:endPos + 1]
				rightString = st[endPos + 1:]
				outString = leftString + style["replaceWith"] + rightString
				st = outString
		else:
			continue

	st = st.replace("<br>", "<br/>")
	# st = st.replace("</span>", "")

	while '</div></div>' in st:
		st = st.replace('</div></div>', '</div>')

	st = st.replace("<div><br/></div>", "<div></div>")

	st = st.replace("<div><b><br/></b></div>", "<div></div>")
	st = st.replace("<div><b><br/></b>", "<div></div>")

	st = st.replace("<div><i><br/></i></div>", "<div></div>")
	st = st.replace("<div><i><br/></i>", "<div></div>")

	st = st.replace("<div><u><br/></u></div>", "<div></div>")
	st = st.replace("<div><u><br/></u>", "<div></div>")

	st = st.replace("<div><b><i><br/></i></b></div>", "<div></div>")
	st = st.replace("<div><b><i><br/></i></b>", "<div></div>")

	st = st.replace("<div><b><u><br/></u></b></div>", "<div></div>")
	st = st.replace("<div><b><u><br/></u></b>", "<div></div>")

	st = st.replace("<div><i><u><br/></u></i></div>", "<div></div>")
	st = st.replace("<div><i><u><br/></u></i>", "<div></div>")

	st = st.replace("<div><b><i><u><br/></u></i></b></div>", "<div></div>")
	st = st.replace("<div><b><i><u><br/></u></i></b>", "<div></div>")

	st = st.replace("</div>", "</div><br/>")

	st = st.replace("<font>", "")
	st = st.replace("</font>", "")

	st = st.replace("<p><br/></p>", "<p></p>")
	st = st.replace("</p>", "</p><br/>")
	st = st.replace("</p><br/></div><br/>", "<br/>")
	# st = st.replace('↵↵', "<br/>")

	return st
