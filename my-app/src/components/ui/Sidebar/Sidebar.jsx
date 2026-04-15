import { DATA } from '../../../data/data'
import Brand from './Brand'
import Nav from './Nav'
import User from './User'
import styles from '../../css/Sidebar.module.css'

function Sidebar({ page, setPage, onLogout }) {
  const openCount = DATA.tickets.filter(t => t.status !== 'resolved').length

  return (
    <div className={styles.sidebar}>
      <Brand />
      <Nav page={page} setPage={setPage} openCount={openCount} />
      <User onLogout={onLogout} />
    </div>
  )
}

export default Sidebar
