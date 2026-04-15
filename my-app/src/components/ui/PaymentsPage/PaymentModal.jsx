import { X } from 'lucide-react'
import { Lbl, Sel, GoldBtn } from '../uiPrimitives'
import styles from '../../css/Payments.module.css'

const METHODS = [
  ['card', 'Debit Card'],
  ['bank', 'Bank Transfer'],
  ['online', 'Online Banking'],
]

function PaymentModal({ method, setMethod, onConfirm, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modalBox} fu`}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Make a Payment</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.methodFieldWrapper}>
          <Lbl>Payment Type</Lbl>
          <Sel>
            <option>Utility — Apr 2025 (€180)</option>
            <option>Late Fee (€30)</option>
          </Sel>
        </div>

        <div>
          <Lbl>Payment Method</Lbl>
          <div className={styles.methodGrid}>
            {METHODS.map(([id, lbl]) => (
              <div
                key={id}
                onClick={() => setMethod(id)}
                className={`${styles.methodOption} ${
                  method === id ? styles.selected : ''
                }`}
              >
                <p
                  className={`${styles.methodLabel} ${
                    method === id ? styles.selected : ''
                  }`}
                >
                  {lbl}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>€180.00</span>
        </div>

        <GoldBtn
          onClick={onConfirm}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Confirm Payment
        </GoldBtn>
      </div>
    </div>
  )
}

export default PaymentModal
