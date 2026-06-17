# FRS: Section 14 UI Module

## Module Overview
The Section 14 UI module is a React/Vite front-end that simulates a government case registration flow. It consists of a landing page showing redirect metadata and a case registration form with validation.

## Screens / Pages

### 1. Home / Landing Page
- Purpose: Display incoming redirect payload parameters and allow the user to start the registration form.
- Source: `src/App.jsx`

### 2. Case Registration Page
- Purpose: Capture applicant and land registration details for Section 14.
- Source: `src/components/CaseRegistration.jsx`

## Screen Details

### Home / Landing Page
#### Visible UI Elements
- Branding header with `Jami Pariseva` and portal subtitle.
- Landing title: `Jami Pariseva Case Registration`.
- Intro copy describing the government service portal.
- Redirect payload panel showing:
  - `applicationId`
  - `userId`
  - `hmac`
  - `callbackUrl`
  - `underSection`
- Start application panel with `Go to Application` button.
- Security note panel with validation reminders.

#### Actions
- `Go to Application`
  - Navigates to the registration form.

### Case Registration Page
#### Visible UI Sections
- Request payload metadata display.
- Location details section.
- Applicant details table.
- Land details table.
- Document selection and file upload.
- Area allocation input and captcha block.
- Submit button and Cancel action.

#### Form Fields
- Location Details
  - `district` (select)
  - `subdivision` (select)
  - `revenueCircle` (select)
  - `tehsil` (select)
  - `mouza` (select)

- Applicant Details (repeatable row)
  - `name`
  - `guardian`
  - `relation`
  - `address`
  - `mobile`
  - `email`

- Land Details (repeatable row)
  - `khatian` (default `1235`)
  - `plotNo`
  - `areaRecorded`
  - `mainClass`
  - `subClass`

- Other Inputs
  - `selectedDocument` (select)
  - `supportingFile` (PDF upload)
  - `otherSupportingFile` (optional file upload)
  - `areaToAllocate`
  - `captchaInput`

#### Validation Rules
- Required fields:
  - `district`, `subdivision`, `revenueCircle`, `tehsil`, `mouza`
  - `name`, `guardian`, `relation`, `address`, `mobile`, `email`
  - `plotNo`, `areaRecorded`, `mainClass`, `subClass`
  - `supportingFile`
  - `areaToAllocate`
  - `captchaInput`

- Email must match valid email format.
- `supportingFile` must be a PDF and smaller than 2MB.
- `areaToAllocate` must be numeric and must not exceed `areaRecorded`.
- Captcha must exactly match the generated value (`7CAP9H` in current code).

#### Buttons / Actions
- `Add Applicant` — add a new applicant row.
- `Add Land Row` — add a new land row.
- `Submit` — validate input and simulate submission.
- `Cancel` — return to the landing page.

## Navigation Flow
- Home page is the default view.
- Clicking `Go to Application` appends `?page=registration` plus the redirect parameters to the URL.
- Registration page loads when the URL contains `page=registration`.
- `Cancel` resets the URL to the base path and returns to the landing page.

## API Interaction
### Current Implementation
- There are no actual backend API calls in the current front-end implementation.
- All data is handled client-side and validation is performed in the browser.

### Recommended API Endpoints
- `GET /api/locations/districts`
- `GET /api/locations/subdivisions?district={district}`
- `GET /api/locations/revenue-circles?subdivision={subdivision}`
- `GET /api/locations/tehsils?revenueCircle={revenueCircle}`
- `GET /api/locations/mouzas?tehsil={tehsil}`
- `POST /api/cases`
- `POST /api/validate-hmac` (server-side HMAC validation)
- Callback to `callbackUrl` after successful submission

## Request and Response Data Displayed
### Displayed Request Data
- Landing page: displays redirect metadata from `defaultRequest`.
- Registration page: displays the same metadata as a request payload chip panel.

### Simulated UI Request Payload
- `applicationId`, `userId`, `hmac`, `callbackUrl`, `underSection`
- Location fields
- Applicant rows
- Land rows
- Document selection
- File upload payload
- `areaToAllocate`
- `captchaInput`

### Expected Response Handling
- On successful submit, the UI shows a success message:
  - `Form submitted successfully. Redirecting to callback URL with status...`
- No backend success/failure response is currently rendered in the UI.

## Notes
- Server-side validation and actual API integration are not yet implemented in this prototype.
- The HMAC and callback URL are displayed as incoming request metadata, but the actual security check should occur on the backend.
- The current flow is intentionally lightweight for the front-end prototype.
