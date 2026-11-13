# Shepherdess public website

Source for [shepherdess.io](https://shepherdess.io/), hosted by GitHub Pages from
`main` at the repository root. This is the public landing page, separate from
private cooperative research and simulation source.

The landing page is `index.html`, styled by `stylesheets/landing.css`, with local
assets under `images/`. It needs no build step, JavaScript, package installation,
accounts or runtime services. Preview locally:

```sh
python3 -m http.server 8689 --bind 127.0.0.1
```

Open `http://127.0.0.1:8689/`. The pilot action addresses `hello@aicoop.co` in the visitor's email client;
it does not submit data. Historical demos elsewhere in this repository remain
unchanged and are not linked from the landing page.

The review candidate on `codex/aicoop-brand-design` adds visible “An AI Coop
initiative” attribution and refines the existing design. [Review notes and
checks](_qa/design-review.md) distinguish the candidate from the published site.
Main-branch merges trigger public GitHub Pages deployment; source review and
local verification are not deployment receipts.
