# User Guide

## Overview

ITSM Project Management is a browser-based project and task tracker designed for service-management teams. It uses ITIL-inspired workflow stages and saves all data in your browser.

## Navigation

- **Dashboard** shows active projects, overdue work, critical/high tasks, upcoming due dates, and active project status.
- **Kanban** groups tasks by lifecycle stage.
- **Timeline** shows project and task schedules.
- **Assigned** groups work by assignee.
- **Priority** groups tasks by Critical, High, Medium, and Low with filters.
- **Reports** shows counts by SLA target, status, priority, assignee, and service area.
- **Manage** is where you create, edit, and delete projects and tasks.
- **Settings** controls ITSM options, themes, SLA targets, and reset actions.

## Create A Project

1. Open **Manage**.
2. Fill in project name, owner, service area, priority, status, risk, dates, and description.
3. Select **Create Project**.

## Create A Task

1. Open **Manage**.
2. Fill in task title, assignee, project, priority, status, risk, dates, service impact, and description.
3. Select **Create Task**.

## Update Task Status

1. Open **Kanban**.
2. Use the status dropdown on a task card.
3. The change is saved automatically to browser storage.

## Search And Filter

- Use the global search field to search projects and tasks.
- Use **Priority** filters for status, assignee, and project.

## ITSM Settings

Open **Settings** to manage:

- Organization name.
- Environment name.
- Default priority, risk, and status.
- ITSM theme.
- Backup reminder.
- Service areas.
- Assignment groups.
- SLA target days by priority.

## Appearance

Open **Settings**, then use **Appearance > Theme**.

The app includes three themes:

- **Pearl Grid**: clean navy, white, and blue service desk style.
- **Midnight Grid**: deeper enterprise navy theme.
- **Nova 2050**: neutral slate theme with teal accents.

Theme selection is saved in browser storage.

## Backup And Restore

- Select **Export JSON** to download a backup.
- Select **Import JSON** to restore a valid backup.
- Imports are validated before replacing current data.

## Reset Sample Data

1. Open **Settings**.
2. Go to **Local Data Controls**.
3. Select **Reset Sample**.

This restores the sample projects, tasks, settings, SLA targets, and theme in the current browser.

## Important Storage Note

This app does not use a server. Browser cleanup tools, incognito sessions, or switching browsers can remove or hide your data. Export JSON regularly if the data matters.
