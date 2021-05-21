from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph, SimpleDocTemplate, Table, TableStyle, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
styles = getSampleStyleSheet()
styleN = styles['Normal']
styleH = styles['Heading1']
doc = SimpleDocTemplate("simple_table_grid.pdf", pagesize=letter)
# container for the 'Flowable' objects
elements = []


address_ = Paragraph("Address",styleN )
phone_ = Paragraph("Phone:",styleN )
email_ = Paragraph("Email:",styleN )

address = Paragraph("Nust Universiry Islamabad Pakistan")
phone = Paragraph("03201234567")
email = Paragraph("ahsan@gmail.com")

data_table = [
  [address_,phone_ ,email_],
  [address,phone,email],
]

table = Table(
    data_table,
    colWidths=[90, 90, 90],
    rowHeights=(15, 50)
)
# table.hAlign = "CENTER"
# table.setStyle([('VALIGN',(0,0),(-1,-1),'TOP'),
#                           ('GRID', (0, 0), (-1, -1), 1, colors.black),
#                           ('LINEAFTER', (0, 0), (-2, -1), 2, "#DCDCDC")])


elements.append(table)
doc.build(elements)