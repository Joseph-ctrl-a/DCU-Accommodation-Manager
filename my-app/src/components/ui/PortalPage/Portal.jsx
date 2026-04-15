import { useState } from 'react'
import { PAGES } from '../../../data/data'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar.jsx/Topbar'
import styles from '../../css/Portal.module.css'

function Portal({ onLogout }) {
  const [page, setPage] = useState('dashboard')
  const Page = PAGES[page]

  return (
    <div className={styles.shell}>
      <Sidebar page={page} setPage={setPage} onLogout={onLogout} />
      <div className={styles.main}>
        <Topbar />
        {/* key forces remount on page change so animations replay */}
        <div key={page} className={styles.pageContent}>
          <Page />
        </div>
      </div>
    </div>
  )
}

export default Portal
