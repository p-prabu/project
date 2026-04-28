# ITSM Project Management

A lightweight, premium ITSM-style project management app built with plain HTML, CSS, and JavaScript. It runs entirely in the browser, stores data in `localStorage`, and can be published directly with GitHub Pages.

## Highlights

- No build step, framework, backend, database, or npm dependency.
- ITIL-inspired workflow: Backlog, Assess, Plan, Build, Validate, Deploy, Review, Closed.
- Views for Dashboard, Kanban, Timeline, Assigned Workload, Priority Control, Reports, Manage, and Settings.
- Project and task create, edit, delete.
- Global search across projects, tasks, owners, assignees, priority, status, risk, impact, and service area.
- ITSM Settings for organization profile, default intake values, service areas, assignment groups, SLA days, backup reminder, and Appearance themes.
- Three Appearance themes: Pearl Grid, Midnight Grid, and Nova 2050.
- JSON export/import for backup and restore.

## Run Locally

Open `index.html` directly in a browser.

No install command is required.

## GitHub Pages

1. Push `index.html`, `styles.css`, `app.js`, `README.md`, `USERGUIDE.md`, and `CHANGELOG.md` to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Set the source to the repository root on the `main` branch.
5. Save and open the GitHub Pages URL.

## Browser Storage

All data is stored in browser `localStorage` under:

```text
itsm-project-management-v1
```

Data is local to the current browser profile. Use **Export JSON** regularly before clearing browser data, changing devices, or switching browsers.

## Project Files

- `index.html` - application shell and navigation.
- `styles.css` - premium ITSM visual design, responsive layout, and themes.
- `app.js` - sample data, persistence, validation, views, CRUD, search, reporting, settings, and import/export logic.
- `USERGUIDE.md` - end-user guide.
- `CHANGELOG.md` - release notes.
- `LICENSE` - repository license.

## Documentation

See [USERGUIDE.md](USERGUIDE.md) for usage instructions and [CHANGELOG.md](CHANGELOG.md) for release history.
