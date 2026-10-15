# Practical 02 Enhancement Report

## Project Title
Pet Care Veterinary Management System

## Student Name
Kavina Gnanaraj

## Registration Number
JF/ICT/25/08

## Supervisor
Mr. S. Sangeeththanan

## Department
Information and Communication Technology

## University College of Jaffna
University of Vocational Technology, Sri Lanka

## Year
2025/2026

---

## 1. Introduction

Practical 02 extends the Pet Care Veterinary Management System
developed during Practical 01. The enhancements include
administrator authentication, password hashing, protected API
routes, medical history reports, vaccination management, a
simulated payment workflow, dashboard improvements and a
complete UI redesign with a dark purple theme.

---

## 2. Authentication and Security

- Administrator registration and login were implemented using
  session-based authentication.
- Passwords are hashed using bcrypt with a salt round value
  of 10 before being stored in the database.
- A logout API endpoint was added to destroy the server-side
  session using req.session.destroy().
- Protected API routes were implemented using the
  requireLogin middleware in authMiddleware.js.
- All routes for pets, owners, treatments, appointments,
  vaccinations, payments and medical reports are protected
  and require an active session.
- Client-side login check was added to index.html and
  medical-report.html to redirect unauthenticated users to
  the login page.
- Parameterized SQL queries are used in all database models
  to prevent SQL injection attacks.
- jQuery $.ajaxSetup was used to globally apply
  xhrFields: { withCredentials: true } so that session
  cookies are sent with all AJAX requests.

---

## 3. Medical History Reports

A medical history report feature was implemented at the
/medical-report.html page. The administrator enters a Pet ID
and the system retrieves the pet information, owner details
and complete treatment history from the database through a
protected API endpoint at /api/reports/pet/:id.

---

## 4. Dashboard Improvements

- Dashboard statistics were extended to display six real-time
  counts: Owners, Pets, Treatments, Appointments,
  Vaccinations and Payments.
- Each statistics card has a unique colour accent to
  distinguish the modules visually.
- Seven module navigation cards were added below the
  statistics with scroll buttons to quickly navigate to each
  section.
- The dashboard query was refactored to run six separate
  COUNT queries and merge the results correctly.

---

## 5. Additional CRUD Module — Vaccination Management

Vaccination management was implemented as the additional CRUD
module required for Practical 02. The module supports
creating, viewing, updating and deleting vaccination records.

Each record stores:
- Pet name
- Vaccine name
- Vaccination date
- Next due date
- Clinical notes

---

## 6. Payment Workflow

A simulated payment module was implemented to manage
veterinary billing records. The module supports creating,
viewing, updating and deleting payment records.

Each record stores:
- Pet owner
- Amount in LKR
- Payment method (Cash, Card Mock, Bank Transfer)
- Payment status (Pending, Paid, Failed)
- Payment date
- Description

A bug in the deletePayment function in paymentModel.js was
identified and fixed. The incorrect values array was replaced
with the correct parameterized query using only the payment ID.

The payment model getAllPayments query was corrected to use
the actual database column name status aliased as
payment_status to match the frontend expectations.

A duplicate payment loader using a plain fetch call without
session credentials was identified and removed from script.js.
The correct jQuery loadPayments function with withCredentials
is used instead.

---

## 7. User Interface Improvements

- A complete dark purple theme was applied across all pages
  including login, dashboard and medical report pages.
- The theme uses a deep dark purple gradient background
  with glass morphism card effects, backdrop blur and
  semi-transparent sections.
- The login page was redesigned with a branded header,
  glass card, icon inputs and purple glow focus effects.
- The medical report page was redesigned to match the
  dashboard dark theme with a glass search card and
  structured pet information display.
- Stat cards and module cards use hover lift animations.
- Tables use a gradient purple header with row hover effects.
- Edit buttons use dark purple and delete buttons use light
  purple for visual consistency.
- The header is sticky and uses a blur backdrop effect.
- All pages are fully responsive with media query breakpoints
  at 900px, 768px, 600px and 450px.

---

## 8. Bug Fixes

| Bug | Fix Applied |
|---|---|
| Logout only cleared sessionStorage, backend session not destroyed | Added POST /api/logout route calling req.session.destroy() |
| Pets, owners, treatments, appointments routes not protected | Added requireLogin middleware to all routes |
| Dashboard showed only 4 counts | Extended query to include vaccinations and payments |
| Payment table showed no data | Fixed column name mismatch (status vs payment_status) |
| Payment delete function used wrong SQL values | Fixed deletePayment to use only [id] parameter |
| Duplicate payment loader without credentials | Removed plain fetch loader, kept jQuery loadPayments |
| All AJAX calls failing with 401 after login | Added $.ajaxSetup withCredentials: true globally |
| Owners table not refreshing after add | Refactored inline AJAX into loadOwners() function |
| Script.js syntax error on line 86 | Fixed missing $.ajax url and method lines |
| Dashboard counts showing 0 | Fixed multiple $(document).ready blocks and call order |

---

## 9. Testing

The following tests were performed:

- Login with valid credentials — redirects to dashboard
- Login with invalid credentials — error message displayed
- Access dashboard without login — redirects to login page
- Add, view, update and delete owners
- Add, view, update and delete pets
- Add, view, update and delete treatments
- Add, view, update and delete appointments
- Add, view, update and delete vaccination records
- Add, view, update and delete payment records
- Generate medical history report using Pet ID
- Verify dashboard statistics counts are correct
- Search and filter all tables
- Logout and verify session is destroyed
- Verify protected routes return 401 when not logged in

---

## 10. Conclusion

The enhancements successfully extend the original Practical 01
application with authentication, security, reporting, dashboard
improvements, vaccination management, payment records and a
complete dark purple UI redesign. All Practical 02 minimum
requirements have been implemented and tested.
