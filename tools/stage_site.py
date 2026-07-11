#!/usr/bin/env python3
"""GitHub Pages에 올릴 파일만 _site에 모읍니다."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_site"

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()

for name in ["index.html", "styles.css", "script.js", "gallery.json", "site.webmanifest", ".nojekyll", "robots.txt", "sitemap.xml"]:
    shutil.copy2(ROOT / name, OUT / name)
shutil.copytree(ROOT / "assets", OUT / "assets")
print(f"staged: {OUT}")
