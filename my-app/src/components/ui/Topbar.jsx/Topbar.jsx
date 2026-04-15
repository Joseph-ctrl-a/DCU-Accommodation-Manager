import { Bell } from 'lucide-react'
import { DATA } from '../../../data/data'
import styles from '../../css/Topbar.module.css'

function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbAccent}>DCU</span> / Accommodation
        Portal
      </div>

      <div className={styles.right}>
        <div className={styles.bellWrapper}>
          <Bell size={16} color="#3a5a78" />
          <div className={styles.bellDot} />
        </div>
        <div className={styles.avatar}>{DATA.student.initials}</div>
      </div>
    </div>
  )
}

export default Topbar
