from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
from reportlab.lib import colors
# from makeTable import makeTable
from helper.clean_html import clean_html
# from helper.cleaner import clean_html

styles = getSampleStyleSheet()

doc = SimpleDocTemplate("simple_table_grid.pdf", pagesize=letter)
frame = Frame(0, 10, 650, 780, id='col1', showBoundary=0)
Page = PageTemplate(id='col1', frames=[frame])
doc.addPageTemplates([Page])


def make_story(data, swarr):
	table_style = TableStyle([
	('GRID', (0, 0), (-1, -1), 1, colors.black),
	('BOX', (0, 0), (-1, -1), 1, colors.black),
	])

	for i in range(len(data)):
		for j in range(len(data[i])):
			d = data[i][j]
			w = swarr[i][j]
		print(data[i], swarr[i])
		t0 = Table([data[i]], colWidths=swarr[i])
		t0.hAlign = "LEFT"
		t0.setStyle(table_style)
		elements.append(t0)
	

elements = []

files = [
	# "tables/case1_width_in_percent2_ahsan.html",
	# "tables/case1_width_in_percent_new.html",
	# "tables/target.html",
	"tables/farid3.html"
]

for file in files:
	f = open(file, "r")
	st = f.read()
	# stx, styles_width1, data1, spans1 = clean_html([], 0, st, True)
	# print(styles_width1)
	# print(data1)
	# print(spans1)
	# exit()
	data1 = 	[
		['Heading 1','Heading 2','Heading 3','Heading 455'],
		['Cell 1', 'Cell 2', 'Cell 4'],
		['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'],
		['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
		['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
	]
	styles_width1 =[200, 500, 100, 150]
	spans1 = [
		[2, 2, 1, 1],          # 144          533          144
		[1, 4, 1],       # 144      533/2 533/2 144  144
		[1, 2, 1, 1],    # 144 
		[1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1],
		];

	# print(spans1[0])
	if len(spans1[0]) != len(styles_width1):
		print("Unequal length spans", len(spans1[0]), len(styles_width1))
		
	w = []
	for i in range(len(spans1[0])):
		v = spans1[0][i]
		wx = styles_width1[i]
		for j in range(v):
			# print("--")
			w.append(wx/v)

	print("widths ======= ", w)
	swarr =[]
	for i in range(len(spans1)): #looping over rows of table
		tsw =[]
		p = 0

		for j in range(len(spans1[i])): #looping over columns of a row
			s = 0	
			v = spans1[i][j]
			for k in range(v):
				s += w[p]/2.0
				p+=1
			tsw.append(s)
		swarr.append(tsw)
	make_story(data1, swarr)

	f.close()

doc.build(elements)



