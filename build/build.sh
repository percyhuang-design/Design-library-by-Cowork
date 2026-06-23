#!/usr/bin/env bash
# Rebuild index.html from source. Run from anywhere; resolves paths itself.
# Prerequisites:
#   - Node 18+ and Python 3
#   - The private design system cloned at  ../.source/design-system
#       git clone https://github.com/ajenchen/design-system ../.source/design-system
set -e
cd "$(dirname "$0")"                       # build/
DS="../.source/design-system/packages/design-system/src"

if [ ! -d "$DS" ]; then
  echo "ERROR: 找不到 $DS — 請先 clone 私有設計系統，見 BUILD.md" >&2
  exit 1
fi

echo "1/5 install deps"
cp ds-bundle.package.json package.json
npm install --silent

# let esbuild resolve the DS's bare imports (radix/cva/...) from our node_modules
ln -sfn "$(pwd)/node_modules" "../.source/design-system/packages/design-system/node_modules"

echo "2/5 bundle platform app"
cp ../App.jsx ../previews.jsx .
npx esbuild entry.jsx --bundle --minify --format=iife \
  --define:process.env.NODE_ENV='"production"' --loader:.jsx=jsx --outfile=app.bundle.js
npx -y tailwindcss@3.4.13 -c app-tailwind.config.js -i app-tailwind.css -o app.css --minify

echo "3/5 bundle real DS components + flows"
npx esbuild demos.jsx --bundle --minify --format=iife \
  --loader:.jsx=jsx --loader:.tsx=tsx --loader:.ts=ts \
  "--alias:@/design-system=$DS" "--alias:@/lib=$DS/lib" \
  --define:process.env.NODE_ENV='"production"' "--define:import.meta.env={}" \
  --outfile=demos.bundle.js

echo "4/5 build DS tailwind (v4) css"
npx @tailwindcss/cli -i ds-tailwind.css -o demos.css --minify
[ -f demos.bundle.css ] && cat demos.bundle.css >> demos.css || true

echo "5/5 assemble single-file index.html"
python3 assemble.py
echo "✓ done -> ../index.html"
