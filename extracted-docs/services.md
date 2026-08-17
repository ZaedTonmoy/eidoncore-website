---
title: "Services"
category: "Core Features"
slug: "services"
---

# Services

Build a service catalog for your agency, assign services to clients, and let clients purchase directly through an integrated cart and checkout experience. Eidoncore supports two types of offerings: **project-based services** (collaborative workspaces) and **digital products** (downloadable deliverables).

Create services with content, task templates, and intake forms

Pricing models, hours/credits tracking, and quota management

Catalog, cart & checkout, and service assignments

---

## Fulfillment Types

Every offering in your catalog is one of two types:

| Type | Sidebar Location | Delivery | Use Case |
|------|-----------------|----------|----------|
| **Services** (Project-Based) | Offerings --> Services | Creates a collaborative project workspace | Retainers, custom work, consulting |
| **Digital Products** | Offerings --> Products | Downloadable files + delivery instructions | Templates, design assets, guides, toolkits |

Both types are created through the same multi-step **Service Builder** and share pricing models, categories, and catalog features. The fulfillment type is selected at creation and **cannot be changed** after the offering is created.

---

## Digital Products

Digital products are offerings delivered as files or instructions rather than collaborative projects.

### Creating a Digital Product

Navigate to **Products** (under Offerings in the sidebar) and click **"New Digital Product"**. The builder is the same as for services, with an additional **Digital Delivery** section on Step 2:

| Field | Description |
|-------|-------------|
| **Delivery File URL** | The download URL for the product file |
| **Delivery Instructions** | Instructions shown to the buyer after purchase |
| **Requires Manual Fulfillment** | If enabled, the agency must manually mark the product as delivered |

### Products Listing

The Products page shows all digital products in a grid layout with cover images, pricing, and category labels. Use category filter pills and search to find products quickly.

### Sales Tracker

Track all digital product sales in one place via **Products --> Sales Tracker**:

- **Stats cards** at the top showing Monthly Recurring Revenue, Total Revenue, Active Sales, and Churn
- **Filter by status** — All, Active, Pending, or Cancelled (with counts)
- **Search** by product name or client company
- **Sortable table** with 7 columns (Product, Client, Price, Type, Status, Fulfillment, Date) — click any column header to toggle A-Z / Z-A sorting

Click any row to open the **Sale Detail Panel** (slide-out drawer) where you can:

| Section | What You Can Do |
|---------|----------------|
| **Status** | Change to Active, Pending, Cancelled, Paused, or Expired |
| **Fulfillment** | Mark as Delivered or Pending |
| **Dates** | Set start date and end date |
| **Recurring Settings** | Set next renewal date, toggle auto-renew, view billing interval |
| **Notes** | Add internal notes about this sale |
| **Intake Form** | View linked intake form name and submission status |
| **Timeline** | See created, started, and cancelled dates |

### Digital Assets (Client View)

Clients who purchase digital products see a **Digital Assets** page in their sidebar. This page shows all their purchased digital products in a table with:

- Product name with delivery instructions preview
- Status, billing type, and price
- Purchase date and next renewal date (for recurring products)

Clicking a row opens a detail panel where clients can:

- **Download** the product file (if fulfilled and a delivery URL exists)
- **Submit an intake form** (if the product has one assigned)
- **Cancel a recurring subscription** — with a reason selection (6 predefined options + custom text)
- View delivery instructions, timeline, and cancellation details

### File Security

Digital product downloads are protected with:

- **Authentication** — Only verified purchasers can download
- **Rate limiting** — 10 downloads per hour per user
- **Signed URLs** — Temporary download links that expire after 60 minutes
- **Fulfillment check** — Files are only served when the product is marked as Delivered
- **Virus scanning** — All uploaded files are scanned before being made available

---

## Service Templates

For more complex project scaffolding, create **Service Templates** that define:

- A **default project name** for auto-created projects
- **Pre-configured tasks** (title, description, status, priority, sort order)
- **Pre-configured milestones** (name, sort order)
- An optional **SLA configuration**

Multiple templates can exist for a single service — the user picks one at assignment time.

---

## Categories

Organize your service catalog with **categories**:

- Each category has a name, slug, description, and color badge
- Filter services by category in the catalog
- Deleting a category doesn't delete the services in it — they simply become uncategorized

