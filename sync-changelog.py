#!/usr/bin/env python3
"""Convert changelog.json to changelog.md for Documentation.ai."""
import json, sys, os

src = sys.argv[1] if len(sys.argv) > 1 else "changelog/changelog.json"
dst = sys.argv[2] if len(sys.argv) > 2 else "changelog.md"

data = json.load(open(src, encoding="utf-8"))

TYPE_LABELS = {"feature": "🚀 New", "improvement": "✨ Improved", "fix": "🐛 Fixed"}
TYPE_ORDER = ["feature", "improvement", "fix"]

lines = ["---", 'title: "Changelog"', "---", "", "All notable changes to the EidonCore platform.", ""]

for entry in data:
    lines.append(f'## v{entry["version"]} — {entry["title"]}')
    lines.append(f'**{entry["date"]}**')
    lines.append("")
    if entry.get("summary"):
        lines.append(f'> {entry["summary"]}')
        lines.append("")

    grouped = {}
    for c in entry.get("changes", []):
        grouped.setdefault(c.get("type", "feature"), []).append(c["text"])

    for t in TYPE_ORDER:
        if t in grouped:
            lines.append(f"### {TYPE_LABELS.get(t, t.title())}")
            for item in grouped[t]:
                lines.append(f"- {item}")
            lines.append("")

    lines.append("---")
    lines.append("")

with open(dst, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"✓ Generated {dst} with {len(data)} versions ({len(lines)} lines)")
