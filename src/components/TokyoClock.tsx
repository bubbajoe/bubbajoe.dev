import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
})

/**
 * Current time in Tokyo. Renders a placeholder on the server and on the first client
 * render (so hydration matches), then ticks in the browser.
 */
export default function TokyoClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])

  return <span aria-label={time ? `${time} in Tokyo` : undefined}>{time ?? '--:--'}</span>
}
