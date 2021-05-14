from reportlab.lib.colors import black, green, red, brown,blueviolet, pink, blue,white, violet
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph,SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
from reportlab.lib.styles import ParagraphStyle

def make_story(elements, data, swarr, spanArr, f, b):
	ps = ParagraphStyle('title')
	
	t0 = Table(data, colWidths=swarr)
	t0.hAlign = "CENTER"

	t0.setStyle(TableStyle([
		('GRID', (0, 0), (-1, -1), 1, black),
		('LEFTPADDING',(0,0),(-1,-1), 1),
		('RIGHTPADDING',(0,0),(-1,-1), 1),
		('TOPPADDING',(0,0),(-1,-1), -1),
		('BOTTOMPADDING',(0,0),(-1,-1), 0),
		('VALIGN',(0,0),(0,-1),'TOP'),
		('ALIGN',(0,0),(-1,-1),'CENTER'),
	]))

	tabStyles = []
	for i in range(len(spanArr)):
		for j in range(len(spanArr[i])):
			# tabStyles.append(('SPAN',(j,i),(j+span-1,i)))
			span = spanArr[i][j]
			if span>1:
				tabStyles.append(('SPAN',(j,i),(j+span-1,i)))

	t0.setStyle(TableStyle(tabStyles))
	elements.append(t0)

def main2(data1, widthArr, spans, f, b):
	# data1 = 	[
	# 	['Heading 1','','Heading 2','', 'Heading 3','Heading 4' ],
	# 	['Cell 1', 'Cell 2 is the longest cell and it is strange','','','', 'Cell 4'],
	# 	['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'],
	# 	['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
	# 	['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5'],
	# ]
	# widthArr =[50, 100, 50, 50, 50, 50]
	# spans = [
	# 	[2, 2, 1, 1],        
	# 	[1, 4, 1],       
	# 	[1, 2, 2, 1],    
	# 	[1, 1, 1, 1, 1, 1],
	# 	[1, 1, 1, 1, 1, 1],
	# 	];

	elements = []

	styles = getSampleStyleSheet()

	doc = SimpleDocTemplate("simple_table_grid.pdf", pagesize=letter)
	frame = Frame(15, 15, 580, 760, id='col1', showBoundary=1)#610x790
	Page = PageTemplate(id='col1', frames=[frame])
	doc.addPageTemplates([Page])

	make_story(elements, data1, widthArr, spans, f, b)

	doc.build(elements)

#main2(1,2,3)