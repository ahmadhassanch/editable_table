from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
# from extract_styles import extract_rows

def main():
	f = open("base2.html", "r")
	st = f.read()
	objList = extract_tables(st)

	print("TABLE", objList[1]["value"][:30], "...", objList[1]["value"][-30:])

	table = objList[1]["value"]
	print("++++++++++++++++++=")

	rows = extract_rows(table)
	print(rows[0])
	# exit()
	for row in rows:
		print("============================")
		print("row:", row)
		cols = extract_cols(row["data"])
		exit()
main()