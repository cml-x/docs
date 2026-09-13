---
title: Monitoring
sidebar_position: 7
---

### Metrics missing

- **Possible cause** — no environment is selected. Monitoring requires an environment to resolve
  which OpenObserve stream/org to read from — until one is picked, a dialog blocks the page.
- **Check** — confirm an environment is selected in Monitoring for this project.
- **Fix** — select the environment your integration is actually deployed to. Metrics for a
  different environment than the one selected won't appear.

### Flow not visible

- **Possible cause** — the integration is deployed to a different project or environment than the
  one currently selected in Monitoring, or no dashboard has been created yet for this project's
  `default` OpenObserve folder.
- **Check** — confirm the project and environment selected in Monitoring match where the Capsule
  was deployed in [Runtime Manager](/runtime/getting-start).
- **Fix** — switch to the matching project/environment, or create a dashboard from the template
  gallery if none exists yet.

### Monitoring error

- **Possible cause** — the dashboard template catalog couldn't be fetched, or the project/
  environment scope needed to build an OpenObserve link is incomplete.
- **Check** — confirm the template gallery loads on the Dashboards page, and that both a project
  and an environment are selected.
- **Fix** — select a valid project and environment, then retry. Specific error payloads from the
  template catalog or OpenObserve are **[À CONFIRMER]**.
