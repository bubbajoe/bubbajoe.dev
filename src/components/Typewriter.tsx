import { useEffect, useState } from 'react'

import s from './Typewriter.module.css'

type Props = {
  /** Shown in order; the first is server-rendered, the last is where it stops. */
  phrases: string[]
}

const HOLD_MS = 1000 // pause after a phrase is typed, and after it is fully highlighted
const SELECT_STEP_MS = 170 // between highlighting one word and the next
const AFTER_DELETE_MS = 120

/** Fast but uneven, like a person: a little slower after spaces, the odd hesitation. */
function keyDelay(ch: string): number {
  let ms = 30 + Math.random() * 34
  if (ch === ' ') ms += 45
  if (Math.random() < 0.07) ms += 95
  return ms
}

/** Indexes where each word starts, e.g. "designs systems" → [0, 8]. */
function wordStarts(text: string): number[] {
  const starts: number[] = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== ' ' && (i === 0 || text[i - 1] === ' ')) starts.push(i)
  }
  return starts
}

export default function Typewriter({ phrases }: Props) {
  const first = phrases[0] ?? ''
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), '')

  const [text, setText] = useState(first)
  // Start index of the highlighted range (highlight always runs to the end), or null.
  const [selFrom, setSelFrom] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (phrases.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases[phrases.length - 1])
      return
    }

    let cancelled = false
    const timers: number[] = []
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    ;(async () => {
      await sleep(HOLD_MS)
      for (let i = 1; i < phrases.length && !cancelled; i++) {
        const current = phrases[i - 1]
        const next = phrases[i]

        // Highlight word by word from the end, like Shift+Option+←.
        setBusy(true)
        const starts = wordStarts(current)
        for (let w = starts.length - 1; w >= 0 && !cancelled; w--) {
          setSelFrom(starts[w])
          if (w > 0) await sleep(SELECT_STEP_MS)
        }
        setBusy(false)
        await sleep(HOLD_MS)
        if (cancelled) return

        // Delete the selection, then type the next phrase.
        setBusy(true)
        setSelFrom(null)
        setText('')
        await sleep(AFTER_DELETE_MS)
        for (let c = 1; c <= next.length && !cancelled; c++) {
          setText(next.slice(0, c))
          await sleep(keyDelay(next[c - 1]))
        }
        setBusy(false)
        if (i < phrases.length - 1) await sleep(HOLD_MS)
      }
    })()

    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [phrases])

  const before = selFrom === null ? text : text.slice(0, selFrom)
  const selected = selFrom === null ? '' : text.slice(selFrom)

  return (
    <>
      <span className={s.box} aria-hidden="true">
        {/* Invisible copy of the longest phrase reserves the space, so nothing below jumps. */}
        <span className={s.ghost}>
          {longest}
          <span className={s.caret} />
        </span>
        <span className={s.live}>
          {before}
          <span className={`${s.caret} ${busy ? '' : s.blink}`} />
          {selected && <span className={s.selected}>{selected}</span>}
        </span>
      </span>
      <span className="visually-hidden">{phrases.join(', ')}</span>
    </>
  )
}
