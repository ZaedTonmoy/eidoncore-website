---
title: "Messaging"
category: "Core Features"
slug: "messaging"
---

# Messaging

Real-time chat for your agency team and client contacts. Communicate within project channels, organization-wide channels, and direct messages — all built into your workspace.

---

## Channel Types

Messaging is organized into three types of channels:

| Channel Type | How It's Created | Who Can See It |
|-------------|-----------------|----------------|
| **Project Channel** | Automatically created when a project is created | All project members |
| **Organization Channel** | Automatically created for each client organization | All organization members |
| **Direct Message (DM)** | Started by any user | Only the two participants |

Project and organization channels keep their membership in sync — when a member is added or removed from a project, the channel updates automatically.

---

## Sending Messages

### Composing

Type your message in the input area at the bottom of the chat view. Messages support:

- **Rich text** — formatting for emphasis
- **File attachments** — drag and drop or click to attach files
- **@Mentions** — type `@` followed by a team member's name to mention them
- **Replies** — click the reply button on any message to start a thread

Messages appear **instantly** in the chat (optimistic send) — the message is shown immediately while it saves in the background.

Messaging is rate-limited to **10 messages per minute** per user to prevent spam.

### Editing Messages

You can edit your own messages within a **5-minute window** after sending. After 5 minutes, messages become permanent.

### Deleting Messages

- You can delete your own messages at any time
- Admins and Owners can delete any message

Deleted messages are soft-deleted — they disappear from the chat but are retained briefly for audit purposes.

---

## Reactions

React to any message with an emoji. Click the button that appears when you hover over a message to open the emoji picker.

- **One reaction per person per message** — selecting a new emoji replaces your previous reaction
- Click your existing reaction again to remove it
- The message author is notified when someone reacts to their message

---

## Typing Indicators

When someone is composing a message in the same channel, you'll see a **"{Name} is typing..."** indicator with animated dots below the message list. The indicator disappears after 3 seconds of inactivity.

---

## Read Receipts

Sent messages show **read receipts** — small avatar circles at the bottom-right corner of your messages, similar to Facebook Messenger. These show which channel members have read up to that message.

Hover over the avatars to see "Seen by {Name}".

---

## Unread Indicators

Stay on top of conversations with multiple unread indicators:

| Indicator | Where | What It Shows |
|-----------|-------|---------------|
| **Channel badge** | Channel list sidebar | Unread flag on channels with new messages |
| **Sidebar badge** | Messages nav item | Count of channels with unread messages (1–9, 9+) |
| **Favicon dot** | Browser tab icon | Colored dot using your agency's brand color |

All indicators update automatically in the background.

---

## Internal Messages

In project and organization channels, you can mark messages as **internal**:

- Internal messages are visible **only to agency staff** — client contacts in the channel won't see them
- This lets you discuss work privately within a shared channel
- Internal messages are not available in Direct Messages

---

## Direct Messages

Start a private conversation with any workspace member:

1. Click the **search/new DM** field in the messaging sidebar
2. Search for a team member by name
3. Click their name to open or create a DM channel

DMs are always between exactly two people. Existing DM channels appear in your channel list for quick access.

> **Note:** Client contacts cannot DM other client contacts — DMs are only between agency staff, or between agency staff and client contacts.

---

## File Attachments

Attach files to messages by dragging and dropping onto the chat view or using the attach button.

Supported file types include images, documents, PDFs, spreadsheets, archives, and media files (30+ file types).

Maximum attachment size depends on your plan:

| Plan | Max Attachment Size |
|------|--------------------|
| **Free** | 5 MB |
| **Pro** | 10 MB |
| **Enterprise** | 25 MB |

---

## Channel Management

### Member Panel

In project and organization channels, click the **member count** in the channel header to reveal a slide-down member list showing all participants in the channel.

### Muting Channels

Mute channels to pause notifications without leaving the conversation:

- Click the **mute** icon on any channel in the sidebar
- Choose a mute duration (1 hour, 8 hours, 24 hours, 1 week, or until you unmute)
- Muted channels won't send you email notifications
- You can still read messages — you just won't be notified

If you send a message in a channel you've muted, the mute is **automatically removed** — since you're actively participating, you'll resume receiving notifications.

> **Note:** Critical notifications (@mentions) may still bypass mute in certain cases.

### Mark All as Read

Click **"Mark all as read"** at the top of the messaging sidebar to clear all unread badges across all your channels at once.

### Channel Browsing

Users with the **Browse All Channels** permission can see every channel in the workspace, even ones they're not a member of. This is useful for Owners and Admins who need to oversee all conversations.

---

## Message Actions

Hover over any message to see the action bar with quick buttons:

| Action | What It Does |
|--------|-------------|
| **React** | Add an emoji reaction |
| **Reply** | Start a threaded reply |
| **More** | Edit (own, within 5 min), Delete, Forward, Pin/Unpin |

On mobile, **swipe right** on a message to reply.

---

## Message Forwarding

Forward any message to another channel you're a member of:

