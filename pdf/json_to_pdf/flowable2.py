from reportlab.lib.colors import black, green, red, brown,blueviolet, pink, blue,white
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Frame, PageTemplate
import json
from parse_json import clean_json

styles = getSampleStyleSheet()

doc = SimpleDocTemplate("table.pdf", pagesize=letter)
frame = Frame(0, 10, 650, 780, id='col1', showBoundary=0)
Page = PageTemplate(id='col1', frames=[frame])
doc.addPageTemplates([Page])

f = open("sample6.json", "r")
json_file = json.load(f)

text = []
col_span = []
width = []
elements = []
color_arr = []


def make_story(text, width, colors):

    for x in range(len(text)):

        t0 = Table([text[x]], colWidths=width[x])
        t0.hAlign = "LEFT"

        for i in range(len(colors[x])):

            t0.setStyle(TableStyle([
                ('GRID', (0, 0), (-1, -1), 1, black),
                ('BACKGROUND', (i, 0), (i, 0), colors[x][i])
            ]))
        elements.append(t0)


for key in json_file:
    head = []
    col = []
    body = []
    col_body = []

    text, width_arr, colors = clean_json(key, text, width, col_span, color_arr)

    # print(colors)

    make_story(text, width_arr, colors)

doc.build(elements)

# print(text,col_span, width)
# print(json.dumps(json_file, indent=3))