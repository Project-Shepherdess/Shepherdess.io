# Shepherdess full-site review — 13 November 2026

This is the finished branch candidate for owner review, following the owner's
request to rework the whole site while preserving the project's spirit and idea.
It is not a new public deployment. The earlier visual-only candidate is preserved
at [`c07b7c4`](https://github.com/Project-Shepherdess/Shepherdess.io/tree/c07b7c4d3b7e2352c7881e7c419a856b168bfc53).
The published contact correction remains on main at
`77dba4dec3c30b16e9d702b41f9fc433c93c8436` (PR #2).

## What changed

The opening now prominently introduces coordination of **people, equipment and
autonomous ecological work**. The page progresses from ecological purpose to the
intended approach, the working cycle, practical landscape questions, evidence,
ecological methods, the longer-term ambition and two partnership invitations.

The original forest photograph fills the hero without a frame. A gentle landscape
edge, shallow section curves, cream/sage surfaces, open layouts and serif headings
carry the organic direction through the page. Existing Shepherdess imagery and the
owner-supplied AI Coop logo remain unchanged. Header and footer say **An AI Coop
initiative**, linking to AI Coop.

The copy is about 1,015 words within the main content. Repeated abstractions have
been reduced, with concrete examples and the development stage stated in both the
opening and invitation. Land stewards/pilot partners and funders/strategic partners
have equally visible contact paths, including distinct email subjects. All three
contact links address `hello@aicoop.co`; no message is sent by loading the page.

## Project ideas retained

| Project idea | Treatment in the revised page |
| --- | --- |
| Productive living systems | Retained in the main headline; soil, water, habitat, resilience and lasting productivity give it concrete meaning. |
| Ecological capital and abundance | Defined as the living capacity of a place; production should build that foundation and draw useful yields from its growth. |
| Conversational ecological intelligence | An intended AI steward that people can work with in ordinary language, grounded in site conditions and history. |
| Operational coordination | People, equipment and autonomous ecological work lead the opening and appear in the approach and working cycle. |
| Site memory and connected tools | Maps, observations, photos, seasons, history, sensors, water controls and equipment remain part of the intended direction. |
| Learning through real work | Understand → Plan → Coordinate → Measure → Adapt links actions to observed outcomes and future decisions. |
| Different scales of land | Gardens/home foodsheds, working land, restoration and institutional landscapes remain represented. Examples are questions for potential pilots, not customer case studies. |
| Ecological methods | All ten previously listed practice areas are retained. |
| MRV and finance | Measurement, reporting and verification is spelled out. Potential funding/reporting uses are qualified by their own standards and verification. |
| Domain-grounded AGI | Retained as a long-term research ambition in the longer-view section, distinct from present service availability. |
| AI Coop identity | Supplied logo and visible initiative attribution in both header and footer. |

No testimonials, results, existing customers, deployed integrations or successful
pilots have been invented. The page does not expose private research or add a
working AI interface, accounts, tracking or data collection.

## Verification and evidence

Run the static server from the repository root, then use a Python environment
with Playwright and its Chromium, Firefox and WebKit browsers installed:

```sh
python _qa/check_design.py --base http://127.0.0.1:8689
```

The final receipt is [checks.json](checks.json), with exact runtime file hashes
and UTC time. The check covers:

- 15 browser/viewport combinations: three engines at 1440, 1024, 768, 390 and 320 px.
- Mobile navigation without JavaScript in all three engines.
- Six enlarged-text reflow cases: computed text sizes doubled at 1280 and 390 px
  in each engine. This is text-size simulation, not a claim of native browser zoom.
- Image loading, original AI Coop logo hash, all internal fragment destinations,
  keyboard/skip-link navigation, sticky-header offsets and both hero contact paths.
- Distinct pilot/strategic mail subjects and the visible contact address.
- Computed text contrast, horizontal overflow, reduced motion, response/page
  errors and absence of external runtime requests.

The enlarged-text check exposed headline/email overflow on narrow screens during
development. Wrapping was corrected before the final verification. The former
70-heading/paragraph equality check was intentionally superseded by the owner's
explicit full-rewrite direction; earlier copy-preservation evidence remains in Git.

Hero contrast is checked against a conservative bright-image backdrop through the
dark overlay. Desktop/mobile screenshots also receive visual review. Native macOS
WebKit uses Option+Tab for link navigation; the harness does not alter OS settings.

Review images:

- [Desktop opening](after-1440.png) and [mobile opening](after-390.png).
- [Full desktop page](full-1440.png) and [full mobile page](full-390.png).
- [Desktop partnership section](partnerships-1440.png) and [mobile partnership section](partnerships-390.png).

Isolated section crops hide the sticky header to show the entire section; full-page
and opening screenshots retain the normal page. Local headless checks do not
constitute physical-device testing, screen-reader certification or field validation.

## Review and publication

Preview: `http://127.0.0.1:8689/`. PR #3 holds the full candidate, linked to issue #1
and internal Project 1. Owner review is the next step. Main publishes through
GitHub Pages; this task leaves the candidate unmerged for the requested review.

When the selected version is published, recheck concurrent work and the exact PR
head, then observe the Pages build and live response. Backout is a reviewed revert
of the selected site changes, keeping the separately requested contact correction.
The local preview is deliberately retained for owner review.
