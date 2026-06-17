import docx, pathlib
path = pathlib.Path("RCCMS-SECTION-14 Documentation.docx")
doc = docx.Document(path)
for p in doc.paragraphs:
    if p.text.strip():
        print(p.text)
