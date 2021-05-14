from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols

def main():
	f = open("base1.html", "r")
	st = f.read()
	objList = extract_tables(st)

	print("TABLE", objList[1]["value"][:30], "...", objList[1]["value"][-30:])

	table = objList[1]["value"]
	print("++++++++++++++++++=")

	rows = extract_rows(table)

	for row in rows:
		print("============================")
		print("row:", row)
		cols = extract_cols(row["data"])

main()