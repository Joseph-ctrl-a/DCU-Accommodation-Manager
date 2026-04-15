import { Home, FileText, CreditCard, Users, Wrench } from 'lucide-react'

import Dashboard from '../components/ui/Dashboard/Dashboard'
import ApplicationPage from '../components/ui/ApplicationPage/ApplicationPage'
import PaymentsPage from '../components/ui/PaymentsPage/PaymentsPage'
import GuestsPage from '../components/ui/GuestsPage/GuestsPage'
import MaintenancePage from '../components/ui/MaintencePage/MaintenancePage'
// ─── Mock Data ──────────────────────────────────────────────────────────────
export const DATA = {
  student: {
    name: 'Alex Murphy',
    id: '22334455',
    email: 'alex.murphy2@mail.dcu.ie',
    room: 'Block C — Room 14',
    complex: 'Larkfield Apartments',
    checkIn: '09 Sep 2024',
    checkOut: '31 May 2025',
    balance: 180,
    initials: 'AM',
  },
  payments: [
    {
      id: 'PAY-001',
      type: 'Semester 1 Rent',
      amount: 2850,
      date: '01 Sep 2024',
      status: 'paid',
      method: 'Debit Card',
    },
    {
      id: 'PAY-002',
      type: 'Semester 2 Rent',
      amount: 2850,
      date: '15 Jan 2025',
      status: 'paid',
      method: 'Debit Card',
    },
    {
      id: 'PAY-003',
      type: 'Utility — Feb',
      amount: 85,
      date: '01 Feb 2025',
      status: 'paid',
      method: 'Online Banking',
    },
    {
      id: 'PAY-004',
      type: 'Utility — Mar',
      amount: 95,
      date: '01 Mar 2025',
      status: 'paid',
      method: 'Online Banking',
    },
    {
      id: 'PAY-005',
      type: 'Utility — Apr',
      amount: 180,
      date: '01 Apr 2025',
      status: 'pending',
      method: '—',
    },
  ],
  guests: [
    {
      id: 'G-001',
      name: 'Emma Walsh',
      arrival: '20 Jan 2025',
      departure: '21 Jan 2025',
      nights: 1,
      status: 'approved',
    },
    {
      id: 'G-002',
      name: 'Liam Murphy',
      arrival: '14 Feb 2025',
      departure: '15 Feb 2025',
      nights: 1,
      status: 'approved',
    },
    {
      id: 'G-003',
      name: "Sarah O'Brien",
      arrival: '10 Mar 2025',
      departure: '13 Mar 2025',
      nights: 3,
      status: 'rejected',
      reason: 'Exam period restriction',
    },
    {
      id: 'G-004',
      name: 'Tom Brennan',
      arrival: '20 Apr 2025',
      departure: '21 Apr 2025',
      nights: 1,
      status: 'pending',
    },
  ],
  tickets: [
    {
      id: 'MT-001',
      issue: 'Broken heating unit',
      location: 'Bedroom',
      urgency: 'urgent',
      status: 'resolved',
      date: '05 Nov 2024',
    },
    {
      id: 'MT-002',
      issue: 'Faulty door lock',
      location: 'Front Door',
      urgency: 'urgent',
      status: 'in-progress',
      date: '18 Jan 2025',
    },
    {
      id: 'MT-003',
      issue: 'Leaking tap',
      location: 'Bathroom',
      urgency: 'non-urgent',
      status: 'scheduled',
      date: '22 Feb 2025',
    },
    {
      id: 'MT-004',
      issue: 'Window latch broken',
      location: 'Living Room',
      urgency: 'non-urgent',
      status: 'pending',
      date: '01 Mar 2025',
    },
  ],
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
export const NAV = [
  { id: 'dashboard', Icon: Home, label: 'Dashboard' },
  { id: 'application', Icon: FileText, label: 'Application' },
  { id: 'payments', Icon: CreditCard, label: 'Payments' },
  { id: 'guests', Icon: Users, label: 'Guest Requests' },
  { id: 'maintenance', Icon: Wrench, label: 'Maintenance' },
]

export const PAGES = {
  dashboard: Dashboard,
  application: ApplicationPage,
  payments: PaymentsPage,
  guests: GuestsPage,
  maintenance: MaintenancePage,
}
