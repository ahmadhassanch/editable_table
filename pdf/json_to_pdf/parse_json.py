from reportlab.platypus import Paragraph

def extract_data(text, color):

    postTagp = text.find("<p style=")

    if (postTagp>-1):

        posTags = text.find("<span style=")

        if(posTags>-1):

            textposTag = text.find(">")
            textendTag = text.find("</span>")

            trimcontent  = text[textposTag+1:textendTag]

            textposTag2 = trimcontent.find(">")
            if textposTag2  > -1:
                text = trimcontent[textposTag2+1:]
            else:
                text = text[textposTag+1:textendTag]


        else:
            textposTag = text.find(">")
            textendTag = text.find("</p>")
            text = text[textposTag + 1:textendTag]

    else:
        posTag = text.find("<span style=")

        print(posTag, "--------")

        if posTag > -1:

            colposTag = text.find("background-color:")
            colendTag = text.find(";")

            textposTag = text.find(">")
            textendTag = text.find("</span>")
            if colposTag == -1:
                color = 'transparent'
            else:
                color = text[colposTag+17:colendTag]
                color = color.strip()
            text = text[textposTag+1:textendTag]

        else:
            postTage = text.find("<")
            text = text[0:postTage]
            print(text,"khali text")
    return text, color


def make_span(width, span):

    w = []
    for i in range(len(span[0])):
        v = span[0][i]
        wx = width[i]
        for j in range(v):
            # print("--")
            w.append(wx / v)

    swarr = []
    for i in range(len(span)):
        tsw = []
        p = 0

        for j in range(len(span[i])):
            s = 0
            v = span[i][j]
            for k in range(v):
                s += w[p] / 2.0
                p += 1
            tsw.append(s)
        swarr.append(tsw)

    return swarr


def make_header(head, col, width, key, color_head_arr):

    for x in key["header"]:

        # print(key["header"])

        text, color = extract_data(x["text"],color= 'white')
        color_head_arr.append(color)
        head.append(Paragraph(text))
        if x["colSpan"] == 0:
            col.append(1)
        else:
            col.append(x["colSpan"])

        widthVal = x["width"]

        posTag = widthVal.find("px")

        wi = widthVal[:posTag]
        val= wi.strip()
        x = val.split('.')
        val = int(x[0])
        width.append(val)

    return  head, col, width, color_head_arr


def make_body(body, col_body, key, color_body_arr):

    for x in key["body"]:
        cellbody = []
        cellcoll = []
        cellcolor = []
        # print(key["body"],"*************")
        # exit()
        for cell in x["cells"]:

            print(cell["text"], "-----text-----------")

            text, color = extract_data(cell["text"],color= 'white')

            print(text,"------------returned text")

            cellcolor.append(color)
            cellbody.append(Paragraph(text))

            if cell["colSpan"]==0:
                cellcoll.append(1)
            else:
                cellcoll.append(cell["colSpan"])

        body.append(cellbody)
        col_body.append(cellcoll)
        color_body_arr.append(cellcolor)

    return body, col_body, color_body_arr


def clean_json(key, text, width, col_span, color_arr):
    head = []
    col = []
    body = []
    col_body = []
    color_head_arr = []
    color_body_arr =[]
    head, col, width, color_head= make_header(head, col, width, key, color_head_arr)
    body, col_body, color_body = make_body(body, col_body, key, color_body_arr)

    text.append(head)
    col_span.append(col)
    color_arr.append(color_head)

    for x in range(len(body)):

        text.append(body[x])
        col_span.append(col_body[x])
        color_arr.append(color_body[x])

    # print(text)
    # print(col_span)
    # print(color_arr)

    # exit()

    span_arr = make_span(width, col_span)

    return text, span_arr, color_arr
