import { useState } from 'react'
import { PageHeader, Card } from '../uiPrimitives'
import StepIndicator from './StepIndicator'
import PersonalDetailsStep from './PersonalDetail'
import RoomPreferencesStep from './RoomPreferencesStep'
import ReviewStep from './ReviewStep'
import SuccessScreen from './SuccessScreen'
import styles from '../../css/ApplicationPage.module.css'

const INITIAL_FORM = { ppsn: '', year: '', type: '', complex: '', notes: '' }

function ApplicationPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleReset = () => {
    setSubmitted(false)
    setStep(1)
    setForm(INITIAL_FORM)
  }

  if (submitted) return <SuccessScreen onReset={handleReset} />

  const STEP_COMPONENTS = {
    1: <PersonalDetailsStep form={form} upd={upd} onNext={() => setStep(2)} />,
    2: (
      <RoomPreferencesStep
        form={form}
        upd={upd}
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
      />
    ),
    3: (
      <ReviewStep
        form={form}
        onBack={() => setStep(2)}
        onSubmit={() => setSubmitted(true)}
      />
    ),
  }

  return (
    <>
      <PageHeader
        title="Accommodation Application"
        sub="Apply for student accommodation for the 2025/2026 academic year."
      />
      <StepIndicator step={step} />
      <Card className={`${styles.wrapper} fu3`}>{STEP_COMPONENTS[step]}</Card>
    </>
  )
}

export default ApplicationPage
