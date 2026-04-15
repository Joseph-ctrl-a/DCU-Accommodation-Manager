import { CheckCircle } from 'lucide-react'
import styles from '../../css/ApplicationPage.module.css'

const STEPS = ['Personal Details', 'Room Preferences', 'Review & Submit']

function StepIndicator({ step }) {
  const items = []

  STEPS.forEach((label, i) => {
    const done = step > i + 1
    const active = step === i + 1
    const state = done ? 'done' : active ? 'active' : 'idle'

    items.push(
      <div key={`step-${i}`} className={styles.stepItem}>
        <div className={`${styles.stepCircle} ${styles[state]}`}>
          {done ? <CheckCircle size={13} /> : i + 1}
        </div>
        <span className={`${styles.stepLabel} ${styles[state]}`}>{label}</span>
      </div>,
    )

    if (i < STEPS.length - 1)
      items.push(<div key={`div-${i}`} className={styles.stepDivider} />)
  })

  return <div className={`${styles.stepRow} fu2`}>{items}</div>
}

export default StepIndicator
