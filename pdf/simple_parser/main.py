from extract_tables import extract_tables
from extract_rows import extract_rows

def main():
	f = open("base1.html", "r")
	st = f.read()
	objList = extract_tables(st)

	print("TABLE", objList[1]["value"][:30], "...", objList[1]["value"][-30:])

	table = objList[1]["value"]
	print("++++++++++++++++++=")

	extract_rows(table)



main()