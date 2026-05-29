---
title: 'M2W.ai - AI Manga Editor'
subtitle: startup
created: '2025-02-01'
updated: '2026-05-29'
tags:
  - startup
  - manga
  - ai
  - saas
  - editorial
  - tokyo
---

**M2W** is an AI manga editor. Manga artist upload a finished chapter and get usable editorial notes within minutes — pacing, panel composition, eye flow, lettering, dialogue, art continuity, and narrative arc — across six languages. I quit my last job to work on this full-time, and it's where the bulk of my time goes today.

## The problem

Manga is a global, multi-billion-dollar medium with a brutal supply-side bottleneck: **editors**. Every serialised chapter you've ever loved went through a *tantōshū* — a manga editor who pushes back on pacing, calls out a confusing panel sequence, flags a dropped subplot, and tells the artist when a beat isn't landing. Editors are why the medium is what it is.

But editors don't scale. There are maybe a few thousand working manga editors at the major Japanese publishers, and the funnel into that career is decades long. Meanwhile:

- **Tens of thousands of independent Manga artist** publish on Pixiv, Webtoon, Tapas, ComicFury, X, and their own sites — almost none of them have access to a real editor.
- **The aspiring-pro funnel** (people drawing 40-page one-shots hoping to land a serialisation pitch) is enormous and almost entirely unsupported between art teachers and the magazine submission desk.
- **Established artists** working outside the big-publisher system — translation studios, indie publishers, manhwa and manhua creators going global — often hire editors ad-hoc and pay a lot for slow turnaround.

The result is a vast middle class of manga that's drawn with real skill but suffers from the kind of structural problems an editor catches in five minutes: a panel order that misreads, dialogue that doesn't sound like the character, an emotional beat that lands one page too late, a continuity slip that breaks the reader's trust.

That gap is the business.

## What M2W is

M2W is **the editor in the workflow** for Manga artist who don't have one or want quicker feedback. The interaction is intentionally familiar:

1. **Upload a chapter** — the finished pages, in order, the way they'd go to print or to a platform.
2. **Get notes within minutes** — structured, panel-anchored feedback across the five dimensions of the **Manga Page Quality Scoring System (MQSS)**: **Pacing** (panel rhythm and density), **Hook** (compulsion to turn the page), **Character** (whether the page advances character understanding), **Visual Flow** (how clearly the page guides reading order), and **Dialogue Density** (text vs. visual storytelling balance). Each dimension is scored 0–100 per page, weighted into an overall page score, and aggregated into chapter-level release-readiness flags.
3. **Act on it, ship the chapter** — fix what matters, ignore what doesn't, move on.

Three things make that proposition real instead of a generic "AI feedback" tool:

- **It actually reads a manga.** The pipeline reasons over a sequence of pages, not a single image at a time. It tracks characters across panels, holds dialogue context across pages, and keeps a rolling summary of the story so continuity comments are continuity comments and not hallucinations.
- **It's anchored in real editorial craft.** The rubric the AI is graded against is shaped by **real manga editors** — people working at major Japanese publishers and seasoned freelancers. They don't deliver reviews to customers; they steer the AI by reviewing its output on an ongoing basis, sharpening the rubric, and rejecting whatever doesn't read like an editor would actually say.
- **It works in the languages Manga artist actually publish in.** First-class English and Japanese. Second-class Spanish, Chinese, Korean, and French. The pipeline analyses the original art and dialogue, not a translation.

## Who it's for

Three customer wedges, in roughly the order I expect them to convert:

| Segment                            | Who they are                                                                                       | Why they care                                                                                          |
|------------------------------------|----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **Indie serialised artist**       | Drawing weekly or monthly on Pixiv, X, Webtoon, Tapas. Mid-sized followings, no editor.            | Wants the consistency boost an editor gives. Can't afford one and wouldn't have access if they could.  |
| **Aspiring pros**                  | Working on one-shots and serialisation pitches for *Shōnen Jump+*, *Weekly Shōnen Magazine*, etc.  | Submission slush piles are unforgiving. A pre-submission pass that catches structural problems is gold. |
| **Indie studios & translators**    | Small teams shipping manga, manhwa, manhua to global readers. Some in-house editing, never enough. | Wants a tireless first-pass editor that scales with volume — frees their humans for the hard calls.    |

