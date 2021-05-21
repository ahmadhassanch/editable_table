from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph, SimpleDocTemplate


elements = []

styles = getSampleStyleSheet()
styleN = styles['Normal']
styleH = styles['Heading1']

doc = SimpleDocTemplate("new.pdf", pagesize=letter)

# myStyle = ParagraphStyle('title',fontName="Helvetica-Bold",fontSize=10)

receipt_no_1 = Paragraph("Receipt No:",styleH)
receipt_no_2 = Paragraph("Receipt No:",styleN)

elements.append(receipt_no_1)

elements.append(receipt_no_2)

doc.build(elements)