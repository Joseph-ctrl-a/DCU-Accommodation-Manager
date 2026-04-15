import { Badge } from '../uiPrimitives'
import styles from '../../css/Maintenance.module.css'

function TicketCard({ ticket: t }) {
  const urgent = t.urgency === 'urgent'

  return (
    <div
      className={`${styles.ticketCard} ${
        urgent ? styles.ticketCardUrgent : styles.ticketCardNormal
      }`}
    >
      <div className={styles.ticketInner}>
        <div>
          <p className={styles.ticketIssue}>{t.issue}</p>
          <p className={styles.ticketMeta}>
            {t.location} &nbsp;·&nbsp; {t.date}
          </p>
        </div>
        <div className={styles.ticketRight}>
          <Badge s={t.status} />
          <span
            className={`${styles.ticketUrgencyLabel} ${
              urgent ? styles.ticketUrgencyUrgent : styles.ticketUrgencyNormal
            }`}
          >
            {t.urgency}
          </span>
        </div>
      </div>
      <p className={styles.ticketId}>{t.id}</p>
    </div>
  )
}

export default TicketCard
