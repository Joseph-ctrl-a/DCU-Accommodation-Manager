import { LogOut } from 'lucide-react'
import { DATA } from '../../../data/data'
import styles from '../../css/Sidebar.module.css'

function User({ onLogout }) {
  return (
    <div className={styles.user}>
      <div className={styles.userRow}>
        <div className={styles.avatar}>{DATA.student.initials}</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{DATA.student.name}</div>
          <div className={styles.userId}>{DATA.student.id}</div>
        </div>
        <button onClick={onLogout} className={styles.logoutBtn}>
          <LogOut size={14} />
        </button>
      </div>
    </div>
  )
}

export default User
