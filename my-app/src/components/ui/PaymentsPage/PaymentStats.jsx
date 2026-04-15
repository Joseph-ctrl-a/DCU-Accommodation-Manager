import { Card } from '../uiPrimitives'
import styles from '../../css/Payments.module.css'

function PaymentStats({ totalPaid, totalPending, total }) {
  const stats = [
    { label: 'Total Paid', value: `€${totalPaid}`, col: '#4ade80' },
    { label: 'Balance Due', value: `€${totalPending}`, col: '#fcd34d' },
    { label: 'Total Charged', value: `€${total}`, col: '#e8f0ff' },
  ]

  return (
    <div className={`${styles.statsGrid} fu2`}>
      {stats.map(({ label, value, col }) => (
        <Card key={label}>
          <p className={styles.statLabel}>{label}</p>
          <p className={styles.statValue} style={{ color: col }}>
            {value}
          </p>
        </Card>
      ))}
    </div>
  )
}

export default PaymentStats
