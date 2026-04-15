import { useState } from 'react'
import { DATA } from '../../../data/data'
import { PageHeader } from '../uiPrimitives'
import GuestRegistrationForm from './GuestRegistrationForm'
import GuestLog from './GuestLog'
import styles from '../../css/Guests.module.css'

const INITIAL_FORM = { name: '', arrival: '', departure: '' }

function GuestsPage() {
  const [guests, setGuests] = useState(DATA.guests)
  const [form, setForm] = useState(INITIAL_FORM)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState('')

  const upd = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (err) setErr('')
  }

  const submit = () => {
    if (!form.name || !form.arrival || !form.departure) {
      setErr('Please fill in all fields.')
      return
    }

    setGuests(g => [
      ...g,
      {
        id: `G-00${g.length + 1}`,
        name: form.name,
        arrival: form.arrival,
        departure: form.departure,
        nights: 1,
        status: 'pending',
      },
    ])

    setForm(INITIAL_FORM)
    setOk(true)
    setTimeout(() => setOk(false), 3500)
  }

  return (
    <>
      <PageHeader
        title="Guest Requests"
        sub="Register overnight guests at least 24 hours in advance. Maximum 1 guest per night, 3 nights per month."
      />

      <div className={`${styles.pageGrid} fu2`}>
        <GuestRegistrationForm
          form={form}
          upd={upd}
          onSubmit={submit}
          ok={ok}
          err={err}
        />
        <GuestLog guests={guests} />
      </div>
    </>
  )
}

export default GuestsPage
