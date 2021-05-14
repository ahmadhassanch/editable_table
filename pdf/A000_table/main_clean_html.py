import json
from helper.clean_html import clean_html
# from helper.print_html import print_html
# from helper.print_pdf import print_pdf

#f = open(, "r")

files = [
	# "tables/case1_width_in_percent2_ahsan.html",
	# "tables/case1_width_in_percent_new.html",
	# "tables/target.html",
	"tables/farid3.html"
]

for file in files:
	f = open(file, "r")
	# f = open(, "r")
	# f = open(, "r")

	st = f.read()
	data_struct1 = {"tag": "<root>", "val": "", "children":[], "post_val":"", "etag": "</root>"}
	nDst = [data_struct1]
	stx, w_arr, data_arr, span_arr = clean_html(nDst, 0, st, True)
	print("=======================================")
	print(w_arr)
	# print(data_arr)
	for d in data_arr:
		for v in d:
			print(v, end=", ")
		print()
	print(span_arr)
	f.close()


