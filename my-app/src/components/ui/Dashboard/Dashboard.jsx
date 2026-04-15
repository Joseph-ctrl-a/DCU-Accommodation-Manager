import { DATA } from '../../../data/data'
import { PageHeader } from '../uiPrimitives'
import DashboardStats from './DashboardStats'
import RecentTransactions from './RecentTransactions'
import RoomDetails from './RoomDetails'
import MaintenanceTickets from './Maintenance'
import styles from '../../css/Dashboard.module.css'

function Dashboard() {
  const { student, payments, tickets, guests } = DATA

  const openTickets = tickets.filter(t => t.status !== 'resolved').length
  const pendingGuests = guests.filter(g => g.status === 'pending').length
  const nextPay = payments.find(p => p.status === 'pending')

  const stats = [
    {
      label: 'Room',
      value: 'Block C — 14',
      sub: student.complex,
      icon: 'map',
      col: '#c9a227',
    },
    {
      label: 'Balance Due',
      value: `€${student.balance}`,
      sub: nextPay ? `Due ${nextPay.date}` : 'Clear',
      icon: 'card',
      col: nextPay ? '#fcd34d' : '#4ade80',
    },
    {
      label: 'Open Tickets',
      value: openTickets,
      sub: `${openTickets} unresolved`,
      icon: 'wrench',
      col: openTickets ? '#fca5a5' : '#4ade80',
    },
    {
      label: 'Guest Requests',
      value: pendingGuests,
      sub: `${pendingGuests} awaiting`,
      icon: 'users',
      col: pendingGuests ? '#93c5fd' : '#4ade80',
    },
  ]

  return (
    <>
      <PageHeader
        title={`Good afternoon, ${student.name.split(' ')[0]}`}
        sub="Here's an overview of your accommodation account."
      />

      <DashboardStats stats={stats} />

      <div className={styles.mainGrid}>
        <RecentTransactions payments={payments} />
        <RoomDetails student={student} />
      </div>

      <MaintenanceTickets tickets={tickets} />
    </>
  )
}

export default Dashboard
