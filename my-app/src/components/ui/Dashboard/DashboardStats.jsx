import { Card } from '../../ui/uiPrimitives'
import styles from '../../css/Dashboard.module.css'
import { MapPin, CreditCard, Wrench, Users } from 'lucide-react'

const ICONS = {
  map: MapPin,
  card: CreditCard,
  wrench: Wrench,
  users: Users,
}

function DashboardStats({ stats }) {
  return (
    <div className={styles.statsGrid}>
      {stats.map(({ label, value, sub, icon, col }) => {
        const Icon = ICONS[icon]

        return (
          <Card key={label}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              <span className={styles.statLabel}>{label}</span>

              <div
                className={styles.iconBox}
                style={{ background: `${col}18` }}
              >
                <Icon size={14} color={col} />
              </div>
            </div>

            <div className={styles.statValue}>{value}</div>
            <div className={styles.statSub}>{sub}</div>
          </Card>
        )
      })}
    </div>
  )
}

export default DashboardStats
