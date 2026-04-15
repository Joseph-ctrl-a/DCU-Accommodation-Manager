import { ChevronRight } from 'lucide-react'
import { DATA } from '../../../data/data'
import { Lbl, Inp, Sel, GoldBtn } from '../uiPrimitives'
import styles from '../../css/ApplicationPage.module.css'

function PersonalDetailsStep({ form, upd, onNext }) {
  return (
    <>
      <h3 className={styles.stepTitle}>Personal Details</h3>

      <div className={styles.fieldGrid}>
        <div>
          <Lbl>Full Name</Lbl>
          <Inp value={DATA.student.name} readOnly style={{ opacity: 0.55 }} />
        </div>

        <div>
          <Lbl>Student ID</Lbl>
          <Inp value={DATA.student.id} readOnly style={{ opacity: 0.55 }} />
        </div>

        <div className={styles.twoCol}>
          <div>
            <Lbl>PPS Number</Lbl>
            <Inp
              placeholder="1234567T"
              value={form.ppsn}
              onChange={e => upd('ppsn', e.target.value)}
            />
          </div>

          <div>
            <Lbl>Year of Study</Lbl>
            <Sel value={form.year} onChange={e => upd('year', e.target.value)}>
              <option value="">Select…</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
              <option>Postgraduate</option>
            </Sel>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <GoldBtn onClick={onNext}>
          Continue <ChevronRight size={14} />
        </GoldBtn>
      </div>
    </>
  )
}

export default PersonalDetailsStep