Eventually: publishers themselves, as an internal tool — but that's a different sales motion and a problem for later.

## Why this is the right moment

Three things had to be true at once for this product to be possible. They became true in the last ~18 months:

1. **Multimodal models got good enough to reason about sequences of images.** Gemini, OpenAI, Grok Models — these can hold ~1000s of pages of context, follow visual continuity, and recognize any nuances that we define as editor notes. Two years ago this was not possible.
2. **Manga went global, fast.** Webtoon, Tapas, MangaPlus, the explosion of indie platforms — there are now far more people publishing manga than there are editors to support them, and the gap is widening every quarter.
3. **Number of Manga artists is growing fast.**
With manga itself being a global medium, the number of manga artists is growing fast. This means that the demand for more high-quality manga is growing fast, which means that the demand for more high-quality manga editors is growing fast.

## The editorial moat

The technically interesting part of M2W is the AI pipeline. The *defensible* part is the editorial process around it.

Anyone can wire up a frontier model and ask it for feedback on a manga page. The output will be confident, fluent, and almost entirely wrong in the ways that matter — the model will praise composition that misreads, suggest dialogue tweaks that flatten the character, and miss the structural issues a real editor would catch in seconds.

What makes M2W's output usable instead of plausible-sounding noise:

- **The rubric is owned by editors, not engineers.** The five MQSS dimensions, their relative weights, what counts as a flag inside each one, what severity to give it, what tone to write it in — all of that is iteratively shaped by working editors reviewing real model output on real chapters.
- **Evaluation is continuous.** Each provider/model upgrade is run against a fixed set of chapters with editor-graded ground truth before it ships. Regressions get caught before they get to a creator.
- **Humans steer, the AI delivers.** We deliberately do not sell human-delivered review as a product. The editors' time goes into making the AI better, not into a higher-tier "premium" line. That keeps the unit economics sane and the editorial bar high.
- **The dataset compounds.** Every reviewed chapter — pages, editor judgments, model output, what the editor kept and what they rejected — feeds the eval set and the rubric. Competitors starting today start from zero on data a fresh model can't replicate.

This is the part I expect to compound. The product gets better the longer it runs, because the rubric and the eval set both grow with usage — and that's not something a competitor can copy by pointing a fresh model at the same problem.

## Where I am

M2W is **live and pre-revenue** as of May 2026, running with early creators around the world. The current focus is sharpening the rubric with editor feedback, expanding the kinds of issues the AI catches reliably, and getting the first paying tiers shaped right.

Things that are working:

- The pipeline produces feedback that real editors look at and say "yes, that's the note I would have given."
- Creators who try it come back. The retention shape on the first cohort is the most encouraging signal so far.
- Editor advisors are recruiting their peers — the "AI as a tool, not a replacement" framing lands.

Things I'm actively figuring out:

- As you can imagine, the AI editor can sometimes miss things and make reading/situational errors. We are working on a way to fix these errors and make the AI editor more reliable.
- The acquisition motion — direct-to-creator on platforms vs. partnerships with indie studios vs. publisher pilots.
- How aggressively to push into adjacent formats (manhwa long-strip, web-native vertical formats).

## Get in touch

If you're:

- **A manga artist** who wants to use it — we are in open beta, so you can [sign up here](https://m2w.ai/signup?utm_source=bubbajoe.dev).
- **A working manga editor** open to advising — please reach out and give us your feedback!
- **An indie studio or translator** who'd benefit from an always-on first-pass editor — let's pilot.
- **A potential investor or operator** interested in the space — happy to share more.

Find us at **<a href="https://m2w.ai" target="_blank" rel="noopener noreferrer">m2w.ai</a>** or contact me through any of the links on this site.

---

*Related work I lean on heavily for M2W: [JobD](/projects/jobd) (how I run GPU batch jobs on a home 4090 instead of burning cloud GPU pricing)
