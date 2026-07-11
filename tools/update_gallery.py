#!/usr/bin/env python3
"""assets/gallery의 이미지 목록으로 gallery.json을 갱신합니다."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GALLERY_DIR = ROOT / "assets" / "gallery"
MANIFEST = ROOT / "gallery.json"
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

existing = []
if MANIFEST.exists():
    existing = json.loads(MANIFEST.read_text(encoding="utf-8"))
by_src = {item.get("src"): item for item in existing}

items = []
for path in sorted(GALLERY_DIR.iterdir(), key=lambda p: p.name.casefold()):
    if not path.is_file() or path.suffix.lower() not in EXTENSIONS:
        continue
    src = path.relative_to(ROOT).as_posix()
    if src in by_src:
        items.append(by_src[src])
    else:
        items.append({"src": src, "alt": "푸른 하늘과 함께한 가족의 그림"})

MANIFEST.write_text(
    json.dumps(items, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(f"gallery.json: {len(items)}개 그림")
