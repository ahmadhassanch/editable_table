from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
import json

def extractTableToDataStruct(item, table):
	rows = extract_rows(table)
	item["rows"] = []
	for row in rows:
		item["rows"].append(row)
		# print("ROW", row["data"][:30], "...", row["data"][-30:])
		cols = extract_cols(row["data"])
		row['cols'] = cols
		row["data"] = "PROCESSED"

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
		else:
			pass
			# print("text:", item["data"])
	# print("++++++++++++++++++=")
	# print(objList)
	d = json.dumps(dataStruct, indent=4, sort_keys=True)
	print(d)
main()