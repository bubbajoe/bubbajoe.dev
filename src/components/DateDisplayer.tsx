import { parseISO, format } from 'date-fns'
import { CSSProperties } from 'react'

type DateDisplayerProps = {
  dateString: string
  label: string
  style?: CSSProperties
}

export default function DateDisplayer({ label, dateString, style }: DateDisplayerProps): JSX.Element {
  if (!dateString) return <></>
  const date = parseISO(dateString)
  return (
      <time dateTime={dateString} style={style}>
        {label}: {format(date, 'LLLL d, yyyy')}
      </time>
  );
}