---

## Default Assignees

Set **default team members** on a service who will be automatically assigned as project members when the service is assigned or purchased by a client. This ensures the right people are on every project from day one.

---

## Service Access Control

Control which agency staff members can view or manage each service:

- By default, services follow your role permission settings
- Users with the **View All Services** permission can see all services
- For users without that permission, add **per-service access rules**:

| Access Level | What It Grants |
|-------------|----------------|
| **Can View** | See the service in listings |
| **Can Edit** | Modify the service details |
| **Can Assign** | Assign the service to clients |

This is useful for large teams where certain services should only be visible to specific team members.

> **See also:** [Team](../team) for role-based permissions · [Projects](../projects) for auto-created project details · [Invoicing](../invoicing/overview) for service-linked billing

---

Create and manage services with rich content, task automation, and intake forms.

---

## Creating a Service

Navigate to **Services** in the sidebar and click **"New Service"**. The multi-step builder walks you through:

Name, short summary, category, and cover image

Full description, deliverables, FAQ, useful links, and gallery images

Choose a pricing model and configure billing

Preview, edit the URL slug, and publish

## Service Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Being prepared — not visible to clients, cannot be assigned |
| **Published** | Live and available for assignment or purchase |
| **Archived** | Soft-deleted — no longer active |

You can switch between Draft and Published at any time. To publish, a service must have a name and valid pricing.

---

## Service Content

Enrich your service listings with:

| Content | Description |
|---------|-------------|
| **Cover Image** | Hero image displayed at the top of the service page |
| **Gallery** | Up to 8 images showcasing your work |
| **Deliverables** | A checklist of what's included |
| **FAQ** | Up to 15 frequently asked questions with answers |
| **Useful Links** | Up to 10 links to external resources |

### Client Visibility Controls

Choose which content sections clients can see on the catalog page:

- Show/hide pricing, FAQ, deliverables, gallery, and reviews independently
- These settings are enforced server-side — hidden content is never sent to the client

---

## Task Templates

Pre-configure tasks that are automatically created when a service is assigned to a client:

- Set a **title**, **description**, **priority**, and **estimated hours** for each template task
- Tasks are created inside the project auto-generated for the client
- Saves time on repetitive project setups

---

## Intake Forms

Services can have an optional **intake form** that clients fill out after purchase. This is great for collecting project requirements, preferences, or onboarding information.

### Form Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Form is being built — not available to clients |
| **Published** | Active and linked to services — clients can fill it out |
| **Archived** | Retired — no longer available for new submissions |

### How It Works

Go to the **Intake Forms** page (in the sidebar under Tools) and build a form with the drag-and-drop form builder

Drag fields from the palette onto the canvas. Supported field types are listed below.

Set required toggles, placeholders, help text, validation rules, and conditional visibility

Link one form to one or more services

After purchasing a service, clients see the intake form on the confirmation page

### Supported Field Types

| Field Type | What It Collects |
|-----------|-----------------|
| Text | Short text input |
| Textarea | Multi-line text |
| Email | Email address |
| Phone | Phone number |
| URL | Web link |
| Number | Numeric input |
| Address | Structured address input |
| Currency | Formatted money input with $ prefix |

| Field Type | What It Collects |
|-----------|-----------------|
| Select | Single dropdown with custom options |
| Multi-Select | Checkbox group for multiple choices |
| Checkbox | Single yes/no toggle |
| Radio | Radio button group |
| Toggle | Yes/No pill buttons |

| Field Type | What It Collects |
|-----------|-----------------|
| Date | Date picker |
| Time | Time input |
| DateTime | Combined date and time picker |

| Field Type | What It Collects |
|-----------|-----------------|
| File Upload | File upload zone with drag-and-drop |
| Image Upload | Image upload with preview |
| Rating | Configurable star rating (3–10 stars) |
| Signature | Signature drawing canvas |
| Color Picker | Color picker with hex input |
| Slider | Range slider with configurable min/max |

| Field Type | What It Collects |
|-----------|-----------------|
| Heading | Section heading (no input — for structure) |
| Paragraph | Description text block |
| Divider | Visual separator |
| Hidden | Pre-filled hidden field |
| Repeater | Dynamic row group — add/remove rows with configurable sub-fields |

### Field Configuration

