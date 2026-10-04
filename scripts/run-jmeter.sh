#!/usr/bin/env bash
set -euo pipefail

output='reports/performance'
dashboard="$output/dashboard"
mkdir -p "$output"

# JMeter requires the dashboard output directory not to exist.
if [[ -d "$dashboard" ]]; then
  rm -rf "$dashboard"
fi

PATH=/opt/homebrew/opt/openjdk@21/bin:"$PATH" \
  jmeter -n -t performance/reqres-50-users.jmx -l "$output/results.jtl" -e -o "$dashboard"
