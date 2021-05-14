from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
import json
from writeTablePDF import main2
from reportlab.platypus import Paragraph

def prettyPrint(data):
	d = json.dumps(data, indent=4, sort_keys=True)
	print(d)


def extractTableToDataStruct(table, tableStr):
	rows = extract_rows(tableStr)
	table["rows"] = []
	
	for row in rows:
		table["rows"].append(row)
		# print("ROW", row["data"][:30], "...", row["data"][-30:])
		cols = extract_cols(row["data"])
		row['cols'] = cols
		row["data"] = "PROCESSED"

	# exit()

def main():
	f = open("base2.html", "r")
	st = f.read()
	dataStruct = extract_tables(st)
	# print("TABLE", objList[1]["data"][:30], "...", objList[1]["data"][-30:])

	for item in dataStruct:
		if item["type"] == 'table':
			table = item["data"]
			extractTableToDataStruct(item, table)
			item["data"] = "PROCESSED"
			writeTablePDF(item)

		else:
			pass
			# print("text:", item["data"])
	# print("++++++++++++++++++=")
	# print(objList)

def extractWidths(table):
	wArr = []
	row0 = table["rows"][0]['cols']
	for col in row0:
		w = float(col['styles']['width'][:-2])
		wArr.append(w)
	return wArr
	
def extractData(table):
	spanArr = []
	dataArr = []
	foreArr = []
	backArr = []
	for row in table['rows']:
		rowData = []
		spanData = []
		foreData = []
		backData = []
		for col in row['cols']:
			rowData.append(Paragraph(col['data']))
			spanData.append(col['styles']['colspan'])
			if 'color' in col['styles']:
				foreData.append(col['styles']['background-color'])
			else:
				foreData.append(0)

			if 'background-color' in col['styles']:
				backData.append(col['styles']['color'])
			else:
				backData.append(0)
			# spanData.append(col['styles']['colspan'])
			# should have appended only once, but repeating
			# to take advantage of reportlab table SPAN
			spans = col['styles']['colspan']
			for s in range(1,spans):
				rowData.append("NULL")
				spanData.append(0)
				foreData.append(0)
				backData.append(0)

		dataArr.append(rowData)
		spanArr.append(spanData)
		foreArr.append(foreData)
		backArr.append(backData)
	return dataArr, spanArr, foreArr, backArr

# def extractSpans(table):
# 	spanArr = []
# 	for row in table['rows']:
# 		spanData = []
# 		for col in row['cols']:
# 			spanData.append(col['styles']['colspan'])
# 			spans = col['styles']['colspan']
# 			for s in range(1,spans):
# 				spanData.append(0)
# 		spanArr.append(spanData)
# 	return spanArr

def writeTablePDF(table):
	w = extractWidths(table)
	# print(w)
	d,s,f,b = extractData(table)
	# s = extractSpans(table)
	# prettyPrint(s)
	# exit()
	d.pop(0)
	s.pop(0)
	f.pop(0)
	b.pop(0)
	prettyPrint(f)
	exit()
	main2(d, w, s, f, b)

main()

# v = "188px"

# print(int(v))