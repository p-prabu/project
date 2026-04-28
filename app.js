const STORAGE_KEY = "itsm-project-management-v1";
const statuses = ["Backlog", "Assess", "Plan", "Build", "Validate", "Deploy", "Review", "Closed"];
const priorities = ["Critical", "High", "Medium", "Low"];
const risks = ["High", "Medium", "Low"];
const themes = ["Pearl Grid", "Midnight Grid", "Nova 2050"];
const legacyThemeMap = {
  "Classic ITSM": "Pearl Grid",
  "Midnight ITSM": "Midnight Grid",
  "Slate ITSM": "Nova 2050"
};
const today = new Date().toISOString().slice(0, 10);

const sampleData = {
  settings: {
    organizationName: "ITSM PMO",
    environment: "Production Services",
    defaultPriority: "Medium",
    defaultRisk: "Medium",
    defaultStatus: "Backlog",
    theme: "Pearl Grid",
    serviceAreas: ["Digital Workplace", "Change Enablement", "Service Configuration", "Service Desk", "Infrastructure"],
    assignees: ["Asha Raman", "Meera Shah", "Nikhil Menon", "Priya Nair", "Ravi Kumar"],
    slaDays: {
      Critical: 2,
      High: 5,
      Medium: 10,
      Low: 20
    },
    backupReminder: true
  },
  projects: [
    {
      id: "proj-portal",
      name: "Employee Service Portal Refresh",
      description: "Modernize the internal support portal and improve service request intake.",
      serviceArea: "Digital Workplace",
      owner: "Asha Raman",
      priority: "High",
      status: "Build",
      startDate: "2026-04-01",
      targetDate: "2026-05-20",
      risk: "Medium",
      createdAt: "2026-04-01T09:00:00.000Z",
      updatedAt: "2026-04-18T09:00:00.000Z"
    },
    {
      id: "proj-change",
      name: "Change Calendar Governance",
      description: "Introduce a shared release calendar for standard and major changes.",
      serviceArea: "Change Enablement",
      owner: "Nikhil Menon",
      priority: "Critical",
      status: "Assess",
      startDate: "2026-04-10",
      targetDate: "2026-05-05",
      risk: "High",
      createdAt: "2026-04-10T09:00:00.000Z",
      updatedAt: "2026-04-20T09:00:00.000Z"
    },
    {
      id: "proj-cmdb",
      name: "CMDB Data Quality Sprint",
      description: "Clean stale CI relationships for priority business services.",
      serviceArea: "Service Configuration",
      owner: "Priya Nair",
      priority: "Medium",
      status: "Plan",
      startDate: "2026-04-15",
      targetDate: "2026-06-01",
      risk: "Low",
      createdAt: "2026-04-15T09:00:00.000Z",
      updatedAt: "2026-04-19T09:00:00.000Z"
    }
  ],
  tasks: [
    {
      id: "task-1",
      projectId: "proj-portal",
      title: "Map request catalog gaps",
      description: "Review top incident categories and missing service request forms.",
      assignee: "Meera Shah",
      priority: "High",
      status: "Validate",
      startDate: "2026-04-02",
      dueDate: "2026-04-24",
      serviceImpact: "Self-service adoption",
      changeRisk: "Medium",
      createdAt: "2026-04-02T09:00:00.000Z",
      updatedAt: "2026-04-22T09:00:00.000Z"
    },
    {
      id: "task-2",
      projectId: "proj-portal",
      title: "Build new intake workflow",
      description: "Configure form sections, assignment routing, and SLA metadata.",
      assignee: "Ravi Kumar",
      priority: "High",
      status: "Build",
      startDate: "2026-04-12",
      dueDate: "2026-05-03",
      serviceImpact: "Request fulfillment",
      changeRisk: "Medium",
      createdAt: "2026-04-12T09:00:00.000Z",
      updatedAt: "2026-04-20T09:00:00.000Z"
    },
    {
      id: "task-3",
      projectId: "proj-change",
      title: "Define blackout calendar rules",
      description: "Capture business-critical blackout windows and exception criteria.",
      assignee: "Asha Raman",
      priority: "Critical",
      status: "Assess",
      startDate: "2026-04-10",
      dueDate: "2026-04-28",
      serviceImpact: "Change collision reduction",
      changeRisk: "High",
      createdAt: "2026-04-10T09:00:00.000Z",
      updatedAt: "2026-04-21T09:00:00.000Z"
    },
    {
      id: "task-4",
      projectId: "proj-change",
      title: "Review CAB approval criteria",
      description: "Align risk scoring with priority services and release windows.",
      assignee: "Nikhil Menon",
      priority: "Critical",
      status: "Plan",
      startDate: "2026-04-18",
      dueDate: "2026-05-02",
      serviceImpact: "Change governance",
      changeRisk: "High",
      createdAt: "2026-04-18T09:00:00.000Z",
      updatedAt: "2026-04-22T09:00:00.000Z"
    },
    {
      id: "task-5",
      projectId: "proj-cmdb",
      title: "Identify stale CI owners",
      description: "Find configuration items without verified service owners.",
      assignee: "Priya Nair",
      priority: "Medium",
      status: "Backlog",
      startDate: "2026-04-20",
      dueDate: "2026-05-08",
      serviceImpact: "Incident routing",
      changeRisk: "Low",
      createdAt: "2026-04-20T09:00:00.000Z",
      updatedAt: "2026-04-20T09:00:00.000Z"
    },
    {
      id: "task-6",
      projectId: "proj-cmdb",
      title: "Validate tier-one service map",
      description: "Confirm dependency relationships for customer-facing services.",
      assignee: "Meera Shah",
      priority: "Medium",
      status: "Plan",
      startDate: "2026-04-22",
      dueDate: "2026-05-15",
      serviceImpact: "Service visibility",
      changeRisk: "Low",
      createdAt: "2026-04-22T09:00:00.000Z",
      updatedAt: "2026-04-22T09:00:00.000Z"
    }
  ]
};

