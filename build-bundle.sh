#!/bin/bash
# ============================================
# Denner Web - GitHub Pages ビルドスクリプト
# ============================================
# 使い方: ./build-bundle.sh
# 出力: denner.bundle.js (ブラウザ用バンドル)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🔧 Denner Web Bundle Builder"
echo "  Source: $ROOT_DIR/src/browser-entry.ts"
echo "  Output: $SCRIPT_DIR/denner.bundle.js"
echo ""

cd "$ROOT_DIR"

npx esbuild src/browser-entry.ts \
  --bundle \
  --platform=browser \
  --format=iife \
  --global-name=DennerBundle \
  --outfile=denner-vanilla/denner.bundle.js \
  --external:fs \
  --external:path \
  --external:readline \
  --external:child_process \
  --external:http \
  --external:https \
  --external:@kmamal/sdl \
  --external:@napi-rs/canvas

echo ""
echo "✅ Bundle created: denner-vanilla/denner.bundle.js"
echo ""
echo "🚀 To preview locally:"
echo "   npx serve denner-vanilla"
