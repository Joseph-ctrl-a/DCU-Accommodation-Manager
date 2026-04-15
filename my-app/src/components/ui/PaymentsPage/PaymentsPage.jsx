import { useState } from 'react'
import { Plus } from 'lucide-react'
import { DATA } from '../../../data/data'
import { PageHeader, GoldBtn } from '../uiPrimitives'
import PaymentStats from './PaymentStats'
import TransactionTable from './TransactionTable'
import PaymentModal from './PaymentModal'
import PaymentSuccessModal from './PaymentSuccessModal'

function PaymentsPage() {
  const { payments } = DATA
  const [modal, setModal] = useState(false)
  const [method, setMethod] = useState('card')
  const [done, setDone] = useState(false)

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((s, p) => s + p.amount, 0)
  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((s, p) => s + p.amount, 0)
  const total = payments.reduce((s, p) => s + p.amount, 0)

  const handleClose = () => {
    setModal(false)
    setDone(false)
  }

  return (
    <>
      <PageHeader
        title="Payments & Fees"
        sub="Manage your accommodation payments and view transaction history."
        action={
          <GoldBtn onClick={() => setModal(true)}>
            <Plus size={14} /> Make Payment
          </GoldBtn>
        }
      />

      <PaymentStats
        totalPaid={totalPaid}
        totalPending={totalPending}
        total={total}
      />

      <TransactionTable payments={payments} />

      {modal && !done && (
        <PaymentModal
          method={method}
          setMethod={setMethod}
          onConfirm={() => setDone(true)}
          onClose={handleClose}
        />
      )}

      {modal && done && <PaymentSuccessModal onClose={handleClose} />}
    </>
  )
}

export default PaymentsPage
