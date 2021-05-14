from reportlab.lib.colors import black, green, red, brown,blueviolet, pink, blue,white, violet
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph,SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
from reportlab.lib.styles import ParagraphStyle

def make_story(elements, data, swarr, spans, color_arr):
	ps = ParagraphStyle('title', fontSize=10, leading=10)
	for i in range(len(data)):
		warr = []
		d = []
		colorIndex = []
		for j in range(len(spans[i])):
			span = spans[i][j]
			warr.append(span*swarr[i])
			d.append(Paragraph(data[i][j], ps))
			if span > 1:
				colorIndex.append(j)
		print(data[i], warr)
		# exit()
		t0 = Table([d], colWidths=warr)
		t0.hAlign = "LEFT"
		for x in colorIndex:
			t0.setStyle(TableStyle([
				('BACKGROUND', (x, 0), (x, 0), red),
			]))
		t0.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 1, black)]))
		elements.append(t0)

def main2():
	data1 = 	[
		['Heading 1','Heading 2','Heading 3','Heading 4'],
		['Cell 1', 'Cell 2', 'Cell 4'],
		['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'],
		['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
		['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
	]
	swarr =[50, 50, 50, 50, 50, 50]
	spans = [
		[2, 2, 1, 1],          # 144          533          144
		[1, 4, 1],       # 144      533/2 533/2 144  144
		[1, 2, 1, 1],    # 144
		[1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1],
		];

	elements = []
	colors = []

	styles = getSampleStyleSheet()

	doc = SimpleDocTemplate("simple_table_grid.pdf", pagesize=letter)
	frame = Frame(15, 15, 580, 760, id='col1', showBoundary=1)#610x790
	Page = PageTemplate(id='col1', frames=[frame])
	doc.addPageTemplates([Page])

	make_story(elements, data1, swarr, spans, colors)

	doc.build(elements)


main2()