let state = loadStore();
let activeView = "dashboard";
let editingProjectId = "";
let editingTaskId = "";
let filters = { status: "All", assignee: "All", projectId: "All" };
let searchQuery = "";

const app = document.getElementById("app");
const pageTitle = document.getElementById("pageTitle");
const topStats = document.getElementById("topStats");
const toast = document.getElementById("toast");
const importFile = document.getElementById("importFile");
const globalSearch = document.getElementById("globalSearch");
const backupNotice = document.getElementById("backupNotice");

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

document.getElementById("exportBtn").addEventListener("click", exportJson);
document.getElementById("importBtn").addEventListener("click", () => importFile.click());
importFile.addEventListener("change", importJson);
toast.addEventListener("click", () => toast.hidden = true);
globalSearch.addEventListener("input", () => {
  searchQuery = globalSearch.value.trim().toLowerCase();
  render();
});

render();

function loadStore() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    return clone(sampleData);
  }

  try {
    const parsed = JSON.parse(stored);
    return isValidStore(parsed) ? normalizeStore(parsed) : clone(sampleData);
  } catch {
    return clone(sampleData);
  }
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isValidStore(value) {
  if (!value || !Array.isArray(value.projects) || !Array.isArray(value.tasks)) return false;
  if (!value.projects.every(isValidProject) || !value.tasks.every(isValidTask)) return false;
  const projectIds = new Set(value.projects.map((project) => project.id));
  return value.tasks.every((task) => projectIds.has(task.projectId)) && (!value.settings || isValidSettings(value.settings));
}

function normalizeStore(value) {
  const settings = value.settings || {};
  return {
    settings: {
      ...clone(sampleData.settings),
      ...settings,
      theme: legacyThemeMap[settings.theme] || settings.theme || sampleData.settings.theme,
      slaDays: {
        ...clone(sampleData.settings.slaDays),
        ...(settings.slaDays || {})
      }
    },
    projects: value.projects,
    tasks: value.tasks
  };
}

function isValidProject(project) {
  return project &&
    isText(project.id) &&
    isText(project.name) &&
    isText(project.serviceArea) &&
    isText(project.owner) &&
    priorities.includes(project.priority) &&
    statuses.includes(project.status) &&
    risks.includes(project.risk) &&
    isDate(project.startDate) &&
    isDate(project.targetDate) &&
    isText(project.createdAt) &&
    isText(project.updatedAt);
}

function isValidTask(task) {
  return task &&
    isText(task.id) &&
    isText(task.projectId) &&
    isText(task.title) &&
    isText(task.assignee) &&
    priorities.includes(task.priority) &&
    statuses.includes(task.status) &&
    risks.includes(task.changeRisk) &&
    isDate(task.startDate) &&
    isDate(task.dueDate) &&
    isText(task.createdAt) &&
    isText(task.updatedAt);
}

function isValidSettings(settings) {
  return settings &&
    isText(settings.organizationName) &&
    isText(settings.environment) &&
    priorities.includes(settings.defaultPriority) &&
    risks.includes(settings.defaultRisk) &&
    statuses.includes(settings.defaultStatus) &&
    (!settings.theme || themes.includes(settings.theme) || Object.prototype.hasOwnProperty.call(legacyThemeMap, settings.theme)) &&
    Array.isArray(settings.serviceAreas) &&
    Array.isArray(settings.assignees) &&
    settings.serviceAreas.every(isText) &&
    settings.assignees.every(isText) &&
    settings.slaDays &&
    priorities.every((priority) => Number.isFinite(Number(settings.slaDays[priority])) && Number(settings.slaDays[priority]) >= 0);
}

function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
}

