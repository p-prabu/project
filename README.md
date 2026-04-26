# ITSM Project Management

A lightweight ITIL-inspired project management app that runs entirely in the browser with plain HTML, CSS, and JavaScript.

## Run Locally

Open `index.html` directly in a browser.

No install, build, Node.js, npm, backend, database, or API is required.

## Features

- Dashboard with active, overdue, high-priority, and upcoming work.
- Kanban board using the ITIL work lifecycle: Backlog, Assess, Plan, Build, Validate, Deploy, Review, Closed.
- Timeline view for projects and tasks.
- Assigned workload view.
- Priority view with status, assignee, and project filters.
- Reports for status, priority, assignee, and service area counts.
- ITSM settings for organization profile, defaults, service areas, assignees, priority SLA days, and three service-management themes.
- Project and task create, edit, delete.
- Expandable task and project details.
- Global search across project name, task title, assignee, service area, priority, status, risk, and impact.
- JSON export/import for backup and restore.
- Reset to sample ITSM data.

## Browser Storage

All data is saved in browser `localStorage` under this key:

```text
itsm-project-management-v1
```

Data is local to the current browser profile. Export JSON regularly before clearing browser data, changing devices, or switching browsers.

## GitHub Pages

1. Push `index.html`, `styles.css`, `app.js`, and `README.md` to a GitHub repository.
2. Open the repository settings.
3. Go to **Pages**.
4. Set the source to the repository root on the main branch.
5. Save and open the GitHub Pages URL.

Because this app has no build step, GitHub Pages can serve it directly.

## Backup And Restore

- Use **Export JSON** to download a full backup.
- Use **Import JSON** to restore a previous backup.
- Imports are validated before replacing current browser data.
- Use **Settings > Reset Sample** to restore the default local sample data.

## Files

- `index.html` contains the app shell.
- `styles.css` contains the ITSM-style layout and responsive design.
- `app.js` contains sample data, localStorage persistence, validation, views, CRUD, search, reporting, and import/export logic.
- Settings are stored inside the same browser backup JSON as `settings`, `projects`, and `tasks`.
