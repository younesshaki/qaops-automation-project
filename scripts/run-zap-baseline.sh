#!/usr/bin/env bash
set -euo pipefail

# The course limits this check to the public Formy training target.
target='https://formy-project.herokuapp.com/'
zap='/Applications/ZAP.app/Contents/MacOS/ZAP.sh'
output_dir='reports/security'

if [[ ! -x "$zap" ]]; then
  echo "OWASP ZAP was not found at $zap" >&2
  exit 1
fi

mkdir -p "$output_dir"
"$zap" -cmd -host 127.0.0.1 -port 8090 -quickurl "$target" -quickprogress -quickout "$(pwd)/$output_dir/zap-report.html"
