import { CheckCircle } from 'lucide-react'
import { Card, Lbl, Inp, Sel, Txta, GoldBtn } from '../uiPrimitives'
import styles from '../../css/Maintenance.module.css'

const LOCATIONS = [
  'Bedroom',
  'Bathroom',
  'Kitchen',
  'Living Room',
  'Front Door',
  'Common Area',
  'Other',
]

const URGENCY_OPTIONS = [
  { id: 'urgent', label: 'Urgent', col: '#fca5a5' },
  { id: 'non-urgent', label: 'Non-Urgent', col: '#93c5fd' },
]

function MaintenanceForm({ form, upd, onSubmit, ok, err }) {
  return (
    <Card>
      <h3 className={styles.formTitle}>Submit a Ticket</h3>

      {ok && (
        <div className={`${styles.alertSuccess} fi`}>
          <CheckCircle size={13} /> Ticket submitted successfully.
        </div>
      )}

      {err && <div className={styles.alertError}>{err}</div>}

      <div className={styles.fieldGrid}>
        <div>
          <Lbl>Issue Title *</Lbl>
          <Inp
            placeholder="e.g. Broken heating unit"
            value={form.issue}
            onChange={e => upd('issue', e.target.value)}
          />
        </div>

        <div>
          <Lbl>Location *</Lbl>
          <Sel
            value={form.location}
            onChange={e => upd('location', e.target.value)}
          >
            <option value="">Select location…</option>
            {LOCATIONS.map(l => (
              <option key={l}>{l}</option>
            ))}
          </Sel>
        </div>

        <div>
          <Lbl>Urgency</Lbl>
          <div className={styles.urgencyGrid}>
            {URGENCY_OPTIONS.map(({ id, label, col }) => {
              const selected = form.urgency === id
              return (
                <div
                  key={id}
                  onClick={() => upd('urgency', id)}
                  className={styles.urgencyOption}
                  style={{
                    borderColor: selected ? col : 'rgba(255,255,255,.08)',
                    background: selected ? `${col}12` : 'transparent',
                  }}
                >
                  <p
                    className={styles.urgencyLabel}
                    style={{
                      color: selected ? col : '#5a7a9a',
                      fontWeight: selected ? 600 : 400,
                    }}
                  >
                    {label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <Lbl>Description</Lbl>
          <Txta
            placeholder="Describe the issue in detail…"
            value={form.desc}
            onChange={e => upd('desc', e.target.value)}
          />
        </div>
      </div>

      <GoldBtn
        onClick={onSubmit}
        style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
      >
        Submit Ticket
      </GoldBtn>
    </Card>
  )
}

export default MaintenanceForm
