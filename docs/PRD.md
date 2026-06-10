# Portfolio v2.0 — Product Requirements Document

**Author:** Hrishank Chhatbar
**Date:** 2026-06-09
**Status:** In Review
**Branch:** Deployment

---

## 1. Overview

This document captures the improvement backlog for the portfolio site (`hrishankc.netlify.app`), identified through a full codebase audit. It covers security fixes, performance optimisations, copy corrections, code quality improvements, and the introduction of automated testing and a tidied folder structure. Items are prioritised by severity.

---

## 2. Goals

| Goal | Success Metric |
|------|---------------|
| Eliminate XSS vector in contact email | Zero unsanitised HTML in outbound emails |
| Contact form sends reliably and reports failure | HTTP 500 returned on email failure; user sees error state |
| Fix visible copy bugs for recruiters | Zero typos/missing apostrophes on live site |
| Reduce unnecessary animation overhead | Three.js loop pauses on hidden tab; reduced motion respected |
| Prevent TypeScript errors from shipping silently | `ignoreBuildErrors` removed; build fails on type errors |
| Achieve test coverage on critical paths | ≥ 80% statement coverage on components and API route |
| Clean folder structure | No stray log files, no `public 2/` artefact, docs in `/docs` |

---

## 3. Improvements

### P0 — Security

#### 3.1 XSS in Contact Email Template
**File:** `src/app/api/contact/route.ts:63–68`
**Problem:** `name`, `email`, and `message` are interpolated directly into an HTML string sent via Resend. A user can submit `<script>alert(1)</script>` or arbitrary HTML that renders in the recipient's email client.
**Fix:** Escape all user-supplied strings with an HTML entity encoder before interpolating into the template.

```ts
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
```

**Acceptance Criteria:**
- Submitting `<script>alert(1)</script>` as name renders as literal text in the received email
- All three fields (name, email, message) are escaped

---

### P1 — Reliability

#### 3.2 Contact Form Returns 200 on Email Failure
**File:** `src/app/api/contact/route.ts:80–85`
**Problem:** The inner `try/catch` around `resend.emails.send` swallows the error and the outer handler always returns `{ success: true, status: 200 }`. The user sees "Message Sent!" even when the email never arrived.
**Fix:** Re-throw email errors so the outer handler returns a 500.

**Acceptance Criteria:**
- When `RESEND_API_KEY` is invalid, the API returns `{ status: 500, error: "Failed to send message" }`
- The frontend terminal output shows a red error line
- When the key is valid, the response is still `{ status: 200, success: true }`

#### 3.3 Dead `if (!resend)` Guard
**File:** `src/app/api/contact/route.ts:45`
**Problem:** `new Resend(...)` always returns an object, so the `if (!resend)` branch is unreachable dead code.
**Fix:** Remove the guard.

#### 3.4 Resend Client Instantiated Per-Request
**File:** `src/app/api/contact/route.ts:4`
**Problem:** `new Resend(process.env.RESEND_API_KEY)` is called inside the POST handler on every request.
**Fix:** Move to module scope as a singleton.

---

### P2 — Copy & Content

#### 3.5 Missing Apostrophes in About Section
**File:** `src/components/about-section.tsx`
- `"Im a recent Masters graduate"` → `"I'm a recent Masters graduate"`
- `"Im now seeking my next opportunity"` → `"I'm now seeking my next opportunity"`

#### 3.6 Misleading "End-to-End Encrypted" Claim
**File:** `src/components/contact-section.tsx`
The terminal UI says "All transmissions are encrypted end-to-end." The form uses HTTPS (transport encryption), not E2E encryption.
**Fix:** Change to "All transmissions are sent over HTTPS." or remove.

---

### P3 — Performance

#### 3.7 Three.js Loop Runs When Tab Is Hidden
**File:** `src/components/three-background.tsx:75`
The RAF loop continues at 60fps in the background.
**Fix:** Add a `visibilitychange` listener to cancel/restart the loop.

#### 3.8 No `prefers-reduced-motion` Respect
All animations run regardless of the user's motion preference.
**Fix:** Check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip/reduce animations accordingly.

#### 3.9 Cursor Blink Driven by Framer Motion
**File:** `src/components/hero/index.tsx:71`
A blinking cursor uses Framer Motion + a JS interval. A CSS animation has zero JS overhead.
**Fix:** Replace with a Tailwind `animate-pulse` or custom CSS keyframe.

