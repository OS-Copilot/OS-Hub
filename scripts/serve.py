"""Serve the local preview with enough queue capacity for parallel asset requests."""

import argparse
import errno
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import time


class PreviewServer(ThreadingHTTPServer):
    request_queue_size = 128


class PreviewHandler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def copyfile(self, source, outputfile):
        # macOS may exhaust socket buffers while several large images load.
        # Track partial sends so a retry cannot duplicate image bytes.
        while block := source.read(32 * 1024):
            remaining = memoryview(block)
            deadline = time.monotonic() + 5
            while remaining:
                try:
                    sent = self.connection.send(remaining)
                except OSError as error:
                    if error.errno != errno.ENOBUFS or time.monotonic() >= deadline:
                        raise
                    time.sleep(0.01)
                    continue
                if sent == 0:
                    raise BrokenPipeError("Preview connection closed")
                remaining = remaining[sent:]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    handler = partial(PreviewHandler, directory=str(root))
    with PreviewServer(("127.0.0.1", args.port), handler) as server:
        print(f"OS-Copilot Hub: http://127.0.0.1:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
