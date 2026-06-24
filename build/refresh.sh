#!/usr/bin/env bash
# Refresh the platform after the design system updates:
#   1) pull latest @qijenchen/design-system source
#   2) regenerate component data (何時使用 / 程式碼 / summary) into App.jsx
#   3) rebuild the single-file index.html
#
# After it finishes, review `git diff`, then commit & push.
# NOTE: if a component's API changed, its live demo in build/demos.jsx may need a
#       manual fix — build.sh / the headless check will surface breakages.
set -e
cd "$(dirname "$0")"
DS="../.source/design-system"

if [ ! -d "$DS/.git" ]; then
  echo "ERROR: $DS not found. Clone it first:" >&2
  echo "  git clone https://github.com/ajenchen/design-system $DS" >&2
  exit 1
fi

echo "1/3  pulling latest design-system…"
git -C "$DS" pull --ff-only

echo "2/3  regenerating component data → App.jsx…"
python3 extract-components.py

echo "3/3  rebuilding index.html…"
bash build.sh

echo "✓ refresh complete. Review 'git diff', then commit & push."
