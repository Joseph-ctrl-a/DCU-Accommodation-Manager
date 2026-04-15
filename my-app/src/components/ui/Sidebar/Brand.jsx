import styles from '../../css/Sidebar.module.css'

function Brand() {
  return (
    <div className={styles.brand}>
      <div className={styles.brandInner}>
        <div className={styles.logoBox}>
          <span className={styles.logoText}>D</span>
        </div>
        <div>
          <div className={styles.brandTitle}>DCU</div>
          <div className={styles.brandSub}>Accommodation</div>
        </div>
      </div>
    </div>
  )
}

export default Brand