Each field supports:
- **Required** toggle — must be filled to submit
- **Placeholder** and **Help Text** — guide the client
- **Width** — Full or Half width for side-by-side layout
- **Validation** rules — min/max length, pattern matching, file types, max file size, max rating
- **Conditional visibility** — show/hide based on another field's value

Use **multi-page forms** for longer forms. Clients see a step wizard with numbered progress indicators and per-page validation.

### Managing Intake Forms

The Intake Forms page is accessible to **Owners**, **Admins**, and **Project Managers**. From there you can:

- View all forms with field counts and submission counts
- Filter by status (Draft, Published, Archived)
- Search by form name
- Create, edit, duplicate, and delete forms
- See which services each form is assigned to
- Review past submissions

---

## Reviews

Clients who are active subscribers can leave **reviews** on services:

- **Star rating** (1-5) with an optional title and rich text comment
- **One review per organization** per service
- Reviews require **moderation** before appearing publicly:
  - Newly submitted reviews are marked as **pending**
  - Agency owners can **approve** reviews to make them visible in the catalog
  - Agency owners can **reject** (delete) reviews
- Approved reviews appear on the catalog detail page with star ratings and comment cards
- The best review quote (highest rated with a comment) is featured on the service hero section

The agency owner is notified when a review is submitted.

---

## Share Links

Every service has shareable public catalog links:

- **Service catalog**: Share a link to your full public catalog (`/catalog/services`)
- **Individual service**: Share a link to any published, public service's detail page (`/catalog/services/{slug}`)

Share links are available on the service list page and each service's detail page via the **Copy Link** button.

---

Manage your public service catalog and the end-to-end client purchase experience.

---

## Service Catalog

Your service catalog is the public-facing storefront where clients browse and purchase services.

### How Clients See Your Catalog

Clients access the catalog at `/catalog/services` and can:

- Browse services organized by category
- Search and filter using category pills
- View full service details with description, deliverables, FAQ, gallery, reviews, and pricing

---

## Assigning Services to Clients

Assign a published service directly to a client organization:

Select the client and the service to assign

Optionally select a **service template** or use **task templates** to auto-create a project

Define start/end dates. For hour/credit services, initial balances are set automatically

When a service is assigned:

- A project is optionally auto-created with pre-configured tasks
- Default assignees are added as project members
- If the client is still in the Lead stage, they're automatically upgraded to **Active**

---

## Cart & Checkout Flow

Clients can browse and purchase services directly through a self-service checkout:

### How It Works (Client Experience)

Clients see available services with pricing at `/catalog/services`, organized by category with search and filtering

Full service page with description, deliverables, FAQ, gallery, reviews, and pricing sidebar

Click "Add to Cart" on the service detail page

See line items, prices, and order total at `/cart`

Pay with card, Apple Pay, or Google Pay via the embedded Stripe payment form

See project cards for each purchased service, account manager info, next steps, and optionally fill out an intake form

### What Happens After Purchase

Behind the scenes:

- A **project** is auto-created for each purchased service
- A **service assignment** is linked to the project
- The client's status is upgraded to **Active** if needed
- The **agency owner** receives a "Service Purchased" notification
- The **client contacts** receive a "Service Activated" notification with a link to their new project

See also: [Client Portal](/client-portal/overview) for the full client experience

---

Configure pricing models for your services and manage hours/credits tracking with automatic quota management.

---

## Pricing Models

Eidoncore supports 5 pricing models to fit different agency service types:

| Model | How It Works | Example |
|-------|-------------|---------|
| **One-Time Fixed** | Single flat fee for a deliverable | Website redesign — $5,000 |
| **Recurring Monthly** | Ongoing subscription (monthly, quarterly, or yearly) | SEO retainer — $2,000/mo |
| **Hourly Rate** | Bill per hour worked | Consulting — $150/hr |
| **Hourly Block** | Prepaid block of hours per period | Support package — 20 hours/mo |
| **Credit Pack** | Prepaid credits for work units | Design credits — 100 credits/mo |

### Billing Configuration

Each service specifies:

- **Billing type**: One-Time, Recurring, or Usage-Based
- **Billing interval**: Monthly, Quarterly, or Yearly (for recurring)
- **Billing mode**: Manual or Stripe (for automated payment collection)

---

## Included Hours & Credits

