import { TH, Badge, Card } from '../uiPrimitives'
import styles from '../../css/Payments.module.css'

const HEADERS = [
  'Reference',
  'Description',
  'Date',
  'Method',
  'Amount',
  'Status',
]

function TransactionTable({ payments }) {
  return (
    <Card className="fu3">
      <h3 className={styles.tableTitle}>Transaction History</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            {HEADERS.map(h => (
              <TH key={h}>{h}</TH>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className={styles.tableRow}>
              <td className={`${styles.tdBase} ${styles.tdRef}`}>{p.id}</td>
              <td className={`${styles.tdBase} ${styles.tdMain}`}>{p.type}</td>
              <td className={`${styles.tdBase} ${styles.tdMuted}`}>{p.date}</td>
              <td className={`${styles.tdBase} ${styles.tdMuted}`}>
                {p.method}
              </td>
              <td className={`${styles.tdBase} ${styles.tdAmount}`}>
                €{p.amount}
              </td>
              <td className={styles.tdBase}>
                <Badge s={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default TransactionTable
