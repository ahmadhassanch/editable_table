from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
import json
from writeTablePDF import main2
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import Color
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY, TA_CENTER, TA_RIGHT

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
			# rowData.append(Paragraph(col['data']))
			# rowData.append(col['data'])
			spanData.append(col['styles']['colspan'])
			style = {'name': 'datax'}
			if 'color' in col['styles']:
				fc = col['styles']['color']
				foreData.append(fc)
				style['textColor'] = Color(fc[0],fc[1],fc[2])
				style['alignment'] = TA_CENTER
			else:
				foreData.append(0)

				
			style['fontSize'] = 10
			style['leading'] = 10
			pStyle = ParagraphStyle(**style)
			p = Paragraph(col['data'], pStyle)
			rowData.append(p)

			if 'background-color' in col['styles']:
				c = col['styles']['background-color']
				# print(bc)
				backData.append(c)
			else:
				backData.append(0)
			# spanData.append(col['styles']['colspan'])
			# should have appended only once, but repeating
			# to take advantage of reportlab table SPAN
			spans = col['styles']['colspan']
			for s in range(1,spans):
				rowData.append("NULL")
				spanData.append(0)
				backData.append(0)

		dataArr.append(rowData)
		spanArr.append(spanData)
		backArr.append(backData)
	return dataArr, spanArr, backArr

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
	d,s,b = extractData(table)
	# s = extractSpans(table)
	# prettyPrint(s)
	# exit()
	d.pop(0)
	s.pop(0)
	b.pop(0)
	# prettyPrint(f)
	# exit()
	main2(d, w, s, b)

main()

# v = "188px"

# print(int(v))