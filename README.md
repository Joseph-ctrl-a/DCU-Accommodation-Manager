# DCU Accommodation Portal

A fully interactive student accommodation management portal built with React, developed as part of the CSC1016 Group Project 2 bonus deliverable. The portal provides a working UI prototype that maps directly to the five core business processes designed in the BPMN models.

## Overview

The portal simulates the DCU student accommodation system from a resident's perspective, covering the full lifecycle from initial room application through to maintenance reporting. All data is driven by a centralised JSON mock dataset, and every form corresponds to a specific process in the system design.

## Process Coverage

| Portal Page    | BPMN Process                                        |
| -------------- | --------------------------------------------------- |
| Login          | P2 — Student Accommodation Account Portal Login     |
| Application    | P1 — Annual Accommodation Application               |
| Payments       | P3 — Accommodation Payments & Fee Management        |
| Guest Requests | P4 — Guest / Visitor Logs                           |
| Maintenance    | P5 — Maintenance Requests & Accommodation Messaging |

## Features

- **Authentication** — Email validation, SSO button, loading state
- **Dashboard** — Live stats, recent transactions, room details, ticket overview
- **Application** — Three-step form with room type selector and review screen
- **Payments** — Transaction history, payment modal with method selection, success confirmation
- **Guest Requests** — Registration form with policy enforcement, live guest log
- **Maintenance** — Ticket submission with urgency classification, colour-coded ticket list

## Tech Stack

- React 18
- CSS Modules
- Lucide React (icons)
- Google Fonts — Playfair Display, DM Sans

## Project Structure

```
src/
  components/
    ui/
      Login/          # LoginPage, LoginForm, LoginBackground
      Sidebar/        # Sidebar, Brand, Nav, User
      Portal/         # Portal, Topbar
      dashboard/      # Dashboard, DashboardStats, RecentTransactions, RoomDetails
      application/    # ApplicationPage, StepIndicator, step components
      payments/       # PaymentsPage, PaymentStats, TransactionTable, modals
      guests/         # GuestsPage, GuestRegistrationForm, GuestLog
      maintenance/    # MaintenancePage, MaintenanceForm, TicketList, TicketCard
  data/
    data.js           # Mock student, payments, guests, and tickets data
  css/                # CSS Modules per component
```

## Getting Started

```bash
cd my-app
npm install
npm run dev
```

**Demo login:** any `@mail.dcu.ie` email address with any password.

## Notes

This UI prototype was built as a bonus deliverable for the Group Report 2 submission. It is not connected to any live DCU systems and uses mock data throughout.
