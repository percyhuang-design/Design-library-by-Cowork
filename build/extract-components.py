#!/usr/bin/env python3
"""Regenerate the COMPONENTS data block in ../App.jsx from the design-system source.

Reads every component's .spec.md + .stories.tsx under the cloned DS and extracts
name / category / summary / 何時使用 bullets / code example / import, then rewrites
the array between the __COMPONENTS_START__ / __COMPONENTS_END__ markers in App.jsx.

Run from the build/ directory (or anywhere — paths are resolved relative to this file).
Prereq: DS cloned at ../.source/design-system  (see BUILD.md).
"""
import os, re, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, ".source", "design-system", "packages", "design-system", "src", "components")
APP = os.path.join(ROOT, "App.jsx")

# functional grouping (curated — new components fall into 其他 until assigned here)
CATEGORY = {
    "表單與輸入": ["Input","Textarea","NumberInput","LinkInput","Select","SelectMenu","Combobox",
                "Checkbox","RadioGroup","Switch","Slider","Rating","DatePicker","TimePicker",
                "Calendar","DateGrid","PeoplePicker","FileUpload","Field","FieldControlGroup",
                "SelectionControl","SegmentedControl"],
    "動作與導覽": ["Button","BulkActionBar","Breadcrumb","Tabs","Sidebar","Menu","DropdownMenu",
                "Command","Steps","AppShell"],
    "資料展示": ["DataTable","DescriptionList","Avatar","Badge","Chip","Tag","ProfileCard",
              "FileItem","FileViewer","Chart","Carousel","TreeView","Accordion"],
    "回饋與狀態": ["Alert","Toast","Notice","ProgressBar","CircularProgress","Skeleton","Empty","Coachmark"],
    "覆蓋層": ["Dialog","Sheet","Popover","HoverCard","Tooltip"],
    "版面與工具": ["AspectRatio","Separator","ScrollArea","OverflowIndicator"],
}
# concise fallbacks for components whose spec has neither a stories description nor a 定位 paragraph
FILL = {
    "CircularProgress": "圓形進度／載入指示器，用於表達進行中的操作或完成比例（環狀呈現）。",
    "FileItem": "單一檔案的列項呈現——顯示檔名、類型、大小與操作（下載／刪除／預覽）。",
    "ProfileCard": "人物資訊卡片，集中呈現頭像、姓名、職稱與聯絡／操作入口。",
    "ScrollArea": "自訂樣式的捲動容器，提供一致的捲軸外觀與溢出內容處理。",
    "Steps": "步驟流程指示器，呈現多步驟任務的目前進度與各步驟狀態。",
}

def cat_of(name):
    for c, items in CATEGORY.items():
        if name in items:
            return c
    return "其他"

def kebab(name):
    return re.sub(r'(?<!^)(?=[A-Z])', '-', name).lower()

def read(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except Exception:
        return ""

def clean(s):
    s = re.sub(r'\*\*(.*?)\*\*', r'\1', s)   # bold
    s = re.sub(r'`(.*?)`', r'\1', s)          # inline code
    return s.strip()

def extract_desc(stories):
    m = re.search(r"component:\s*'((?:[^'\\]|\\.)*)'", stories) or re.search(r'component:\s*"((?:[^"\\]|\\.)*)"', stories)
    return (m.group(1).replace("\\'", "'").replace('\\n', ' ').strip() if m else "")

def section(spec, headers):
    for h in headers:
        m = re.search(r'^##\s*' + re.escape(h) + r'\s*\n(.*?)(?=^##\s|\Z)', spec, re.M | re.S)
        if m:
            return re.sub(r'<!--.*?-->', '', m.group(1), flags=re.S).strip()
    return ""

def first_para(txt):
    for p in (txt or "").split("\n\n"):
        p = p.strip()
        if p and not p.startswith('|') and not p.startswith('>'):
            return re.sub(r'\s+', ' ', p)
    return ""

def bullets(txt):
    out = []
    for line in (txt or "").split("\n"):
        m = re.match(r'^[-*]\s+(.*)', line.strip())
        if m:
            out.append(clean(m.group(1)))
    return out[:6]

def snippet(stories):
    m = re.search(r'export const \w+[^=]*=\s*\{(.*?)\n\}', stories, re.S)
    if not m:
        return ""
    rm = re.search(r'render:\s*\(\)\s*=>\s*\(\s*(.*?)\s*\),\s*$', m.group(1), re.S | re.M)
    if not rm:
        return ""
    lines = rm.group(1).split("\n")
    indents = [len(l) - len(l.lstrip()) for l in lines if l.strip()]
    cut = min(indents) if indents else 0
    return "\n".join(l[cut:] if len(l) >= cut else l for l in lines).strip()

def main():
    if not os.path.isdir(SRC):
        raise SystemExit("ERROR: DS source not found at %s — clone it first (see BUILD.md)" % SRC)
    out = []
    for name in sorted(os.listdir(SRC)):
        d = os.path.join(SRC, name)
        if not os.path.isdir(d):
            continue
        kb = kebab(name)
        stories = read(os.path.join(d, kb + ".stories.tsx"))
        spec = read(os.path.join(d, kb + ".spec.md"))
        if not stories:
            for fn in os.listdir(d):
                if fn.endswith(".stories.tsx") and "anatomy" not in fn and "principles" not in fn:
                    stories = read(os.path.join(d, fn)); break
        if not spec:
            for fn in os.listdir(d):
                if fn.endswith(".spec.md"):
                    spec = read(os.path.join(d, fn)); break
        summary = clean(extract_desc(stories) or first_para(section(spec, ["定位"]))) or FILL.get(name, "")
        wb = bullets(section(spec, ["何時用", "何時使用", "使用時機"]))
        code = snippet(stories) or ("<" + name + " />")
        if len(code) > 1400:
            code = code[:1400] + "\n  // …"
        out.append({"name": name, "type": "component", "category": cat_of(name),
                    "summary": summary, "whenBullets": wb, "code": code,
                    "import": "import { %s } from '@qijenchen/design-system'" % name})

    block = "const COMPONENTS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";"
    app = read(APP)
    m = re.search(r"const COMPONENTS = \[.*?\n\];", app, flags=re.S)
    if not m:
        raise SystemExit("ERROR: could not locate COMPONENTS block in App.jsx")
    new = app[:m.start()] + block + app[m.end():]   # splice (no regex-replacement escaping)
    with open(APP, "w", encoding="utf-8") as f:
        f.write(new)
    print("regenerated COMPONENTS in App.jsx — %d components" % len(out))
    missing = [c["name"] for c in out if not c["summary"]]
    if missing:
        print("  ⚠ no summary for:", ", ".join(missing))

if __name__ == "__main__":
    main()
