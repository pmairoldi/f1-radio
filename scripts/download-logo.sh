#!/usr/bin/env bash
set -euo pipefail

# Download an F1 team logo from the Formula 1 Cloudinary CDN.
#
# Usage:
#   ./scripts/download-logo.sh [--white] <url-slug> [year] [output-filename] [transforms]
#
# Examples:
#   ./scripts/download-logo.sh ferrari
#   ./scripts/download-logo.sh --white williams
#   ./scripts/download-logo.sh williams 2026 williams-logo-2026.png
#   ./scripts/download-logo.sh redbullracing 2026 red-bull-racing-logo.png

WHITE=false
if [[ "${1:-}" == "--white" ]]; then
  WHITE=true
  shift
fi

SLUG="${1:-}"
YEAR="${2:-2026}"
SAVE_NAME="${3:-}"
TRANSFORMS="${4:-c_fit,h_512/q_100}"

ASSETS_DIR="$(dirname "$0")/../src/lib/assets"

if [[ -z "$SLUG" ]]; then
  echo "Usage: $0 [--white] <url-slug> [year] [output-filename] [transforms]"
  echo ""
  echo "Known 2026 slugs:"
  echo "  ferrari, mercedes, mclaren, alpine, williams, haas"
  echo "  redbullracing, astonmartin, racingbulls, cadillac, audi"
  exit 1
fi

# Default output filename
if [[ -z "$SAVE_NAME" ]]; then
  if [[ "$WHITE" == true ]]; then
    SAVE_NAME="${SLUG}-logo-white.png"
  else
    SAVE_NAME="${SLUG}-logo.png"
  fi
fi

OUT="$ASSETS_DIR/$SAVE_NAME"

LOGO_SUFFIX="logo"
if [[ "$WHITE" == true ]]; then
  LOGO_SUFFIX="logowhite"
fi

URL="https://media.formula1.com/image/upload/${TRANSFORMS}/common/f1/${YEAR}/${SLUG}/${YEAR}${SLUG}${LOGO_SUFFIX}.png"

echo "Checking: $URL"
HTTP_STATUS=$(curl -sIL "$URL" | grep -i '^HTTP/' | tail -1 | awk '{print $2}')

if [[ "$HTTP_STATUS" != "200" ]]; then
  echo "Error: got HTTP $HTTP_STATUS — wrong slug or year?"
  echo "Try a slug variant (e.g. redbull, rbr) or pass the full URL as the slug."
  exit 1
fi

echo "Downloading to $OUT ..."
curl -sL -o "$OUT" "$URL"

# Verify it's actually a PNG
FILE_TYPE=$(file "$OUT")
if [[ "$FILE_TYPE" != *"PNG image data"* ]]; then
  echo "Error: downloaded file is not a PNG ($FILE_TYPE)"
  echo "Deleting $OUT"
  rm "$OUT"
  exit 1
fi

echo "Saved: $OUT"
