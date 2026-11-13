# Shepherdess visual review — 13 November 2026

Public copy/design baseline: `a63cc4b178e97e7c1b9d8589bf721de168d9e4a2`.
The live homepage matched it byte-for-byte at the start of review. The contact
correction is separately published by [PR #2](https://github.com/Project-Shepherdess/Shepherdess.io/pull/2)
at `77dba4dec3c30b16e9d702b41f9fc433c93c8436`; a fresh live response showed
`hello@aicoop.co` and no old pilot email link. No message was sent.

## Visual findings and candidate

The baseline had no visible AI Coop attribution. Mobile navigation was hidden,
and a very large headline plus repeated boxed grids made the page dense.

The candidate keeps the existing forest photograph and ecological palette. The
image fills the hero with no enclosing frame; a gentle landscape-shaped edge
flows into the page. Open layouts, calmer serif headings and stronger whitespace
reduce the repeated-card effect. The image overlay maintains readable text.
AI Coop's working logo and **An AI Coop initiative** appear in a clear top ribbon
and footer, linking to `https://aicoop.co/`. All five navigation links remain
visible on narrow screens, with a skip link, clear focus and reduced-motion support.

The pilot action opens `hello@aicoop.co` with its existing Shepherdess subject;
a visible email link is also provided. The candidate preserves the 70 existing
headings/paragraphs. A separate content review is being prepared for a balanced
pilot/land-steward and funder/strategic-partner audience; this design does not
establish new capability, field, financial or partnership claims.

## Checks and evidence

Run a static server at the repository root, then:

```sh
python _qa/check_design.py --base http://127.0.0.1:8689
```

Use a Python environment with Playwright and Chromium/Firefox/WebKit installed.
The check covers 15 browser/viewport combinations (1440, 1024, 768, 390, 320 px),
plus mobile navigation without JavaScript in all three engines. It verifies
attribution, original logo hash, image loading, no horizontal overflow, fragment
links, keyboard activation, headings, email targets, no unexpected remote
requests, reduced motion and computed text contrast. Hero contrast uses a
conservative bright-image backdrop through the dark overlay; screenshots also
received visual review. Native macOS WebKit uses Option+Tab for link navigation;
the harness uses that key rather than changing system/browser settings.

Results and exact source hashes: [checks.json](checks.json).
Before/after desktop and mobile screenshots and section/footer details are in
this directory. These are local headless checks, not physical-device or
screen-reader certification. No form, tracking, account or runtime AI service
was added. The original imagery and logo are reused; the owner-supplied AI Coop
logo is copied unchanged (SHA-256
`bf460591d9d0246a03d6db2b4c81bc3720b1d3e1de217c65169a777b499210df`).

## Review and publication

This broader design is a branch preview for owner review. The separately merged
email correction is live. GitHub Pages serves `main`, so merging the design PR
will publish the visual candidate. Recheck current branches, verify the exact
head and observe the Pages build/live response at that point. Roll back with a
reviewed revert; keep contact at the owner-requested address.
