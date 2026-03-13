# IRIX Mock Data Library

This directory contains realistic but fictional sample data that reflects Milliman IntelliScript's domain for use in IRIX prototypes.

## Available Modules

- **[`applicants.ts`](./applicants.ts)**: Array of applicant objects containing demographics, application metrics, status, and overall risk tier. Useful for building data tables, user lists, and master views.
- **[`risk-scores.ts`](./risk-scores.ts)**: Detailed composite score profiles broken down by specific domains (Rx, Condition, Lab), along with historical score trends. Keys to applicant IDs. Useful for KPI cards, detailed scoring panels, and line charts.
- **[`rx-history.ts`](./rx-history.ts)**: Prescription fill records containing drug names, NDCs, dispense dates, prescriber types, and specific risk flags. Keys to applicant IDs. Useful for timeline views, detailed data grids, and clinical history panels.

## Usage Guidelines

- **Never hardcode fake data inline** in your prototypes. Always import what you need from these files.
- **TypeScript ready**: Each module exports strong interfaces (`Applicant`, `RiskScore`, `RxRecord` etc.). Use these interfaces when building props for your prototype components.
- **Simulate latency** (optional if appropriate for prototype): If you want to demonstrate loading states, you can wrap these imports in a simulated `setTimeout` Promise. Otherwise, using them synchronously is acceptable for static prototypes.

## Mock Data Structure Relationships

1. Start with an `Applicant` (e.g. ID `APP-1001`).
2. Look up their score details via `mockRiskScores["APP-1001"]`.
3. Look up their clinical history via `mockRxHistory.filter(rx => rx.applicantId === "APP-1001")`.
