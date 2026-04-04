#!/bin/bash
# Auto-generate sitemap.xml from all index.html files
# Run: bash generate-sitemap.sh

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
    "./about/"*|"./contact/"*) echo "0.8" ;;
    "./use-cases/index.html") echo "0.8" ;;
    "./use-cases/"*) echo "0.7" ;;
    "./projects/"*|"./tasks/"*|"./crm/"*|"./invoicing/"*|"./services/"*|"./automations/"*|"./portal/"*|"./notifications/"*|"./reports/"*|"./proposals/"*) echo "0.7" ;;
    "./integrations/"*) echo "0.7" ;;
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
find . -name "index.html" -not -path "*/node_modules/*" | sort | while read -r f; do
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
