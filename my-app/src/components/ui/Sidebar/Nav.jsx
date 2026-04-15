import { NAV } from '../../../data/data'
import styles from '../../css/Sidebar.module.css'

function Nav({ page, setPage, openCount }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navSection}>Navigation</div>

      {NAV.map(({ id, Icon, label }) => (
        <div
          key={id}
          onClick={() => setPage(id)}
          className={`${styles.item} ${page === id ? styles.itemActive : ''}`}
        >
          {Icon && <Icon size={15} />}
          <span className={styles.navLabel}>{label}</span>
          {id === 'maintenance' && openCount > 0 && (
            <span className={styles.navBadge}>{openCount}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Nav
