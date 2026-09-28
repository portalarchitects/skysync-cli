# PLAT-7839 skysync-cli — Vanta CVE fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Work on the existing `PLAT-7839` branch in place — no worktree, no new branch, no pull request, no `finishing-a-development-branch`.

**Spec:** `dryviq-platform-frontend/docs/superpowers/specs/2026-09-28-PLAT-7839-vanta-dependency-cves-design.md` (branch `PLAT-7839` in `~/code/dryviq-platform-frontend`).

## Global Constraints

- Only flagged packages move. No `npm audit fix` / `npm update` without a package name, no unrelated upgrades, no major bump of a **direct** dependency.
- Fixed versions (floor per major line): brace-expansion 1.1.18 / 2.1.4 / 5.0.9; js-yaml 3.15.2 / 4.3.2; fast-uri 3.1.6; browserslist 4.28.7; baseline-browser-mapping 2.11.0; qs 6.16.0; svgo 3.3.5; shell-quote 1.9.0; immutable 4.3.9; nanoid 3.3.18; postcss 8.5.23; ip-address 10.3.1; dompurify 3.4.13; http-proxy-middleware 2.0.10; uuid 11.1.1; webpack-dev-server 5.2.6; fast-xml-parser 5.7.0; next 15.5.24; sharp 0.35.4; @humanfs/node 0.16.8; colord 2.9.4; fflate 0.8.3; protobufjs 7.6.5; vitest / @vitest/mocker 4.1.11.
- Overrides/resolutions are scoped per major line (e.g. `js-yaml@^3`, `js-yaml@^4`), never one global pin across majors.
- An exact-version override that the fix makes redundant (a refresh now resolves at/above the fix without it) is removed rather than bumped.
- The acceptance test is the lockfile checker: `node /home/amurtha/.claude/jobs/2adbe9de/tmp/vulncheck.js <lockfile>` → `PASS`, except findings the plan names as accepted.
- **Private `@skysync` npm feed:** if any install/refresh fails on authentication (401/403/E401/ENEEDAUTH against pkgs.dev.azure.com), STOP this repo immediately and report. Do not edit `.npmrc`, do not swap registries, do not use tokens from elsewhere, do not work around it (Alex's instruction).
- Do not edit or commit `.npmrc`.
- Commit messages: `PLAT-7839: <summary>` and end with the line `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.
- Do not push; the orchestrator pushes.
- **Never run a full test suite locally** (project rule, enforced by a hook). Locally: install, the lockfile checker, lint, type-check, and build. The full test suites run in CI. If a Review Focus item names a specific consumer, run only that consumer's own test file(s).

**Goal:** Every flagged package in `package-lock.json` resolves at or above its fixed version.

**Architecture:** Every finding here is transitive and its parent's range already allows the fix, so this is a targeted lockfile refresh with no manifest change.

**Tech Stack:** npm 10 (lockfile v2), Node 20 in CI (`.github/workflows/test.yml`); local Node 22 is acceptable.

## Review Focus

1. `glob` → `minimatch@9` → `brace-expansion@2` is a **prod** path: the CLI's own glob use must still behave. CI's mocha run covers this; locally, run only the test file(s) that exercise glob (`git grep -l glob -- test`).
2. The lockfile must not switch `lockfileVersion` or reformat unrelated entries — the diff should touch only the flagged packages and their integrity lines.
3. `js-yaml` 4.1.1 → 4.3.x is minor — eslint and mocha configs still load.

---

### Task 1: Refresh flagged transitive packages

**Files:**
- Modify: `package-lock.json`

- [ ] **Step 1: Run the checker to confirm it fails**

Run: `cd ~/code/skysync-cli && node /home/amurtha/.claude/jobs/2adbe9de/tmp/vulncheck.js package-lock.json`
Expected: `FAIL: 5` — brace-expansion 1.1.13 and 2.0.3, js-yaml 4.1.1, browserslist 4.28.1, baseline-browser-mapping 2.9.19.

- [ ] **Step 2: Install current state, then refresh only those packages**

```bash
cd ~/code/skysync-cli
npm ci
npm update brace-expansion js-yaml browserslist baseline-browser-mapping
```

If `npm update` leaves a nested copy behind (check with `npm ls brace-expansion js-yaml`), run `npm update <pkg>` again, or `npm install --package-lock-only` after removing only that nested entry. Do not add overrides — every parent range allows the fix.

- [ ] **Step 3: Run the checker**

Run: `node /home/amurtha/.claude/jobs/2adbe9de/tmp/vulncheck.js package-lock.json`
Expected: `PASS`

- [ ] **Step 4: Verify the repo**

Run: `npm run build`, then the lint script from `package.json` (for example `npm run lint`).
Expected: build and lint pass. The mocha suite runs in CI (`test.yml`), not locally.

- [ ] **Step 5: Review the diff scope**

Run: `git diff --stat && git diff package-lock.json | grep '^[-+] *"node_modules/' | sort -u`
Expected: only `package-lock.json` changed; the entries listed are the flagged packages (plus any sub-dependency they pull in).

- [ ] **Step 6: Commit**

```bash
git add package-lock.json
git commit -m "PLAT-7839: Refresh brace-expansion, js-yaml, browserslist for Vanta CVEs

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```
