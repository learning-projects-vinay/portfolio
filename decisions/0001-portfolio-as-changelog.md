# 0001 — The portfolio is a changelog

- **Status:** accepted
- **Date:** 2026-09-02
- **Supersedes:** the Rev. 02 section stack (Hero → Impact → Projects → Experience → About → Contact)

## Context

Rev. 02 turned a template into a conversion-focused hiring page, and the writing and
metrics were good. The remaining problem was structural, not editorial: the page had the
same shape as every other portfolio — centred column, hero, then a stack of bordered
cards — and a recruiter had to scroll past Impact and Projects before learning what Vinay
does *today*.

Five directions were mocked and compared (see `decisions/` history and the Rev. 03 spec):
Runtime, Trace, Changelog, Atlas, Terminal. A sixth, Agent, was cut because it requires a
deployed Cloudflare Worker and bills per visitor.

The audience is deliberately split: technical hiring managers *and* non-technical
recruiters. That split is what decided it.

## Decision

The career content is presented as a changelog. Each role is a major release, each
achievement is a categorised entry, and each project is a `notable` entry filed under the
release it shipped in.

Runtime was the better-looking option but its chrome — p95, region, uptime — is the most
technically coded material available, which works against the non-technical half of the
audience. A changelog is the one technical format non-technical people already read.

The real win is ordering, not novelty: a changelog is reverse-chronological by nature, so
the current role is the first thing on the page and everything below it is supporting
evidence in descending relevance.

## Consequences

- Experience and Projects stop existing as separate sections; both fold into releases.
- Case studies survive as expandable `notable` entries — they are not flattened to one line.
- Versions are derived (`roleVersion`), so adding a job renumbers everything automatically.
- Projects file into releases via `Project.shippedIn`, not invented dates.
- The palette, type stack and light default are unchanged. This is an architecture change,
  not a repaint.
- Trace remains available as a drop-in replacement for the release list if the changelog
  ever reads as too plain.
