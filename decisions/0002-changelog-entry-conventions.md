# 0002 — Changelog entry conventions

- **Status:** accepted
- **Date:** 2026-09-02
- **Extends:** [0001 — The portfolio is a changelog](0001-portfolio-as-changelog.md)

## Context

Once roles became releases, two conventions needed settling. Both were raised as open
questions at the build checkpoint and both were resolved as "keep what's there".

## Decisions

### Achievement text is never rewritten to fit a category

`Role.achievements` gained a `kind` (`added` / `changed` / `perf` / `security`), but the
text itself is untouched from Rev. 02.

The visible consequence is that `perf` appears only once, on the CI/CD line. The 50%
latency win lives inside an `added` bullet about shipping 200+ APIs, and splitting that
sentence would surface a second `perf` entry and make the metric more prominent.

We are not splitting it. The copy was written deliberately and reads well; bending
sentences to balance a category column is the format driving the content rather than
describing it. If the metric needs more prominence it belongs in the header strip, which
already carries it.

### `breaking` marks every major version except the first

A role change is a major version bump, and in semver a major bump is a breaking change —
so `v3.0.0` and `v2.0.0` both carry the tag. `v1.0.0` does not: nothing precedes an
initial release for it to break.

Two tags rather than one was considered and kept. The tag is applied by a consistent rule
rather than for effect, which is what stops it reading as a joke told twice.

## Consequences

- `EntryKind` distribution is uneven by design. An even spread would be a warning sign.
- `security` is defined but unused. It stays in the type for when it is earned.
- The `breaking` rule is positional (`index === experience.length - 1` is exempt), so it
  stays correct as roles are added.
