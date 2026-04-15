import { TH, Badge, Card } from '../uiPrimitives'
import styles from '../../css/Guests.module.css'

const HEADERS = ['Guest Name', 'Arrival', 'Departure', 'Nights', 'Status']

function GuestLog({ guests }) {
  return (
    <Card className="fu3">
      <h3 className={styles.logTitle}>Guest Log</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            {HEADERS.map(h => (
              <TH key={h}>{h}</TH>
            ))}
          </tr>
        </thead>
        <tbody>
          {guests.map(g => (
            <tr key={g.id} className={styles.tableRow}>
              <td className={`${styles.tdBase} ${styles.tdName}`}>
                <div>{g.name}</div>
                {g.reason && <div className={styles.tdReason}>{g.reason}</div>}
              </td>
              <td className={`${styles.tdBase} ${styles.tdMuted}`}>
                {g.arrival}
              </td>
              <td className={`${styles.tdBase} ${styles.tdMuted}`}>
                {g.departure}
              </td>
              <td className={`${styles.tdBase} ${styles.tdNights}`}>
                {g.nights}
              </td>
              <td className={styles.tdBase}>
                <Badge s={g.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default GuestLog