function render() {
  const titles = {
    dashboard: "Operational Dashboard",
    kanban: "ITIL Work Kanban",
    timeline: "Project Timeline",
    assigned: "Assigned Workload",
    priority: "Priority Control",
    reports: "Operational Reports",
    settings: "ITSM Settings",
    manage: "Projects & Tasks"
  };
  const projects = getVisibleProjects();
  const tasks = getVisibleTasks();
  backupNotice.hidden = !state.settings.backupReminder;
  document.documentElement.dataset.theme = themeKey(state.settings.theme);

  pageTitle.textContent = titles[activeView];
  topStats.innerHTML = [
    `${projects.length} Projects`,
    `${tasks.length} Tasks`,
    `${tasks.filter((task) => isOverdue(task.dueDate, task.status)).length} Overdue`
  ].map((text) => `<span>${escapeHtml(text)}</span>`).join("");

  if (activeView === "dashboard") app.innerHTML = dashboardView();
  if (activeView === "kanban") app.innerHTML = kanbanView();
  if (activeView === "timeline") app.innerHTML = timelineView();
  if (activeView === "assigned") app.innerHTML = assignedView();
  if (activeView === "priority") app.innerHTML = priorityView();
  if (activeView === "reports") app.innerHTML = reportsView();
  if (activeView === "settings") app.innerHTML = settingsView();
  if (activeView === "manage") app.innerHTML = manageView();
}

function dashboardView() {
  const tasks = getVisibleTasks();
  const projects = getVisibleProjects();
  const activeProjects = projects.filter((project) => project.status !== "Closed");
  const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate, task.status));
  const highPriorityTasks = tasks.filter((task) => ["Critical", "High"].includes(task.priority));
  const upcomingTasks = [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 6);

  return `
    <div class="view-grid">
      <div class="metrics-row">
        ${metric("Active projects", activeProjects.length)}
        ${metric("Overdue tasks", overdueTasks.length, "warn")}
        ${metric("Critical or high", highPriorityTasks.length, "hot")}
        ${metric("Upcoming", upcomingTasks.length, "cool")}
      </div>
      ${panel("Upcoming Due Dates", taskTable(upcomingTasks, true))}
      ${panel("High Priority Work", taskTable(highPriorityTasks, true))}
      ${panel("Active Projects", projectTable(activeProjects, false))}
    </div>
  `;
}

function kanbanView() {
  const visibleTaskIds = new Set(getVisibleTasks().map((task) => task.id));
  return `
    <div class="kanban">
      ${statuses.map((status) => {
        const tasks = state.tasks.filter((task) => task.status === status && visibleTaskIds.has(task.id));
        return `
          <section class="kanban-column">
            <header><strong>${status}</strong><span>${tasks.length}</span></header>
            <div class="kanban-list">
              ${tasks.map(taskCard).join("") || `<p class="empty">No tasks</p>`}
            </div>
          </section>
        `;
      }).join("")}
    </div>
  `;
}

