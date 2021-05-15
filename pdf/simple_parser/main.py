from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
import json
from writeTablePDF import writeTablePDF
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




main()

# v = "188px"

# print(int(v))