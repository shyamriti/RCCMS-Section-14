import docx
import pathlib

path = pathlib.Path('RCCMS-SECTION-14 Documentation.docx')
doc = docx.Document(path)
text = '\n'.join([p.text for p in doc.paragraphs if p.text.strip()])
with open('docx_output.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print('done')
