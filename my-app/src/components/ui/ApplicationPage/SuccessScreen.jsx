import { CheckCircle } from 'lucide-react'
import { PageHeader, GhostBtn } from '../uiPrimitives'
import styles from '../../css/ApplicationPage.module.css'
function SuccessScreen({ onReset }) {
  return (
    <>
      <PageHeader
        title="Accommodation Application"
        sub="Apply for student accommodation for the 2025/2026 academic year."
      />
      <div className={styles.successWrapper}>
        <div className={`${styles.successIcon} fu`}>
          <CheckCircle size={30} color="#4ade80" />
        </div>
        <h2 className={`${styles.successTitle} fu2`}>Application Submitted</h2>
        <p className={`${styles.successSub} fu3`}>
          Your accommodation application for 2025/2026 has been received. You
          will be notified within 10 working days.
        </p>
        <GhostBtn className="fu4" onClick={onReset}>
          Submit Another
        </GhostBtn>
      </div>
    </>
  )
}

export default SuccessScreen