#### 3.10 32 Simultaneously Animated Dots
**File:** `src/components/contact-section.tsx` (bottom decoration)
32 Framer Motion elements running continuous repeating animations for a purely decorative element.
**Fix:** Replace with a CSS background-pattern or remove.

---

### P4 — Build & Code Quality

#### 3.11 TypeScript Build Errors Suppressed
**File:** `next.config.ts:7`
`typescript: { ignoreBuildErrors: true }` silently ships type errors.
**Fix:** Remove this option and fix any surfaced type errors.

#### 3.12 `Icon: any` Prop Type
**Files:** `src/components/about-section.tsx`, `src/components/projects-section.tsx`
**Fix:** Use `LucideIcon` from `lucide-react`.

---

### P5 — Repo Hygiene

#### 3.13 Log Files in Project Root
`dev_output*.log` files tracked in git.
**Fix:** Added to `.gitignore` and removed from tracking.

#### 3.14 `public 2/` Duplicate Directory
macOS artefact containing a duplicate `resume.pdf`.
**Fix:** Removed from git tracking, added to `.gitignore`.

#### 3.15 Docs Directory
**Fix:** Created `docs/` directory — this PRD lives here.

---

## 4. Testing Strategy

### 4.1 Unit & Component Tests (Jest + React Testing Library)

| Test File | What It Covers |
|-----------|---------------|
| `tests/unit/api/contact.test.ts` | Validation (400s), successful send (200), email failure (500), HTML escaping |
| `tests/unit/components/hero.test.tsx` | Name render, subtitle, CTA links, GPA stats |
| `tests/unit/components/decrypt-button.test.tsx` | Idle → decrypting state transition |
| `tests/unit/components/contact-section.test.tsx` | Form fields, fetch call, error state |
| `tests/unit/components/about-section.test.tsx` | Headings, skill cards, apostrophe copy bug regression |
| `tests/unit/components/projects-section.test.tsx` | Project titles, GitHub links, target=_blank |
| `tests/unit/components/floating-card.test.tsx` | Card renders title, stat, label after mount |

### 4.2 Integration / E2E Tests (Playwright)

| Test File | Journey |
|-----------|---------|
| `tests/e2e/navigation.spec.ts` | Page title, section scroll via nav links, footer |
| `tests/e2e/contact-form.spec.ts` | Processing state, success state, error state |
| `tests/e2e/resume-download.spec.ts` | Decrypt button → progress → download link |
| `tests/e2e/theme-toggle.spec.ts` | Toggle switches html class |
| `tests/e2e/accessibility.spec.ts` | No WCAG 2.1 AA violations via axe |

### 4.3 CI (GitHub Actions)

`.github/workflows/ci.yml` runs on every push:
1. `npm run lint`
2. `npm run type-check` (`tsc --noEmit`)
3. `npm test -- --ci --coverage`
4. `npm run build`
5. On PRs to `main`: also runs Playwright e2e tests

---

## 5. Target Folder Structure

```
/
├── .github/workflows/ci.yml
├── docs/PRD.md
├── public/
│   ├── og-image.png
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── globals.css
│   │   ├── icon.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── hero/
│   │   │   ├── constants.ts
│   │   │   ├── decrypt-button.tsx
│   │   │   ├── floating-card.tsx
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── ui/button.tsx
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── dynamic-background.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── projects-section.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── theme-wrapper.tsx
│   │   └── three-background.tsx
│   └── lib/utils.ts
├── tests/
│   ├── e2e/
│   │   ├── accessibility.spec.ts
│   │   ├── contact-form.spec.ts
│   │   ├── navigation.spec.ts
│   │   ├── resume-download.spec.ts
│   │   └── theme-toggle.spec.ts
│   ├── unit/
│   │   ├── api/contact.test.ts
│   │   └── components/
│   │       ├── about-section.test.tsx
│   │       ├── contact-section.test.tsx
│   │       ├── decrypt-button.test.tsx
│   │       ├── floating-card.test.tsx
│   │       ├── hero.test.tsx
│   │       └── projects-section.test.tsx
│   └── setup.ts
├── jest.config.ts
├── playwright.config.ts
└── (package.json, tsconfig.json, etc.)
```

---

## 6. Out of Scope

- Redesigning the visual layout or adding new sections
- Migrating from Netlify to another host
- Adding analytics or tracking
- Internationalisation (i18n)
