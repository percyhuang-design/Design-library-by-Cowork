#!/usr/bin/env python3
# Assemble the single-file offline index.html from the two bundles + css.
# Run from the build/ directory after esbuild + tailwind have produced:
#   app.bundle.js, app.css, demos.bundle.js, demos.css
import base64, json, re, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

def read(p):
    with open(os.path.join(HERE, p), encoding="utf-8") as f:
        return f.read()

# derive live-demo component names from the DEMOS map in demos.jsx
src = read("demos.jsx")
body = src.split("const DEMOS = {", 1)[1].split("const FLOWS", 1)[0]
names = re.findall(r'^  ([A-Z][A-Za-z0-9]+):\s*\(\)\s*=>', body, re.M)
seen = set(); names = [n for n in names if not (n in seen or seen.add(n))]

css = read("app.css"); js = read("app.bundle.js")
ds_css_b64 = base64.b64encode(read("demos.css").encode()).decode()
ds_js_b64 = base64.b64encode(read("demos.bundle.js").encode()).decode()
ds_data = ('<script>window.__DS_DEMO_NAMES=%s;window.__DS_CSS_B64="%s";window.__DS_JS_B64="%s";</script>'
           % (json.dumps(names), ds_css_b64, ds_js_b64))

html = f'''<!DOCTYPE html>
<html lang="zh-Hant"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>DS Library — component & pattern hub</title>
<style>
{css}
body{{font-family:'Noto Sans TC',system-ui,-apple-system,sans-serif;margin:0;background:#f8fafc}}
html.dark body{{background:#020617}}
#root{{min-height:100vh}}
.line-clamp-2{{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}}
</style></head><body><div id="root"></div>
{ds_data}
<script>
{js}
</script></body></html>'''

with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
    f.write(html)
print("wrote index.html  (%d live demos, %.2f MB)" % (len(names), len(html) / 1024 / 1024))
