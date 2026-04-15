import { Card, Badge, TH } from '../../ui/uiPrimitives'
import styles from '../../css/Dashboard.module.css'

function RecentTransactions({ payments }) {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <h3 className={styles.title}>Recent Transactions</h3>
        <span className={styles.subtitleLink}>View all →</span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Description', 'Date', 'Amount', 'Status'].map(h => (
              <TH key={h}>{h}</TH>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...payments]
            .reverse()
            .slice(0, 3)
            .map(p => (
              <tr key={p.id}>
                <td className={styles.tableCell}>{p.type}</td>
                <td className={styles.tableCell}>{p.date}</td>
                <td className={styles.tableCell}>€{p.amount}</td>
                <td className={styles.tableCell}>
                  <Badge s={p.status} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  )
}

export default RecentTransactions
