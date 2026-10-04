#!/usr/bin/env bash
set -euo pipefail

chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
root="$(pwd)"
"$chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$root/docs/plan-de-tests.pdf" "file://$root/docs/plan-de-tests.html"
"$chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$root/docs/rapport-final.pdf" "file://$root/docs/rapport-final.html"
