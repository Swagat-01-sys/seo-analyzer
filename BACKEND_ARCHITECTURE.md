# 🏗 Backend Architecture

## Overview

The backend is implemented using **FastAPI** and follows a modular architecture that separates API routing, business logic, database operations, and SEO analysis services.

This architecture improves maintainability, scalability, and code organization.

---

# High-Level Architecture

```text
React Frontend
       │
       ▼
POST /api/analyze
       │
       ▼
FastAPI Router
       │
       ▼
Background Task
       │
       ▼
Analysis Engine
       │
 ┌─────────────┬─────────────┬─────────────┬─────────────┐
 ▼             ▼             ▼             ▼

Metadata   Technical    Content    Performance

Analyzer    Analyzer     Analyzer     Analyzer

        └──────────────┬──────────────┘
                       ▼
               Score Generator
                       ▼
          Recommendation Engine
                       ▼
             SQLAlchemy + SQLite
                       ▼
          GET /api/results/{job_id}
                       ▼
               React Dashboard
```

---

# Project Structure

```text
backend/

├── app/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── schemas/
│   ├── database.py
│   └── main.py
│
├── lighthouse_runner.js
├── requirements.txt
├── package.json
└── Dockerfile
```

---

# Request Flow

1. Client submits a website URL.
2. FastAPI creates an analysis job.
3. A background task starts SEO analysis.
4. The Analysis Engine coordinates all analyzer modules.
5. Results are stored in SQLite.
6. The frontend polls the Results API.
7. The completed report is displayed on the dashboard.

---

# Service Layer

The backend uses independent service modules:

### Metadata Analyzer

Extracts:

* Title
* Meta Description
* Open Graph
* Twitter Cards

---

### Technical Analyzer

Checks:

* HTTPS
* Robots.txt
* Sitemap.xml
* Canonical URL
* Structured Data
* Indexability

---

### Content Analyzer

Computes:

* Word Count
* Readability
* Keyword Frequency

---

### Performance Analyzer

Measures:

* Response Time
* Page Size
* Compression

Attempts Google Lighthouse analysis when available.

---

### Score Generator

Calculates:

* Technical Score
* Metadata Score
* Content Score
* Performance Score
* Overall SEO Score

Generates optimization recommendations.

---

# Database

The application uses SQLite with SQLAlchemy ORM.

Analysis jobs and generated reports are stored for retrieval through the Results API.

---

# Background Processing

SEO analysis runs asynchronously using FastAPI BackgroundTasks.

This enables the API to respond immediately while the analysis executes independently.

---

# Deployment

Frontend

* Vercel

Backend

* Render

Database

* SQLite

Performance Analysis

* Google Lighthouse (supported locally; production execution depends on hosting environment)

---

# Design Principles

* Modular Architecture
* Separation of Concerns
* Reusable Service Layer
* RESTful API Design
* Asynchronous Processing
* ORM-based Database Access
