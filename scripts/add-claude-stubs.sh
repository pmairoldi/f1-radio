#!/usr/bin/env bash
# add-claude-stubs.sh
#
# Finds all AGENTS.md files and creates a CLAUDE.md stub
# alongside any that don't already have one.
#
# Usage: ./scripts/add-claude-stubs.sh [--dry-run]

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

created=0
skipped=0

while IFS= read -r agents_file; do
  dir="$(dirname "$agents_file")"
  claude_file="$dir/CLAUDE.md"
  rel_dir="${dir#"$ROOT_DIR"}"
  rel_dir="${rel_dir#/}"
  [[ -z "$rel_dir" ]] && rel_dir="."

  if [[ -f "$claude_file" ]]; then
    echo "  skip  $rel_dir/CLAUDE.md (already exists)"
    ((skipped++)) || true
  else
    echo "create  $rel_dir/CLAUDE.md"
    if [[ "$DRY_RUN" == false ]]; then
      printf '# CLAUDE.md\n\nSee @AGENTS.md\n' > "$claude_file"
    fi
    ((created++)) || true
  fi
done < <(find "$ROOT_DIR" -name "AGENTS.md" | sort)

echo ""
dry_label=""
[[ "$DRY_RUN" == true ]] && dry_label=" (dry run)"
echo "Done. Created: $created, Skipped: $skipped$dry_label"
