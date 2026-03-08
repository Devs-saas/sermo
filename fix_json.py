import re

# lê o arquivo original
with open("./src/data/acentos.json", "r", encoding="utf-8") as f:
    content = f.read()

# coloca aspas nas chaves
fixed = re.sub(r'([,{])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', content)

# salva o resultado
with open("./src/data/acentos_fixed.json", "w", encoding="utf-8") as f:
    f.write(fixed)

print("Arquivo corrigido salvo como acentos_fixed.json")
