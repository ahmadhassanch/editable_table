from reportlab.lib.colors import black, green, red, brown,blueviolet, pink, blue,white
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter

from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
styles = getSampleStyleSheet()

doc = SimpleDocTemplate("json_table.pdf", pagesize=letter)
frame = Frame(0, 10, 650, 780, id='col1', showBoundary=0)
Page = PageTemplate(id='col1', frames=[frame])
doc.addPageTemplates([Page])

f = open("sample2.json", "r")
import json
# st = f.read()
# print(st)
json_file = json.load(f)
text = []
col_span = []
width = []
elements = []

for key in json_file:
    head = []
    col = []
    body = []
    colbody = []
    # w = []

    for x in key["header"]:

        head.append(x["text"])
        col.append(x["colSpan"])

        widthVal = x["width"]

        posTag = widthVal.find("px")
        # print(posTag)

        wi = widthVal[:posTag]
        val = int(wi.strip())
        print(val)

        width.append(val)


    text.append(head)
    col_span.append(col)
    # width.append(w)

    for x in key["body"]:
        for cell in x["cells"]:

            body.append(cell["text"])
            colbody.append(cell["colSpan"])
    text.append(body)
    col_span.append(colbody)

for x in range(len(text)):

    t0 = Table([text[x]], colWidths= width)
    t0.hAlign = "LEFT"
    t0.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 1, black)
    ]))
    elements.append(t0)


doc.build(elements)
print(text,col_span, width)



# print(json.dumps(json_file, indent=3))