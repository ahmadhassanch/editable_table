
def extract_table(st):
	objectList = [];
	val_start = st.find("<table")
	print(val_start)


def main():
	#f = open("testcase.html", "r")
	f = open("base1.html", "r")
	st = f.read()
	print(st)

main()