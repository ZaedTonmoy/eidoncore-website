#!/bin/bash
# Auto-generate sitemap.xml from deployable, indexable index.html files
# Run: bash generate-sitemap.sh

set -euo pipefail
cd "$(dirname "$0")"

SITE="https://eidoncore.com"
OUT="sitemap.xml"

cat > "$OUT" << 'HEADER'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
HEADER

# Priority / frequency rules
get_priority() {
  case "$1" in
    "./index.html") echo "1.0" ;;
    "./features/"*|"./pricing/"*) echo "0.9" ;;
    "./about/"*|"./contact/"*|"./ai-workspace/"*) echo "0.8" ;;
    "./use-cases/index.html") echo "0.8" ;;
    "./use-cases/"*) echo "0.7" ;;
    "./projects/"*|"./tasks/"*|"./crm/"*|"./invoicing/"*|"./services/"*|"./automations/"*|"./portal/"*|"./notifications/"*|"./reports/"*|"./proposals/"*) echo "0.7" ;;
    "./integrations/"*|"./tickets/"*) echo "0.7" ;;
    "./blog/"*|"./changelog/"*|"./docs/"*) echo "0.6" ;;
    "./security/"*) echo "0.6" ;;
    "./privacy/"*|"./terms/"*) echo "0.3" ;;
    *) echo "0.5" ;;
  esac
}

get_freq() {
  case "$1" in
    "./index.html"|"./blog/"*|"./changelog/"*) echo "weekly" ;;
    "./privacy/"*|"./terms/"*) echo "yearly" ;;
    *) echo "monthly" ;;
  esac
}

# Find all index.html files, sorted
find . \( -type d \( -name .git -o -name node_modules -o -name nextjs-homepage -o -name _next -o -name 404 \) -prune \) -o -type f -name "index.html" -print | sort | while read -r f; do
  # Error/redirect pages must never be advertised as indexable URLs.
  if grep -Eiq '<meta[^>]*name="robots"[^>]*content="[^"]*noindex|<meta[^>]*http-equiv="refresh"' "$f"; then
    continue
  fi
  # Convert ./about/index.html -> /about/
  path="${f#.}"                     # /about/index.html
  path="${path%index.html}"         # /about/
  url="${SITE}${path}"
  priority=$(get_priority "$f")
  freq=$(get_freq "$f")

  cat >> "$OUT" << EOF
  <url>
    <loc>${url}</loc>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>
EOF
done

echo "</urlset>" >> "$OUT"

count=$(grep -c "<url>" "$OUT")
echo "✅ sitemap.xml generated with $count URLs"
