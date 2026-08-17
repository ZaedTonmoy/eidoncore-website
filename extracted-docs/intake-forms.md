---
title: "Intake Forms"
category: "Configuration"
slug: "intake-forms"
---

# Intake Forms

Collect project requirements, preferences, and onboarding information from clients automatically after they purchase a service. Build custom forms with a drag-and-drop builder and assign them to any service in your catalog.

---

## How Intake Forms Work

The intake form system follows a simple flow:

1. **You create a form** with the questions you need answered
2. **You assign the form** to one or more services
3. **A client purchases the service** through the catalog (or you assign it manually)
4. **The client fills out the form** on the purchase confirmation page or from their Digital Assets page
5. **Responses are saved** as a pinned document in the auto-created project
6. **You're notified** when a submission comes in

---

## Creating a Form

Navigate to **Intake Forms** in the sidebar (under Tools) and click **"New Form"**.

### Form Details

| Field | Description |
|-------|-------------|
| **Name** | Form title (e.g., "Website Project Intake") |
| **Description** | Instructions shown to the client before filling out the form |
| **Status** | Draft, Published, or Archived (see below) |

### Form Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Being built — not available to clients |
| **Published** | Active and linked to services — clients can fill it out |
| **Archived** | Retired — no longer available for new submissions |

---

## Field Types

Use the drag-and-drop field builder to add questions. Eidoncore supports **27 field types** across 6 categories:

### Text Inputs

| Type | What It Collects | Input Control |
|------|-----------------|---------------|
| **Text** | Short text response | Single-line text input |
| **Textarea** | Long text response | Multi-line text area |
| **Email** | Email address | Email input with validation |
| **Phone** | Phone number | Phone number input |
| **URL** | Web link | URL input with validation |
| **Number** | Numeric value | Number input |
| **Address** | Structured address | Address input with fields for street, city, state, zip |
| **Currency** | Money amount | Formatted input with $ prefix |

### Selection Inputs

| Type | What It Collects | Input Control |
|------|-----------------|---------------|
| **Select** | Single choice from a list | Dropdown with custom options |
| **Multi-Select** | Multiple choices from a list | Checkbox group |
| **Checkbox** | Yes/no answer | Checkbox toggle |
| **Radio** | Single choice from options | Radio button group |
| **Toggle** | Yes/No answer | Pill-style toggle buttons |

### Date & Time Inputs

| Type | What It Collects | Input Control |
|------|-----------------|---------------|
| **Date** | A date | Date picker |
| **Time** | A time | Time input |
| **DateTime** | Date and time combined | Combined date and time picker |

### Rich Inputs

| Type | What It Collects | Input Control |
|------|-----------------|---------------|
| **File Upload** | A document or file | Drag-and-drop upload zone |
| **Image Upload** | An image file | Upload with image preview |
| **Rating** | Star rating | Configurable star rating (3–10 stars) |
| **Signature** | Handwritten signature | Drawing canvas |
| **Color Picker** | A color value | Color picker with hex input |
| **Slider** | A numeric value in a range | Range slider with configurable min/max |

### Layout Elements (Non-Input)

| Type | Purpose |
|------|---------|
| **Heading** | Section heading to organize the form |
| **Paragraph** | Descriptive text block for context or instructions |
| **Divider** | Visual separator between sections |
| **Hidden** | Pre-filled hidden field (not visible to the client) |

### Advanced

| Type | What It Collects | Input Control |
|------|-----------------|---------------|
| **Repeater** | Repeatable groups of data | Dynamic row group — clients can add and remove rows, each with configurable sub-fields |

---

## Field Configuration

Each field supports the following settings:

| Property | Description |
|----------|-------------|
| **Label** | The question text shown to the client |
| **Required** | Whether the client must answer this question |
| **Placeholder** | Hint text shown inside the input |
| **Help Text** | Guidance text shown below the field |
| **Width** | Full width or Half width (for side-by-side layout) |

### Validation Rules

Add validation rules to enforce input quality:

| Rule | Applies To | Description |
|------|-----------|-------------|
| **Min / Max Length** | Text, Textarea | Minimum and maximum character count |
| **Pattern** | Text | Regex pattern matching |
| **File Types** | File Upload, Image Upload | Restrict accepted file formats |
| **Max File Size** | File Upload, Image Upload | Maximum upload file size |
| **Max Rating** | Rating | Maximum number of stars (3–10) |
| **Min / Max** | Number, Slider, Currency | Minimum and maximum numeric values |

### Conditional Visibility

Show or hide a field based on another field's value:

- Select a **source field** from the form
- Choose an **operator** (equals, not equals, contains, etc.)
- Set the **trigger value**

Example: Show a "Custom Budget" text field only when the "Budget Range" dropdown equals "Custom".

---

## Multi-Page Forms

Organize longer forms across multiple pages for a better client experience:

- Add pages using the **page tab bar** in the form builder
- Drag fields onto different pages or set the page number in field settings
- Clients see a **step wizard** with numbered progress indicators
- **Per-page validation** — required fields must be filled before advancing to the next page
- The **Submit** button only appears on the last page

This is ideal for comprehensive onboarding questionnaires with distinct sections (e.g., Company Info → Project Scope → Brand Guidelines → Technical Requirements).

---

## Previewing Forms

Click **"Preview"** in the form builder to see exactly what clients will see, including:

- Multi-page navigation with back/forward buttons
- Field rendering and layout
- Validation feedback
- Conditional visibility behavior

---

## Assigning Forms to Services

Each intake form can be assigned to **one or more services**:

- One form can serve multiple services (e.g., a general onboarding form)
- Each service can only have one intake form
- Removing a form from a service doesn't delete the form — it just unlinks them
- Forms work with both project-based services and digital products

> **See also:** [Services](./services/overview#intake-forms) for how intake forms fit into the service workflow

---

## Client Experience

### Post-Purchase (Cart Checkout)

After purchasing a service that has an intake form, the client sees the form on the **purchase confirmation page**:

1. A form card appears with the form name and description
2. The client fills in the required and optional fields (with step wizard for multi-page forms)
3. On submit, a success message confirms the submission
4. The form disappears from the confirmation page after submission

### Digital Assets (Digital Products)

For digital products with intake forms:

1. The **Digital Assets** detail panel shows the form name and status
2. If not submitted, a **"Submit Form"** button opens the form inline (no page navigation)
3. After submission, a green **"Submitted"** badge replaces the button

### Nudge System

If a client hasn't submitted the intake form within 24 hours, the system sends a reminder notification prompting them to complete it.

---

## What Happens After Submission

When a client submits an intake form:

1. **A project document is created** — Responses are formatted into a readable HTML document and saved as a **pinned document** in the project
2. **A submission record is saved** — Linking the response data to the form, project, and submitter
3. **The agency owner is notified** — A notification is sent so you can review the responses immediately

---

## Managing Intake Forms

The Intake Forms page lets you manage all your forms in one place:

| Action | Description |
|--------|-------------|
| **View all forms** | See each form's name, status, field count, submission count, and assigned services |
| **Filter by status** | Show only Draft, Published, or Archived forms |
| **Search** | Find forms by name |
| **Create forms** | Build new forms with the drag-and-drop builder |
| **Edit forms** | Update questions, reorder fields, and change service assignments |
| **Duplicate forms** | Copy an existing form as a starting point |
| **Delete forms** | Remove forms (unlinks from all services first) |
| **View submissions** | See the last 50 submissions for each form |

### Who Can Access Intake Forms

| Role | Can Access |
|------|:----------:|
| Owner | ✓ |
| Admin | ✓ |
| Project Manager | ✓ |
| Accountant | ✗ |
| Team Member | ✗ |
| Organization Users | ✗ |

Intake Forms is a **Pro plan** feature. On the Free plan, the sidebar item shows a lock badge. Clicking it shows an upgrade prompt.

---

## Notifications

| Event | Who Gets Notified |
|-------|-------------------|
| Intake form submitted | Agency owner |

> **See also:** [Services](./services/overview#intake-forms) for service integration · [Projects](./projects#project-documents) for where submissions are saved · [Settings](./settings/billing#plans--billing) for plan features