function taskCard(task) {
  const project = projectById(task.projectId);
  return `
    <article class="task-card">
      <div class="task-card-title">
        <strong>${escapeHtml(task.title)}</strong>
        ${badge(task.priority)}
      </div>
      <p>${escapeHtml(project ? project.name : "Unknown project")}</p>
      <div class="card-meta">
        <span>${escapeHtml(task.assignee)}</span>
        <span class="${isOverdue(task.dueDate, task.status) ? "overdue" : ""}">${formatDate(task.dueDate)}</span>
      </div>
      <div class="card-meta">
        <span>${escapeHtml(task.serviceImpact)}</span>
        ${badge(task.changeRisk)}
      </div>
      <div class="card-actions">
        <select onchange="updateTaskStatus('${task.id}', this.value)">
          ${statuses.map((status) => `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
        <button onclick="editTask('${task.id}')">Edit</button>
      </div>
    </article>
  `;
}

function timelineView() {
  const projects = getVisibleProjects();
  const tasks = getVisibleTasks();
  const dates = [
    ...projects.flatMap((project) => [project.startDate, project.targetDate]),
    ...tasks.flatMap((task) => [task.startDate, task.dueDate])
  ].sort();
  const minDate = dates[0] || today;
  const maxDate = dates[dates.length - 1] || today;
  const min = new Date(`${minDate}T00:00:00`).getTime();
  const max = new Date(`${maxDate}T00:00:00`).getTime();
  const span = Math.max(max - min, 86400000);
  const monthMarkers = getMonthMarkers(minDate, maxDate, min, span);
  const bar = (start, end) => {
    const left = ((new Date(`${start}T00:00:00`).getTime() - min) / span) * 100;
    const width = Math.max(((new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime()) / span) * 100, 5);
    return `left:${left}%;width:${width}%`;
  };

  return `
    <section class="timeline">
      <div class="timeline-scale">
        <div class="timeline-scale-label">
          <strong>Timeline range</strong>
          <span>${formatDate(minDate)} - ${formatDate(maxDate)}</span>
        </div>
        <div class="timeline-month-track" aria-label="Timeline month markers">
          ${monthMarkers.map((marker) => `<span class="timeline-month-marker ${marker.edge}" style="left:${marker.left}%">${marker.label}</span>`).join("")}
        </div>
      </div>
      ${panel("Project Plan", projects.map((project) => timelineRow(
        project.name,
        `${project.owner} - ${project.serviceArea}`,
        timelineBar({
          label: project.status,
          className: `project ${project.priority.toLowerCase()}`,
          style: bar(project.startDate, project.targetDate),
          title: `${project.name}\nStart: ${formatDate(project.startDate)}\nEnd: ${formatDate(project.targetDate)}`
        })
      )).join("") || `<p class="empty inline-empty">No matching projects.</p>`)}
      ${panel("Task Schedule", tasks.map((task) => {
        const project = projectById(task.projectId);
        return timelineRow(
          task.title,
          project ? project.name : "Unknown project",
          timelineBar({
            label: task.assignee,
            className: `${task.priority.toLowerCase()} ${isOverdue(task.dueDate, task.status) ? "late" : ""}`,
            style: bar(task.startDate, task.dueDate),
            title: `${task.title}\nStart: ${formatDate(task.startDate)}\nEnd: ${formatDate(task.dueDate)}`
          })
        );
      }).join("") || `<p class="empty inline-empty">No matching tasks.</p>`)}
    </section>
  `;
}

function timelineBar({ label, className, style, title }) {
  return `<div class="timeline-bar ${className}" style="${style}" title="${escapeAttr(title)}" aria-label="${escapeAttr(title)}">${escapeHtml(label)}</div>`;
}

function timelineRow(label, meta, content) {
  return `
    <div class="timeline-row">
      <div class="timeline-label"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(meta)}</span></div>
      <div class="timeline-track">${content}</div>
    </div>
  `;
}

function assignedView() {
  const visibleTasks = getVisibleTasks();
  const assignees = [...new Set(visibleTasks.map((task) => task.assignee))].sort();
  return `
    <div class="view-grid">
      ${assignees.map((assignee) => {
        const tasks = visibleTasks.filter((task) => task.assignee === assignee);
        return panel(assignee, `
          <div class="mini-metrics">
            <span>${tasks.filter((task) => isOverdue(task.dueDate, task.status)).length} overdue</span>
            <span>${tasks.filter((task) => task.priority === "Critical").length} critical</span>
            <span>${tasks.filter((task) => task.status !== "Closed").length} active</span>
          </div>
          ${taskTable(tasks, true)}
        `, `${tasks.length} tasks`);
      }).join("") || panel("No Matching Assignees", `<p class="empty inline-empty">No assigned work matches the current search.</p>`)}
    </div>
  `;
}

function priorityView() {
  const visibleTasks = getVisibleTasks();
  const assignees = [...new Set(visibleTasks.map((task) => task.assignee))].sort();
  const tasks = visibleTasks.filter((task) =>
    (filters.status === "All" || task.status === filters.status) &&
    (filters.assignee === "All" || task.assignee === filters.assignee) &&
    (filters.projectId === "All" || task.projectId === filters.projectId)
  );

  return `
    <section class="view-grid">
      <div class="filter-bar">
        ${selectField("Status", "filter-status", ["All", ...statuses], filters.status)}
        ${selectField("Assignee", "filter-assignee", ["All", ...assignees], filters.assignee)}
        <label>Project
          <select id="filter-project">
            <option value="All">All</option>
            ${getVisibleProjects().map((project) => `<option value="${project.id}" ${filters.projectId === project.id ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}
          </select>
        </label>
      </div>
      ${priorities.map((priority) => {
        const priorityTasks = tasks.filter((task) => task.priority === priority);
        return panel(`${priority} Priority`, taskTable(priorityTasks, true), `${priorityTasks.length} tasks`);
      }).join("")}
    </section>
  `;
}

function reportsView() {
  const projects = getVisibleProjects();
  const tasks = getVisibleTasks();
  const activeTasks = tasks.filter((task) => task.status !== "Closed");
  const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate, task.status));
  const serviceAreas = countBy(projects, "serviceArea");
  const statusCounts = countBy(tasks, "status");
  const priorityCounts = countBy(tasks, "priority");
  const assigneeCounts = countBy(tasks, "assignee");

  return `
    <section class="view-grid">
      <div class="metrics-row">
        ${metric("Active tasks", activeTasks.length)}
        ${metric("Overdue tasks", overdueTasks.length, "warn")}
        ${metric("Critical tasks", tasks.filter((task) => task.priority === "Critical").length, "hot")}
        ${metric("Service areas", Object.keys(serviceAreas).length, "cool")}
      </div>
      ${panel("SLA Targets", reportTable(state.settings.slaDays))}
      ${panel("Tasks By Status", reportTable(statusCounts))}
      ${panel("Tasks By Priority", reportTable(priorityCounts))}
      ${panel("Workload By Assignee", reportTable(assigneeCounts))}
      ${panel("Projects By Service Area", reportTable(serviceAreas))}
    </section>
  `;
}

