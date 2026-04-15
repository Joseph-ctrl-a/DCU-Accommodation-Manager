import { DATA } from '../../../data/data'
import { GoldBtn, GhostBtn } from '../uiPrimitives'
import styles from '../../css/ApplicationPage.module.css'
function ReviewStep({ form, onBack, onSubmit }) {
  const rows = [
    { k: 'Full Name', v: DATA.student.name },
    { k: 'Student ID', v: DATA.student.id },
    { k: 'PPS Number', v: form.ppsn || '—' },
    { k: 'Year', v: form.year || '—' },
    { k: 'Room Type', v: form.type || 'No preference' },
    { k: 'Complex', v: form.complex || 'No preference' },
    { k: 'Notes', v: form.notes || 'None' },
  ]

  return (
    <>
      <h3 className={styles.stepTitle}>Review &amp; Submit</h3>

      <div className={styles.reviewTable}>
        {rows.map(({ k, v }) => (
          <div key={k} className={styles.reviewRow}>
            <span className={styles.reviewKey}>{k}</span>
            <span className={styles.reviewValue}>{v}</span>
          </div>
        ))}
      </div>

      <div className={styles.feeNotice}>
        A non-refundable application fee of{' '}
        <strong className={styles.feeAmount}>€50</strong> will be charged to
        your account on submission.
      </div>

      <div className={styles.footerSpread}>
        <GhostBtn onClick={onBack}>← Back</GhostBtn>
        <GoldBtn onClick={onSubmit}>Submit Application</GoldBtn>
      </div>
    </>
  )
}

export default ReviewStep
