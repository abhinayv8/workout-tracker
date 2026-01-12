# Offline Workout Analytics PWA

A data-driven, offline-first workout analytics application built with **React + Vite**, designed to replace spreadsheet-based training logs with a structured, reliable, and insight-oriented system. The project emphasizes **data modeling, signal extraction, and decision support**, aligning closely with real-world data science and engineering workflows.

---

## Problem Statement

Spreadsheet-based workout tracking is manual, error-prone, and poorly suited for analyzing long-term performance trends. Aggregate metrics often hide meaningful progression, while cloud-based fitness apps introduce unnecessary complexity, latency, and privacy concerns.

This project addresses these issues by building a **local, deterministic analytics system** that mirrors how strength training actually works and extracts high-signal insights from noisy longitudinal data.

---

## Core Objectives

- Model workout data in a way that reflects real-world training structure
- Enable accurate time-series analysis of strength progression
- Extract meaningful performance signals while filtering noise
- Operate fully offline with zero backend dependencies
- Prioritize privacy, speed, and long-term maintainability

---

## Data Model

The application uses a hierarchical data model:

- **Muscle Group**
  - **Exercise**
    - **Set**
      - Weight
      - Repetitions
      - Timestamp

Each set is treated as an independent time-series signal, avoiding misleading aggregate metrics and enabling precise performance analysis.

---

## Analytics & Feature Engineering

- **Time-Series Tracking**  
  Set-wise progression is tracked across sessions to identify trends and plateaus.

- **Personal Record (PR) Detection**  
  Automatic PR detection per set using running maximum logic.

- **Estimated One-Rep Max (1RM)**  
  Strength gains are quantified using standard 1RM estimation formulas that account for both weight and rep increases.

- **Noise Reduction via Deload Detection**  
  A rolling 4-week training block model automatically identifies deload weeks. PR tracking is paused during these periods to prevent false performance signals.

---

## Visualization & Insights

- Interactive line charts visualize per-set progression over time
- PRs are visually highlighted for immediate feedback
- A high-signal statistics panel summarizes:
  - Total sessions logged
  - Best set achieved
  - Best estimated 1RM
  - Current training block and week

The UI is designed to surface insights quickly without overwhelming the user.

---

## Offline-First Architecture

- 100% offline operation
- Persistent storage using browser **localStorage**
- Instant load times and deterministic behavior
- Full data ownership and privacy

No backend, authentication, or network connectivity is required.

---

## Progressive Web App (PWA)

- Installable as a standalone desktop application
- Native-like launch and behavior
- Fully functional without internet access

---

## Tech Stack

- **React** – UI and state management
- **Vite** – Fast development and optimized builds
- **LocalStorage** – Persistent offline data storage
- **Data Visualization** – Interactive charts for time-series analysis
- **PWA APIs** – Offline support and desktop installation

---

## Design Philosophy

- **Problem-driven engineering** over feature bloat
- **Data correctness** over vanity metrics
- **Signal over noise** in performance analytics
- **Offline-first** for reliability and privacy
- **Maintainable architecture** with minimal dependencies

---

## Setup & Development

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

After building, the app can be installed as a **Progressive Web App (PWA)** directly from the browser.

---

## Future Enhancements

- Data export/import for long-term archival
- Customizable training block lengths
- Advanced progression and trend analytics
- Optional opt-in cloud sync

---

## Conclusion

This project demonstrates a **data-centric approach to product engineering**, focusing on structured data modeling, time-series analysis, and feature engineering to extract meaningful insights from real-world, noisy data — principles directly applicable to data science and analytics roles.