function settingsView() {
  return `
    <section class="view-grid">
      <div class="settings-hero">
        <div>
          <span class="eyebrow">ITSM Configuration</span>
          <h2>${escapeHtml(state.settings.organizationName)}</h2>
          <p>${escapeHtml(state.settings.environment)} configuration for project intake, task defaults, workload ownership, and SLA reporting.</p>
        </div>
        <div class="settings-kpis">
          <span>${state.settings.serviceAreas.length} Service Areas</span>
          <span>${state.settings.assignees.length} Assignees</span>
          <span>${state.settings.backupReminder ? "Backup Notice On" : "Backup Notice Off"}</span>
        </div>
      </div>

      <div class="management-grid">
      ${panel("Service Desk Profile", `
        <form class="form-grid" id="settingsForm">
          ${inputField("Organization Name", "settings-org", state.settings.organizationName, true)}
          ${inputField("Environment", "settings-env", state.settings.environment, true)}
          <div class="form-section wide">Default Intake Values</div>
          ${selectField("Default Priority", "settings-priority", priorities, state.settings.defaultPriority)}
          ${selectField("Default Risk", "settings-risk", risks, state.settings.defaultRisk)}
          ${selectField("Default Status", "settings-status", statuses, state.settings.defaultStatus)}
          <div class="form-section wide">Appearance</div>
          ${selectField("Theme", "settings-theme", themes, state.settings.theme)}
          <label>Local Backup Reminder
            <select id="settings-backup">
              <option value="true" ${state.settings.backupReminder ? "selected" : ""}>Enabled</option>
              <option value="false" ${!state.settings.backupReminder ? "selected" : ""}>Disabled</option>
            </select>
          </label>
          <div class="form-section wide">Catalog And Ownership Options</div>
          <label class="wide">Service Areas
            <textarea id="settings-service-areas" aria-label="Service areas, one per line">${escapeHtml(state.settings.serviceAreas.join("\n"))}</textarea>
          </label>
          <label class="wide">Assignees
            <textarea id="settings-assignees" aria-label="Assignees, one per line">${escapeHtml(state.settings.assignees.join("\n"))}</textarea>
          </label>
          <button class="primary" type="submit">Save Settings</button>
        </form>
      `)}
      ${panel("Priority SLA Policy", `
        <form class="form-grid" id="slaForm">
          ${priorities.map((priority) => inputField(`${priority} SLA Days`, `sla-${priority.toLowerCase()}`, String(state.settings.slaDays[priority]), true, "number")).join("")}
          <button class="primary" type="submit">Save SLA Targets</button>
        </form>
      `)}
      ${panel("Current ITSM Options", `
        <div class="settings-summary">
          <div><strong>Service Areas</strong><span class="option-cloud">${state.settings.serviceAreas.map((area) => `<em>${escapeHtml(area)}</em>`).join("")}</span></div>
          <div><strong>Assignment Groups</strong><span class="option-cloud">${state.settings.assignees.map((assignee) => `<em>${escapeHtml(assignee)}</em>`).join("")}</span></div>
          <div><strong>Default Intake</strong><span>${escapeHtml(state.settings.defaultStatus)} status, ${escapeHtml(state.settings.defaultPriority)} priority, ${escapeHtml(state.settings.defaultRisk)} risk</span></div>
          <div><strong>Theme</strong><span>${escapeHtml(state.settings.theme)}</span></div>
          <div><strong>SLA Targets</strong><span>${priorities.map((priority) => `${priority}: ${state.settings.slaDays[priority]}d`).join(" | ")}</span></div>
        </div>
      `, "", "full")}
      ${panel("Local Data Controls", `
        <div class="settings-actions">
          <div>
            <strong>Reset sample data</strong>
            <span>Restore the default ITSM projects, tasks, settings, SLA targets, and theme in this browser.</span>
          </div>
          <button class="danger-action" type="button" onclick="resetSampleData()">Reset Sample</button>
        </div>
      `, "", "full")}
      </div>
    </section>
  `;
}

function manageView() {
  const project = editingProjectId ? projectById(editingProjectId) : {};
  const task = editingTaskId ? taskById(editingTaskId) : {};
  const projects = getVisibleProjects();
  const tasks = getVisibleTasks();
  return `
    <section class="management-grid">
      ${panel(editingProjectId ? "Edit Project" : "Create Project", projectForm(project || {}))}
      ${panel(editingTaskId ? "Edit Task" : "Create Task", taskForm(task || {}))}
      ${panel("Project Register", projectTable(projects, true), "", "full")}
      ${panel("Task Register", taskTable(tasks, false, true), "", "full")}
    </section>
  `;
}

