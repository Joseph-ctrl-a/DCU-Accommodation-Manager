import { Card, Badge } from '../../ui/uiPrimitives'
import styles from '../../css/Dashboard.module.css'

function RoomDetails({ student }) {
  return (
    <Card>
      <h3 className={styles.title} style={{ marginBottom: 18 }}>
        Room Details
      </h3>

      {[
        { k: 'Complex', v: student.complex },
        { k: 'Room', v: student.room },
        { k: 'Check-in', v: student.checkIn },
        { k: 'Check-out', v: student.checkOut },
        { k: 'Status', v: <Badge s="approved" label="Active Resident" /> },
      ].map(({ k, v }) => (
        <div
          key={k}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
          }}
        >
          <span className={styles.tableTextMuted}>{k}</span>
          <span className={styles.tableTextMain}>{v}</span>
        </div>
      ))}
    </Card>
  )
}

export default RoomDetails
