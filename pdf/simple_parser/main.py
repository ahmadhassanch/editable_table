from extract_tables import extract_tables
from extract_rows import extract_rows

def main():
	f = open("base1.html", "r")
	st = f.read()
	objList = extract_tables(st)

	print("TABLE", objList[1]["value"][:20], "...", objList[1]["value"][-20:])

	table = objList[1]["value"]
	#print(table)

	extract_rows(table)



main()