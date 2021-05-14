'''

'''


# f = open("test4.html", "r")
# st = f.read()

st = '<b>1<i>11<u>111</u><br><br aaaa><u>112</u><br aaaa></i></b>'

# st = '<b>1<i>11<u>111</u>'
# <br aaaa>
# '<u>112</u></i></b>'
# <b>1<i>11<u>111</u>
# (19, 27, '<br aaaa>')
# <u>112</u></i></b>


#<div>2<b>21<i>211<u>2111</u></i></b><div>22<b>221<i>2211<u>22111</u></i></b><br></div></div>'


def removeBRstyles(st):
	startIndex = 0
	startPos = 0
	count = 0
	while 1:
		count += 1
		myStr = st[startIndex:]
		print("=============================")
		print("myStr", myStr)
		startPos = myStr.find("<br")
		print(startPos)
		if(startPos == -1): break
		tagEnd = ">"
		endPos = st[startPos:-1].find(tagEnd) + startPos

		leftString = st[:startPos]
		brTag = st[startPos:endPos+1]
		brTagLength = endPos - startPos + 1
		print("brTagLength",brTagLength)
		rightString = st[endPos+1:]
		outString = leftString + "<br/>" + rightString
		st = outString
		startIndex = startPos+5
		print(st)
		if(count ==2):
			exit()

	return st


def removeBRstyles(st):
	startPos = 0
	while 1:
		startPos = st.find("<br ")
		if(startPos == -1): break
		tagEnd = ">"
		endPos = st[startPos:-1].find(tagEnd)+startPos
		leftString = st[:startPos]
		brTag = st[startPos:endPos+1]
		rightString = st[endPos+1:]
		outString = leftString + "<br/>" + rightString
		st = outString
	return st

st = removeBRstyles(st)	
print("Final")
print(st)





