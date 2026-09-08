#!/usr/bin/env python3
"""Static file server with an edit-saving endpoint (replaces python -m http.server and saves cell edits to disk).
- GET  /*           Serve files from this directory
- POST /save        body {"id": "...", "html": "..."} → Merge into _shot-visual-plan-edits.json
Port 4101.
"""
import http.server, socketserver, json, os
from urllib.parse import urlparse

DIR = os.path.dirname(os.path.abspath(__file__))
EDITS = os.path.join(DIR, "_shot-visual-plan-edits.json")
PORT = 4101


class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=DIR, **k)

    def do_POST(self):
        if urlparse(self.path).path != "/save":
            self.send_response(404); self.end_headers(); return
        try:
            ln = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(ln))
            cid, html = payload["id"], payload["html"]
        except Exception:
            self.send_response(400); self.end_headers(); self.wfile.write(b"bad request"); return
        data = {}
        if os.path.exists(EDITS):
            try:
                with open(EDITS, encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                data = {}
        data[cid] = html
        with open(EDITS, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        body = b'{"ok":true}'
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *a):
        pass


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), H) as httpd:
    print(f"serving {DIR} on :{PORT} (with /save)")
    httpd.serve_forever()