function projectForm(project) {
  return `
    <form class="form-grid" id="projectForm">
      ${inputField("Name", "project-name", project.name || "", true)}
      ${inputField("Owner", "project-owner", project.owner || "", true)}
      ${inputField("Service Area", "project-service", project.serviceArea || "", true, "text", "service-area-options")}
      ${selectField("Priority", "project-priority", priorities, project.priority || state.settings.defaultPriority)}
      ${selectField("Status", "project-status", statuses, project.status || state.settings.defaultStatus)}
      ${selectField("Risk", "project-risk", risks, project.risk || state.settings.defaultRisk)}
      ${inputField("Start Date", "project-start", project.startDate || today, false, "date")}
      ${inputField("Target Date", "project-target", project.targetDate || today, false, "date")}
      <label class="wide">Description<textarea id="project-description">${escapeHtml(project.description || "")}</textarea></label>
      ${dataList("service-area-options", state.settings.serviceAreas)}
      <button class="primary" type="submit">${editingProjectId ? "Update Project" : "Create Project"}</button>
    </form>
  `;
}

function taskForm(task) {
  return `
    <form class="form-grid" id="taskForm">
      ${inputField("Title", "task-title", task.title || "", true)}
      ${inputField("Assignee", "task-assignee", task.assignee || "", true, "text", "assignee-options")}
      <label>Project
        <select id="task-project" required>
          <option value="">Select project</option>
          ${state.projects.map((project) => `<option value="${project.id}" ${(task.projectId || state.projects[0]?.id) === project.id ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}
        </select>
      </label>
      ${selectField("Priority", "task-priority", priorities, task.priority || state.settings.defaultPriority)}
      ${selectField("Status", "task-status", statuses, task.status || state.settings.defaultStatus)}
      ${selectField("Change Risk", "task-risk", risks, task.changeRisk || state.settings.defaultRisk)}
      ${inputField("Start Date", "task-start", task.startDate || today, false, "date")}
      ${inputField("Due Date", "task-due", task.dueDate || today, false, "date")}
      ${inputField("Service Impact", "task-impact", task.serviceImpact || "")}
      <label class="wide">Description<textarea id="task-description">${escapeHtml(task.description || "")}</textarea></label>
      ${dataList("assignee-options", state.settings.assignees)}
      <button class="primary" type="submit">${editingTaskId ? "Update Task" : "Create Task"}</button>
    </form>
  `;
}

function metric(label, value, tone = "") {
  return `<div class="metric ${tone}"><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`;
}

function panel(title, body, aside = "", extraClass = "") {
  return `
    <section class="panel ${extraClass}">
      <header class="panel-header"><h2>${escapeHtml(title)}</h2>${aside ? `<span>${escapeHtml(aside)}</span>` : ""}</header>
      ${body}
    </section>
  `;
}

function taskTable(tasks, compact, actions = false) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Task</th><th>Project</th><th>Assignee</th><th>Priority</th>
            ${compact ? "" : "<th>Status</th>"}
            <th>Due</th>
            ${actions ? "<th>Actions</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${tasks.map((task) => {
            const project = projectById(task.projectId);
            return `
              <tr>
                <td>
                  <details>
                    <summary>${escapeHtml(task.title)}</summary>
                    <div class="detail-body">
                      <p>${escapeHtml(task.description || "No description recorded.")}</p>
                      <span>Impact: ${escapeHtml(task.serviceImpact || "Not recorded")}</span>
                      <span>Risk: ${escapeHtml(task.changeRisk)}</span>
                    </div>
                  </details>
                </td>
                <td>${escapeHtml(project ? project.name : "Unknown")}</td>
                <td>${escapeHtml(task.assignee)}</td>
                <td>${badge(task.priority)}</td>
                ${compact ? "" : `<td>${badge(task.status)}</td>`}
                <td class="${isOverdue(task.dueDate, task.status) ? "overdue" : ""}">${formatDate(task.dueDate)}</td>
                ${actions ? `<td class="actions"><button onclick="editTask('${task.id}')">Edit</button><button class="danger-ghost" onclick="deleteTask('${task.id}')">Delete</button></td>` : ""}
              </tr>
            `;
          }).join("") || `<tr><td class="empty" colspan="${compact ? 5 : actions ? 7 : 6}">No records match this view.</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function projectTable(projects, actions) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Project</th><th>Service Area</th><th>Owner</th><th>Priority</th><th>Status</th><th>Target</th>
            ${actions ? "<th>Actions</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${projects.map((project) => `
            <tr>
              <td>
                <details>
                  <summary>${escapeHtml(project.name)}</summary>
                  <div class="detail-body">
                    <p>${escapeHtml(project.description || "No description recorded.")}</p>
                    <span>Risk: ${escapeHtml(project.risk)}</span>
                  </div>
                </details>
              </td>
              <td>${escapeHtml(project.serviceArea)}</td>
              <td>${escapeHtml(project.owner)}</td>
              <td>${badge(project.priority)}</td>
              <td>${badge(project.status)}</td>
              <td>${formatDate(project.targetDate)}</td>
              ${actions ? `<td class="actions"><button onclick="editProject('${project.id}')">Edit</button><button class="danger-ghost" onclick="deleteProject('${project.id}')">Delete</button></td>` : ""}
            </tr>
          `).join("") || `<tr><td class="empty" colspan="${actions ? 7 : 6}">No records match this view.</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function badge(value) {
  return `<span class="badge ${String(value).toLowerCase()}">${escapeHtml(value)}</span>`;
}

function inputField(label, id, value, required = false, type = "text", list = "") {
  return `<label>${label}<input id="${id}" type="${type}" value="${escapeAttr(value)}" ${list ? `list="${list}"` : ""} ${required ? "required" : ""}></label>`;
}

function selectField(label, id, options, selected) {
  return `
    <label>${label}
      <select id="${id}">
        ${options.map((option) => `<option value="${escapeAttr(option)}" ${selected === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
      </select>
    </label>
  `;
}

function dataList(id, options) {
  return `<datalist id="${id}">${options.map((option) => `<option value="${escapeAttr(option)}"></option>`).join("")}</datalist>`;
}

function reportTable(counts) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Category</th><th>Count</th></tr></thead>
        <tbody>
          ${entries.map(([label, count]) => `<tr><td>${escapeHtml(label)}</td><td>${count}</td></tr>`).join("") || `<tr><td class="empty" colspan="2">No data available.</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    const label = item[key] || "Unassigned";
    counts[label] = (counts[label] || 0) + 1;
    return counts;
  }, {});
}

app.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "projectForm") saveProject();
  if (event.target.id === "taskForm") saveTask();
  if (event.target.id === "settingsForm") saveSettings();
  if (event.target.id === "slaForm") saveSlaTargets();
});

