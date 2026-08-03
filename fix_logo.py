import glob

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace('style="width: 150px; height: auto;"', 'style="width: 80px; height: auto;"')
    content = content.replace('style="width: 120px; height: auto; filter: invert(1) brightness(1.5);"', 'style="width: 70px; height: auto; filter: invert(1) brightness(1.5);"')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Logo sizes updated!")
