from extract_tables import extract_tables
from extract_rows import extract_rows
from extract_cols import extract_cols
import json
from writeTablePDF import writeTablePDF
from reportlab.platypus import Paragraph, SimpleDocTemplate, Frame, PageTemplate
from reportlab.lib.pagesizes import letter


def prettyPrint(data):
    d = json.dumps(data, indent=4, sort_keys=True)
    print(d)


def extractTableToDataStruct(table, tableStr):
    rows = extract_rows(tableStr)
    table["rows"] = []

    for row in rows:
        table["rows"].append(row)
        # print("ROW", row["data"][:30], "...", row["data"][-30:])
        cols = extract_cols(row["data"])
        row['cols'] = cols
        row["data"] = "PROCESSED"


def makePDF(st, elements):
    dataStruct = extract_tables(st)
    for item in dataStruct:
        if item["type"] == 'table':
            table = item["data"]
            extractTableToDataStruct(item, table)
            item["data"] = "PROCESSED"
            writeTablePDF(elements, item)

        elif item["type"] == 'text':
            #elements.append(Paragraph(item["data"]))
            elements.append(Paragraph(item["data"]))
            print(item["data"])
            pass
        else:
            print("Unknown type", item["type"])




def main1():
    # file = "base2.html"
    file = "fe_data0.html"
    f = open(file, "r")
    st = f.read()
    elements = []
    makePDF(st, elements)

    doc = SimpleDocTemplate("test.pdf", pagesize=letter)
    frame = Frame(15, 15, 580, 760, id='col1', showBoundary=1)  # 610x790
    Page = PageTemplate(id='col1', frames=[frame])
    doc.addPageTemplates([Page])
    doc.build(elements)

main1()