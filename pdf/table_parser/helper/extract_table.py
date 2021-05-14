# f = open("testcase.html", "r")
# f = open("tables/target1.html", "r")
# st = f.read()


def extract_table(st):

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
