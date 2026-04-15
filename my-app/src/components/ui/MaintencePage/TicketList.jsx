import TicketCard from './TicketCard'
import styles from '../../css/Maintenance.module.css'

function TicketList({ tickets }) {
  return (
    <div className={`${styles.ticketList} fu3`}>
      {tickets.map(t => (
        <TicketCard key={t.id} ticket={t} />
      ))}
    </div>
  )
}

export default TicketList
