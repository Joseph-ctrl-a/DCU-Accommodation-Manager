import { Card, Badge } from '../../ui/uiPrimitives'
import styles from '../../css/Dashboard.module.css'

function MaintenanceTickets({ tickets }) {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <h3 className={styles.title}>Maintenance Tickets</h3>
        <span className={styles.subtitleLink}>View all →</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 12,
        }}
      >
        {tickets.map(t => (
          <div
            key={t.id}
            className={styles.ticketCard}
            style={{
              borderTop: `2px solid ${
                t.urgency === 'urgent' ? '#ef444466' : '#3b82f666'
              }`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 10.5,
                  textTransform: 'uppercase',
                  color: t.urgency === 'urgent' ? '#fca5a5' : '#93c5fd',
                }}
              >
                {t.urgency}
              </span>
              <Badge s={t.status} />
            </div>

            <p className={styles.tableTextMain}>{t.issue}</p>
            <p className={styles.tableTextMuted}>{t.location}</p>
            <p style={{ color: '#1e3a52', fontSize: 11 }}>{t.date}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default MaintenanceTickets
