import { CheckCircle, AlertCircle } from 'lucide-react'
import { Card, Lbl, Inp, GoldBtn } from '../uiPrimitives'
import styles from '../../css/Guests.module.css'

function GuestRegistrationForm({ form, upd, onSubmit, ok, err }) {
  return (
    <Card>
      <h3 className={styles.formTitle}>Register a Guest</h3>

      {ok && (
        <div className={`${styles.alertSuccess} fi`}>
          <CheckCircle size={13} /> Request submitted for approval.
        </div>
      )}

      {err && (
        <div className={styles.alertError}>
          <AlertCircle size={13} /> {err}
        </div>
      )}

      <div className={styles.fieldGrid}>
        <div>
          <Lbl>Guest Full Name</Lbl>
          <Inp
            placeholder="First & Last name"
            value={form.name}
            onChange={e => upd('name', e.target.value)}
          />
        </div>

        <div>
          <Lbl>Arrival Date</Lbl>
          <Inp
            type="date"
            value={form.arrival}
            onChange={e => upd('arrival', e.target.value)}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        <div>
          <Lbl>Departure Date</Lbl>
          <Inp
            type="date"
            value={form.departure}
            onChange={e => upd('departure', e.target.value)}
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>

      <div className={styles.policyNotice}>
        Guests must be registered at least{' '}
        <strong className={styles.policyHighlight}>24 hours</strong> before
        arrival. Overnight stays are not permitted during exam periods.
      </div>

      <GoldBtn
        onClick={onSubmit}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        Submit Request
      </GoldBtn>
    </Card>
  )
}

export default GuestRegistrationForm
