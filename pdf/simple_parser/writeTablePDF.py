from reportlab.lib.colors import Color, black, green, red, brown,blueviolet, pink, blue,white, violet
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph,SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
from reportlab.lib.styles import ParagraphStyle
# from reportlab.lib.styles import ParagraphStyle
# from reportlab.lib.colors import Color
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY, TA_CENTER, TA_RIGHT

def make_story(elements, data, swarr, spanArr, b):
	ps = ParagraphStyle('title')
	
	t0 = Table(data, colWidths=swarr)
	t0.hAlign = "CENTER"

	t0.setStyle(TableStyle([
		('GRID', (0, 0), (-1, -1), 1, black),
		('LEFTPADDING',(0,0),(-1,-1), 2),
		('RIGHTPADDING',(0,0),(-1,-1), 2),
		('TOPPADDING',(0,0),(-1,-1), -1),
		('BOTTOMPADDING',(0,0),(-1,-1), 2),
		('VALIGN',(0,0),(-1,-1),'MIDDLE'),
		('ALIGN',(0,0),(-1,-1),'CENTER'),
		# ('BACKGROUND',(0,0),(-1,-1),red),
	]))

	tabStyles = []
	for i in range(len(spanArr)):
		for j in range(len(spanArr[i])):
			span = spanArr[i][j]
			if span>1:
				tabStyles.append(('SPAN',(j,i),(j+span-1,i)))

			bcolor = b[i][j]
			if bcolor != 0:
				c0 = bcolor[0]; c1 = bcolor[1]; c2 = bcolor[2];
				tabStyles.append(('BACKGROUND',(j,i),(j+span-1,i), Color(c0, c1, c2)))

	t0.setStyle(TableStyle(tabStyles))
	elements.append(t0)

def writePDFtoFile(widthArr, data1, spans, backColors):
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

	make_story(elements, data1, widthArr, spans, backColors)

	doc.build(elements)


def extractWidths(table):
	wArr = []
	row0 = table["rows"][0]['cols']
	for col in row0:
		w = float(col['styles']['width'][:-2])
		wArr.append(w)
	return wArr
	
def extractData(table):
	spanArr = []
	dataArr = []
	backArr = []
	for row in table['rows']:
		rowData = []
		spanData = []
		backData = []
		for col in row['cols']:
			# rowData.append(Paragraph(col['data']))
			# rowData.append(col['data'])
			spanData.append(col['styles']['colspan'])
			style = {'name': 'datax'}
			if 'color' in col['styles']:
				fc = col['styles']['color']
				style['textColor'] = Color(fc[0],fc[1],fc[2])
				style['alignment'] = TA_CENTER
				
			style['fontSize'] = 10
			style['leading'] = 10
			pStyle = ParagraphStyle(**style)
			p = Paragraph(col['data'], pStyle)
			rowData.append(p)
			# rowData.append(col['data'])  # if we don't go for styles, etc

			if 'background-color' in col['styles']:
				c = col['styles']['background-color']
				# print(bc)
				backData.append(c)
			else:
				backData.append(0)
			# spanData.append(col['styles']['colspan'])
			# should have appended only once, but repeating
			# to take advantage of reportlab table SPAN
			spans = col['styles']['colspan']
			for s in range(1,spans):
				rowData.append("NULL")
				spanData.append(0)
				backData.append(0)

		dataArr.append(rowData)
		spanArr.append(spanData)
		backArr.append(backData)
	return dataArr, spanArr, backArr

# def extractSpans(table):
# 	spanArr = []
# 	for row in table['rows']:
# 		spanData = []
# 		for col in row['cols']:
# 			spanData.append(col['styles']['colspan'])
# 			spans = col['styles']['colspan']
# 			for s in range(1,spans):
# 				spanData.append(0)
# 		spanArr.append(spanData)
# 	return spanArr

def writeTablePDF(table):
	widths = extractWidths(table)
	# print(w)
	data, spans, backColors = extractData(table)
	# s = extractSpans(table)
	# prettyPrint(s)
	# exit()
	data.pop(0)
	spans.pop(0)
	backColors.pop(0)
	# prettyPrint(f)
	# exit()
	writePDFtoFile(widths, data, spans, backColors)