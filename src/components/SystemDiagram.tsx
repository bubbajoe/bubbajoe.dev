import Image from 'next/image'
import Link from 'next/link'

import StatusBadge from './StatusBadge'
import styles from './SystemDiagram.module.css'
import { dateSpan, STATUSES, type DiagramNode, type DomainGroup } from '@/lib/projectMeta'
import { links } from '@/lib/site'

type Props = {
  groups: DomainGroup[]
  yoe: string
}

function NodeCard({ node }: { node: DiagramNode }) {
  const body = (
    <>
      <span className={styles.port} aria-hidden="true" />
      <div className={styles.nodeTop}>
        <span className={styles.id}>{node.id}</span>
        <span className={styles.meta}>
          <StatusBadge status={node.status} />
          <span className={styles.span}>{dateSpan(node)}</span>
        </span>
      </div>
      <h3 className={styles.name}>{node.name}</h3>
      {node.summary && <p className={styles.summary}>{node.summary}</p>}
    </>
  )
  const cls = `${styles.node} ${node.featured ? styles.featured : ''}`
  return node.href ? (
    <Link href={node.href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export default function SystemDiagram({ groups, yoe }: Props) {
  const present = new Set(groups.flatMap((g) => g.nodes.map((n) => n.status)))
  const legend = STATUSES.filter((st) => present.has(st))

  return (
    <figure className={styles.board} aria-labelledby="fig-1">
      <figcaption id="fig-1" className={styles.caption}>
        Fig. 1 — Joe → domains → projects
      </figcaption>
      <ul className={styles.legend} aria-label="Status legend">
        {legend.map((st) => (
          <li key={st}><StatusBadge status={st} /></li>
        ))}
      </ul>

      <div className={styles.heads} aria-hidden="true">
        <span>00 · source</span>
        <span>01 · domains</span>
        <span>02 · projects</span>
      </div>

      <div className={styles.diagram}>
        <div className={`${styles.node} ${styles.root}`}>
          <span className={`${styles.port} ${styles.portOut}`} aria-hidden="true" />
          <Image src={links.avatar} alt="Joe Williams" width={76} height={76} className={styles.avatar} priority />
          <div className={styles.rootText}>
            <span className={styles.id}>joe.williams</span>
            <h2 className={styles.rootName}>Joe Williams</h2>
            <p className={styles.summary}>Engineer &amp; founder</p>
          </div>
          <table className={styles.spec}>
            <tbody>
              <tr><th scope="row">region</th><td>ap-northeast-1</td></tr>
              <tr><th scope="row">runtime</th><td>go · rust · ts</td></tr>
              <tr><th scope="row">uptime</th><td>~{yoe}y in JP</td></tr>
              <tr><th scope="row">prev</th><td>indeed</td></tr>
            </tbody>
          </table>
        </div>

        <ul className={styles.branches}>
          {groups.map(({ domain, nodes }) => (
            <li key={domain.id} className={styles.branch}>
              <div className={`${styles.node} ${styles.domain}`}>
                <span className={styles.port} aria-hidden="true" />
                <span className={`${styles.port} ${styles.portOut}`} aria-hidden="true" />
                <span className={styles.id}>{domain.id}/</span>
                <h3 className={styles.name}>{domain.title}</h3>
                <p className={styles.summary}>{domain.summary}</p>
              </div>
              <ul className={styles.leaves}>
                {nodes.map((node) => (
                  <li key={node.id} className={`${styles.leaf} ${styles[node.status] || ''}`}>
                    <NodeCard node={node} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
