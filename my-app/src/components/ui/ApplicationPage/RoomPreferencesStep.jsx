import { ChevronRight } from 'lucide-react'
import { Lbl, Sel, Txta, GoldBtn, GhostBtn } from '../uiPrimitives'
import styles from '../../css/ApplicationPage.module.css'
const ROOM_TYPES = [
  'Single En-Suite',
  'Twin Room',
  'Studio Apartment',
  'Accessible Room',
]

function RoomPreferencesStep({ form, upd, onBack, onNext }) {
  return (
    <>
      <h3 className={styles.stepTitle}>Room Preferences</h3>

      <div className={styles.fieldGrid}>
        <div>
          <Lbl>Accommodation Type</Lbl>
          <div className={styles.roomTypeGrid}>
            {ROOM_TYPES.map(t => (
              <div
                key={t}
                onClick={() => upd('type', t)}
                className={`${styles.roomTypeOption} ${
                  form.type === t ? styles.selected : ''
                }`}
              >
                <p
                  className={`${styles.roomTypeLabel} ${
                    form.type === t ? styles.selected : ''
                  }`}
                >
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Lbl>Preferred Complex</Lbl>
          <Sel
            value={form.complex}
            onChange={e => upd('complex', e.target.value)}
          >
            <option value="">No preference</option>
            <option>Larkfield Apartments</option>
            <option>Hampstead Avenue</option>
            <option>Albert College Park</option>
            <option>Cedarwood Road</option>
          </Sel>
        </div>

        <div>
          <Lbl>Additional Notes</Lbl>
          <Txta
            placeholder="Special requirements, medical needs, or preferences…"
            value={form.notes}
            onChange={e => upd('notes', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.footerSpread}>
        <GhostBtn onClick={onBack}>← Back</GhostBtn>
        <GoldBtn onClick={onNext}>
          Review <ChevronRight size={14} />
        </GoldBtn>
      </div>
    </>
  )
}

export default RoomPreferencesStep