app.addEventListener("change", (event) => {
  if (event.target.id === "filter-status") filters.status = event.target.value;
  if (event.target.id === "filter-assignee") filters.assignee = event.target.value;
  if (event.target.id === "filter-project") filters.projectId = event.target.value;
  if (event.target.id && event.target.id.startsWith("filter-")) render();
});

function saveProject() {
  const form = {
    name: value("project-name"),
    owner: value("project-owner"),
    serviceArea: value("project-service"),
    priority: value("project-priority"),
    status: value("project-status"),
    risk: value("project-risk"),
    startDate: value("project-start"),
    targetDate: value("project-target"),
    description: value("project-description")
  };

  if (!form.name || !form.owner || !form.serviceArea) return showToast("Project name, owner, and service area are required.");

  if (editingProjectId) {
    state.projects = state.projects.map((project) => project.id === editingProjectId ? { ...project, ...form, updatedAt: now() } : project);
    editingProjectId = "";
    showToast("Project updated.");
  } else {
    state.projects.unshift({ id: makeId("proj"), ...form, createdAt: now(), updatedAt: now() });
    showToast("Project created.");
  }

  saveStore();
  render();
}

function saveTask() {
  const form = {
    projectId: value("task-project"),
    title: value("task-title"),
    assignee: value("task-assignee"),
    priority: value("task-priority"),
    status: value("task-status"),
    changeRisk: value("task-risk"),
    startDate: value("task-start"),
    dueDate: value("task-due"),
    serviceImpact: value("task-impact"),
    description: value("task-description")
  };

  if (!form.title || !form.assignee || !form.projectId) return showToast("Task title, assignee, and project are required.");

  if (editingTaskId) {
    state.tasks = state.tasks.map((task) => task.id === editingTaskId ? { ...task, ...form, updatedAt: now() } : task);
    editingTaskId = "";
    showToast("Task updated.");
  } else {
    state.tasks.unshift({ id: makeId("task"), ...form, createdAt: now(), updatedAt: now() });
    showToast("Task created.");
  }

  saveStore();
  render();
}

function saveSettings() {
  const serviceAreas = listValue("settings-service-areas");
  const assignees = listValue("settings-assignees");

  if (!value("settings-org") || !value("settings-env")) {
    return showToast("Organization name and environment are required.");
  }

  if (serviceAreas.length === 0 || assignees.length === 0) {
    return showToast("Add at least one service area and one assignee.");
  }

  state.settings = {
    ...state.settings,
    organizationName: value("settings-org"),
    environment: value("settings-env"),
    defaultPriority: value("settings-priority"),
    defaultRisk: value("settings-risk"),
    defaultStatus: value("settings-status"),
    theme: value("settings-theme"),
    backupReminder: value("settings-backup") === "true",
    serviceAreas,
    assignees
  };

  saveStore();
  showToast("ITSM settings saved.");
  render();
}