Click **"⋮ More"** on any message, then select **"Forward"**

Search or browse your channels to select where to send the message

Click the target channel to forward — the message appears with the original sender's attribution

Forwarded messages show the **original sender's name and timestamp**, so recipients always know where the message came from. If the original message was marked internal, the forwarded message is also sent as internal.

---

## Pinned Messages

Pin important messages so they're easy to find later. Any channel member can pin or unpin messages.

- Click **"⋮ More"** on a message, then **"📌 Pin"**
- Pinned messages show a **"📌 Pinned"** indicator in the message list
- View all pinned messages in the **Channel Info Drawer** (click the ⓘ button)
- Click a pinned message in the drawer to **scroll to it** in the conversation

Each channel can have up to **50 pinned messages**. Deleted messages are automatically excluded from the pinned list.

---

## Link Previews

When you share a URL in a message, a **rich preview card** is automatically generated showing:

- **Page title and description** from the linked page
- **Thumbnail image** (when available)
- **Site favicon and name**

For **YouTube** and **Vimeo** links, the preview includes a **click-to-play video thumbnail** that opens an embedded player right in the chat.

Link previews appear for the first URL in each message. They are fetched from the server and cached for performance.

---

## Slash Commands — Entity Mentions

Type `/` in the message editor to **search and mention** platform entities directly in your messages:

| Entity | Icon | What Happens When Clicked |
|--------|------|--------------------------|
| **Tasks** | 📋 | Opens the task drawer inline |
| **Projects** | 📁 | Navigates to the project page |
| **Clients** | 🏢 | Navigates to the client page |
| **Proposals** | 📄 | Navigates to the proposal page |

Entity mentions appear as **color-coded clickable chips** in the message, making it easy to reference and jump to related work items during conversations.

Entity mentions respect your role permissions — you'll only see entities you have access to in the search results.

---

## Channel Info Drawer

Click the **ⓘ** button in the chat header to open the Channel Info Drawer — a side panel with channel details and tools:

| Section | What It Contains |
|---------|-----------------|
| **Search** | Search messages within the channel — click a result to jump to it with a highlight animation |
| **Pinned Messages** | All pinned messages with click-to-scroll |
| **Members** | Collapsible list of all channel members |
| **Personal Notes** | Private notes visible only to you (see below) |
| **Mute/Unmute** | Toggle channel mute from the header |

---

## Personal Notes

Keep private, per-channel notes that only you can see. Perfect for tracking context, to-dos, or reminders about a conversation.

- Open the **Channel Info Drawer** and expand the **Personal Notes** section
- Write notes using the rich text editor
- Notes **auto-save** as you type (800ms debounce)
- Click **"Clear"** to delete your notes (with confirmation)

Personal notes are stored per-channel and per-user — no one else can see them.

---

## Floating Chat Widget

A **Messenger-style floating chat bubble** appears in the bottom-right corner of every page (except the Messages page), giving you quick access to messaging without navigating away from your current work.

| Feature | Detail |
|---------|--------|
| **Unread badge** | Shows real-time unread message count |
| **Channel list** | Search and browse your channels |
| **Mini chat view** | Send and receive messages in a compact panel |
| **Notification sound** | Plays for new messages (respects channel mute) |
| **Mobile** | Takes full width on small screens |

---

## Plan Limits

Messaging features scale with your subscription plan:

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Channels | 10 | 50 | Unlimited |
| Members per channel | 10 | 30 | Unlimited |
| Message retention | 30 days | 90 days | Unlimited |
| Max attachment size | 5 MB | 10 MB | 25 MB |

Messages older than the retention period are **permanently deleted** by an automated cleanup process. This runs weekly to ensure your workspace stays within plan limits.

> **See also:** [Settings](./settings/billing#plans--billing) for plan details

---

## Notifications

You'll receive notifications for key messaging events:

| Event | Who Gets Notified |
|-------|-------------------|
| @mentioned in a message | Mentioned user |
| Reply to your message | Original message author |
| Reaction to your message | Message author |

### Chat Digest

If you've been away for more than 10 minutes, an **hourly chat digest email** summarizes any unread messages across your channels. This runs in addition to your regular notification digest.

> **See also:** [Notifications](./notifications/overview) for notification preferences · [Settings](./settings/overview#notification-preferences) for digest settings

---

## Permissions

| Permission | What It Allows | Default Roles |
|-----------|---------------|---------------|
| **View Messages** | See messages in channels you're a member of | All roles |
| **Send Messages** | Post messages and attachments | All roles |
| **Delete Any Message** | Delete messages from any user | Owner, Admin |
| **Manage Channels** | Create and configure channels | Owner, Admin |
| **Browse All Channels** | See all channels in the workspace | Owner, Admin |

> **See also:** [Team](./team) for configuring role permissions · [Projects](./projects) for project channel membership · [Client Portal](./client-portal/overview) for client messaging access · [Keyboard Shortcuts](./keyboard-shortcuts#messaging) for messaging keyboard shortcuts
