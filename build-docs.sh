#!/bin/bash
# ============================================
# Build client-docs markdown → docs/docs.json
# Reads every .md from ../client-docs/ and outputs
# a single JSON array to docs/docs.json
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCS_SRC="${1:-$SCRIPT_DIR/../client-docs}"
OUT="$SCRIPT_DIR/docs/docs.json"

if [ ! -d "$DOCS_SRC" ]; then
  echo "Error: client-docs directory not found at $DOCS_SRC"
  exit 1
fi

echo "Building docs.json from $DOCS_SRC ..."

python3 - "$DOCS_SRC" "$OUT" <<'PYEOF'
import sys, os, json, re

docs_src = sys.argv[1]
out_path = sys.argv[2]

CATEGORIES = {
    'getting-started': 'Getting Started', 'onboarding': 'Getting Started', 'dashboard': 'Getting Started',
    'projects': 'Core Features', 'tasks': 'Core Features', 'clients': 'Core Features',
    'invoicing': 'Core Features', 'services': 'Core Features', 'messaging': 'Core Features',
    'team': 'Team & Workflow', 'automations': 'Team & Workflow',
    'reports': 'Team & Workflow', 'notifications': 'Team & Workflow',
    'settings': 'Configuration', 'client-portal': 'Configuration', 'files': 'Configuration',
    'intake-forms': 'Configuration', 'security': 'Configuration',
}

# Human-readable titles for directory-based (merged) articles
DIR_TITLES = {
    'settings': 'Settings', 'invoicing': 'Invoicing', 'clients': 'Clients',
    'tasks': 'Tasks', 'client-portal': 'Client Portal', 'notifications': 'Notifications',
    'security': 'Security', 'services': 'Services',
}

ICONS = {
    'getting-started': 'play-circle', 'onboarding': 'clipboard', 'dashboard': 'layout',
    'projects': 'folder', 'tasks': 'check-circle', 'clients': 'users',
    'invoicing': 'wallet', 'services': 'wrench', 'messaging': 'message-circle',
    'team': 'user-plus', 'automations': 'zap', 'reports': 'bar-chart',
    'notifications': 'bell', 'settings': 'settings', 'client-portal': 'globe',
    'files': 'file', 'intake-forms': 'edit', 'security': 'lock',
}

ORDER = {
    'getting-started': 1, 'onboarding': 2, 'dashboard': 3,
    'projects': 4, 'tasks': 5, 'clients': 6, 'invoicing': 7,
    'services': 8, 'messaging': 9, 'team': 10, 'automations': 11,
    'reports': 12, 'notifications': 13, 'settings': 14,
    'client-portal': 15, 'files': 16, 'intake-forms': 17, 'security': 18,
}

# Documentation.ai JSX component tags to strip for website rendering
JSX_COMPONENTS = [
    'Steps', 'Step', 'Tabs', 'Tab', 'Card', 'Columns',
    'Callout', 'Expandable', 'ExpandableGroup', 'Update',
]

def strip_jsx_tags(text):
    """Remove Documentation.ai JSX component tags, keeping inner text content."""
    for comp in JSX_COMPONENTS:
        # Remove self-closing tags: <Component ... />
        text = re.sub(rf'<{comp}\s+[^>]*/>', '', text)
        # Remove opening tags with attributes: <Component attr="val">
        text = re.sub(rf'<{comp}(?:\s+[^>]*)?>',  '', text)
        # Remove closing tags: </Component>
        text = re.sub(rf'</{comp}>', '', text)
    # Clean up excessive blank lines left behind
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def parse_md_file(filepath):
    """Parse a markdown file, returning (title, body_content)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        raw = f.read()

    title = None
    body = raw
    if raw.startswith('---'):
        end = raw.find('---', 3)
        if end != -1:
            fm = raw[3:end]
            body = raw[end+3:].strip()
            for line in fm.strip().split('\n'):
                if line.startswith('title:'):
                    title = line[6:].strip().strip('"').strip("'")

    # Fallback: extract title from first H1
    if not title:
        title_match = re.match(r'^#\s+(.+)', body)
        title = title_match.group(1).strip() if title_match else None

    # Content = everything after frontmatter, skip H1 if present
    lines = body.split('\n')
    content_start = 0
    for i, line in enumerate(lines):
        if line.startswith('# '):
            content_start = i + 1
            break
    content = '\n'.join(lines[content_start:]).strip()
    return title, content


articles = []
processed_slugs = set()

# First pass: process subdirectories (e.g., services/) — merge all .md files into one article
for entry in sorted(os.listdir(docs_src)):
    entry_path = os.path.join(docs_src, entry)
    if not os.path.isdir(entry_path) or entry.startswith('.'):
        continue
    slug = entry
    if slug not in CATEGORIES:
        continue

    # Collect .md files, putting overview.md first then rest alphabetically
    all_md = sorted(f for f in os.listdir(entry_path) if f.endswith('.md'))
    if not all_md:
        continue
    md_files = []
    if 'overview.md' in all_md:
        md_files.append('overview.md')
        all_md.remove('overview.md')
    md_files.extend(all_md)

    # Use the directory title map, then fall back to slug
    article_title = DIR_TITLES.get(slug, slug.replace('-', ' ').title())

    # Merge content from all sub-files
    parts = []
    for md_file in md_files:
        _, content = parse_md_file(os.path.join(entry_path, md_file))
        if content:
            parts.append(content)

    merged_content = strip_jsx_tags('\n\n---\n\n'.join(parts))

    articles.append({
        'slug': slug,
        'title': article_title,
        'category': CATEGORIES.get(slug, 'General'),
        'icon': ICONS.get(slug, 'book'),
        'order': ORDER.get(slug, 99),
        'content': merged_content,
    })
    processed_slugs.add(slug)

# Second pass: process top-level .md files (skip if slug already handled by a subdirectory)
for fname in sorted(os.listdir(docs_src)):
    if not fname.endswith('.md') or fname == 'index.md' or fname == 'changelog.md':
        continue
    slug = fname[:-3]
    if slug in processed_slugs:
        continue
    filepath = os.path.join(docs_src, fname)
    title, content = parse_md_file(filepath)
    if not title:
        title = slug.replace('-', ' ').title()

    content = strip_jsx_tags(content)

    articles.append({
        'slug': slug,
        'title': title,
        'category': CATEGORIES.get(slug, 'General'),
        'icon': ICONS.get(slug, 'book'),
        'order': ORDER.get(slug, 99),
        'content': content,
    })

articles.sort(key=lambda a: a['order'])

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f"✓ Generated {out_path} with {len(articles)} articles")
PYEOF
