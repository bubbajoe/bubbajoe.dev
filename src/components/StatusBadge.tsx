import type { ProjectStatus } from '@/lib/site'
import styles from './StatusBadge.module.css'

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`${styles.badge} ${styles[status] || ''}`}>{status}</span>
}
