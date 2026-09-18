"""Bundle index.html + data.js + images into one self-contained HTML file (dist/puerta-roja.html).
Used for the shareable preview link. Netlify hosting uses the plain files instead."""
import re, base64, os, pathlib
root = pathlib.Path(__file__).parent
html = (root / 'index.html').read_text(encoding='utf-8')
data = (root / 'data.js').read_text(encoding='utf-8')
def datauri(p):
    return 'data:image/png;base64,' + base64.b64encode((root / p).read_bytes()).decode()
html = re.sub(r'src="(assets/[^"]+\.png)"', lambda m: f'src="{datauri(m.group(1))}"', html)
html = html.replace('<script src="data.js"></script>', '<script>\n' + data + '\n</script>')
# strip document skeleton and PWA links (the artifact host supplies its own)
head = re.search(r'<head>(.*?)</head>', html, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', html, re.S).group(1)
head = re.sub(r'<meta (charset|name="viewport")[^>]*>\s*', '', head)
head = re.sub(r'<link rel="(manifest|icon|apple-touch-icon)"[^>]*>\s*', '', head)
out = root / 'dist'; out.mkdir(exist_ok=True)
(out / 'puerta-roja.html').write_text(head.strip() + '\n' + body.strip() + '\n', encoding='utf-8')
print('wrote', out / 'puerta-roja.html', os.path.getsize(out / 'puerta-roja.html'), 'bytes')
