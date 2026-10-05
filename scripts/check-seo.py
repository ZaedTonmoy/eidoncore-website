#!/usr/bin/env python3
"""Regression checks for the static Pages deployment; no third-party packages."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://eidoncore.com'
class Head(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.meta = {}; self.canonical = []; self.title = ''; self.in_title = False; self.hrefs = []; self.h1 = ''; self.in_h1 = False
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.in_h1 = True
        if tag == 'a': self.hrefs.append(a.get('href'))
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'h1': self.in_h1 = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_h1: self.h1 += data

pages = json.loads((ROOT / 'nextjs-homepage/src/content/page-metadata.json').read_text())
app = ROOT / 'nextjs-homepage/src/app'
source_routes = {str(p.parent.relative_to(app)) for p in app.rglob('page.tsx')} - {'.'}
assert set(pages) == source_routes, 'Every route must have explicit metadata'
titles = set()
# Pass an export directory to verify a fresh build before copying it to root.
deployment = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT
for route, expected in pages.items():
    layout = (app / route / 'layout.tsx').read_text()
    assert f'pageMetadata("{route}")' in layout, f'{route}: metadata layout missing'
    head = Head((deployment / route / 'index.html').read_text())
    url = f'{SITE}/{route}/'
    assert head.canonical == [url], f'{route}: incorrect canonical {head.canonical}'
    assert head.title == expected['title'], f'{route}: incorrect title'
    assert head.title not in titles, f'{route}: duplicate title'
    titles.add(head.title)
    assert head.meta['description'] == expected['description'], f'{route}: incorrect description'
    assert head.meta['og:url'] == url, f'{route}: incorrect social URL'
    for key in ['og:title', 'twitter:title']:
        assert head.meta[key] == expected['title'], f'{route}: incorrect {key}'
    for key in ['og:description', 'twitter:description']:
        assert head.meta[key] == expected['description'], f'{route}: incorrect {key}'
    for key in ['og:image', 'twitter:image']:
        image = urlsplit(head.meta[key])
        assert image.netloc == 'eidoncore.com' and (ROOT / image.path.lstrip('/')).is_file(), f'{route}: missing image'
    assert 'noindex' not in head.meta.get('robots', ''), f'{route}: unexpectedly noindexed'
    assert '<h1' in (deployment / route / 'index.html').read_text(), f'{route}: missing H1'

comparison = Head((deployment / 'compare/index.html').read_text())
assert comparison.h1 == 'How Eidoncore Compares', 'Animated heading words must retain semantic spaces'
for slug in ['agencyhandy', 'bonsai', 'honeybook', 'kitchen', 'moxie']:
    assert f'/compare/{slug}/' in comparison.hrefs, f'Unlinked comparison: {slug}'
home = Head((deployment / 'index.html').read_text())
assert '#contact' not in home.hrefs and '/contact/' in home.hrefs, 'Broken homepage contact anchor'

urls = [n.text for n in ET.parse(ROOT / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls) == len(set(urls)), 'Duplicate sitemap URLs'
assert {f'{SITE}/{route}/' for route in pages} <= set(urls), 'Missing route in sitemap'
assert SITE + '/' in urls, 'Missing homepage in sitemap'
for url in urls:
    parsed = urlsplit(url)
    assert parsed.scheme == 'https' and parsed.netloc == 'eidoncore.com'
    assert not any(x in parsed.path.split('/') for x in ('404', 'nextjs-homepage', 'node_modules', '_next'))
    route = parsed.path.strip('/')
    base = deployment if route in pages or not route else ROOT
    file = base / parsed.path.lstrip('/') / 'index.html'
    head = Head(file.read_text())
    assert head.canonical == [url], f'{url}: sitemap/canonical mismatch'
    assert 'noindex' not in head.meta.get('robots', ''), f'{url}: noindex in sitemap'
    assert not head.meta.get('robots') == 'none'
    assert head.meta.get('og:url') == url, f'{url}: missing or incorrect social URL'
    assert head.meta.get('twitter:card') == 'summary_large_image', f'{url}: missing social card'
    for key in ['og:title', 'og:description', 'twitter:title', 'twitter:description']:
        assert head.meta.get(key), f'{url}: missing {key}'
    for key in ['og:image', 'twitter:image']:
        image = urlsplit(head.meta.get(key, ''))
        assert image.netloc == 'eidoncore.com' and (ROOT / image.path.lstrip('/')).is_file(), f'{url}: missing {key}'
assert f'Sitemap: {SITE}/sitemap.xml' in (ROOT / 'robots.txt').read_text()
print(f'SEO checks passed: {len(pages)} Next.js routes and {len(urls)} sitemap URLs')
