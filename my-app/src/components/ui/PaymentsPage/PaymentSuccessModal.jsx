import { CheckCircle } from 'lucide-react'
import { GhostBtn } from '../uiPrimitives'
import styles from '../../css/Payments.module.css'

function PaymentSuccessModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.successBox} fu`}>
        <div className={styles.successIcon}>
          <CheckCircle size={30} color="#4ade80" />
        </div>
        <h3 className={styles.successTitle}>Payment Successful</h3>
        <p className={styles.successSub}>
          €180.00 processed. A receipt has been sent to your DCU email address.
        </p>
        <GhostBtn onClick={onClose}>Done</GhostBtn>
      </div>
    </div>
  )
}

export default PaymentSuccessModal