For Hourly Block and Credit Pack services:

| Setting | Description |
|---------|-------------|
| **Included Hours / Credits** | Amount included per billing period |
| **Rollover Policy** | None (reset each period), Capped, or Unlimited |
| **Expiry Days** | Number of days before unused hours/credits expire |
| **Minimum Billable Increment** | Smallest time unit for billing (e.g., 15 minutes) |
| **Overtime Rate** | Hourly rate charged when included hours are exceeded (for Hourly Block services) |

### Quota Top-Ups

When a client's included hours or credits are running low, additional quota can be added:

**Immediate top-up** — On the project's quota section, click **"+ Add Quota"** to add hours, credits, or tasks directly.

- Top-ups are added to a separate top-up balance that carries over indefinitely (regular renewals only reset the base balance)
- Not available for Usage-Based services

**Request & Approve Flow:**

On their project page, clients click **"Request Top-Up"** and enter the desired amount

The request appears as **Pending** — the agency owner can **Approve** or **Reject** it

If approved, the client sees a **"Pay"** button that redirects to Stripe checkout

After payment, the top-up balance is updated immediately

Both agency and client can view the full **top-up history** on the project, showing each entry's amount, status (Pending, Approved, Paid, Rejected), and date.

---

## Hours & Credits Tracking

### Hours Tracking

For services with included hours (Hourly Block):

- When time is logged against a service assignment, the remaining hours balance is automatically reduced
- If time entries are deleted, the balance is restored
- When all hours are depleted, the agency owner and client contacts are notified
- If a recurring subscription's auto-renewal payment fails, the service status changes to **Past Due**

### Credits Tracking

For credit-based services (Credit Pack):

- Credits are tracked via a **ledger** system
- Credit entries can be: **Add** (initial or top-up), **Spend** (work performed), or **Adjust** (manual correction)
- Each entry includes the amount, reference type, and a note
- When all credits are depleted, the agency owner and client contacts are notified

### Service Assignment Statuses

| Status | Meaning |
|--------|---------|
| **Pending** | Just purchased, awaiting setup |
| **Active** | Currently in use |
| **Paused** | Temporarily suspended |
| **Past Due** | Auto-renewal payment failed |
| **Cancelled** | Terminated by the client or agency |
| **Completed** | One-time service delivered |

---

## Quota Management on Projects

When a project is linked to a service, the project page shows real-time quota information:

### Quota Progress Bar

| Display | Meaning |
|---------|---------|
| **Green** | Normal usage — plenty of balance remaining |
| **Amber** | Over 75% consumed |
| **Red** | Over 90% consumed or fully exhausted |

The progress bar shows remaining allocation (e.g., "15 / 20 hours remaining"). Top-up balances are displayed as a separate segment.

### Quota Exhaustion Guard

When a service's quota is fully consumed, the **"+ New Task"** button on the project is **disabled**. A tooltip explains that the quota is exhausted. Agency owners can bypass this restriction.

### Complete & Invoice (One-Time Projects)

For one-time service projects, a **"Complete & Invoice"** button appears in the project header. Clicking it:

1. Automatically stops all running timers on the project
2. Sweeps all unbilled time entries into a **draft invoice**
3. Marks the project as **Completed**

### Time Entry Behaviors

When time is logged against a service with included hours:

- Time is split into **regular** (within balance) and **overtime** (beyond balance) minutes
- The hourly rate and overtime rate are **snapshotted** at the time of logging — changes to the service rate don't retroactively affect past entries
- Once a time entry is **billed** (linked to an invoice), it becomes **immutable** and cannot be edited or deleted
- **Written-off** entries (agency comp) are excluded from invoice totals

When a time entry is deleted (before being billed), the consumed balance is automatically restored.

---

## Cancelling a Subscription

When a subscription is cancelled (by the client or agency):

Any **active timers** are automatically stopped

All **unbilled time entries** are swept and added to a closing draft invoice

The subscription status changes to **Cancelled** with a reason recorded

The agency Owner and Admin are notified

### Auto-Renewal

Recurring subscriptions automatically renew at the end of each billing period:

- The saved payment method is charged off-session
- On success, the billing period extends by one month and included hours/credits reset
- On failure, the subscription moves to **Past Due** status and both parties are notified
- The `autoRenew` toggle can be managed from the subscription settings
