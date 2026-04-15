import { useState } from 'react'
import { DATA } from '../../../data/data'
import { PageHeader } from '../uiPrimitives'
import MaintenanceForm from './MaintenanceForm'
import TicketList from './TicketList'
import styles from '../../css/Maintenance.module.css'

const INITIAL_FORM = {
  issue: '',
  location: '',
  urgency: 'non-urgent',
  desc: '',
}

function MaintenancePage() {
  const [tickets, setTickets] = useState(DATA.tickets)
  const [form, setForm] = useState(INITIAL_FORM)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState('')

  const upd = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (err) setErr('')
  }

  const submit = () => {
    if (!form.issue || !form.location) {
      setErr('Please fill the required fields.')
      return
    }

    setTickets(t => [
      {
        id: `MT-00${t.length + 1}`,
        issue: form.issue,
        location: form.location,
        urgency: form.urgency,
        status: 'pending',
        date: '15 Apr 2025',
      },
      ...t,
    ])

    setForm(INITIAL_FORM)
    setOk(true)
    setTimeout(() => setOk(false), 3500)
  }

  return (
    <>
      <PageHeader
        title="Maintenance Requests"
        sub="Report bedroom or apartment issues to the facilities team."
      />

      <div className={`${styles.pageGrid} fu2`}>
        <MaintenanceForm
          form={form}
          upd={upd}
          onSubmit={submit}
          ok={ok}
          err={err}
        />
        <TicketList tickets={tickets} />
      </div>
    </>
  )
}

export default MaintenancePage
