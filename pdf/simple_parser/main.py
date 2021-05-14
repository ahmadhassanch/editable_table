from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
import json
from writeTablePDF import main2

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
	dataArr = []
	for row in table['rows']:
		rowData = []
		for col in row['cols']:
			# should have appended only once, but repeating
			# to take advantage of reportlab table SPAN
			spans = col['styles']['colspan']
			for s in range(spans):
				rowData.append(col['data'])
		dataArr.append(rowData)
	return dataArr

def extractSpans(table):
	dataArr = []
	for row in table['rows']:
		rowData = []
		for col in row['cols']:
			rowData.append(col['styles']['colspan'])
		dataArr.append(rowData)
	return dataArr

def writeTablePDF(table):
	w = extractWidths(table)
	# print(w)
	d = extractData(table)
	s = extractSpans(table)
	# prettyPrint(d)
	# exit()
	d.pop(0)
	s.pop(0)
	main2(d, w, s)

main()

# v = "188px"

# print(int(v))