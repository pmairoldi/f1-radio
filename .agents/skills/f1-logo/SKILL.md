---
name: f1-logo
description: Download F1 team logo images from the Formula 1 Cloudinary media CDN and save them into the f1-radio project. Use this skill when the user asks to fetch, download, update, or refresh a team logo from formula1.com, or when adding a new team to a season file that needs its logo asset.
allowed-tools: Bash(curl:*)
---

# F1 Logo Downloader

Downloads team logos from `media.formula1.com` and saves them to `src/lib/assets/`.

## URL Pattern

```
https://media.formula1.com/image/upload/{transforms}/common/f1/{year}/{url-slug}/{year}{url-slug}logo.png
```

- **Default transforms**: `c_fit,h_512/q_100` (512px height, full quality)
- **Version segment** (`v1740000000`): optional — omit first, add only if needed
- **url-slug**: lowercase, no hyphens (see table below)

## 2026 URL Slug Reference

| Season key        | URL slug                                | Local asset filename       |
| ----------------- | --------------------------------------- | -------------------------- |
| `audi`            | `audi`                                  | `audi-logo.png`            |
| `ferrari`         | `ferrari`                               | `ferrari-logo.png`         |
| `mercedes`        | `mercedes`                              | `mercedes-logo.png`        |
| `alpine`          | `alpine`                                | `alpine-logo.png`          |
| `mclaren`         | `mclaren`                               | `mclaren-logo.png`         |
| `williams`        | `williams`                              | `williams-logo-2026.png`   |
| `haas`            | `haas`                                  | `haas-logo.png`            |
| `cadillac`        | `cadillac`                              | `cadillac-logo.png`        |
| `red_bull_racing` | `redbullracing` (try: `redbull`, `rbr`) | `red-bull-racing-logo.png` |
| `aston_martin`    | `astonmartin` (try: `aston-martin`)     | `aston-martin-logo.png`    |
| `racing_bulls`    | `racingbulls` (try: `rb`)               | `rb-logo.png`              |

## Workflow

### Step 1: Gather inputs

Determine from user request:

- `YEAR` — e.g., `2026`
- `URL_SLUG` — from table above; for unknowns, derive as lowercase-no-spaces team name
- `TRANSFORMS` — default `c_fit,h_512/q_100`; override if user specifies size
- `VARIANT` — empty for primary; set to `-white`, `-dark`, etc. for alternates
- `SAVE_NAME` — from local asset filename column; year-specific if project already has a non-year file

### Step 2: Attempt URLs in order (stop at first 200)

**Attempt 1 — no version:**

```
https://media.formula1.com/image/upload/{TRANSFORMS}/common/f1/{YEAR}/{URL_SLUG}/{YEAR}{URL_SLUG}logo.png
```

**Attempt 2 — with version (if user supplied one):**

```
https://media.formula1.com/image/upload/{TRANSFORMS}/{VERSION}/common/f1/{YEAR}/{URL_SLUG}/{YEAR}{URL_SLUG}logo.png
```

Check status before downloading:

```bash
curl -sI "URL" | head -1
```

### Step 3: Download

```bash
curl -L -o "src/lib/assets/{SAVE_NAME}" "{URL}"
```

Verify it's actually a PNG (not an error HTML page):

```bash
file src/lib/assets/{SAVE_NAME}
```

Expected output contains `PNG image data`. If `HTML document` — delete and retry with different slug.

### Step 4: Update season file (if requested)

In `src/lib/seasons/{YEAR}.ts`:

1. Add import: `import {team_key}_logo from '$lib/assets/{SAVE_NAME}';`
2. Set `logo: {team_key}_logo` on the team object.

Follow existing import style: `snake_case` variable matching the season key.

## Save Path Conventions

| Scenario               | Filename pattern                        |
| ---------------------- | --------------------------------------- |
| Standard logo          | `{team-slug}-logo.png`                  |
| Year-specific redesign | `{team-slug}-logo-{year}.png`           |
| Year-specific variant  | `{team-slug}-logo-{variant}-{year}.png` |

## Failure Handling

- **404 / wrong slug**: Try slug variants from the table. If all fail, ask user to provide full URL from browser network tab on the F1 team page.
- **File is HTML**: Wrong slug/year path. Delete the file and retry.
- **Need version**: Omit version segment first — Cloudinary serves current without it for public assets.

## Example Invocations

- "Download the Cadillac logo for 2026" → slug `cadillac`, save as `cadillac-logo.png`
- "Fetch the white Williams logo" → slug `williams`, variant `-white`, save as `williams-logo-white-2026.png`
- "Get the Red Bull logo" → try slug `redbullracing`, save as `red-bull-racing-logo.png`
- "Download all 2026 logos" → iterate slug table, report successes/failures