function saveSlaTargets() {
  const nextSlaDays = {};

  for (const priority of priorities) {
    const days = Number(value(`sla-${priority.toLowerCase()}`));
    if (!Number.isFinite(days) || days < 0) {
      return showToast("SLA days must be zero or greater.");
    }
    nextSlaDays[priority] = days;
  }

  state.settings = {
    ...state.settings,
    slaDays: nextSlaDays
  };

  saveStore();
  showToast("SLA targets saved.");
  render();
}

function editProject(projectId) {
  editingProjectId = projectId;
  activeView = "manage";
  setActiveNav();
  render();
}

function deleteProject(projectId) {
  const relatedTasks = state.tasks.filter((task) => task.projectId === projectId).length;
  if (relatedTasks && !confirm(`Delete this project and ${relatedTasks} related task(s)?`)) return;
  state.projects = state.projects.filter((project) => project.id !== projectId);
  state.tasks = state.tasks.filter((task) => task.projectId !== projectId);
  saveStore();
  showToast("Project deleted.");
  render();
}

function editTask(taskId) {
  editingTaskId = taskId;
  activeView = "manage";
  setActiveNav();
  render();
}

function deleteTask(taskId) {
  if (!confirm("Delete this task?")) return;
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  saveStore();
  showToast("Task deleted.");
  render();
}

function updateTaskStatus(taskId, status) {
  state.tasks = state.tasks.map((task) => task.id === taskId ? { ...task, status, updatedAt: now() } : task);
  saveStore();
  showToast("Task status updated.");
  render();
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "itsm-project-management-backup.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!isValidStore(parsed)) throw new Error("Invalid data");
      state = parsed;
      saveStore();
      showToast("Backup imported.");
      render();
    } catch {
      showToast("Import failed. Backup must include valid projects, tasks, required fields, dates, statuses, priorities, risks, and task project links.");
    } finally {
      importFile.value = "";
    }
  };
  reader.readAsText(file);
}

function resetSampleData() {
  if (!confirm("Reset all local data to the sample ITSM dataset?")) return;
  state = clone(sampleData);
  editingProjectId = "";
  editingTaskId = "";
  saveStore();
  showToast("Sample data restored.");
  render();
}

function setActiveNav() {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === activeView));
}

function projectById(projectId) {
  return state.projects.find((project) => project.id === projectId);
}

function getVisibleProjects() {
  if (!searchQuery) return state.projects;
  const matchingTaskProjectIds = new Set(getVisibleTasks(false).map((task) => task.projectId));
  return state.projects.filter((project) => recordMatches(project, searchQuery) || matchingTaskProjectIds.has(project.id));
}

function getVisibleTasks(includeProjectFields = true) {
  if (!searchQuery) return state.tasks;
  return state.tasks.filter((task) => {
    const project = includeProjectFields ? projectById(task.projectId) : null;
    return recordMatches(task, searchQuery) || (project && recordMatches(project, searchQuery));
  });
}

function recordMatches(record, query) {
  return Object.values(record).some((value) => String(value).toLowerCase().includes(query));
}

function taskById(taskId) {
  return state.tasks.find((task) => task.id === taskId);
}

function value(id) {
  return document.getElementById(id).value.trim();
}

function listValue(id) {
  return [...new Set(value(id).split(/\n|,/).map((item) => item.trim()).filter(Boolean))];
}

function makeId(prefix) {
  if (window.crypto && crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function now() {
  return new Date().toISOString();
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

function getMonthMarkers(minDate, maxDate, min, span) {
  const start = new Date(`${minDate}T00:00:00`);
  const end = new Date(`${maxDate}T00:00:00`);
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const markers = [];

  while (cursor <= end) {
    const left = Math.min(Math.max(((cursor.getTime() - min) / span) * 100, 0), 100);
    markers.push({
      label: formatMonth(cursor),
      left: left.toFixed(2),
      edge: left <= 1 ? "edge-start" : left >= 99 ? "edge-end" : ""
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return markers;
}

function isOverdue(date, status) {
  return status !== "Closed" && date < today;
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
}

function themeKey(themeName) {
  const resolvedTheme = legacyThemeMap[themeName] || themeName || "Pearl Grid";
  return String(resolvedTheme).toLowerCase().replaceAll(" ", "-");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

window.editProject = editProject;
window.deleteProject = deleteProject;
window.editTask = editTask;
window.deleteTask = deleteTask;
window.updateTaskStatus = updateTaskStatus;
window.resetSampleData = resetSampleData;
