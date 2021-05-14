from reportlab.lib.colors import black, green, red, brown,blueviolet, pink, blue,white, violet
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
from helper.clean_html import clean_html
from helper.extract_table import extract_table

styles = getSampleStyleSheet()

doc = SimpleDocTemplate("simple_table_grid.pdf", pagesize=letter)
frame = Frame(0, 10, 650, 780, id='col1', showBoundary=0)
Page = PageTemplate(id='col1', frames=[frame])
doc.addPageTemplates([Page])

def make_story(data, swarr, color_arr):

	for i in range(len(data)):
		for j in range(len(data[i])):
			d = data[i][j]
			w = swarr[i][j]
			c = color_arr[i][j]
		t0 = Table([data[i]], colWidths=swarr[i])
		t0.hAlign = "LEFT"
		for x in range(len(color_arr[i])):

			# print(color_arr[i][x])
			# print(i,x)

			t0.setStyle(TableStyle([
				('GRID', (0, 0), (-1, -1), 1, black),
				('FOREGROUND', (x, 0), (x, 0), 'green'),
				('BACKGROUND', (x, 0), (x, 0), color_arr[i][x]),
		]))
		elements.append(t0)
	

elements = []

files = [
	# "tables/case1_width_in_percent2_ahsan.html",
	# "tables/case1_width_in_percent_new.html",
	# "tables/target.html",
	# "tables/farid3.html",
	"tables/new1.html"
]

for file in files:

	f = open(file, "r")
	st = f.read()
	st_obt = extract_table(st)

	# data1 = 	[
	# 	['Heading 1','Heading 2','Heading 3','Heading 455'],
	# 	['Cell 1', 'Cell 2', 'Cell 4'],
	# 	['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'],
	# 	['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
	# 	['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
	# ]
	# styles_width1 =[200, 500, 100, 150]
	# spans1 = [
	# 	[2, 2, 1, 1],          # 144          533          144
	# 	[1, 4, 1],       # 144      533/2 533/2 144  144
	# 	[1, 2, 1, 1],    # 144
	# 	[1, 1, 1, 1, 1],
	# 	[1, 1, 1, 1, 1],
	# 	];

	for x in range(len(st_obt)):

		st = st_obt[x].rstrip('\n')

		stx, styles_width1, data1, spans1, colors = clean_html([], 0, st, True)
		# spans1 = [[1, 1, 2, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]

		styles_width1 = [100,100,100,100,100,];
		print(styles_width1)
		print(spans1)
		print(colors)
		print(data1)
		# exit()

		w = []
		for i in range(len(spans1[0])):
			v = spans1[0][i]
			wx = styles_width1[i]
			for j in range(v):
				# print("--")
				w.append(wx / v)
		swarr = []
		for i in range(len(spans1)):  # looping over rows of table
			tsw = []
			p = 0

			for j in range(len(spans1[i])):  # looping over columns of a row
				s = 0
				v = spans1[i][j]
				for k in range(v):
					s += w[p] # / 2.0
					p += 1
				tsw.append(s)
			swarr.append(tsw)
		make_story(data1, swarr, colors)

doc.build(elements)
